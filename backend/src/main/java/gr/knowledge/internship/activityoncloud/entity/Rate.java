package gr.knowledge.internship.activityoncloud.entity;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rate")
public class Rate implements Serializable {
	@Id
	@NotNull
	@Column(name = "id")
    @GeneratedValue(generator = "rate_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "rate_seq", sequenceName = "rate_seq")
	private Long id;
	@NotNull
	@JoinColumn(name = "option_id")
	@ManyToOne
	private ActivityOption option;
	@NotNull
	@Column(name = "rate")
	private BigDecimal rate;
	@NotNull
	@Column(name = "date_start")
	private LocalDate dateStart;
	@NotNull
	@Column(name = "date_end")
	private LocalDate dateEnd;
}
