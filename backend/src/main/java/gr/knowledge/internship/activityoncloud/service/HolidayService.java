package gr.knowledge.internship.activityoncloud.service;

import java.time.LocalDate;
import java.util.List;
import java.util.function.BiPredicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.HolidayDTO;
import gr.knowledge.internship.activityoncloud.entity.Holiday;
import gr.knowledge.internship.activityoncloud.mapper.HolidayMapper;
import gr.knowledge.internship.activityoncloud.repository.HolidayRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class HolidayService {
	@Autowired
	private HolidayRepository holidayRepository;
	@Autowired
	private HolidayMapper holidayMapper;
	private static BiPredicate<Holiday, Long> holidayActivityIdEqualsLong = (h, i) -> h.getOption().getActivity()
			.getId().equals(i);

	@Transactional(readOnly = true)
	public HolidayDTO getHolidayById(Long id) {
		Holiday holiday = holidayRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return holidayMapper.toDTO(holiday);
	}

	@Transactional(readOnly = true)
	public List<HolidayDTO> getAllHolidays() {
		List<Holiday> allHolidays = holidayRepository.findAll();
		return holidayMapper.toDTOList(allHolidays);
	}

	public HolidayDTO saveHoliday(HolidayDTO holidayDTO) {
		Holiday holiday = holidayMapper.toEntity(holidayDTO);
		holidayRepository.save(holiday);
		return holidayMapper.toDTO(holiday);
	}

	public HolidayDTO updateHoliday(HolidayDTO holidayDTO) {
		Holiday holiday = this.existsInDatabase(holidayDTO);
		holiday = holidayMapper.toEntity(holidayDTO);
		holidayRepository.save(holiday);
		return holidayDTO;
	}

	public void deleteHoliday(HolidayDTO holidayDTO) {
		Holiday holiday = holidayMapper.toEntity(holidayDTO);
		holidayRepository.delete(holiday);
	}

	private Holiday existsInDatabase(HolidayDTO holidayDTO) {
		Holiday holidayInDatabase = holidayRepository.findById(holidayDTO.getId())
				.orElseThrow(EntityNotFoundException::new);
		return holidayInDatabase;
	}

	@Transactional(readOnly = true)
	public boolean isDateHolidayForActivityId(LocalDate date, long activityId) {
		List<Holiday> holidaysForActivityId = holidayRepository.getByDate(date);
		return holidaysForActivityId.stream().anyMatch(h -> holidayActivityIdEqualsLong.test(h, activityId));
	}
}