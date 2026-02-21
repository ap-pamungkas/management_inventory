import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CreateItemSchema } from "@/lib/zod-schemas/item";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limitParam = searchParams.get("limit") || "10";
    const limit = limitParam === "all" ? 1000000 : parseInt(limitParam);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.item.findMany({
        skip,
        take: limit,
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
        include: {
          rack: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),
      prisma.item.count({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    ]);

    return NextResponse.json({ data, total });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data barang" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = CreateItemSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const result = await prisma.item.create({
      data: {
        ...validation.data,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menyimpan data barang" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID barang diperlukan" },
        { status: 400 },
      );
    }

    const validation = CreateItemSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const result = await prisma.item.update({
      where: { id: parseInt(id) },
      data: {
        ...validation.data,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal memperbarui data barang" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID barang diperlukan" },
        { status: 400 },
      );
    }

    const result = await prisma.item.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus data barang" },
      { status: 500 },
    );
  }
}
