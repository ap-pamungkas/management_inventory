import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CreateRackSchema } from "@/lib/zod-schemas/rack";

// GET DATA RACK WITH PAGINATION AND FILTER
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limitParam = searchParams.get("limit") || "10";
    const limit = limitParam === "all" ? 1000000 : parseInt(limitParam);
    // filter
    const search = searchParams.get("search") || "";
    const MIN_PAGE = 1;
    const skip = (page - MIN_PAGE) * limit;

    const [data, total] = await Promise.all([
      prisma.rack.findMany({
        skip,
        take: limit,
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { code_rack: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
        include: {
          items: true,
        },
      }),
      prisma.rack.count({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { code_rack: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    ]);
    return NextResponse.json({ data, total });
  } catch (error: unknown) {
    console.error("GET /api/rack error:", error);
    return NextResponse.json({ error: "Failed to get racks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validasi struktur data dengan Zod
    const validation = CreateRackSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const {
      name,
      description,
      posX,
      posY,
      width,
      height,
      layoutRows,
      layoutCols,
    } = validation.data;

    // 2. Generate automatic code_rack: R-1, R-2...
    const lastRack = await prisma.rack.findFirst({
      orderBy: { id: "desc" },
    });
    const nextId = lastRack ? lastRack.id + 1 : 1;
    const generatedCode = `R-${nextId}`;

    // 3. Simpan ke database
    const result = await prisma.rack.create({
      data: {
        name,
        code_rack: generatedCode,
        description,
        posX,
        posY,
        width,
        height,
        layoutRows,
        layoutCols,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/rack error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      description,
      posX,
      posY,
      width,
      height,
      layoutRows,
      layoutCols,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "ID rak diperlukan" }, { status: 400 });
    }

    const result = await prisma.rack.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        posX,
        posY,
        width,
        height,
        layoutRows,
        layoutCols,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH /api/rack error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui data rak" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID rak diperlukan" }, { status: 400 });
    }

    const result = await prisma.rack.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE /api/rack error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus data rak" },
      { status: 500 },
    );
  }
}
