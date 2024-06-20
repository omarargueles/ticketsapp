import prisma from "@/prisma/db";
import { userSchema } from "@/validationSchemas/users";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "USer Not Found" }, { status: 400 });
  }

  if (body?.password && body.password !== "") {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
  } else {
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (duplicateUsername) {
      return NextResponse.json(
        { error: "This username already exists" },
        { status: 409 }
      );
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedUser);
}
