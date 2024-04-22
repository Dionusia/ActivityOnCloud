package gr.knowledge.internship.activityoncloud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.service.AvailabilityService;

import java.util.List;

@RestController
@RequestMapping("/availability")
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
}
