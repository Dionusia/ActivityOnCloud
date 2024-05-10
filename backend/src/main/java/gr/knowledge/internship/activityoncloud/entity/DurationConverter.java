package gr.knowledge.internship.activityoncloud.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.extern.log4j.Log4j2;

import java.time.Duration;
import java.time.LocalTime;

@Log4j2
@Converter(autoApply = true)
public class DurationConverter implements AttributeConverter<Duration, String> {
    @Override
    public String convertToDatabaseColumn(Duration duration) {
        if (duration == null) {
            return null;
        }

        long hours = duration.toHours();  // Extract hours
        long minutes = duration.toMinutesPart();  // Extract minutes
        long seconds = duration.toSecondsPart();  // Extract seconds

        // Format as "HH:MM:SS"
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }

    @Override
    public Duration convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }

        LocalTime localTime = LocalTime.parse(dbData);  // "HH:MM:SS"
        return Duration.between(LocalTime.MIDNIGHT, localTime);  // Convert to Duration
    }
}