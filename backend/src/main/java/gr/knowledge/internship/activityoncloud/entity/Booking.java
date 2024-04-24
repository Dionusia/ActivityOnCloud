package gr.knowledge.internship.activityoncloud.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime startTime;
	@Column(name = "end_time")
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime endTime;
	@Column(name = "persons")
	@NotNull
	private int persons;
	@Column(name = "price_total")
	@NotNull
	private BigDecimal priceTotal;
	@Column(name = "customer_name")
	@Size(max = 64)
	@NotNull
	private String customerName;
}
