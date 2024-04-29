package gr.knowledge.internship.activityoncloud.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.dto.TimeSlotDTO;
import gr.knowledge.internship.activityoncloud.service.AvailabilityService;

@RestController
@RequestMapping(value = "/availability")
public class AvailabilityController {

	@Autowired
	private AvailabilityService availabilityService;

	@GetMapping
	public List<AvailabilityDTO> getAllAvailability() {
		return availabilityService.getAllAvailabilities();
	}

	@GetMapping("/{id}")
	public AvailabilityDTO getAvailabilityById(@PathVariable Long id) {
		return availabilityService.getAvailabilityById(id);
	}

	@PostMapping("/save")
	public AvailabilityDTO saveAvailability(@RequestBody AvailabilityDTO availability) {
		return availabilityService.saveAvailability(availability);
	}

	@PutMapping("/update")
	public AvailabilityDTO updateAvailability(@RequestBody AvailabilityDTO availability) {
		return availabilityService.updateAvailability(availability);
	}

	@DeleteMapping("/delete")
	public void deleteAvailability(@RequestBody AvailabilityDTO availability) {
		availabilityService.deleteAvailability(availability);
	}

	@GetMapping("/available")
	public Map<String, List<TimeSlotDTO>> getAvailableActivitiesWithSlots(@RequestParam("date") LocalDate date,
			@RequestParam("people") int people) {
		return availabilityService.findAvailableActivitiesWithSlots(date, people);
	}
}
