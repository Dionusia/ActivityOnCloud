package gr.knowledge.internship.activityoncloud.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.ActivityOptionDTO;
import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.dto.AvailabilityInfoDTO;
import gr.knowledge.internship.activityoncloud.dto.RateDTO;
import gr.knowledge.internship.activityoncloud.dto.TimeSlotDTO;
import gr.knowledge.internship.activityoncloud.entity.Availability;
import gr.knowledge.internship.activityoncloud.mapper.AvailabilityMapper;
import gr.knowledge.internship.activityoncloud.repository.AvailabilityRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;

@Log4j2
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
	private AvailabilityMapper availabilityMapper;

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
	public Map<Long, AvailabilityInfoDTO> findAvailableOptionsWithSlots(LocalDate date, long activityId) {
		List<AvailabilityDTO> availableByDayList = new ArrayList<>();
		Map<Long, AvailabilityInfoDTO> activityTimeslots = new HashMap<>();
		if (holidayService.isHolidayForActivityId(activityId, date)) {
			return activityTimeslots;
		}
		String day = date.getDayOfWeek().toString();
		day = day.substring(0, 1) + day.substring(1).toLowerCase();
		availableByDayList = availabilityMapper.toDTOList(availabilityRepository.getByDay(day));
		availableByDayList = availableByDayList.stream()
				.filter(a -> a.getOption().getActivity().getId().equals(activityId)).collect(Collectors.toList());
		for (AvailabilityDTO available : availableByDayList) {
			BigDecimal price = this.calculatePriceForOption(available.getOption(), date);
			List<TimeSlotDTO> timeslotsForOption = this.calculateTimeSlotsForOption(available.getOption());
			AvailabilityInfoDTO infoDTO = new AvailabilityInfoDTO();
			activityTimeslots.put(available.getOption().getId(), infoDTO);
		}
		return activityTimeslots;
	}

	private List<TimeSlotDTO> calculateTimeSlotsForOption(ActivityOptionDTO option) {
		return null;
	}

	private BigDecimal calculatePriceForOption(ActivityOptionDTO option, LocalDate date) {
		List<RateDTO> ratesOfOption = rateService.getRatesByOptionId(option.getId());
//		BigDecimal pricePerPerson = option.g
		for (RateDTO rate : ratesOfOption) {
			if (date.isAfter(rate.getStartDate()) && date.isAfter(rate.getEndDate())) {
			}
		}
		return null;
	}

	private List<TimeSlotDTO> calculateTimeSlotsForOption(Long optionId) {
		// TODO Auto-generated method stub
		return null;
	}
}