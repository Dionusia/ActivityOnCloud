package gr.knowledge.internship.activityoncloud.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AvailabilityDTO implements Serializable {
    private Long id;
    private String dayOfWeek;
    private LocalTime openTime;
    private LocalTime closeTime;
    private Integer personsCapacity;
    private ActivityDTO activity;
}
