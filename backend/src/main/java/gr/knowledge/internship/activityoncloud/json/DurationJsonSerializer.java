package gr.knowledge.internship.activityoncloud.json;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class DurationJsonSerializer extends JsonSerializer<Duration> {
	@Override
	public void serialize(Duration value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		// Convert Duration to LocalTime, then format as "HH:MM:SS"
		LocalTime localTime = LocalTime.MIDNIGHT.plus(value);
		gen.writeString(localTime.toString()); // Output as "HH:MM:SS"
	}
}