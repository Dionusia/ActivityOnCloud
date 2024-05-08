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

import gr.knowledge.internship.activityoncloud.dto.RateDTO;
import gr.knowledge.internship.activityoncloud.service.RateService;

@RestController
@RequestMapping(value = "/rate")
public class RateController {
	@Autowired
	private RateService rateService;

	@GetMapping
	public List<RateDTO> getAllRates() {
		return rateService.getAllRates();
	}

	@GetMapping("/{id}")
	public RateDTO getRateById(@PathVariable Long id) {
		return rateService.getRateById(id);
	}

	@GetMapping("/of-admin/{id}")
	public List<RateDTO> getRatesOfAdmin(@PathVariable Long id) {
		return rateService.getRatesOfAdmin(id);
	}

	@GetMapping("/of-activity/{id}")
	public List<RateDTO> getRatesOfActivity(@PathVariable Long id) {
		return rateService.getRatesOfActivity(id);
	}

	@PostMapping("/save")
	public RateDTO saveRate(@RequestBody RateDTO rate) {
		return rateService.saveRate(rate);
	}

	@PutMapping("/update")
	public RateDTO updateRate(@RequestBody RateDTO rate) {
		return rateService.updateRate(rate);
	}

	@DeleteMapping("/delete")
	public void deleteRate(@RequestBody RateDTO rate) {
		rateService.deleteRate(rate);
	}
}
