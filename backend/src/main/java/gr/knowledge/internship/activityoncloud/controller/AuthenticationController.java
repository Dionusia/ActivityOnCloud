package gr.knowledge.internship.activityoncloud.controller;

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
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} catch (JwtException je) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
}
