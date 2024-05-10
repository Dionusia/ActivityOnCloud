package gr.knowledge.internship.activityoncloud.entity;

import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.core.JsonParser;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;


public class DurationJsonDeserializer extends JsonDeserializer<Duration> {
    @Override
    public Duration deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String text = p.getText();
        try {
            LocalTime localTime = LocalTime.parse(text);  // "HH:MM:SS"
            return Duration.between(LocalTime.MIDNIGHT, localTime);  // Duration since midnight
        } catch (DateTimeParseException e) {
            throw new IOException("Could not parse duration: " + text, e);
        }
    }
}
