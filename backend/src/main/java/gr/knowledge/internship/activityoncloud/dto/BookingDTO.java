package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingDTO implements Serializable {
	private Long id;
	private UUID uuid;
	private String name;
	private String surname;
	private String phone;
	private String email;
	private LocalDateTime startTime;
	private Integer persons;
	private BigDecimal totalPrice;
	private ActivityOptionDTO activityOption;
	private ActivityAdminDTO activityAdmin;
}
