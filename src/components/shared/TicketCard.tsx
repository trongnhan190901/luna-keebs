/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Ticket } from '@prisma/client';
import { ReactNode } from 'react';
import { dateFormat } from '~/helpers/dateFormat';

interface TicketCardProps {
    ticket: Ticket;
    children: ReactNode;
}

const TicketCard = ({ ticket, children }: TicketCardProps) => {
    return (
        <>
            <div>{dateFormat(ticket.createdAt)}</div>
            <div>{dateFormat(ticket.updatedAt)}</div>
            <div>{ticket.ticketIssueName}</div>
            <div>{ticket.desc}</div>
            <div>{ticket.note}</div>
            {children}
        </>
    );
};
export default TicketCard;
