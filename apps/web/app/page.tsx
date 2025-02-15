import Sidebar from "@/components/layout/sidebar";
import ProblemCard from "@/components/problem/problem-card"
import { DIFFICULTY } from "@/constants/types"
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"




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
        menuTitle: "Practice",
        items: []
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

async function populateSidebar() {
    const problemTags = await prisma.topic.findMany({
        select: {
            slug: true,
            title: true
        }
    });
    DUMMY_DATA[1].items = problemTags.map(topic => {
        return {
            title: topic.title,
            path: "/topic/" + topic.slug
        }
    })
}

export default async function ProblemsPage() {
    const session = await getServerSession(authOptions);
    // const problems = await getProblems();
    // await populateSidebar();
    console.log(session?.user)

    return (
        <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-[150px] flex">
            <Sidebar />
            <div className="text-white border-r-[0.3px] border-opacity-15 dark:border-opacity-90 border-gray-700 w-full my-2">
                {session && <><p className="text-black">{session.user?.id}</p></>}
                {/* {problems.map(problem => {
                    return <ProblemCard
                        key={problem.id}
                        isSolved={problem.solved.length ? true : false}
                        title={problem.title}
                        link={problem.link}
                        problemId={problem.id}
                        difficulty={problem.difficulty as DIFFICULTY}
                        tags={problem.companies.map(company => company.company)}
                    />
                })} */}
            </div>
        </div>
    )
}
