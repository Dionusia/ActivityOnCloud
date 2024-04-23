package gr.knowledge.internship.activityoncloud.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import gr.knowledge.internship.activityoncloud.entity.Activity;
import gr.knowledge.internship.activityoncloud.service.AvailabilityService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import gr.knowledge.internship.activityoncloud.dto.ActivityDTO;
import gr.knowledge.internship.activityoncloud.service.ActivityService;

@RestController
@RequestMapping(value = "/activity")
@Log4j2
public class ActivityController {
	@Autowired
	private ActivityService activityService;

	@Autowired
	private AvailabilityService availabilityService;

	@GetMapping
	public List<ActivityDTO> getAllActivities() {
		return activityService.getAllActivities();
	}

	@GetMapping("/{id}")
	public ActivityDTO getActivityById(@PathVariable Long id) {
		return activityService.getActivityById(id);
	}

	@PostMapping("/save")
	public ActivityDTO saveActivity(@RequestBody ActivityDTO activity) {
		return activityService.saveActivity(activity);
	}

	@PutMapping("/update")
	public ActivityDTO updateActivity(@RequestBody ActivityDTO activity) {
		return activityService.updateActivity(activity);
	}

	@DeleteMapping("/delete")
	public void deleteActivity(@RequestBody ActivityDTO activity) {
		activityService.deleteActivity(activity);
	}

	@GetMapping("/available")
	public ResponseEntity<?> getAvailableActivitiesWithSlots(
			@RequestParam("date") LocalDate date,
			@RequestParam("people") int people
	) {
		log.info("Received request for available activities on date: {}, with people count: {}", date, people);

		List<Map<String, Object>> availableActivitiesWithSlots = availabilityService.findAvailableActivitiesWithSlots(date, people);

		if (availableActivitiesWithSlots.isEmpty()) {
			log.warn("No available activities or time slots found for date: {} and people count: {}", date, people);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No available activities or time slots found for the given date and people count.");
		}

		log.info("Found {} activities with time slots for date: {} and people count: {}", availableActivitiesWithSlots.size(), date, people);
		return ResponseEntity.ok(availableActivitiesWithSlots);
	}
}

