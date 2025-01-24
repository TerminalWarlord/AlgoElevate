import Image from "next/image"

const ProblemCard = () => {
    return (
        <div
            className="flex rounded-lg border-2 
            justify-start items-center p-3 space-x-2
            border-opacity-5
            border-gray-800 dark:border-gray-900"
            style={{ fontFamily: "var(--font-poppins)" }}
        >
            <div>
                <Image alt="" src={'./icons/solved.svg'} width={30} height={30} className="dark:invert invert-0" />
            </div>
            <div>
                <div className="flex justify-center items-center space-x-2">
                    <h1 className="text-black dark:text-white text-base">Max Chunks To Make Sorted</h1>
                    <p className="border-1 rounded-md border-gray-300 px-1 bg-opacity-80 text-xs bg-easy">EASY</p>
                </div>
                <div className="flex text-black dark:text-white text-xs space-x-2">
                    <p className="px-2 py-1 bg-gray-100 dark:bg-opacity-20 rounded-md">Google</p>
                    <p className="px-2 py-1 bg-gray-100 dark:bg-opacity-20 rounded-md">Amazon</p>
                </div>
            </div>
        </div>
    )
}

export default ProblemCard