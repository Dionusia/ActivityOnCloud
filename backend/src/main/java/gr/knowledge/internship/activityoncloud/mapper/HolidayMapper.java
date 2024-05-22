package gr.knowledge.internship.activityoncloud.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gr.knowledge.internship.activityoncloud.dto.HolidayDTO;
import gr.knowledge.internship.activityoncloud.entity.Holiday;

@Component
public class HolidayMapper {
	@Autowired
	private ModelMapper modelMapper;

	public Holiday toEntity(HolidayDTO holidayDTO) {
		return modelMapper.map(holidayDTO, Holiday.class);
	}

	public HolidayDTO toDTO(Holiday holiday) {
		return modelMapper.map(holiday, HolidayDTO.class);
	}

	public List<Holiday> toEntityList(List<HolidayDTO> holidayDTOList) {
		List<Holiday> holidayList = new ArrayList<>();
		for (HolidayDTO holidayDTO : holidayDTOList) {
			Holiday holidayToAdd = modelMapper.map(holidayDTO, Holiday.class);
			holidayList.add(holidayToAdd);
		}
		return holidayList;
	}

	public List<HolidayDTO> toDTOList(List<Holiday> holidayList) {
		List<HolidayDTO> holidayDTOList = new ArrayList<>();
		for (Holiday holiday : holidayList) {
			HolidayDTO holidayDTOToAdd = modelMapper.map(holiday, HolidayDTO.class);
			holidayDTOList.add(holidayDTOToAdd);
		}
		return holidayDTOList;
	}
}
