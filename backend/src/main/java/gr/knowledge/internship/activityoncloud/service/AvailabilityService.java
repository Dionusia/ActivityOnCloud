package gr.knowledge.internship.activityoncloud.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.ActivityDTO;
import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.dto.BookingDTO;
import gr.knowledge.internship.activityoncloud.dto.TimeSlotDTO;
import gr.knowledge.internship.activityoncloud.entity.Availability;
import gr.knowledge.internship.activityoncloud.mapper.AvailabilityMapper;
import gr.knowledge.internship.activityoncloud.mapper.BookingMapper;
import gr.knowledge.internship.activityoncloud.repository.AvailabilityRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class AvailabilityService {
	@Autowired
	private AvailabilityRepository availabilityRepository;
	@Autowired
	private BookingService bookingService;
	@Autowired
	private AvailabilityMapper availabilityMapper;

	@Transactional(readOnly = true)
	public AvailabilityDTO getAvailabilityById(Long id) {
		Availability availability = availabilityRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return availabilityMapper.toDTO(availability);
	}

	@Transactional(readOnly = true)
	public List<AvailabilityDTO> getAllAvailabilities() {
		List<Availability> allAvailabilities = availabilityRepository.findAll();
		return availabilityMapper.toDTOList(allAvailabilities);
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

	public void deleteAvailability(AvailabilityDTO availabilityDTO) {
		Availability availability = availabilityMapper.toEntity(availabilityDTO);
		availabilityRepository.delete(availability);
	}

	public Map<String, List<TimeSlotDTO>> findAvailableActivitiesWithSlots(LocalDate date, int people) {
		List<AvailabilityDTO> suitableAvailabilities = this.findSuitableAvailabilities(date, people);
		Map<String, List<TimeSlotDTO>> result = new HashMap<>();
		for (AvailabilityDTO availability : suitableAvailabilities) {
			List<TimeSlotDTO> timeSlots = this.generateTimeSlots(availability, date, people);
			result.put(String.valueOf(availability.getActivity().getId()), timeSlots);
		}
		return result;
	}

	private Availability existsInDatabase(AvailabilityDTO availabilityDTO) {
		Availability availabilityInDatabase = availabilityRepository.findById(availabilityDTO.getId())
				.orElseThrow(EntityNotFoundException::new);
		return availabilityInDatabase;
	}

	/**
	 * Find availabilities that match the given day and have capacity for at least
	 * the specified number of people.
	 */
	private List<AvailabilityDTO> findSuitableAvailabilities(LocalDate date, int people) {
		// Get the day of the week in proper format
		String dayOfWeekName = date.getDayOfWeek().name();
		String day = dayOfWeekName.charAt(0) + dayOfWeekName.substring(1).toLowerCase();
		List<AvailabilityDTO> availabilities = availabilityMapper
				.toDTOList(availabilityRepository.findByDayOfWeek(day));
		if (availabilities.isEmpty()) {
			return Collections.emptyList();
		}
		// Filter availabilities to meet or exceed the required capacity
		return availabilities.stream().filter(avail -> avail.getPersonsCapacity() >= people).toList();
	}

	/**
	 * Generate time slots for a given activity based on its open and close times
	 * and duration.
	 */
	private List<TimeSlotDTO> generateTimeSlots(AvailabilityDTO availability, LocalDate date, int people) {
		ActivityDTO activity = availability.getActivity();
		LocalTime openTime = availability.getOpenTime();
		LocalTime closeTime = availability.getCloseTime();
		Duration activityDuration = Duration.ofDays(activity.getDurationDays()).plusHours(activity.getDurationHours())
				.plusMinutes(activity.getDurationMinutes());
		List<TimeSlotDTO> timeSlots = new ArrayList<>();
		LocalTime currentStart = openTime;
		List<BookingDTO> activityBookings = bookingService.getBookingsOfActivity(activity.getId());
		while (currentStart.plus(activityDuration).isBefore(closeTime)
				|| currentStart.plus(activityDuration).equals(closeTime)) {
			LocalTime endTime = currentStart.plus(activityDuration);
			TimeSlotDTO timeSlot = new TimeSlotDTO();
			timeSlot.setStart(LocalDateTime.of(date, currentStart));
			timeSlot.setEnd(LocalDateTime.of(date, closeTime));
			List<BookingDTO> currentTimeSlotBookings = activityBookings.stream()
					.filter(booking -> booking.getStartTime().isEqual(timeSlot.getStart()))
					.collect(Collectors.toList());
			timeSlot.generateCapacity(currentTimeSlotBookings, availability.getPersonsCapacity());
			if (timeSlot.getRemainingCapacity() >= people) {
				timeSlots.add(timeSlot);
			}
			// Move to the next slot
			currentStart = endTime;
		}
		return timeSlots;
	}
}