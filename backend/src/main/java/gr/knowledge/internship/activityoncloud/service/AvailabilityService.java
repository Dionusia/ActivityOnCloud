package gr.knowledge.internship.activityoncloud.service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import gr.knowledge.internship.activityoncloud.dto.ActivityDTO;
import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.entity.Activity;
import gr.knowledge.internship.activityoncloud.entity.Availability;
import gr.knowledge.internship.activityoncloud.mapper.ActivityMapper;
import gr.knowledge.internship.activityoncloud.mapper.AvailabilityMapper;
import gr.knowledge.internship.activityoncloud.repository.ActivityRepository;
import gr.knowledge.internship.activityoncloud.repository.AvailabilityRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Log4j2
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

    public List<Map<String, Object>> findAvailableActivitiesWithSlots(LocalDate date, int people) {
        //convert the day of the week to a proper format
        String dayOfWeekName = date.getDayOfWeek().name();
        String day = dayOfWeekName.charAt(0) + dayOfWeekName.substring(1).toLowerCase();

        //retrieve all availabilities for the specified day of the week
        List<Availability> availabilities = availabilityRepository.findByDayOfWeek(day);
        if (availabilities.isEmpty()) {
            return Collections.emptyList();
        }

        //filter the availabilities based on the people
        List<Availability> suitableAvailabilities = availabilities.stream()
                .filter(avail -> avail.getPersonsCapacity() >= people)
                .toList();

        if (suitableAvailabilities.isEmpty()) {
            return Collections.emptyList();
        }

        //create a list of maps containing activity ID and its time slots
        List<Map<String, Object>> results = new ArrayList<>();

        for (Availability availability : suitableAvailabilities) {
            Activity activity = availability.getActivity();
            LocalTime openTime = availability.getOpenTime();
            LocalTime closeTime = availability.getCloseTime();

            //determine the activity duration
            Duration activityDuration = Duration.ofDays(activity.getDurationDays())
                    .plusHours(activity.getDurationHours())
                    .plusMinutes(activity.getDurationMinutes());

            List<Map<String, LocalTime>> timeSlots = new ArrayList<>();
            LocalTime currentStart = openTime;

            while (currentStart.plus(activityDuration).isBefore(closeTime) ||
                    currentStart.plus(activityDuration).equals(closeTime)) {
                LocalTime endTime = currentStart.plus(activityDuration);

                Map<String, LocalTime> timeSlot = new HashMap<>();
                timeSlot.put("start", currentStart);
                timeSlot.put("end", endTime);
                timeSlots.add(timeSlot);

                currentStart = endTime; //move to the next slot
            }

            Map<String, Object> result = new HashMap<>();
            result.put("activityId", activity.getId());
            result.put("timeSlots", timeSlots);
            results.add(result);
        }

        return results;
    }
}
