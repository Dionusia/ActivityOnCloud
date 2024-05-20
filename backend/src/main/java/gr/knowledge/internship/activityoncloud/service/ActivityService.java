package gr.knowledge.internship.activityoncloud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.ActivityDTO;
import gr.knowledge.internship.activityoncloud.entity.Activity;
import gr.knowledge.internship.activityoncloud.mapper.ActivityMapper;
import gr.knowledge.internship.activityoncloud.repository.ActivityRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class ActivityService {
	@Autowired
	private ActivityRepository activityRepository;
	@Autowired
	private ActivityMapper activityMapper;

	@Transactional(readOnly = true)
	public ActivityDTO getActivityById(Long id) {
		Activity activity = activityRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return activityMapper.toDTO(activity);
	}

	@Transactional(readOnly = true)
	public List<ActivityDTO> getAllActivities() {
		List<Activity> allActivities = activityRepository.findAll();
		return activityMapper.toDTOList(allActivities);
	}

	public ActivityDTO saveActivity(ActivityDTO activityDTO) {
		Activity activity = activityMapper.toEntity(activityDTO);
		return activityMapper.toDTO(activityRepository.save(activity));
	}

	public ActivityDTO updateActivity(ActivityDTO activityDTO) {
		Activity activity = this.existsInDatabase(activityDTO);
		activity = activityMapper.toEntity(activityDTO);
		activityRepository.save(activity);
		return activityDTO;
	}

	public void deleteActivity(ActivityDTO activityDTO) {
		Activity activity = activityMapper.toEntity(activityDTO);
		activityRepository.delete(activity);
	}

	private Activity existsInDatabase(ActivityDTO activityDTO) {
		Activity activityInDatabase = activityRepository.findById(activityDTO.getId())
				.orElseThrow(EntityNotFoundException::new);
		return activityInDatabase;
	}

}
