'use client'

import React from 'react'

import {
    ChevronDown,
    Download,
    MousePointerClick,
    Redo2,
    Undo2,
} from 'lucide-react'
import { CiFileOn } from 'react-icons/ci'
import { BsCloudCheck } from 'react-icons/bs'
import { Logo } from '@/components/Logo/Logo'
import { ActiveTool } from '@/features/Editor/types'

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Hint } from '@/components/Hint/Hint'
import { cn } from '@/lib/utils'

interface NavbarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

export const NavBar = ({ activeTool, onChangeActiveTool }: NavbarProps) => {
    return (
        <nav className="w-full z-50 flex items-center p-4 h-[68px] gap-x-8 bg-white border-gray-100 border-b lg:pl-[34px]">
            <Logo variant="small" />
            <div className="w-full flex items-center gap-x-1 h-full">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-gray-200/60 cursor-pointer hover:opacity-80 transition"
                        >
                            File
                            <ChevronDown className="size-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="min-w-60 border-gray-200 bg-white border-0"
                    >
                        <DropdownMenuItem
                            onClick={() => { }}
                            className="flex items-center gap-x-2 cursor-pointer"
                        >
                            <CiFileOn className="size-8" />
                            <div className="text-xs text-muted-foreground">
                                <p>Open</p>
                                <p>Open a JSON file</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator
                    orientation="vertical"
                    className="mx-2 bg-gray-200"
                />
                <Hint label="Select" side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onChangeActiveTool('select')}
                        title="select"
                        className={cn(
                            'cursor-pointer',
                            activeTool === 'select' && 'bg-gray-100'
                        )}
                    >
                        <MousePointerClick className="size-4" />
                    </Button>
                </Hint>
                <Hint label="Undo" side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        title="undo"
                        onClick={() => { }}
                        className="cursor-pointer"
                    >
                        <Undo2 className="size-4" />
                    </Button>
                </Hint>
                <Hint label="Redo" side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        title="redo"
                        onClick={() => { }}
                        className="cursor-pointer"
                    >
                        <Redo2 className="size-4" />
                    </Button>
                </Hint>
                <Separator
                    orientation="vertical"
                    className="mx-2 bg-gray-200"
                />
                <div className="flex items-center gap-x-2">
                    <BsCloudCheck className="size-[20px] text-muted-foreground" />
                    <div className="text-xs text-gray-500">Saved</div>
                </div>
                <div className="ml-auto flex items-center gap-x-4">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="hover:bg-zinc-100 hover:cursor-pointer"
                            >
                                Export
                                <Download className="size-4 ml-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="min-w-60 border-gray-200 bg-white"
                        >
                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={() => { }}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>JSON</p>
                                    <p className="text-xs text-gray-500">
                                        Save for later editing
                                    </p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={() => { }}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>PNG</p>
                                    <p className="text-xs text-gray-500">
                                        Best sharing on the web
                                    </p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={() => { }}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>JPEG</p>
                                    <p className="text-xs text-gray-500">
                                        Best for printing
                                    </p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={() => { }}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>SVG</p>
                                    <p className="text-xs text-gray-500">
                                        Best for editing vector
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* TODO: Add user-button components */}
                </div>
            </div>
        </nav>
    )
}
