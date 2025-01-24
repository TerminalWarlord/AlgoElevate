import { prisma } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { code, stdin, stdout, language, userId } = await request.json();
        console.log({ code, stdin, stdout, language, userId })
        const generatedCode = await prisma.code.create({
            data: {
                code,
                stdin,
                stdout,
                language,
                userId
            }
        })
        return NextResponse.json({
            id: generatedCode.id,
            message: "Successful.",
        });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            message: "Failed.",
        });
    }
}