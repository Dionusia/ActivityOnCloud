package gr.knowledge.internship.activityoncloud.entity;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;

public class DurationJsonSerializer extends JsonSerializer<Duration> {
    @Override
    public void serialize(Duration value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        // Convert Duration to LocalTime, then format as "HH:MM:SS"
        LocalTime localTime = LocalTime.MIDNIGHT.plus(value);
        gen.writeString(localTime.toString());  // Output as "HH:MM:SS"
    }
}