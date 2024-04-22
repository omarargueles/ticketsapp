import { buttonVariants } from "@/components/ui/button";
import prisma from "@/prisma/db";
import Link from "next/link";
import DataTable from "./DataTable";

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();
  //   console.log("LL::", tickets);
  return (
    <div>
      <Link
        className={buttonVariants({ variant: "default" })}
        href="/tickets/new"
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
    </div>
  );
};

export default Tickets;
