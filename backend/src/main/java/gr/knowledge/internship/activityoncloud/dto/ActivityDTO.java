package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;

import org.postgresql.util.PGInterval;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ActivityDTO implements Serializable {
	private long id;
	private ActivityAdminDTO activityAdmin;
	private Long durationDays;
	private Long durationHours;
	private Long durationMinutes;
}
