import { cva, type VariantProps } from 'class-variance-authority'

const variant = {
    large: 'size-25',
    medium: 'size-15',
    small: 'size-10',
}

export const variants = cva('relative shrink-0', {
    variants: {
        variant,
    },
    defaultVariants: {
        variant: 'small',
    },
})

export type LogoVariants = VariantProps<typeof variants>
