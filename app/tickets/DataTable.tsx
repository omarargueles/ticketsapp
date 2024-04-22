import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/ticketPriority";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@prisma/client";

interface Props {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: Props) => {
  return (
    <div className="w-full mt-5">
      <Table className="rounded-md sm:border">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>
              <div className="flex justify-center">Status</div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center">Priority </div>
            </TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href="/">
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <TicketStatusBadge
                        status={ticket.status}
                      ></TicketStatusBadge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <TicketPriority priority={ticket.priority} />
                    </div>
                  </TableCell>
                  <TableCell>
                    {ticket.createdAt.toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;