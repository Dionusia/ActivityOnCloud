package gr.knowledge.internship.activityoncloud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import gr.knowledge.internship.activityoncloud.dto.ActivityOptionDTO;
import gr.knowledge.internship.activityoncloud.service.ActivityOptionService;

@RestController
@RequestMapping("/activity-option")
public class ActivityOptionController {

    @Autowired
    private ActivityOptionService activityOptionService;

    @GetMapping
    public List<ActivityOptionDTO> getAllActivityOptions() {
        return activityOptionService.getAllActivityOptions();
    }

    @GetMapping("/{id}")
    public ActivityOptionDTO getActivityOptionById(@PathVariable Long id) {
        return activityOptionService.getActivityOptionById(id);
    }

    @PostMapping("/save")
    public ActivityOptionDTO saveActivityOption(@RequestBody ActivityOptionDTO activityOptionDTO) {
        return activityOptionService.saveActivityOption(activityOptionDTO);
    }

    @PutMapping("/update")
    public ActivityOptionDTO updateActivityOption(@RequestBody ActivityOptionDTO activityOptionDTO) {
        return activityOptionService.updateActivityOption(activityOptionDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteActivityOption(@PathVariable Long id) {
        activityOptionService.deleteActivityOptionById(id);
    }
}
