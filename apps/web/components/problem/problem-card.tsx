import Image from "next/image"

const ProblemCard = () => {
    return (
        <div
            className="flex rounded-xl border-2 
            justify-start items-center px-3 py-2 space-x-2
            border-opacity-5
            w-full my-1 shadow-sm
            border-gray-800 dark:border-gray-900"
            style={{ fontFamily: "var(--font-poppins)" }}
        >
            <div>
                <Image alt="" src={'./icons/solved.svg'} width={30} height={30} className="dark:invert invert-0" />
            </div>
            <div className="w-full flex justify-between space-x-10">
                <div>
                    <div className="flex justify-center items-center space-x-2">
                        <h1 className="text-black dark:text-white text-sm py-0 my-0">Max Chunks To Make Sorted</h1>
                        <p className="border-1 rounded-md border-gray-300 px-1 bg-opacity-80 text-xs bg-easy">EASY</p>
                        <Image alt="GFG" src={'./icons/platforms/gfg.svg'} width={20} height={20} className="border-2 bg-cover rounded-full p-0.5" />
                    </div>
                    <div className="flex text-black dark:text-white text-xs space-x-2">
                        <p className="px-2 py-1 bg-gray-100 dark:bg-opacity-20 rounded-md">Google</p>
                        <p className="px-2 py-1 bg-gray-100 dark:bg-opacity-20 rounded-md">Amazon</p>
                    </div>
                    
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProblemCard