package gr.knowledge.internship.activityoncloud.entity;

import java.io.Serializable;
import java.math.BigDecimal;

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
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @JoinColumn(name = "activity_id")
    @NotNull
    private Activity activity;
    @Column(name = "name", length = 64)
    @Size(max = 64)
    @NotNull
    private String name;
    @NotNull
    @Column(name="price_per_person")
    private BigDecimal pricePerPerson;
    @Column(name = "description", length = 256)
    @Size(max = 256)
    private String description;
    @Column(name = "duration")
    @NotNull
    private String duration;
    @Column(name = "capacity")
    @NotNull
    private Long capacity;
}
