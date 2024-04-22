package gr.knowledge.internship.activityoncloud.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gr.knowledge.internship.activityoncloud.dto.ActivityDTO;
import gr.knowledge.internship.activityoncloud.entity.Activity;

@Component
public class ActivityMapper {
	@Autowired
	private ModelMapper modelMapper;

	public Activity toEntity(ActivityDTO activityDTO) {
		return modelMapper.map(activityDTO, Activity.class);
	}

	public ActivityDTO toDTO(Activity activity) {
		return modelMapper.map(activity, ActivityDTO.class);
	}

	public List<Activity> toEntityList(List<ActivityDTO> activityDTOList) {
		List<Activity> activityList = new ArrayList<>();
		for (ActivityDTO activityDTO : activityDTOList) {
			Activity activityToAdd = modelMapper.map(activityDTO, Activity.class);
			activityList.add(activityToAdd);
		}
		return activityList;
	}

	public List<ActivityDTO> toDTOList(List<Activity> activityList) {
		List<ActivityDTO> activityDTOList = new ArrayList<>();
		for (Activity activity : activityList) {
			ActivityDTO activityDTOToAdd = modelMapper.map(activity, ActivityDTO.class);
			activityDTOList.add(activityDTOToAdd);
		}
		return activityDTOList;
	}
}
