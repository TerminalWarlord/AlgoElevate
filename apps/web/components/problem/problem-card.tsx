import Image from "next/image"
import { DIFFICULTY } from "@/constants/types";
import Link from "next/link";
import getPlatformIcon from "@/lib/getPlatformIcon";


interface ProblemTags {
    slug: string;
    title: string
}



interface ProblemDetails {
    title: string;
    link: string;
    tags: ProblemTags[];
    difficulty: DIFFICULTY;
}



const ProblemCard: React.FC<ProblemDetails> = ({ title, link, tags, difficulty }) => {
    let difficultyClass = 'border-1 rounded-md border-gray-300 px-1 bg-opacity-80 text-xs ';

    const platformIcon = getPlatformIcon(link);

    if(difficulty===DIFFICULTY.EASY){
        difficultyClass+='bg-easy';
    }
    if(difficulty===DIFFICULTY.HARD){
        difficultyClass += 'bg-hard';
    }
    else if(difficulty===DIFFICULTY.MEDIUM){
        difficultyClass += 'bg-medium';
    }
    return (
        <div
            className="flex rounded-xl 
            justify-start items-center px-3 py-2 space-x-2
            border-opacity-5
            my-2 shadow-md  dark:shadow-gray-900
            mx-4
            border-gray-800 dark:border-gray-900"
            style={{ fontFamily: "var(--font-poppins)" }}
        >
            <div>
                <Image alt="" src={'./icons/solved.svg'} width={30} height={30} className="dark:invert invert-0 w-6 aspect-square" />
            </div>
            <div className="w-full flex justify-between space-x-10">
                <div>
                    <a href={link} className="flex justify-center items-center space-x-2">
                        <h1 className="text-black dark:text-white text-sm py-0 my-0">{title}</h1>
                        <p className={difficultyClass}>{difficulty.toString()}</p>
                        <Image alt={platformIcon.altText} src={platformIcon.iconPath} width={20} height={20} className="border-2 bg-cover rounded-full p-0.5" />
                    </a>
                    <div className="flex flex-col sm:flex-row text-black dark:text-white text-xs space-y-1 space-x-0 sm:space-x-2 sm:space-y-0 w-fit">
                        {tags.map(tag => {
                            return <Link href={`/tag/${tag.slug}`} key={tag.slug} className="px-1 py-0 md:px-2 md:py-1 bg-gray-100 dark:bg-opacity-20 rounded-md">{tag.title}</Link>
                        })}
                    </div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default ProblemCard