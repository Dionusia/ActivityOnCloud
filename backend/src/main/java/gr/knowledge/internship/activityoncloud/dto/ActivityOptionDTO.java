package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Duration;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import gr.knowledge.internship.activityoncloud.json.DurationJsonDeserializer;
import gr.knowledge.internship.activityoncloud.json.DurationJsonSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ActivityOptionDTO implements Serializable {
	private Long id;
	private String name;
	private String description;
	@JsonSerialize(using = DurationJsonSerializer.class)
	@JsonDeserialize(using = DurationJsonDeserializer.class)
	private Duration duration;
	private int capacity;
	private ActivityDTO activity;
	private BigDecimal pricePerPerson;
	private String imageUrl;
}
