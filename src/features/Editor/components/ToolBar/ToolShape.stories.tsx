import { Meta, StoryObj } from '@storybook/react'
import { ToolShape } from '@/features/Editor/components/ToolBar/ToolShape'
import { Circle, Square, Triangle } from 'lucide-react'

const meta = {
    title: 'features/ToolShape',
    component: ToolShape,
    args: {
        onClick: () => {},
        icon: Circle,
        iconClassName: 'fill-black',
    },
}

export default meta

export type Story = StoryObj<typeof ToolShape>

export const CircleTool = {}

export const SquareTool = {
    args: {
        icon: Square,
    },
}

export const TriangleTool = {
    args: {
        icon: Triangle,
    },
}
