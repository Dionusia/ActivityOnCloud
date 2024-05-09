package gr.knowledge.internship.activityoncloud.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gr.knowledge.internship.activityoncloud.dto.RateDTO;
import gr.knowledge.internship.activityoncloud.entity.Rate;

@Component
public class RateMapper {
	@Autowired
	private ModelMapper modelMapper;

	public Rate toEntity(RateDTO rateDTO) {
		return modelMapper.map(rateDTO, Rate.class);
	}

	public RateDTO toDTO(Rate rate) {
		return modelMapper.map(rate, RateDTO.class);
	}

	public List<Rate> toEntityList(List<RateDTO> rateDTOList) {
		List<Rate> rateList = new ArrayList<>();
		for (RateDTO rateDTO : rateDTOList) {
			Rate rateToAdd = modelMapper.map(rateDTO, Rate.class);
			rateList.add(rateToAdd);
		}
		return rateList;
	}

	public List<RateDTO> toDTOList(List<Rate> rateList) {
		List<RateDTO> rateDTOList = new ArrayList<>();
		for (Rate rate : rateList) {
			RateDTO rateDTOToAdd = modelMapper.map(rate, RateDTO.class);
			rateDTOList.add(rateDTOToAdd);
		}
		return rateDTOList;
	}
}
