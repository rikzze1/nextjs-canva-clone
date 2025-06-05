import { Meta, StoryObj } from '@storybook/nextjs';

import { Logo } from '@/components/Logo/Logo';

const meta = {
  title: 'Shared/Logo',
  component: Logo,
  argTypes: {
    variant: {
      control: 'select',
      options: ['large', 'medium', 'small'],
    },
  },
} satisfies Meta;

export default meta;

export type Story = StoryObj<typeof Logo>;

export const LageLogo: Story = {
  args: {
    variant: 'large',
  },
};

export const MediumLogo: Story = {
  args: {
    variant: 'medium',
  },
};

export const SmallLogo: Story = {
  args: {
    variant: 'small',
  },
};
