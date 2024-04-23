package gr.knowledge.internship.activityoncloud.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.ActivityAdminDTO;
import gr.knowledge.internship.activityoncloud.entity.ActivityAdmin;
import gr.knowledge.internship.activityoncloud.mapper.ActivityAdminMapper;
import gr.knowledge.internship.activityoncloud.repository.ActivityAdminRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class ActivityAdminService {
	@Autowired
	private ActivityAdminRepository activityAdminRepository;
	@Autowired
	private ActivityAdminMapper activityAdminMapper;

	@Transactional(readOnly = true)
	public ActivityAdminDTO getActivityAdminById(Long id) {
		ActivityAdmin activityAdmin = activityAdminRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return activityAdminMapper.toDTO(activityAdmin);
	}

	@Transactional(readOnly = true)
	public List<ActivityAdminDTO> getAllActivityAdmins() {
		List<ActivityAdmin> allActivityAdmins = activityAdminRepository.findAll();
		return activityAdminMapper.toDTOList(allActivityAdmins);
	}

	public ActivityAdminDTO saveActivityAdmin(ActivityAdminDTO activityAdminDTO) {
		ActivityAdmin activityAdmin = activityAdminMapper.toEntity(activityAdminDTO);
		activityAdminRepository.save(activityAdmin);
		return activityAdminMapper.toDTO(activityAdmin);
	}

	public ActivityAdminDTO updateAdmin(ActivityAdminDTO activityAdminDTO) {
		ActivityAdmin activityAdmin = this.existsInDatabase(activityAdminDTO);
		activityAdmin = activityAdminMapper.toEntity(activityAdminDTO);
		activityAdminRepository.save(activityAdmin);
		return activityAdminDTO;
	}

	public void deleteAdmin(ActivityAdminDTO activityAdminDTO) {
		ActivityAdmin activityAdmin = activityAdminMapper.toEntity(activityAdminDTO);
		activityAdminRepository.delete(activityAdmin);
	}

	private ActivityAdmin existsInDatabase(ActivityAdminDTO activityAdminDTO) {
		ActivityAdmin activityAdminInDatabase = activityAdminRepository.findById(activityAdminDTO.getId())
				.orElseThrow(EntityNotFoundException::new);
		return activityAdminInDatabase;
	}
}