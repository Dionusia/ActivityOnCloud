package gr.knowledge.internship.activityoncloud.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gr.knowledge.internship.activityoncloud.dto.ActivityAdminDTO;
import gr.knowledge.internship.activityoncloud.entity.ActivityAdmin;

@Component
public class ActivityAdminMapper {
	@Autowired
	private ModelMapper modelMapper;

	public ActivityAdmin toEntity(ActivityAdminDTO activityAdminDTO) {
		return modelMapper.map(activityAdminDTO, ActivityAdmin.class);
	}

	public ActivityAdminDTO toDTO(ActivityAdmin activityAdmin) {
		return modelMapper.map(activityAdmin, ActivityAdminDTO.class);
	}

	public List<ActivityAdmin> toEntityList(List<ActivityAdminDTO> activityAdminDTOList) {
		List<ActivityAdmin> activityAdminList = new ArrayList<>();
		for (ActivityAdminDTO activityAdminDTO : activityAdminDTOList) {
			ActivityAdmin activityAdminToAdd = modelMapper.map(activityAdminDTO, ActivityAdmin.class);
			activityAdminList.add(activityAdminToAdd);
		}
		return activityAdminList;
	}

	public List<ActivityAdminDTO> toDTOList(List<ActivityAdmin> actityAdminList) {
		List<ActivityAdminDTO> activityAdminDTOList = new ArrayList<>();
		for (ActivityAdmin activityAdmin : actityAdminList) {
			ActivityAdminDTO activityAdminDTOToAdd = modelMapper.map(activityAdmin, ActivityAdminDTO.class);
			activityAdminDTOList.add(activityAdminDTOToAdd);
		}
		return activityAdminDTOList;
	}
}
