import prisma from "@/prisma/db";
import { ticketSchema } from "@/validationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  console.log(">>>", body);
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticcket not found" }, { status: 400 });
  }

  console.log("111");

  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      ...body,
    },
  });

  console.log("updateTicket", updateTicket);

  return NextResponse.json(updateTicket);
}
