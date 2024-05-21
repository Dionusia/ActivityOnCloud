package gr.knowledge.internship.activityoncloud.dto;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import gr.knowledge.internship.activityoncloud.json.DurationJsonDeserializer;
import gr.knowledge.internship.activityoncloud.json.DurationJsonSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ActivityOptionCreateDTO {
	private String name;
	private String description;
	@JsonSerialize(using = DurationJsonSerializer.class)
	@JsonDeserialize(using = DurationJsonDeserializer.class)
	private Duration duration;
	private BigDecimal pricePerPerson;
	private int capacity;
	private String imageURL;
	private String activityName;
	private Long activityId;
	private Long adminId;
	private List<AvailabilityDTO> availabilityList;
	
	public ActivityOptionDTO extractActivityOption() {
		ActivityOptionDTO activityOption = new ActivityOptionDTO();
		ActivityDTO activity = new ActivityDTO();
		ActivityAdminDTO admin = new ActivityAdminDTO();
		admin.setId(this.getAdminId());
		activity.setAdmin(admin);
		activity.setId(this.getActivityId());
		activity.setName(this.getActivityName());
		activityOption.setActivity(activity);
		activityOption.setCapacity(this.getCapacity());
		activityOption.setDescription(this.getDescription());
		activityOption.setDuration(this.getDuration());
		activityOption.setImageUrl(this.getImageURL());
		activityOption.setName(this.getName());
		activityOption.setPricePerPerson(this.getPricePerPerson());
		return activityOption;
	}
}
