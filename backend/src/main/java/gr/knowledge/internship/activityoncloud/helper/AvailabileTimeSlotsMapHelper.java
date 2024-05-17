package gr.knowledge.internship.activityoncloud.helper;

import gr.knowledge.internship.activityoncloud.dto.AvailabilityInfoDTO;
import gr.knowledge.internship.activityoncloud.dto.TimeSlotDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AvailabileTimeSlotsMapHelper {
    private Long optionId;
    private AvailabilityInfoDTO availabilityInfoList;
}
