import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Link from 'next/link';


// const tags = Array.from({ length: 5 }).map(
//     (_, i, a) => `v1.2.0-beta.${a.length - i}`
// )

interface ItemDetails {
    title: string;
    path: string
}

interface MenuItems {
    menuTitle: string;
    items: ItemDetails[]

}

const Sidebar: React.FC<{ menuItems: MenuItems[] }> = ({ menuItems }) => {
    return (
        <ScrollArea className="h-screen w-64  text-white border-gray-700 border-x-[0.2px]">
            {menuItems && menuItems.map(menuItem => {
                return <div className="py-4 mx-3" style={{ fontFamily: 'var(--font-manrope)' }}>
                    <h4 className="mb-4 font-bold leading-none uppercase dark:text-gray-200 text-gray-900">{menuItem.menuTitle}</h4>
                    {menuItem.items && menuItem.items.map(item => {
                        return <Link href={item.path} key={item.path} className="block text-sm dark:text-gray-400 text-gray-700 dark:hover:bg-gray-900 dark:hover:bg-opacity-30 hover:bg-gray-50 px-1.5 py-2 rounded cursor-pointer hover:text-red-500">
                            {item.title}
                        </Link>
                    })}

                </div>
            })}

        </ScrollArea>
    )
}

export default Sidebar
