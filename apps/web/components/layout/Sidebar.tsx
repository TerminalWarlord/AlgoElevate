import React from 'react'
import { ScrollArea } from '../ui/scroll-area'


const tags = Array.from({ length: 5 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)


const Sidebar = () => {
    const items = <>{tags.map((tag) => (
        <>
            <div key={tag} className="text-sm hover:bg-gray-900 hover:bg-opacity-15 px-3 py-2 rounded-sm my-2 cursor-pointer hover:text-red-500">
                {tag}
            </div>
        </>
    ))}</>
    return (
        <ScrollArea className="hidden sm:block h-screen w-64 text-white border-gray-700 border-x-[0.3px] border-opacity-15 dark:border-opacity-90">
            <div className="py-4 mx-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                <h4 className="mb-4 font-medium leading-none uppercase text-gray-300">Problems</h4>
                {items}
            </div>

            <div className="py-4 mx-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                <h4 className="mb-4 font-medium leading-none uppercase text-gray-300">Favourites</h4>
                {items}
            </div>
        </ScrollArea>
    )
}

export default Sidebar
