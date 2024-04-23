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

import gr.knowledge.internship.activityoncloud.dto.ActivityAdminDTO;
import gr.knowledge.internship.activityoncloud.service.ActivityAdminService;

@RestController
@RequestMapping(value = "/activity-admin")
public class ActivityAdminController {
	@Autowired
	private ActivityAdminService activityAdminService;

	@GetMapping
	public List<ActivityAdminDTO> getAllActivityAdmins() {
		return activityAdminService.getAllActivityAdmins();
	}

	@GetMapping("/{id}")
	public ActivityAdminDTO getActivityAdminById(@PathVariable Long id) {
		return activityAdminService.getActivityAdminById(id);
	}

	@PostMapping("/save")
	public ActivityAdminDTO saveActivityAdmin(@RequestBody ActivityAdminDTO activityAdmin) {
		return activityAdminService.saveActivityAdmin(activityAdmin);
	}

	@PutMapping("/update")
	public ActivityAdminDTO updateActivityAdmin(@RequestBody ActivityAdminDTO activityAdmin) {
		return activityAdminService.updateAdmin(activityAdmin);
	}

	@DeleteMapping("/delete")
	public void deleteActivityAdmin(@RequestBody ActivityAdminDTO activityAdmin) {
		activityAdminService.deleteAdmin(activityAdmin);
	}
}
