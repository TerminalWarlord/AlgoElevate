
import Link from "next/link";



const Footer = () => {
    return (
        <div
            className="w-full dark:bg-black h-12 px-[150px] flex justify-between items-center text-gray-200 border-t-[0.2px] border-opacity-10 dark:border-opacity-100 border-gray-900"
            style={{ fontFamily: "var(--font-manrope)" }}
        >
            <div className="flex space-x-6 justify-center items-center">
                <div>
                    <h1 className="text-md font-extrabold text-black dark:text-white">algoelevate.</h1>

                </div>
                <ul className="flex justify-center items-center space-x-5 text-xs font-medium text-black dark:text-white">
                    <li>
                        <Link href={'/'}>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href={'/'}>About Us</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Terms of Service</Link>
                    </li>
                </ul>
            </div>
            <div className="flex space-x-6 text-xs text-black dark:text-white">
                <span>© 2025 AlgoElevate. All rights reserved.</span>
            </div>

        </div>
    )
}


export default Footer;
