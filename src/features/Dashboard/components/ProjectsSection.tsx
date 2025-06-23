'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertTriangle,
  Search,
  Loader,
  FileIcon,
  MoreHorizontal,
  CopyIcon,
  Trash,
} from 'lucide-react';

import { useGetProjects } from '@/features/Projects/services/queries/use-get-projects';

import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { useDuplicateProject } from '@/features/Projects/services/mutation/use-duplicate-project';

export const ProjectsSection = () => {
  const router = useRouter();

  const duplicateMutation = useDuplicateProject();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetProjects();

  if (status === 'pending') {
    return (
      <div className='space-y-4'>
        <h3 className='font-semibold text-lg'>Recent Projects</h3>
        <div className='flex flex-col gap-y-4 items-center justify-center h-32'>
          <Loader className='size-6 text-gray-500 animate-spin' />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='space-y-4'>
        <h3 className='font-semibold text-lg'>Recent Projects</h3>
        <div className='flex flex-col gap-y-4 items-center justify-center h-32'>
          <AlertTriangle className='size-6 text-gray-500' />
          <p className='text-gray-500 text-sm'>Failed to load projects</p>
        </div>
      </div>
    );
  }

  if (!data?.pages.length) {
    return (
      <div className='space-y-4'>
        <h3 className='font-semibold text-lg'>Recent Projects</h3>
        <div className='flex flex-col gap-y-4 items-center justify-center h-32'>
          <Search className='size-6 text-gray-500' />
          <p className='text-gray-500 text-sm'>No projets found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <h3 className='font-semibold text-zinc-800 text-xl'>Recent Projects</h3>
      <Table>
        <TableBody>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map(project => (
                <TableRow key={project.id}>
                  <TableCell
                    className='font-medium flex items-center gap-x-2 cursor-pointer'
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    <FileIcon className='size-6' />
                    {project.name}
                  </TableCell>
                  <TableCell
                    className='hidden md:table-cell cursor-pointer'
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    {project.width} x {project.height} px
                  </TableCell>
                  <TableCell
                    className='hidden md:table-cell cursor-pointer'
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button disabled={false} size='icon' variant='ghost'>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='w-60 bg-white flex flex-col gap-4 p-4 border border-gray-200 rounded-md'
                      >
                        <DropdownMenuItem
                          className='cursor-pointer'
                          disabled={duplicateMutation.isPending}
                          onClick={() => onCopy(project.id)}
                        >
                          <div className='flex flex-row items-center gap-2'>
                            <CopyIcon className='size-5' />
                            <span>Make a copy</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='cursor-pointer'
                          disabled={false}
                          onClick={() => {}}
                        >
                          <div className='flex flex-row items-center gap-2'>
                            <Trash className='size-5' />
                            <span>Delete</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className='w-full flex items-center justify-center pt-4'>
          <Button variant='ghost' onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            <span className='text-gray-500'>Load more</span>
          </Button>
        </div>
      )}
    </div>
  );
};
