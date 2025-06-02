import { Meta, StoryObj } from "@storybook/react";
import { Hint } from "./Hint";
import { Button } from "../ui/button";

const meta = {
    title: "Shared/Hint",
    component: Hint,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        side: {
            control: { type: 'select' },
            options: ['top', 'bottom', 'left', 'right'],
        },
        align: {
            control: { type: 'select' },
            options: ['start', 'center', 'end'],
        },
        sideOffset: {
            control: { type: 'number' },
        },
        alignOffset: {
            control: { type: 'number' },
        },
    },
    args: {
        label: "This is a helpful hint",
        side: 'top',
        align: 'center',
        sideOffset: 4,
        alignOffset: 0,
        children: <Button variant="outline">Hover me</Button>,
    },
} satisfies Meta<typeof Hint>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TopHint: Story = {
    args: {
        label: "Top positioned hint",
        side: 'top',
    },
};

export const BottomHint: Story = {
    args: {
        label: "Bottom positioned hint",
        side: 'bottom',
    },
};

export const LeftHint: Story = {
    args: {
        label: "Left positioned hint",
        side: 'left',
    },
};

export const RightHint: Story = {
    args: {
        label: "Right positioned hint",
        side: 'right',
    },
};

export const CustomOffset: Story = {
    args: {
        label: "Custom offset hint",
        side: 'top',
        sideOffset: 20,
        alignOffset: 10,
    },
};
