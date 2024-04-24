package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingDTO implements Serializable {
	private long id;
	private ActivityAdminDTO activityAdmin;
	private ActivityDTO activity;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private int persons;
	private BigDecimal priceTotal;
	private String customerName;
}
