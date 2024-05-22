package gr.knowledge.internship.activityoncloud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.RateDTO;
import gr.knowledge.internship.activityoncloud.entity.Rate;
import gr.knowledge.internship.activityoncloud.mapper.RateMapper;
import gr.knowledge.internship.activityoncloud.repository.RateRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class RateService {
	@Autowired
	private RateRepository rateRepository;
	@Autowired
	private RateMapper rateMapper;

	@Transactional(readOnly = true)
	public RateDTO getRateById(Long id) {
		Rate rate = rateRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return rateMapper.toDTO(rate);
	}

	@Transactional(readOnly = true)
	public List<RateDTO> getAllRates() {
		List<Rate> allRates = rateRepository.findAll();
		return rateMapper.toDTOList(allRates);
	}

	public RateDTO saveRate(RateDTO rateDTO) {
		Rate rate = rateMapper.toEntity(rateDTO);
		rateRepository.save(rate);
		return rateMapper.toDTO(rate);
	}

	public RateDTO updateRate(RateDTO rateDTO) {
		Rate rate = this.existsInDatabase(rateDTO);
		rate = rateMapper.toEntity(rateDTO);
		rateRepository.save(rate);
		return rateDTO;
	}

	public void deleteRate(RateDTO rateDTO) {
		Rate rate = rateMapper.toEntity(rateDTO);
		rateRepository.delete(rate);
	}

	private Rate existsInDatabase(RateDTO rateDTO) {
		Rate rateInDatabase = rateRepository.findById(rateDTO.getId()).orElseThrow(EntityNotFoundException::new);
		return rateInDatabase;
	}

	public List<RateDTO> getRatesByOptionId(Long optionId) {
		return rateMapper.toDTOList(rateRepository.getByOptionId(optionId));
	}
}