import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@repo/db/client";

export async function POST(req: NextRequest) {

    const { solved, problemId } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({
            message: "Unauthorized!"
        }, { status: 403 });
    }
    try {
        if (solved) {
            await prisma.solved.create({
                data: {
                    problemId,
                    userId: session.user.id
                }
            })
        }
        else {
            await prisma.solved.deleteMany({
                where: {
                    userId: session.user.id,
                    problemId: problemId as number
                }
            })
        }

        return NextResponse.json({
            message: "The problem has been marked as "+ solved?true:false
        });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "Something went wrong!"
        }, { status: 501 })
    }


}


