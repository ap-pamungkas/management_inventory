import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalItems, totalRacks, items] = await Promise.all([
      prisma.item.count(),
      prisma.rack.count(),
      prisma.item.findMany({
        select: {
          stock: true,
          purchase_price: true,
        },
      }),
    ]);

    const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
    const totalValue = items.reduce(
      (sum, item) => sum + item.stock * item.purchase_price,
      0,
    );

    const recentItems = await prisma.item.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        rack: true,
      },
    });

    return NextResponse.json({
      totalItems,
      totalRacks,
      totalStock,
      totalValue,
      recentItems,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil statistik dashboard" },
      { status: 500 },
    );
  }
}
