package gr.knowledge.internship.activityoncloud.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class LoginResponseDTO {
	private String token;
	private Long expiresIn;
}
