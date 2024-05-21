package gr.knowledge.internship.activityoncloud.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gr.knowledge.internship.activityoncloud.dto.LoginResponseDTO;
import gr.knowledge.internship.activityoncloud.dto.LoginUserDTO;
import gr.knowledge.internship.activityoncloud.dto.RegisterUserDTO;
import gr.knowledge.internship.activityoncloud.entity.User;
import gr.knowledge.internship.activityoncloud.service.AuthenticationService;
import gr.knowledge.internship.activityoncloud.service.JwtService;
import io.jsonwebtoken.JwtException;

@RequestMapping(value = "/auth")
@RestController
@Log4j2
public class AuthenticationController {
	private final JwtService jwtService;

	private final AuthenticationService authenticationService;

	public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
		this.jwtService = jwtService;
		this.authenticationService = authenticationService;
	}

	@PostMapping("/signup")
	public ResponseEntity<User> register(@RequestBody RegisterUserDTO registerUserDto) {
		User registeredUser = authenticationService.signup(registerUserDto);
		return ResponseEntity.ok(registeredUser);
	}
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> authenticate(@RequestBody LoginUserDTO loginUserDTO) {
		try {
			User authenticatedUser = authenticationService.authenticate(loginUserDTO);
			String jwtToken = jwtService.generateToken(authenticatedUser);
			Long expiresIn = jwtService.getExpirationTime();

			Long adminId = null;
			if (authenticatedUser.getAdmin() != null) {
				adminId = authenticatedUser.getAdmin().getId();
			}

			LoginResponseDTO loginResponse = new LoginResponseDTO(jwtToken, expiresIn, adminId);
			return ResponseEntity.ok(loginResponse);

		} catch (IllegalArgumentException ie) {
			// Handle token expiration
			log.error("JWT token is expired for user: {}. Error: {}", loginUserDTO.getEmail(), ie.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} catch (JwtException je) {
			// Handle JWT-specific exceptions
			log.error("JWT processing failed for user: {}. Error: {}", loginUserDTO.getEmail(), je.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} catch (Exception e) {
			// Handle all other exceptions
			log.error("An error occurred during authentication for user: {}. Error: {}", loginUserDTO.getEmail(), e.getMessage(), e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
}
