import { Meta, StoryObj } from '@storybook/nextjs';

import { SideBar } from '@/features/Editor/components/SideBar/SideBar';

const meta = {
  title: 'features/Editor/SideBar',
  component: SideBar,
} satisfies Meta;

export default meta;

export type Story = StoryObj<typeof SideBar>;

export const DefaultSideBar = {};
