package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HolidayDTO implements Serializable {
	private Long id;
	private LocalDate date;
	private ActivityOptionDTO option;
	private ActivityAdminDTO admin;
}
