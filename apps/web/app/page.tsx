import Sidebar from "@/components/layout/sidebar";
import ProblemCard from "@/components/problem/problem-card"
import { DIFFICULTY } from "@/constants/types"
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";

async function getProblems(){
    const problems = await prisma.problem.findMany({
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
            }
        }
    });
    return problems;
}



const DUMMY_DATA = [
    {
        menuTitle: "DSA",
        items: [
            {
                title: "Leetcode 150",
                path: "leetcode-150"
            }
        ]
    },
    {
        menuTitle: "System Design",
        items: [
            {
                title: "Functional Requirements",
                path: "functional-requirements"
            },
            {
                title: "CAP theorem",
                path: "cap-theorem"
            },
        ]
    }
]

export default async function ProblemsPage() {
    // const session = await getServerSession();
    const problems = await getProblems();

    return (
        <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-[150px] flex">
            <Sidebar 
            menuItems={DUMMY_DATA}
            />
            <div className="text-white border-r-[0.3px] border-opacity-15 dark:border-opacity-90 border-gray-700 w-full my-2">
                {problems.map(problem=>{
                    return <ProblemCard
                        title={problem.title}
                        link={problem.link}
                        difficulty={problem.difficulty as DIFFICULTY}
                        tags={problem.companies.map(company => company.company)}
                        key={problem.id}
                    />
                })}
            </div>
        </div>
    )
}
