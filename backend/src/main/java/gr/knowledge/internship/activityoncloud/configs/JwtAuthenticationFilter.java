package gr.knowledge.internship.activityoncloud.configs;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import gr.knowledge.internship.activityoncloud.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;

	public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
		this.jwtService = jwtService;
		this.userDetailsService = userDetailsService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
									FilterChain filterChain) throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		final String jwt = authHeader.substring(7);
		final String userEmail = jwtService.extractUsername(jwt);

		// Check if token is expired
		if (jwtService.isTokenExpired(jwt)) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.getWriter().write("Token has expired");
			return;
		}

		// Check if token is valid
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
		if (!jwtService.isTokenValid(jwt, userDetails)){
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.getWriter().write("Invalid token");
			return;
		}

		// Authenticate user if token is valid
		if (jwtService.isTokenValid(jwt, userDetails)) {
			Authentication authToken = new UsernamePasswordAuthenticationToken(userDetails,
					null, userDetails.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authToken);
		}

		filterChain.doFilter(request, response);
	}
}