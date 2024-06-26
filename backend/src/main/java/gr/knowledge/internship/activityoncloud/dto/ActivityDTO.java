package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ActivityDTO implements Serializable {
	private Long id;
	private String name;
	private ActivityAdminDTO admin;
}
