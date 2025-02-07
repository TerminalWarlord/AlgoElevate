import { prisma } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { DIFFICULTY } from "@/constants/types"

import slugify from "slugify";

interface ProblemDetails {
    problemTitle?: string;
    problemLink?: string;
    problemDifficulty?: DIFFICULTY;
}


export async function POST(request: NextRequest) {
    const requestBody = await request.json()
    console.log("REQU",requestBody)
    const { problemTitle, problemLink, problemDifficulty }: ProblemDetails = requestBody;
    if (!problemTitle || !problemLink || !problemDifficulty) {
        return NextResponse.json({
            message: "Invalid inputs!"
        })
    }
    const doesExist = await prisma.problem.findFirst({
        where: {
            slug: slugify(problemTitle, {lower:true})
        }
    });
    if(doesExist){
        return NextResponse.json({
            message: "Problem already exists",

        }, {status: 403});
    }


    const {companies}: {companies: string[]} = requestBody || [];
    const {topics}: {topics: string[]} = requestBody || [];
    console.log(problemTitle, problemLink, problemDifficulty, companies, topics);
    // if the companies doesn't exist yet, create them
    try {

        const companyRecords = await Promise.all(companies.map(company => {
            return prisma.company.upsert({
                where: { slug: slugify(company, { lower: true }) },
                update: {},
                create: {
                    slug: slugify(company, { lower: true }),
                    title: company
                }
            })
        }));

        const topicRecords = await Promise.all(topics.map(topic => {
            return prisma.topic.upsert({
                where: { slug: slugify(topic, { lower: true }) },
                update: {},
                create: {
                    slug: slugify(topic, { lower: true }),
                    title: topic
                }
            })
        }));



        const problem = await prisma.problem.create({
            data: {
                title: problemTitle,
                link: problemLink,
                slug: slugify(problemLink, { lower: true }),
                companies: {
                    create: companyRecords.map((company) => ({ companyId: company.id }))
                },
                topics: {
                    create: topicRecords.map((topic) => ({ topicId: topic.id }))
                },
                difficulty: problemDifficulty
            }
        })

        return NextResponse.json({
            message: "done"
        })

    }
    catch (err) {
        console.log(err);
        return NextResponse.json({
            message: err,

        }, { status: 403 });
    }

}