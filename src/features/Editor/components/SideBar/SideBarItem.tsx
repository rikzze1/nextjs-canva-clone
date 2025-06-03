import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface SideBarItemProps {
    icon: LucideIcon
    label: string
    isActive?: boolean
    onClick: () => void
}

export const SideBarItem = ({
    icon: Icon,
    label,
    isActive,
    onClick,
}: SideBarItemProps) => {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            title={label}
            className={cn(
                'w-full h-full aspect-video cursor-pointer p-3 py-4 flex flex-col rounded-none',
                isActive && 'bg-gray-100 text-primary'
            )}
        >
            <Icon className="size-5 stroke-2 shrink-0" />
            <span className="mt-[-5px] text-xs">{label}</span>
        </Button>
    )
}
