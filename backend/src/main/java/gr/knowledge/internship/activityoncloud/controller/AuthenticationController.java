package gr.knowledge.internship.activityoncloud.controller;

import gr.knowledge.internship.activityoncloud.dto.LoginUserDTO;
import gr.knowledge.internship.activityoncloud.dto.RegisterUserDTO;
import gr.knowledge.internship.activityoncloud.entity.LoginResponse;
import gr.knowledge.internship.activityoncloud.entity.User;
import gr.knowledge.internship.activityoncloud.service.AuthenticationService;
import gr.knowledge.internship.activityoncloud.service.JwtService;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;


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
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDTO loginUserDTO) {
        User authenticatedUser = authenticationService.authenticate(loginUserDTO);
        log.debug("dfcds");
        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
