import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

// const Navbar = () => {
//     return (
//         <div className="bg-black h-16 flex justify-between items-center px-[100px] sticky z-100">
//             <div>
//                 <h1 className="text-white text-2xl font-odibee-sans" style={{ fontFamily: 'var(--font-odibee-sans)' }}>AlgoElevate</h1>
//             </div>
//             <div className="space-x-4" style={{ fontFamily: 'var(--font-poppins)' }}>
//                 <button className="text-white bg-[#FF2F51] rounded-3xl px-3 py-2">Login</button>
//                 <button className="text-white border-bg-[#F2F2F2] border-2 rounded-3xl px-3 py-2">Register</button>
//             </div>
//         </div>
//     );
// }

const Navbar = () => {
    return (
        <div
            className="w-full bg-black h-12 px-[150px] flex justify-between items-center text-gray-200 border-b-[0.2px] border-gray-900 sticky top-0"
            style={{ fontFamily: "var(--font-manrope)" }}
        >
            <div className="flex space-x-6">
                <div>
                    <h1 className="text-xl font-extrabold text-white">algoelevate.</h1>

                </div>
                <ul className="flex justify-center items-center space-x-5 text-sm font-medium">
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
            <div className="flex space-x-6">
                <Input placeholder="Search" className="border-[1.5px] border-gray-700 outline-none bg-gray-900 bg-opacity-45 rounded-lg placeholder:text-gray-200 h-8 w-64" />
                <Image src={'/icons/github.svg'} alt="github icon" width={20} height={20} />
                <Image src={'/icons/light.svg'} alt="github icon" width={20} height={20} />
            </div>

        </div>
    )
}


export default Navbar;
