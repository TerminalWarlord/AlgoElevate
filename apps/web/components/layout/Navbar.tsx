import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ui/theme-toggle";

const Navbar = () => {
    return (
        <div
            className="w-full dark:bg-black h-12 px-[150px] flex justify-between items-center text-gray-200 border-b-[0.2px] border-gray-900 border-opacity-10 dark:border-opacity-100 bg-opacity-10 backdrop-blur-sm sticky top-0"
            style={{ fontFamily: "var(--font-manrope)" }}
        >
            <div className="flex space-x-6">
                <div>
                    <Link href={'/'}>
                        <h1 className="text-xl font-extrabold text-black dark:text-white">algoelevate.</h1>
                    </Link>

                </div>
                <ul className="flex justify-center items-center space-x-5 text-sm font-medium text-black dark:text-white">
                    <li>
                        <Link href={'/'}>Problems</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Companies</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Profile</Link>
                    </li>
                </ul>
            </div>
            <div className="flex space-x-6 justify-center items-center">
                <Input placeholder="Search" className="border-[1.5px] border-gray-300 dark:border-gray-700 outline-none dark:bg-gray-900 bg-opacity-45 rounded-lg dark:placeholder:text-gray-200 h-8 w-64" />
                <Link href={'https://github.com/TerminalWarlord/AlgoElevate'}>
                    <Image src={'/icons/github.svg'} alt="Github icon" width={20} height={20} className="invert dark:invert-0"/>
                </Link>
                {/* <Image src={'/icons/light.svg'} alt="Theme" width={20} height={20} /> */}
                <ModeToggle/>
            </div>

        </div>
    )
}


export default Navbar;
