package gr.knowledge.internship.activityoncloud.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.service.AvailabilityService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/availability")
@Log4j2
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
    public List<Map<String, List<Object>>> getAvailableActivitiesWithSlots(
            @RequestParam("date") LocalDate date,
            @RequestParam("people") int people
    ) {
        return availabilityService.findAvailableActivitiesWithSlots(date, people);
    }
}
