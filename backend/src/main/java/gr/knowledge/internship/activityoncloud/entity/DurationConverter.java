package gr.knowledge.internship.activityoncloud.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

@Converter(autoApply = true)
public class DurationConverter implements AttributeConverter<Duration, String> {
    @Override
    public String convertToDatabaseColumn(Duration duration) {
        if (duration == null) {
            return null;
        }

        long hours = duration.toHours();
        long minutes = duration.toMinutesPart();
        long seconds = duration.toSecondsPart();

        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }

    @Override
    public Duration convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }

        try {
            LocalTime localTime = LocalTime.parse(dbData);  // Interpret HH:MM:SS
            return Duration.between(LocalTime.MIDNIGHT, localTime);  // Convert to Duration
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid duration format: " + dbData, e);
        }
    }
}