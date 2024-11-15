import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{
        const users = await prisma.users.findMany();
            return NextResponse.json(users);
    }catch(error){
        return NextResponse.json({error: error}, {status: 500});
    }
}


export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id"); 

    if(!id){
        return NextResponse.json(
            {error: "ID harus diisi"},
            {status: 400},
        );
    }

    try{
        const users = await prisma.users.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json(users);
    }catch (error){
        return NextResponse.json({error: error}, {status: 500});
    }
}


export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");

    console.log(name, email, phone);

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

export async function PUT(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");

    if(!id) {
        return NextResponse.json(
            { error: "Id harus diisi" },
            { status: 400 }
        )
    } else if (!name || !email || !phone) {
        return NextResponse.json(
            { error: " Field name, email, dan phone harus diisi" }
        )
    }

    try {
        const user = await prisma.users.update({
            where: { id: id },
            data: {
                name: name,
                email: email,
                phone: phone
            }
        })
        return NextResponse.json(user);
    } catch(error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        )
    }
}