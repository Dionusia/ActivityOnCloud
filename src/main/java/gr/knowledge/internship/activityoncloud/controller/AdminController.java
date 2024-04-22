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

import gr.knowledge.internship.activityoncloud.dto.AdminDTO;
import gr.knowledge.internship.activityoncloud.service.AdminService;

@RestController
@RequestMapping(value = "/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;

	@GetMapping
	public List<AdminDTO> getAllAdmins() {
		return adminService.getAllAdmins();
	}

	@GetMapping("/{id}")
	public AdminDTO getAdminById(@PathVariable Long id) {
		return adminService.getAdminById(id);
	}

	@PostMapping("/save")
	public AdminDTO saveAdmin(@RequestBody AdminDTO admin) {
		return adminService.saveAdmin(admin);
	}

	@PutMapping("/update")
	public AdminDTO updateAdmin(@RequestBody AdminDTO admin) {
		return adminService.updateAdmin(admin);
	}

	@DeleteMapping("/delete")
	public void deleteAdmin(@RequestBody AdminDTO admin) {
		adminService.deleteAdmin(admin);
	}
}
