package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TimeSlotDTO implements Serializable {
    private LocalTime start;
    private LocalTime end;
}
