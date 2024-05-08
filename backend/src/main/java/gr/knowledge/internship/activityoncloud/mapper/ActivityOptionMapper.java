package gr.knowledge.internship.activityoncloud.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

import gr.knowledge.internship.activityoncloud.dto.ActivityOptionDTO;
import gr.knowledge.internship.activityoncloud.entity.ActivityOption;

@Component
public class ActivityOptionMapper {

    @Autowired
    private ModelMapper modelMapper;

    public ActivityOption toEntity(ActivityOptionDTO dto) {
        return modelMapper.map(dto, ActivityOption.class);
    }

    public ActivityOptionDTO toDTO(ActivityOption entity) {
        return modelMapper.map(entity, ActivityOptionDTO.class);
    }

    public List<ActivityOption> toEntityList(List<ActivityOptionDTO> dtoList) {
        List<ActivityOption> entityList = new ArrayList<>();
        for (ActivityOptionDTO dto : dtoList) {
            entityList.add(modelMapper.map(dto, ActivityOption.class));
        }
        return entityList;
    }

    public List<ActivityOptionDTO> toDTOList(List<ActivityOption> entityList) {
        List<ActivityOptionDTO> dtoList = new ArrayList<>();
        for (ActivityOption entity : entityList) {
            dtoList.add(modelMapper.map(entity, ActivityOptionDTO.class));
        }
        return dtoList;
    }
}
