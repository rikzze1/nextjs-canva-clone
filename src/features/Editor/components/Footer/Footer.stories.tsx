import { Meta, StoryObj } from '@storybook/nextjs';

import { Footer } from './Footer';

const meta = {
  title: 'features/Editor/Footer',
  component: Footer,
} satisfies Meta;

export default meta;

export type Story = StoryObj<typeof Footer>;

export const DefaultFooter: Story = {
  args: {},
};
