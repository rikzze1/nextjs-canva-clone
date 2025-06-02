'use client'

import { SideBarItem } from "@/features/Editor/components/SideBar/SideBarItem"
import { LayoutTemplate } from "lucide-react"

export const SideBar = () => {
    return (
        <aside className="bg-white flex flex-col w-[100px] h-full border-r border-gray-200 overflow-y-auto">
            <ul className="flex flex-col">
                <SideBarItem
                    icon={LayoutTemplate}
                    label="Design"
                    isActive={true}
                    onClick={() => { }}
                />
            </ul>
        </aside>
    )
}
