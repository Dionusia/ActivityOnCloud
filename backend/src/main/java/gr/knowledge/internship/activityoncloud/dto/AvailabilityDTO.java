package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AvailabilityDTO implements Serializable {
	private Long id;
	private String day;
	private LocalTime startTime;
	private LocalTime endTime;
	private ActivityOptionDTO option;
}
