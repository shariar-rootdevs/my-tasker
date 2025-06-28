'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const taskSchema = z.object({
  taskName: z.string().min(1, 'Task name is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  status: z.enum(['Pending', 'In Progress', 'Completed']),
  assignedTo: z.string().optional(),
})

type addTaskData = z.infer<typeof taskSchema>

export default function AddTaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<addTaskData>({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit = (data: addTaskData) => {
    console.log('Form Data:', data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' id='task-form'>
      {/* Grid layout for better organization */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Task Name */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Task Name <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <input
              type='text'
              {...register('taskName')}
              className={`block w-full rounded-md border ${
                errors.taskName
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } shadow-sm px-4 py-2.5 text-sm transition-colors`}
              placeholder='Enter task name'
            />
            {errors.taskName && (
              <p className='mt-1 text-sm text-red-600'>{errors.taskName.message}</p>
            )}
          </div>
        </div>

        {/* Priority */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Priority <span className='text-red-500'>*</span>
          </label>
          <select
            {...register('priority')}
            className={`block w-full rounded-md border ${
              errors.priority
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } shadow-sm px-4 py-2.5 text-sm transition-colors`}
          >
            <option value=''>Select Priority</option>
            <option value='Low' className='text-green-600'>
              Low
            </option>
            <option value='Medium' className='text-yellow-600'>
              Medium
            </option>
            <option value='High' className='text-orange-600'>
              High
            </option>
            <option value='Urgent' className='text-red-600'>
              Urgent
            </option>
          </select>
          {errors.priority && (
            <p className='mt-1 text-sm text-red-600'>{errors.priority.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Start Date <span className='text-red-500'>*</span>
          </label>
          <input
            type='date'
            {...register('startDate')}
            className={`block w-full rounded-md border ${
              errors.startDate
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } shadow-sm px-4 py-2.5 text-sm transition-colors`}
          />
          {errors.startDate && (
            <p className='mt-1 text-sm text-red-600'>{errors.startDate.message}</p>
          )}
        </div>

        {/* End Date */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            End Date <span className='text-red-500'>*</span>
          </label>
          <input
            type='date'
            {...register('endDate')}
            className={`block w-full rounded-md border ${
              errors.endDate
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } shadow-sm px-4 py-2.5 text-sm transition-colors`}
          />
          {errors.endDate && <p className='mt-1 text-sm text-red-600'>{errors.endDate.message}</p>}
        </div>

        {/* Status */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Status <span className='text-red-500'>*</span>
          </label>
          <select
            {...register('status')}
            className={`block w-full rounded-md border ${
              errors.status
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } shadow-sm px-4 py-2.5 text-sm transition-colors`}
          >
            <option value=''>Select Status</option>
            <option value='Pending' className='text-gray-600'>
              Pending
            </option>
            <option value='In Progress' className='text-blue-600'>
              In Progress
            </option>
            <option value='Completed' className='text-green-600'>
              Completed
            </option>
          </select>
          {errors.status && <p className='mt-1 text-sm text-red-600'>{errors.status.message}</p>}
        </div>

        {/* Assigned To */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Assigned To</label>
          <input
            type='text'
            {...register('assignedTo')}
            className='block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm px-4 py-2.5 text-sm transition-colors'
            placeholder='Team member name'
          />
        </div>
      </div>

      {/* Description (full width) */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Description <span className='text-red-500'>*</span>
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className={`block w-full rounded-md border ${
            errors.description
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } shadow-sm px-4 py-2.5 text-sm transition-colors`}
          placeholder='Detailed task description...'
        />
        {errors.description && (
          <p className='mt-1 text-sm text-red-600'>{errors.description.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className='flex justify-end space-x-3 pt-2'>
        <button
          type='button'
          onClick={() => reset()}
          className='px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors'
        >
          Reset
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className={`px-4 py-2.5 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <span className='flex items-center'>
              <svg
                className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create Task'
          )}
        </button>
      </div>
    </form>
  )
}
