import { Meta, StoryObj } from '@storybook/nextjs';
import { Circle, Square, Triangle } from 'lucide-react';

import { ToolShape } from '@/features/Editor/components/ToolBar/ToolShape';

const meta = {
  title: 'features/Editor/ToolShape',
  component: ToolShape,
  parameters: {
    docs: {
      description: {
        component: 'sho sho sho',
      },
    },
  },
  args: {
    onClick: () => {},
    icon: Circle,
    iconClassName: 'fill-black',
  },
} satisfies Meta<typeof ToolShape>;

export default meta;

export type Story = StoryObj<typeof ToolShape>;

export const CircleTool = {};

export const SquareTool = {
  args: {
    icon: Square,
  },
};

export const TriangleTool = {
  args: {
    icon: Triangle,
  },
};
