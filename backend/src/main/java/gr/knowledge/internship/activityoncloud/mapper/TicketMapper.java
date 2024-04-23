package gr.knowledge.internship.activityoncloud.mapper;

import java.util.ArrayList;
import java.util.List;

import gr.knowledge.internship.activityoncloud.dto.TicketDTO;
import gr.knowledge.internship.activityoncloud.entity.Ticket;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {
    @Autowired
    private ModelMapper modelMapper;

    public Ticket toEntity(TicketDTO ticketDTO) {
        return modelMapper.map(ticketDTO, Ticket.class);
    }

    public TicketDTO toDTO(Ticket ticket) {
        return modelMapper.map(ticket, TicketDTO.class);
    }

    public List<Ticket> toEntityList(List<TicketDTO> ticketDTOList) {
        List<Ticket> ticketList = new ArrayList<>();
        for (TicketDTO ticketDTO : ticketDTOList) {
            Ticket ticketToAdd = modelMapper.map(ticketDTO, Ticket.class);
            ticketList.add(ticketToAdd);
        }
        return ticketList;
    }

    public List<TicketDTO> toDTOList(List<Ticket> ticketList) {
        List<TicketDTO> ticketDTOList = new ArrayList<>();
        for (Ticket ticket : ticketList) {
            TicketDTO ticketDTOToAdd = modelMapper.map(ticket, TicketDTO.class);
            ticketDTOList.add(ticketDTOToAdd);
        }
        return ticketDTOList;
    }
}
