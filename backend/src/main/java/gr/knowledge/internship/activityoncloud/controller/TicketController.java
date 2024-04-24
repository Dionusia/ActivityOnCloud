package gr.knowledge.internship.activityoncloud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import gr.knowledge.internship.activityoncloud.dto.TicketDTO;
import gr.knowledge.internship.activityoncloud.service.TicketService;

import java.util.List;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public List<TicketDTO> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public TicketDTO getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @GetMapping("/of-activity/{id}")
    public List<TicketDTO> getTicketsOfActivity(@PathVariable Long id) {
    	return ticketService.getTicketsOfActivity(id);
    }
    
    @PostMapping("/save")
    public TicketDTO saveTicket(@RequestBody TicketDTO ticket) {
        return ticketService.saveTicket(ticket);
    }

    @PutMapping("/update")
    public TicketDTO updateTicket(@RequestBody TicketDTO ticket) {
        return ticketService.updateTicket(ticket);
    }

    @DeleteMapping("/delete")
    public void deleteTicket(@RequestBody TicketDTO ticket) {
        ticketService.deleteTicket(ticket);
    }
}
