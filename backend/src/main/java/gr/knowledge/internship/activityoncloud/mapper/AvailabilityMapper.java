package gr.knowledge.internship.activityoncloud.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gr.knowledge.internship.activityoncloud.dto.AvailabilityDTO;
import gr.knowledge.internship.activityoncloud.entity.Availability;

@Component
public class AvailabilityMapper {

    @Autowired
    private ModelMapper modelMapper;

    public Availability toEntity(AvailabilityDTO availabilityDTO) {
        return modelMapper.map(availabilityDTO, Availability.class);
    }

    public AvailabilityDTO toDTO(Availability availability) {
        return modelMapper.map(availability, AvailabilityDTO.class);
    }

    public List<Availability> toEntityList(List<AvailabilityDTO> availabilityDTOList) {
        List<Availability> availabilityList = new ArrayList<>();
        for (AvailabilityDTO availabilityDTO : availabilityDTOList) {
            Availability availabilityToAdd = modelMapper.map(availabilityDTO, Availability.class);
            availabilityList.add(availabilityToAdd);
        }
        return availabilityList;
    }

    public List<AvailabilityDTO> toDTOList(List<Availability> availabilityList) {
        List<AvailabilityDTO> availabilityDTOList = new ArrayList<>();
        for (Availability availability : availabilityList) {
            AvailabilityDTO availabilityDTOToAdd = modelMapper.map(availability, AvailabilityDTO.class);
            availabilityDTOList.add(availabilityDTOToAdd);
        }
        return availabilityDTOList;
    }
}

