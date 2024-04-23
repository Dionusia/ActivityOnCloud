package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TicketDTO implements Serializable {
    private Long id;
    private BigDecimal price;
    private String category;
    private ActivityDTO activity;
}
