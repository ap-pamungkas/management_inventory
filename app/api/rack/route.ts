'use server';

import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import type  {Rack} from "@/types/rack";

export async  function GET(){
    return {
        status: 200,
        body: JSON.stringify({ message: "Hello, World!" }),
    }
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, code_rack, description, capacity } = data;
        const newRack: Rack = {
            id: 0,
            name,
            code_rack,
            description,
            capacity,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const result = await prisma.rack.create({
            data: newRack
        });
        return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
        return NextResponse.json({ error: "Failed to create rack" }, { status: 500 });
    }
}
