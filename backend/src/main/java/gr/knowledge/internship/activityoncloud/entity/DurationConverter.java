package gr.knowledge.internship.activityoncloud.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;


@Converter(autoApply = true)  // Ensure this converter is automatically applied
public class DurationConverter implements AttributeConverter<Duration, String> {

    @Override
    public String convertToDatabaseColumn(Duration duration) {
        if (duration == null) {
            return null;
        }
        // Convert Duration to HH:MM:SS for storing in INTERVAL format
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
            // Parse HH:MM:SS and calculate duration from midnight
            LocalTime time = LocalTime.parse(dbData);
            return Duration.between(LocalTime.MIDNIGHT, time);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid INTERVAL format: " + dbData, e);
        }
    }
}