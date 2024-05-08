package gr.knowledge.internship.activityoncloud.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.entity.Availability;
import gr.knowledge.internship.activityoncloud.mapper.AvailabilityMapper;
import gr.knowledge.internship.activityoncloud.repository.AvailabilityRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class AvailabilityService {
	@Autowired
	private AvailabilityRepository availabilityRepository;
	@Autowired
	private AvailabilityMapper availabilityMapper;

	public void deleteAvailability(AvailabilityDTO availabilityDTO) {
		Availability availability = availabilityMapper.toEntity(availabilityDTO);
		availabilityRepository.delete(availability);
	}

	@Transactional(readOnly = true)
	public List<AvailabilityDTO> getAllAvailabilities() {
		List<Availability> allAvailabilities = availabilityRepository.findAll();
		return availabilityMapper.toDTOList(allAvailabilities);
	}

	@Transactional(readOnly = true)
	public AvailabilityDTO getAvailabilityById(Long id) {
		Availability availability = availabilityRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return availabilityMapper.toDTO(availability);
	}

	public AvailabilityDTO saveAvailability(AvailabilityDTO availabilityDTO) {
		Availability availability = availabilityMapper.toEntity(availabilityDTO);
		availabilityRepository.save(availability);
		return availabilityMapper.toDTO(availability);
	}

	public AvailabilityDTO updateAvailability(AvailabilityDTO availabilityDTO) {
		Availability availability = this.existsInDatabase(availabilityDTO);
		availability = availabilityMapper.toEntity(availabilityDTO);
		availabilityRepository.save(availability);
		return availabilityDTO;
	}

	private Availability existsInDatabase(AvailabilityDTO availabilityDTO) {
		Availability availabilityInDatabase = availabilityRepository.findById(availabilityDTO.getId())
				.orElseThrow(EntityNotFoundException::new);
		return availabilityInDatabase;
	}
}