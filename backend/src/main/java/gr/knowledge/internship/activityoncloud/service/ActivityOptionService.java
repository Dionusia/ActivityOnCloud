package gr.knowledge.internship.activityoncloud.service;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.ActivityOptionDTO;
import gr.knowledge.internship.activityoncloud.entity.ActivityOption;
import gr.knowledge.internship.activityoncloud.mapper.ActivityOptionMapper;
import gr.knowledge.internship.activityoncloud.repository.ActivityOptionRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
@Log4j2
public class ActivityOptionService {
    @Autowired
    private ActivityOptionRepository activityOptionRepository;

    @Autowired
    private ActivityOptionMapper activityOptionMapper;

    @Transactional(readOnly = true)
    public ActivityOptionDTO getActivityOptionById(Long id) {
        ActivityOption activityOption = activityOptionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ActivityOption not found with id: " + id));
        return activityOptionMapper.toDTO(activityOption);
    }

    @Transactional(readOnly = true)
    public List<ActivityOptionDTO> getAllActivityOptions() {
        List<ActivityOption> allOptions = activityOptionRepository.findAll();
        return activityOptionMapper.toDTOList(allOptions);
    }
    public ActivityOptionDTO saveActivityOption(ActivityOptionDTO dto) {
        log.debug(dto.getDuration());
        // Convert DTO to entity
        ActivityOption entity = activityOptionMapper.toEntity(dto);
        // Save the entity to the repository
        activityOptionRepository.save(entity);
        // Convert the saved entity back to DTO and return
        return activityOptionMapper.toDTO(entity);
    }

    public ActivityOptionDTO updateActivityOption(ActivityOptionDTO activityOptionDTO) {
        ActivityOption activityOption = this.existsInDatabase(activityOptionDTO);
        activityOption = activityOptionMapper.toEntity(activityOptionDTO);
        activityOptionRepository.save(activityOption);
        return activityOptionDTO;
    }

    public void deleteActivityOptionById(Long id) {
        if (!activityOptionRepository.existsById(id)) {
            throw new EntityNotFoundException("ActivityOption not found with id: " + id);
        }
        activityOptionRepository.deleteById(id);
    }

    private ActivityOption existsInDatabase(ActivityOptionDTO activityOptionDTO) {
        ActivityOption activityInDatabase = activityOptionRepository.findById(activityOptionDTO.getId())
                .orElseThrow(EntityNotFoundException::new);
        return activityInDatabase;
    }
}
