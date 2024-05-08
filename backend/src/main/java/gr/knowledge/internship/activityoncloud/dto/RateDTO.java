package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RateDTO implements Serializable {
	private long id;
	private ActivityOptionDTO option;
	private BigDecimal rate;
	private LocalDate startDate;
	private LocalDate endDate;
}
