import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/auth";
import { CreateUserSchema } from "@/lib/zod-schemas/user";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const validation = CreateUserSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const {
      name,
      username,
      password,
      role,
      accessibleFrom,
      accessibleUntil,
      cctvStamp,
    } = validation.data;

    const currentData: any = {
      name,
      username,
      role,
      accessibleFrom: accessibleFrom ? new Date(accessibleFrom) : null,
      accessibleUntil: accessibleUntil ? new Date(accessibleUntil) : null,
      cctvStamp,
    };

    if (password) {
      currentData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: currentData,
    });

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
