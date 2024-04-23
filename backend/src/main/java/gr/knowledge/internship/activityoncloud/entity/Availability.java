package gr.knowledge.internship.activityoncloud.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "availability")
public class Availability implements Serializable {
    @Id
    @Column(name = "id")
    @NotNull
    @GeneratedValue(generator = "availability_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "availability_seq", sequenceName = "availability_seq")
    private Long id;

    @NotNull
    @Column(name = "day_of_week")
    private String dayOfWeek;

    @NotNull
    @Column(name = "open_time")
    private LocalTime openTime;

    @NotNull
    @Column(name = "close_time")
    private LocalTime closeTime;

    @NotNull
    @Column(name = "persons_capacity")
    private Integer personsCapacity;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    @NotNull
    private Activity activity;
}
