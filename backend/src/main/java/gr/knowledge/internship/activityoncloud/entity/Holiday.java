package gr.knowledge.internship.activityoncloud.entity;

import java.time.LocalDate;

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
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "holiday")
public class Holiday {
	@Id
	@NotNull
	@Column(name = "id")
    @GeneratedValue(generator = "holiday_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "holiday_seq", sequenceName = "holiday_seq")
	private Long id;
	@NotNull
	@Column(name = "date")
	private LocalDate date;
	@NotNull
	@JoinColumn(name = "option_id")
	@ManyToOne
	private ActivityOption option;
	@NotNull
	@JoinColumn(name = "admin_id")
	@ManyToOne
	private ActivityAdmin admin;
}
