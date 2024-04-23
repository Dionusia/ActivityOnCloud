package gr.knowledge.internship.activityoncloud.repository;

import gr.knowledge.internship.activityoncloud.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
