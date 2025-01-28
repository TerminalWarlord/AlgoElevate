import Sidebar from "@/components/layout/Sidebar"
import ProblemCard from "@/components/problem/problem-card"

const Page = () => {
    return (
        <div className="mx-[150px] flex">
            <Sidebar />
            <div className="text-white border-r-[0.2px] border-gray-700 w-full">
                <ProblemCard/>
                <ProblemCard/>
                <ProblemCard/>
                <ProblemCard/>
            </div>
        </div>
    )
}

export default Page
