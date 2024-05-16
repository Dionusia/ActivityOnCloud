package gr.knowledge.internship.activityoncloud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import gr.knowledge.internship.activityoncloud.dto.LoginUserDTO;
import gr.knowledge.internship.activityoncloud.dto.RegisterUserDTO;
import gr.knowledge.internship.activityoncloud.entity.ActivityAdmin;
import gr.knowledge.internship.activityoncloud.entity.User;
import gr.knowledge.internship.activityoncloud.mapper.ActivityAdminMapper;
import gr.knowledge.internship.activityoncloud.repository.UserRepository;

@Service
public class AuthenticationService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	@Autowired
	private ActivityAdminService activityAdminService;
	@Autowired
	private ActivityAdminMapper activityAdminMapper;
	
	public AuthenticationService(UserRepository userRepository, AuthenticationManager authenticationManager,
			PasswordEncoder passwordEncoder) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User signup(RegisterUserDTO input) {
		User user = new User();
		ActivityAdmin admin = new ActivityAdmin();
		user.setEmail(input.getEmail());
		user.setPassword(passwordEncoder.encode(input.getPassword()));
		user.setFullName(input.getFullName());
		admin.setUser(user);
		userRepository.save(user);
		activityAdminService.saveActivityAdmin(activityAdminMapper.toDTO(admin));
		return user;
	}

	public User authenticate(LoginUserDTO input) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
		return userRepository.findByEmail(input.getEmail()).orElseThrow();
	}
}
