package gr.knowledge.internship.activityoncloud.dto;

import gr.knowledge.internship.activityoncloud.entity.Activity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
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
