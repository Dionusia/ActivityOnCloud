package gr.knowledge.internship.activityoncloud.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TimeSlotDTO implements Serializable {
	private LocalDateTime start;
	private LocalDateTime end;
	private int remainingCapacity;

	public void generateCapacity(List<BookingDTO> bookings, Integer personsCapacity) {
		this.setRemainingCapacity(personsCapacity);
		for (BookingDTO booking : bookings) {
			this.setRemainingCapacity(this.getRemainingCapacity() - booking.getPersons());
		}
	}
}
