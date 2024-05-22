package gr.knowledge.internship.activityoncloud.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
@Table(name = "activity_admin")
public class ActivityAdmin implements Serializable {
	@Id
	@Column(name = "id")
	@NotNull
	@GeneratedValue(generator = "admin_seq", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "admin_seq", sequenceName = "admin_seq")
	private long id;
	@OneToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	@NotNull
	private User user;
}
