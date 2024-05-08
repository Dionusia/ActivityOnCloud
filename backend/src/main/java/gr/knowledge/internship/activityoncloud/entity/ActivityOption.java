package gr.knowledge.internship.activityoncloud.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Duration;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "activity_option")
public class ActivityOption implements Serializable {
    @Id
    @Column(name = "id")
    @NotNull
    @GeneratedValue(generator = "option_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "option_seq", sequenceName = "option_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "activity")
    @NotNull
    private Activity activity;

    @Column(name = "name", length = 64)
    @Size(max = 64)
    @NotNull
    private String name;

    @Column(name = "description", length = 256)
    @Size(max = 256)
    private String description;

    @Column(name = "duration")
    @NotNull
    private Duration duration;

    @Column(name = "capacity")
    @NotNull
    private Long capacity;
}
