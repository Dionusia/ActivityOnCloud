package gr.knowledge.internship.activityoncloud.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AvailabilityInfoDTO {
	private BigDecimal pricePerPerson;
	private List<TimeSlotDTO> timeslots;
}
