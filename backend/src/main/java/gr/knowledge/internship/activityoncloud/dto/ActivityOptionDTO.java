package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.time.Duration;

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
    private Duration duration;
    private Long capacity;
    private ActivityDTO activity;
}
