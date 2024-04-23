package gr.knowledge.internship.activityoncloud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.TicketDTO;
import gr.knowledge.internship.activityoncloud.entity.Ticket;
import gr.knowledge.internship.activityoncloud.mapper.TicketMapper;
import gr.knowledge.internship.activityoncloud.repository.TicketRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketMapper ticketMapper;

    @Transactional(readOnly = true)
    public TicketDTO getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return ticketMapper.toDTO(ticket);
    }

    @Transactional(readOnly = true)
    public List<TicketDTO> getAllTickets() {
        List<Ticket> allTickets = ticketRepository.findAll();
        return ticketMapper.toDTOList(allTickets);
    }

    public TicketDTO saveTicket(TicketDTO ticketDTO) {
        Ticket ticket = ticketMapper.toEntity(ticketDTO);
        ticketRepository.save(ticket);
        return ticketMapper.toDTO(ticket);
    }

    public TicketDTO updateTicket(TicketDTO ticketDTO) {
        Ticket ticketInDb = existsInDatabase(ticketDTO);
        Ticket updatedTicket = ticketMapper.toEntity(ticketDTO);
        updatedTicket.setId(ticketInDb.getId()); // Preserve ID
        ticketRepository.save(updatedTicket);
        return ticketMapper.toDTO(updatedTicket);
    }

    public void deleteTicket(TicketDTO ticketDTO) {
        Ticket ticket = ticketMapper.toEntity(ticketDTO);
        ticketRepository.delete(ticket);
    }

    private Ticket existsInDatabase(TicketDTO ticketDTO) {
        Ticket ticketInDatabase = ticketRepository.findById(ticketDTO.getId())
                .orElseThrow(EntityNotFoundException::new);
        return ticketInDatabase;
    }
}
