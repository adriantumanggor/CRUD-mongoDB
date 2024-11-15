import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const nama = searchParams.get("nama");
    const phone = searchParams.get("phone");

        try{
            const users = await prisma.users.findMany();
                return NextResponse.json(users);
        }catch(error){
            return NextResponse.json({error: error}, {status: 500});
        }
}

export async function POST(req: NextRequest) {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
}

export async function DELETE(req: NextRequest) {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
}

export async function PATCH(req: NextRequest) {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
}