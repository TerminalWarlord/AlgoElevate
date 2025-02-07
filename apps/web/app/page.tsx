import Sidebar from "@/components/layout/sidebar"
import ProblemCard from "@/components/problem/problem-card"
import { DIFFICULTY } from "@/constants/difficulty"
import { prisma } from "@repo/db/client";

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
    console.log(problems);
    return problems;
}

export default async function ProblemsPage() {
    const problems = await getProblems();

    return (
        <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-[150px] flex">
            <Sidebar />
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
                {/* <ProblemCard
                    title="Max Chunks To Make Sorted"
                    tags={[{
                        slug: 'amazon',
                        title: 'Amazon'
                    }]}
                    difficulty={DIFFICULTY.EASY}
                />
                <ProblemCard
                    title="Max Chunks To Make Sorted"
                    tags={[{
                        slug: 'Google',
                        title: 'Google'
                    }]}
                    difficulty={DIFFICULTY.MEDIUM}
                />
                <ProblemCard
                    title="Max Chunks To Make Sorted"
                    tags={[{
                        slug: 'Google',
                        title: 'Google'
                    },{
                        slug: 'Amazon',
                        title: 'Amazon'
                    },]}
                    difficulty={DIFFICULTY.HARD}
                /> */}
            </div>
        </div>
    )
}
