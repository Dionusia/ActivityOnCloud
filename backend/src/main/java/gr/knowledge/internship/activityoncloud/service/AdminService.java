package gr.knowledge.internship.activityoncloud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.AdminDTO;
import gr.knowledge.internship.activityoncloud.entity.Admin;
import gr.knowledge.internship.activityoncloud.mapper.AdminMapper;
import gr.knowledge.internship.activityoncloud.repository.AdminRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private AdminMapper adminMapper;

	@Transactional(readOnly = true)
	public AdminDTO getAdminById(Long id) {
		Admin admin = adminRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return adminMapper.toDTO(admin);
	}

	@Transactional(readOnly = true)
	public List<AdminDTO> getAllAdmins() {
		List<Admin> allAdmins = adminRepository.findAll();
		return adminMapper.toDTOList(allAdmins);
	}

	public AdminDTO saveAdmin(AdminDTO adminDTO) {
		Admin admin = adminMapper.toEntity(adminDTO);
		adminRepository.save(admin);
		return adminMapper.toDTO(admin);
	}

	public AdminDTO updateAdmin(AdminDTO adminDTO) {
		Admin admin = this.existsInDatabase(adminDTO);
		admin = adminMapper.toEntity(adminDTO);
		adminRepository.save(admin);
		return adminDTO;
	}

	public void deleteAdmin(AdminDTO adminDTO) {
		Admin admin = adminMapper.toEntity(adminDTO);
		adminRepository.delete(admin);
	}

	private Admin existsInDatabase(AdminDTO adminDTO) {
		Admin adminInDatabase = adminRepository.findById(adminDTO.getId())
				.orElseThrow(EntityNotFoundException::new);
		return adminInDatabase;
	}
}