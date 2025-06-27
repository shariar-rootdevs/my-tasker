'use client'

import { useGetTaskByIdQuery } from '@/features/api/apiSlice'

interface SingleTaskContainerProps {
  taskId: string
}
export default function SingleTaskContainer({ taskId }: SingleTaskContainerProps) {
  console.log('The task is here in the compoentn is ', taskId)
  const { data, isLoading, isFetching, error } = useGetTaskByIdQuery(taskId)

  if (isLoading || isFetching) {
    return (
      <div className='flex justify-center items-center py-10 text-gray-500'>Loading tasks...</div>
    )
  }

  if (error) {
    return (
      <div className='text-red-600 text-center py-10'>
        Something went wrong while loading tasks.
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className='text-gray-600 text-center py-10'>
        No tasks found. Add some tasks to get started!
      </div>
    )
  }
  console.log('the data here is now', data)
  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 text-gray-800 space-y-6 border border-gray-200'>
      <h1 className='text-2xl font-bold text-indigo-600'>{data.taskName}</h1>

      <div>
        <p className='text-sm text-gray-500'>Description:</p>
        <p className='text-base'>{data.description}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <p className='text-sm text-gray-500'>Start Date:</p>
          <p className='text-base'>{new Date(data.startDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>End Date:</p>
          <p className='text-base'>{new Date(data.endDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Priority:</p>
          <p className='text-base'>{data.priority}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Status:</p>
          <p className='text-base'>{data.status}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Completed:</p>
          <p className='text-base'>{data.isCompleted ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Created At:</p>
          <p className='text-base'>{new Date(data.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Updated At:</p>
          <p className='text-base'>{new Date(data.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
