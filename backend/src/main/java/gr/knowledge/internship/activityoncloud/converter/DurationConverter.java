package gr.knowledge.internship.activityoncloud.converter;

import java.time.Duration;
import java.time.LocalTime;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class DurationConverter implements AttributeConverter<Duration, String> {
	@Override
	public String convertToDatabaseColumn(Duration duration) {
		if (duration == null) {
			return null;
		}
		long hours = duration.toHours(); // Get hours
		long minutes = duration.toMinutesPart(); // Get minutes
		long seconds = duration.toSecondsPart(); // Get seconds
		return String.format("%02d:%02d:%02d", hours, minutes, seconds);
	}

	@Override
	public Duration convertToEntityAttribute(String dbData) {
		if (dbData == null || dbData.isEmpty()) {
			return null;
		}
		LocalTime localTime = LocalTime.parse(dbData);
		return Duration.between(LocalTime.MIDNIGHT, localTime); // Convert from "HH:MM:SS"
	}
}