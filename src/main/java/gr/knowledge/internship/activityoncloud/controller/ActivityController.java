package gr.knowledge.internship.activityoncloud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gr.knowledge.internship.activityoncloud.dto.ActivityDTO;
import gr.knowledge.internship.activityoncloud.service.ActivityService;

@RestController
@RequestMapping(value = "/activity")
public class ActivityController {
	@Autowired
	private ActivityService activityService;

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
}
