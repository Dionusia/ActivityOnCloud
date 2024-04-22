package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

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
	private Timestamp startTime;
	private Timestamp endTime;
	private int persons;
	private BigDecimal priceTotal;
}
