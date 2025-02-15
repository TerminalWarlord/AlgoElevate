"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-full border-b-[0.3px] border-gray-900 border-opacity-10 dark:border-opacity-90 bg-opacity-10 backdrop-blur-sm sticky top-0"
            style={{ fontFamily: "var(--font-manrope)" }}>
            <div className="px-4 md:px-12 lg:px-24 xl:px-[150px]  h-12 flex justify-between items-center text-gray-200">
                <div className="flex items-center space-x-6">
                    <Link href={'/'}>
                        <h1 className="text-xl font-extrabold text-black dark:text-white">algoelevate.</h1>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex justify-center items-center space-x-5 text-sm font-medium text-black dark:text-white">
                        <li>
                            <Link href={'/'}>Problems</Link>
                        </li>
                        <li>
                            <Link href={'/'}>Companies</Link>
                        </li>
                        <li>
                            <Link href={'/'}>Profile</Link>
                        </li>
                        <li>
                            <Link href={'/api/auth/signout'}>Logout</Link>
                        </li>
                    </ul>
                </div>

                {/* Desktop Right Section */}
                <div className="hidden md:flex space-x-6 justify-center items-center">
                    <Input placeholder="Search" className="border-[1.5px] border-gray-300 dark:border-gray-700 outline-none dark:bg-gray-900 bg-opacity-45 rounded-lg dark:placeholder:text-gray-200 h-8 w-64" />
                    <Link href={'https://github.com/TerminalWarlord/AlgoElevate'}>
                        <Image src={'/icons/github.svg'} alt="Github icon" width={20} height={20} className="invert dark:invert-0"/>
                    </Link>
                    <ModeToggle />
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden p-2">
                    {isMenuOpen ? (
                        <X className="h-6 w-6 text-black dark:text-white" />
                    ) : (
                        <Menu className="h-6 w-6 text-black dark:text-white" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-4">
                    <ul className="space-y-4 text-sm font-medium text-black dark:text-white">
                        <li>
                            <Link href={'/'}>Problems</Link>
                        </li>
                        <li>
                            <Link href={'/'}>Companies</Link>
                        </li>
                        <li>
                            <Link href={'/'}>Profile</Link>
                        </li>
                        <li>
                            <Link href={'/api/auth/signout'}>Logout</Link>
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <Input placeholder="Search" className="border-[1.5px] border-gray-300 dark:border-gray-700 outline-none dark:bg-gray-900 bg-opacity-45 rounded-lg dark:placeholder:text-gray-200 h-8 w-full" />
                        <div className="flex items-center space-x-4">
                            <Link href={'https://github.com/TerminalWarlord/AlgoElevate'}>
                                <Image src={'/icons/github.svg'} alt="Github icon" width={20} height={20} className="invert dark:invert-0"/>
                            </Link>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;