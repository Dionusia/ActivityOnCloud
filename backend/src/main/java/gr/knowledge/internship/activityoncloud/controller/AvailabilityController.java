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
import gr.knowledge.internship.activityoncloud.dto.AvailabilityInfoDTO;
import gr.knowledge.internship.activityoncloud.service.AvailabilityService;
import lombok.extern.log4j.Log4j2;

@Log4j2
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

	@GetMapping("/available/{activityId}")
	public Map<Long, AvailabilityInfoDTO> getAvailableOptionsWithSlots(@RequestParam("date") LocalDate date,
			@PathVariable Long activityId) {
		return availabilityService.findAvailableOptionsWithSlots(date, activityId);
	}
}
