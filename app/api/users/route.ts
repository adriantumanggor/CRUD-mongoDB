import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.users.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error: "ID harus diisi" },
            { status: 400 },
        );
    }

    try {
        const users = await prisma.users.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON body from the request
        const body = await req.json();
        const { name, email, phone } = body;

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Semua field harus diisi' },
                { status: 400 }
            );
        }

        // Create new user
        const user = await prisma.users.create({
            data: {
                name,
                email,
                phone
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        // Parse the JSON body from the request
        const body = await req.json();
        const { id, name, email, phone } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Id harus diisi" },
                { status: 400 }
            );
        } else if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "Field name, email, dan phone harus diisi" },
                { status: 400 }
            );
        }

        const user = await prisma.users.update({
            where: { id: id },
            data: {
                name,
                email,
                phone
            }
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}