package gr.knowledge.internship.activityoncloud.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterUserDTO {
    private String email;
    private String password;
    private String fullName;
    private String role;
}
