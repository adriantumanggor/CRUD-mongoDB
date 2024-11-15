import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    if(!name || !email || !phone) {
        return NextResponse.json(
            { error: 'Semua field harus diisi' },
            { status: 400 }
        )
    }

    try {
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                phone: phone
            }
        })
        return NextResponse.json(user); 
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        )
    }
}