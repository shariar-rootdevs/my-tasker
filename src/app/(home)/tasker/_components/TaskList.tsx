'use client'
interface Task {
  _id: string
  taskName: string
  description: string
  startDate: string
  endDate: string
  priority: string
  status: string
  isCompleted: boolean
  startTime: string
  endTime: string
}
import { useGetTasksQuery } from '@/features/api/apiSlice'
import TaskCard from './TaskCard'

export default function TaskList() {
  const { data, isLoading, isFetching, error } = useGetTasksQuery({})

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

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {data.map((task: Task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  )
}
