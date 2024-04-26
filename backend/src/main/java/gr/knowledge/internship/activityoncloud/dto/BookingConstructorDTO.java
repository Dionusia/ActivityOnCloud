package gr.knowledge.internship.activityoncloud.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingConstructorDTO {
    private Long activityId;
    private LocalDate date;
    private LocalTime startTime;
    private int persons;
    private String customerName;

    public BookingDTO toBookingDTO(){
        BookingDTO bookingDTO = new BookingDTO();
        ActivityDTO activityDTO = new ActivityDTO();
        activityDTO.setId(this.getActivityId());
        bookingDTO.setActivity(activityDTO);
        bookingDTO.setStartTime(LocalDateTime.of(date, startTime));
        bookingDTO.setPersons(persons);
        bookingDTO.setCustomerName(customerName);
        return bookingDTO;
    }
}

