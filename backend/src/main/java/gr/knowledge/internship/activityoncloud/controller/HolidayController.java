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

import gr.knowledge.internship.activityoncloud.dto.HolidayDTO;
import gr.knowledge.internship.activityoncloud.service.HolidayService;

@RestController
@RequestMapping(value = "/holiday")
public class HolidayController {
	@Autowired
	private HolidayService holidayService;

	@GetMapping
	public List<HolidayDTO> getAllHolidays() {
		return holidayService.getAllHolidays();
	}

	@GetMapping("/{id}")
	public HolidayDTO getHolidayById(@PathVariable Long id) {
		return holidayService.getHolidayById(id);
	}

	@PostMapping("/save")
	public HolidayDTO saveHoliday(@RequestBody HolidayDTO holiday) {
		return holidayService.saveHoliday(holiday);
	}

	@PutMapping("/update")
	public HolidayDTO updateHoliday(@RequestBody HolidayDTO holiday) {
		return holidayService.updateHoliday(holiday);
	}

	@DeleteMapping("/delete")
	public void deleteHoliday(@RequestBody HolidayDTO holiday) {
		holidayService.deleteHoliday(holiday);
	}
}
