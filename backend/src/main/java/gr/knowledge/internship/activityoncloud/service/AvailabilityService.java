package gr.knowledge.internship.activityoncloud.service;

import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.entity.Activity;
import gr.knowledge.internship.activityoncloud.entity.Availability;
import gr.knowledge.internship.activityoncloud.mapper.AvailabilityMapper;
import gr.knowledge.internship.activityoncloud.repository.AvailabilityRepository;
import jakarta.persistence.EntityNotFoundException;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AvailabilityService {
    @Autowired
    private AvailabilityRepository availabilityRepository;
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

    private Availability existsInDatabase(AvailabilityDTO availabilityDTO) {
        Availability availabilityInDatabase = availabilityRepository.findById(availabilityDTO.getId())
                .orElseThrow(EntityNotFoundException::new);
        return availabilityInDatabase;
    }

    /**
     * Find availabilities that match the given day and have capacity for at least the specified number of people.
     */
    public List<Availability> findSuitableAvailabilities(LocalDate date, int people) {
        // Get the day of the week in proper format
        String dayOfWeekName = date.getDayOfWeek().name();
        String day = dayOfWeekName.charAt(0) + dayOfWeekName.substring(1).toLowerCase();

        // Retrieve all availabilities for the specified day of the week
        List<Availability> availabilities = availabilityRepository.findByDayOfWeek(day);
        if (availabilities.isEmpty()) {
            return Collections.emptyList();
        }

        // Filter availabilities to meet or exceed the required capacity
        return availabilities.stream()
                .filter(avail -> avail.getPersonsCapacity() >= people)
                .toList();
    }

    /**
     * Generate time slots for a given activity based on its open and close times and duration.
     */
    public List<Map<String, Object>> generateTimeSlots(Availability availability) {
        Activity activity = availability.getActivity();
        LocalTime openTime = availability.getOpenTime();
        LocalTime closeTime = availability.getCloseTime();

        // Determine the activity's duration
        Duration activityDuration = Duration.ofDays(activity.getDurationDays())
                .plusHours(activity.getDurationHours())
                .plusMinutes(activity.getDurationMinutes());

        List<Map<String, Object>> timeSlots = new ArrayList<>();
        LocalTime currentStart = openTime;

        while (currentStart.plus(activityDuration).isBefore(closeTime) ||
                currentStart.plus(activityDuration).equals(closeTime)) {
            LocalTime endTime = currentStart.plus(activityDuration);

            Map<String, Object> timeSlot = new HashMap<>();
            timeSlot.put("start", currentStart);
            timeSlot.put("end", endTime);
            timeSlots.add(timeSlot);

            // Move to the next slot
            currentStart = endTime;
        }

        return timeSlots;
    }

    public List<Map<String, List<Object>>> findAvailableActivitiesWithSlots(LocalDate date, int people) {
        // Get suitable availabilities for the given date and people count
        List<Availability> suitableAvailabilities = findSuitableAvailabilities(date, people);
        if (suitableAvailabilities.isEmpty()) {
            return Collections.emptyList();
        }

        // List of maps where each map holds an activityId key with a list of time slot objects
        List<Map<String, List<Object>>> results = new ArrayList<>();

        // Iterate over each suitable availability
        for (Availability availability : suitableAvailabilities) {
            // Generate time slots for this availability
            List<Map<String, Object>> timeSlots = generateTimeSlots(availability);

            // Create a map with the activityId key and the timeSlots list as the value
            Map<String, List<Object>> result = new HashMap<>();
            result.put(String.valueOf(availability.getActivity().getId()), new ArrayList<>(timeSlots));

            // Add this map to the results list
            results.add(result);
        }

        return results;
    }
}
