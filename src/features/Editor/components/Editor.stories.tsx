import type { Meta, StoryObj } from '@storybook/nextjs';

import { Editor } from '@/features/Editor/components/Editor';

const meta = {
  title: 'Features/Editor',
  component: Editor,
  argTypes: {
    variant: {
      control: 'select',
      options: ['fill', 'medium', 'small'],
    },
  },
} satisfies Meta;

export default meta;

export type Story = StoryObj<typeof Editor>;

export const EditorWithTitle: Story = {
  args: {
    title: 'Canvas',
    variant: 'fill',
  },
  decorators: [
    Story => (
      <div style={{ height: '100vh', width: '100vw', padding: '10px' }}>
        <Story />
      </div>
    ),
  ],
};
