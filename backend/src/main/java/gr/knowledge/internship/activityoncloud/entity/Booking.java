package gr.knowledge.internship.activityoncloud.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Table;
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
	private Long id;

	@Column(name = "uuid")
	@NotNull
	private UUID uuid;

	@Column(name = "name")
	@Size(max = 32)
	@NotNull
	private String name;

	@Column(name = "surname")
	@Size(max = 48)
	@NotNull
	private String surname;

	@Column(name = "phone")
	@Size(max = 13)
	@NotNull
	private String phone;

	@Column(name = "email")
	@Size(max = 48)
	@NotNull
	private String email;

	@ManyToOne
	@JoinColumn(name = "option_id")
	@NotNull
	private ActivityOption activityOption;

	@ManyToOne
	@JoinColumn(name = "admin_id")
	@NotNull
	private ActivityAdmin activityAdmin;

	@Column(name = "start_time")
	@NotNull
	private LocalTime startTime;

	@Column(name = "persons")
	@NotNull
	private Integer persons;

	@Column(name = "total_price", precision = 10, scale = 2)
	@NotNull
	private BigDecimal totalPrice;
}
