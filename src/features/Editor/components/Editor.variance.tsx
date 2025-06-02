import { cva, type VariantProps } from 'class-variance-authority'

const variant = {
    fill: 'h-[calc(100%-124px)]',
    medium: 'h-96 min-h-[400px]',
    small: 'h-64 min-h-[200px]',
}

export const variants = cva('w-full', {
    variants: {
        variant,
    },
    defaultVariants: {
        variant: 'fill',
    },
})

export type EditorVariants = VariantProps<typeof variants>
