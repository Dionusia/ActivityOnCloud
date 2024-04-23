package gr.knowledge.internship.activityoncloud.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ticket")
public class Ticket implements Serializable {
    @Id
    @Column(name = "id")
    @NotNull
    @GeneratedValue(generator = "ticket_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "ticket_seq", sequenceName = "ticket_seq")
    private Long id;

    @NotNull
    @Column(name = "price")
    private BigDecimal price;

    @NotNull
    @Column(name = "category")
    private String category;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    @NotNull
    private Activity activity;
}
