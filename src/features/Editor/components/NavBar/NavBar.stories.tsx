import { Meta, StoryObj } from '@storybook/react'
import { NavBar } from './NavBar'

const meta = {
    title: 'features/NavBar',
    component: NavBar,
} satisfies Meta

export default meta

export type Story = StoryObj<typeof NavBar>

export const DefaultNavBar: Story = {
    args: {
        title: 'test',
    },
}
