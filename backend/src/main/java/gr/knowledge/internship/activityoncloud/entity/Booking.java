package gr.knowledge.internship.activityoncloud.entity;

import java.io.Serializable;
import java.sql.Timestamp;

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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "booking")
public class Booking implements Serializable {
	@Id
	@Column(name = "id")
	@NotNull
	@GeneratedValue(generator = "booking_seq", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "booking_seq", sequenceName = "booking_seq")
	private long id;
	@JoinColumn(name = "activity_admin_id")
	@ManyToOne
	@NotNull
	private ActivityAdmin activityAdmin;
	@JoinColumn(name = "activity_id")
	@ManyToOne
	@NotNull
	private Activity activity;
	@Column(name = "start_time")
	@NotNull
	private Timestamp startTime;
	@Column(name = "end_time")
	@NotNull
	private Timestamp endTime;
}
