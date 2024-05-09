package gr.knowledge.internship.activityoncloud.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Column(name = "day")
    private String day;
    @NotNull
    @Column(name = "start_time")
    private LocalTime startTime;
    @NotNull
    @Column(name = "end_time")
    private LocalTime endTime;
    @ManyToOne
    @JoinColumn(name = "option_id")
    @NotNull
    private ActivityOption option;
}