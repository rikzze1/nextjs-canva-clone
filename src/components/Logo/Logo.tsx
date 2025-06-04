'use client'

import React, { ComponentProps } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LogoVariants, variants } from './Logo.variants'

type LogoProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'fill'> &
    LogoVariants

export const Logo = ({ variant = 'small', ...props }: LogoProps) => {
    return (
        <Link href="/">
            <div className={variants({ variant })}>
                <Image
                    {...props}
                    src="/svg/logo.svg"
                    alt="logo"
                    fill
                    className="shrink hover:opacity-75 transition"
                />
            </div>
        </Link>
    )
}
