import { prisma } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const companies = await prisma.company.findMany();

        return NextResponse.json({
            items: companies,
            message: "Successful"

        });

    }
    catch (err) {
        console.log(err);
        return NextResponse.json({
            items: [],
            message: "Something went wrong"
        });
    }
}