import Sidebar from "@/components/layout/sidebar"
import ProblemCard from "@/components/problem/problem-card"

const Page = () => {
    return (
        <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-[150px] flex">
            <Sidebar />
            <div className="text-white border-r-[0.3px] border-opacity-15 dark:border-opacity-90 border-gray-700 w-full my-2">
                <ProblemCard/>
                <ProblemCard/>
                <ProblemCard/>
                <ProblemCard/>
            </div>
        </div>
    )
}

export default Page
