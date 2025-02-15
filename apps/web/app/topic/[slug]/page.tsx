import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/components/layout/sidebar";
import ProblemCard from "@/components/problem/problem-card";
import { DIFFICULTY } from "@/constants/types";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

async function getProblems(topic: string) {
    const problems = await prisma.problem.findMany({
        where: {
            topics: {
                some: {
                    topic: {
                        slug: topic
                    }
                }
            }
        },
        include: {
            companies: {
                include: {
                    company: true
                }
            },
            topics: {
                include: {
                    topic: true
                }
            },
            solved: {
                include: {
                    problem: true
                }
            }
        }
    });
    console.log(problems);
    return problems;
}

export default async function ProblemsPage({ params }: { params: { slug: string } }) {
    const topicSlug = params.slug;
    const problems = await getProblems(topicSlug);
    const session = await getServerSession(authOptions);
    
    return (
        <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-[150px] flex">
            <Sidebar />
            <div className="text-white border-r-[0.3px] border-opacity-15 dark:border-opacity-90 border-gray-700 w-full my-2">
                {session && <><p className="text-black">{session.user?.id}</p></>}
                <Suspense fallback={<div>Loading problems...</div>}>
                    {problems.map(problem => {
                        return <ProblemCard
                            key={problem.id}
                            isSolved={problem.solved.length ? true : false}
                            title={problem.title}
                            link={problem.link}
                            problemId={problem.id}
                            difficulty={problem.difficulty as DIFFICULTY}
                            tags={problem.companies.map(company => company.company)}
                        />
                    })}
                </Suspense>
            </div>
        </div>
    )
}
