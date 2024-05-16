package gr.knowledge.internship.activityoncloud.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.BiPredicate;
import java.util.stream.Collectors;

import gr.knowledge.internship.activityoncloud.helper.AvailabileTimeSlotsMapHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.ActivityOptionDTO;
import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.dto.AvailabilityInfoDTO;
import gr.knowledge.internship.activityoncloud.dto.BookingDTO;
import gr.knowledge.internship.activityoncloud.dto.RateDTO;
import gr.knowledge.internship.activityoncloud.dto.TimeSlotDTO;
import gr.knowledge.internship.activityoncloud.entity.Availability;
import gr.knowledge.internship.activityoncloud.mapper.AvailabilityMapper;
import gr.knowledge.internship.activityoncloud.repository.AvailabilityRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class AvailabilityService {
	@Autowired
	private AvailabilityRepository availabilityRepository;
	@Autowired
	private HolidayService holidayService;
	@Autowired
	private RateService rateService;
	@Autowired
	private BookingService bookingService;
	@Autowired
	private AvailabilityMapper availabilityMapper;
	private static final BiPredicate<BookingDTO, Long> bookingOptionIdEqualsLong = (b, id) -> b.getActivityOption()
			.getId().equals(id);
	private static final BiPredicate<BookingDTO, LocalDateTime> bookingStartEqualsDatetime = (b, date) -> b
			.getStartTime().equals(date);
	private static final BiPredicate<AvailabilityDTO, Long> availableActivityIdEqualsLong = (a, id) -> a.getOption()
			.getActivity().getId().equals(id);

	public void deleteAvailability(AvailabilityDTO availabilityDTO) {
		Availability availability = availabilityMapper.toEntity(availabilityDTO);
		availabilityRepository.delete(availability);
	}

	@Transactional(readOnly = true)
	public List<AvailabilityDTO> getAllAvailabilities() {
		List<Availability> allAvailabilities = availabilityRepository.findAll();
		return availabilityMapper.toDTOList(allAvailabilities);
	}

	@Transactional(readOnly = true)
	public AvailabilityDTO getAvailabilityById(Long id) {
		Availability availability = availabilityRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return availabilityMapper.toDTO(availability);
	}

	public AvailabilityDTO saveAvailability(AvailabilityDTO availabilityDTO) {
		Availability availability = availabilityMapper.toEntity(availabilityDTO);
		availabilityRepository.save(availability);
		return availabilityMapper.toDTO(availability);
	}

	public AvailabilityDTO updateAvailability(AvailabilityDTO availabilityDTO) {
		Availability availability = this.existsInDatabase(availabilityDTO);
		availability = availabilityMapper.toEntity(availabilityDTO);
		availabilityRepository.save(availability);
		return availabilityDTO;
	}

	private Availability existsInDatabase(AvailabilityDTO availabilityDTO) {
		Availability availabilityInDatabase = availabilityRepository.findById(availabilityDTO.getId())
				.orElseThrow(EntityNotFoundException::new);
		return availabilityInDatabase;
	}

	@Transactional(readOnly = true)
	public List<AvailabileTimeSlotsMapHelper> findAvailableOptionsWithSlots(LocalDate date, long activityId) {
		List<AvailabilityDTO> availableOptionsByDayList = new ArrayList<AvailabilityDTO>();
		List<AvailabileTimeSlotsMapHelper> activityTimeslots = new ArrayList<AvailabileTimeSlotsMapHelper>();
		List<BookingDTO> bookingsList = new ArrayList<>();
		if (holidayService.isHolidayForActivityId(activityId, date)) {
			return activityTimeslots;
		}
		List<AvailabilityDTO> availableActivityOptionsOfDay = new ArrayList<>();
		List<BookingDTO> bookingsList = new ArrayList<>();
		bookingsList = bookingService.getAllBookings();
		String day = date.getDayOfWeek().toString();
		day = day.substring(0, 1) + day.substring(1).toLowerCase();
		availableActivityOptionsOfDay = availabilityMapper.toDTOList(availabilityRepository.getByDay(day));
		availableActivityOptionsOfDay = availableActivityOptionsOfDay.stream()
				.filter(a -> availableActivityIdEqualsLong.test(a, activityId)).collect(Collectors.toList());
		for (AvailabilityDTO available : availableActivityOptionsOfDay) {
			BigDecimal price = this.calculatePriceForOption(available.getOption(), date);
			List<TimeSlotDTO> timeslotsForOption = this.calculateTimeSlotsForOption(available, bookingsList, date);
			activityTimeslots.add(new AvailabileTimeSlotsMapHelper(available.getOption().getId(), new AvailabilityInfoDTO(price, timeslotsForOption)));
		}
		return activityTimeslots;
	}

	private List<BookingDTO> getBookingsForCurrent(List<BookingDTO> bookingsList, LocalDateTime datetime,
			Long optionId) {
		return bookingsList.stream().filter(b -> bookingOptionIdEqualsLong.test(b, optionId))
				.filter(b -> bookingStartEqualsDatetime.test(b, datetime)).collect(Collectors.toList());
	}

	private List<TimeSlotDTO> calculateTimeSlotsForOption(AvailabilityDTO available, List<BookingDTO> bookingsList,
			LocalDate date) {
		ActivityOptionDTO option = available.getOption();
		LocalTime currentSlotStart = available.getStartTime();
		List<TimeSlotDTO> timeslots = new ArrayList<>();
		while (currentSlotStart.isBefore(available.getEndTime())) {
			LocalDateTime currentDatetime = LocalDateTime.of(date, currentSlotStart);
			List<BookingDTO> bookingsOfCurrentOptionAndDate = this.getBookingsForCurrent(bookingsList, currentDatetime,
					option.getId());
			timeslots.add(TimeSlotDTO.from(option, LocalDateTime.of(date, currentSlotStart), bookingsOfCurrentOptionAndDate));
			currentSlotStart = currentSlotStart.plus(option.getDuration());
		}
		return timeslots;
	}

	private BigDecimal calculatePriceForOption(ActivityOptionDTO option, LocalDate date) {
		List<RateDTO> ratesOfOption = rateService.getRatesByOptionId(option.getId());
		BigDecimal pricePerPerson = option.getPricePerPerson();
		for (RateDTO rate : ratesOfOption) {
			if (date.isAfter(rate.getStartDate()) && date.isBefore(rate.getEndDate())) {
				return pricePerPerson.multiply(rate.getRate());
			}
		}
		return pricePerPerson;
	}
}