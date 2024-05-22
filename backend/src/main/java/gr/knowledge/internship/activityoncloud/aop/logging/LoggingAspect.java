package gr.knowledge.internship.activityoncloud.aop.logging;

import java.util.HashMap;
import java.util.Map;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j2;

@Aspect
@Component
@Log4j2
public class LoggingAspect {

	@Pointcut("execution(* gr.knowledge.internship.activityoncloud.service.*.*(..))")
	private void allServiceMethods() {
	}

	@Before(value = "allServiceMethods()")
	private void beforeServiceMethod(JoinPoint joinPoint) {
		CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
		String[] parameters = codeSignature.getParameterNames();
		Map<String, String> arguments = new HashMap<>();
		for (int i = 0; i < parameters.length; i++) {
			arguments.put(parameters[i], joinPoint.getArgs()[i].toString());
		}
		String joinMethod = joinPoint.getSignature().getName();
		String joinClass = joinPoint.getSignature().getDeclaringType().getSimpleName();
		log.debug("Entered " + joinMethod + " in " + joinClass + " with arguments " + arguments);
	}

	@AfterReturning(value = "allServiceMethods()", returning = "result")
	private void afterServiceMethod(JoinPoint joinPoint, Object result) {
		String joinMethod = joinPoint.getSignature().getName();
		String joinClass = joinPoint.getSignature().getDeclaringType().getSimpleName();
		log.debug("Exited " + joinMethod + " in " + joinClass + " with return statement " + result);
	}
}