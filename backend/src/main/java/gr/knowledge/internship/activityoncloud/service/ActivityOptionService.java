package gr.knowledge.internship.activityoncloud.service;

import java.util.List;

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
        // Validate and log duration from DTO
        if (dto.getDuration() == null) {
            throw new IllegalArgumentException("DTO duration is null.");
        }

        System.out.println("DTO duration: " + dto.getDuration());

        ActivityOption entity = activityOptionMapper.toEntity(dto);

        // Check and log duration from entity
        if (entity.getDuration() == null) {
            throw new IllegalArgumentException("Entity duration is null.");
        }

        System.out.println("Entity duration: " + entity.getDuration());

        activityOptionRepository.save(entity);

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
