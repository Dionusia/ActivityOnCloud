package gr.knowledge.internship.activityoncloud.helper;

import gr.knowledge.internship.activityoncloud.dto.AvailabilityInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AvailabileTimeSlotsMapHelper {
    private Long optionId;
    private AvailabilityInfoDTO availabilityInfoList;
}
