package gr.knowledge.internship.activityoncloud.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gr.knowledge.internship.activityoncloud.dto.AdminDTO;
import gr.knowledge.internship.activityoncloud.entity.Admin;

@Component
public class AdminMapper {
	@Autowired
	private ModelMapper modelMapper;

	public Admin toEntity(AdminDTO adminDTO) {
		return modelMapper.map(adminDTO, Admin.class);
	}

	public AdminDTO toDTO(Admin admin) {
		return modelMapper.map(admin, AdminDTO.class);
	}

	public List<Admin> toEntityList(List<AdminDTO> adminDTOList) {
		List<Admin> adminList = new ArrayList<>();
		for (AdminDTO adminDTO : adminDTOList) {
			Admin adminToAdd = modelMapper.map(adminDTO, Admin.class);
			adminList.add(adminToAdd);
		}
		return adminList;
	}

	public List<AdminDTO> toDTOList(List<Admin> adminList) {
		List<AdminDTO> adminDTOList = new ArrayList<>();
		for (Admin admin : adminList) {
			AdminDTO adminDTOToAdd = modelMapper.map(admin, AdminDTO.class);
			adminDTOList.add(adminDTOToAdd);
		}
		return adminDTOList;
	}
}
