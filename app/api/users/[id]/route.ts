import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        if (!params.id) {
            return NextResponse.json(
                { error: "ID harus diisi" },
                { status: 400 },
            );
        }

        const user = await prisma.users.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}