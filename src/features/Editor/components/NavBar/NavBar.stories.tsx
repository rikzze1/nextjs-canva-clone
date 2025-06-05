import { Meta, StoryObj } from '@storybook/nextjs';

import { NavBar } from '@/features/Editor/components/NavBar/NavBar';

const meta = {
  title: 'features/NavBar',
  component: NavBar,
} satisfies Meta;

export default meta;

export type Story = StoryObj<typeof NavBar>;

export const DefaultNavBar: Story = {};
