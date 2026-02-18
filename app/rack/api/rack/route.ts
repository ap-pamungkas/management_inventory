'use server';

import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async  function GET(){
    return {
        status: 200,
        body: JSON.stringify({ message: "Hello, World!" }),
    }
}


export async function POST(request: Request) {
    
}
