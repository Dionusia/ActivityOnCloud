package gr.knowledge.internship.activityoncloud.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "activity")
public class Activity implements Serializable {
	@Id
	@Column(name = "id")
	@NotNull
	@GeneratedValue(generator = "activity_seq", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "activity_seq", sequenceName = "activity_seq")
	private long id;
	@JoinColumn(name = "activity_admin_id")
	@NotNull
	@ManyToOne
	private ActivityAdmin activityAdmin;
	@Column(name = "name")
	@Size(max = 100)
	private String name;
	@Column(name = "description")
	@Size(max = 1024)
	private String description;
	@Column(name = "duration_days")
	private int durationDays;
	@Column(name = "duration_hours")
	private int durationHours;
	@Column(name = "duration_minutes")
	private int durationMinutes;
}
