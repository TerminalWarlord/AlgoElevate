import React from 'react'
import { ScrollArea } from '../ui/scroll-area'


const tags = Array.from({ length: 60 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)


const Sidebar = () => {
    return (
        <ScrollArea className="h-screen w-64  text-white border-gray-700 border-x-[0.2px]">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                    <>
                        <div key={tag} className="text-sm">
                            {tag}
                        </div>
                    </>
                ))}
            </div>
        </ScrollArea>
    )
}

export default Sidebar
