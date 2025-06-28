'use client'

import { useCreateTaskMutation } from '@/features/api/apiSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Flag,
  Plus,
  RotateCcw,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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

type AddTaskData = z.infer<typeof taskSchema>

interface AddTaskFormProps {
  isModal?: boolean
  onClose?: () => void
}

export default function AddTaskForm({ isModal = false, onClose }: AddTaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddTaskData>({
    resolver: zodResolver(taskSchema),
    mode: 'onTouched',
  })

  const [createTask] = useCreateTaskMutation()

  const onSubmit = async (data: AddTaskData) => {
    try {
      const result = await createTask(data).unwrap()
      console.log(result)
      toast.success('Task created successfully!')
      reset()

      if (isModal && onClose) {
        onClose()
      }
    } catch (error) {
      console.error('Task creation failed:', error)
      toast.error('Failed to create task. Please try again.')
    }
  }

  const handleReset = () => {
    reset()
  }

  const containerClasses = isModal
    ? 'w-full max-w-4xl mx-auto'
    : 'min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4'

  const backgroundElements = !isModal && (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl'></div>
      <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl'></div>
      <div className='absolute top-3/4 left-1/2 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl'></div>
      <div className='absolute top-1/2 right-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl'></div>
    </div>
  )

  const decorativeElements = !isModal && (
    <>
      <div className='absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 rotate-12'></div>
      <div className='absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl opacity-30 -rotate-12'></div>
      <div className='absolute top-1/2 -left-8 w-6 h-6 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-lg opacity-25 rotate-45'></div>
    </>
  )

  return (
    <div className={containerClasses}>
      {backgroundElements}

      <div className={`relative ${isModal ? 'w-full' : 'w-full max-w-4xl mx-auto'}`}>
        <div className='bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12'></div>
            <div className='absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full'></div>

            <div className='relative z-10 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
                  <Plus className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold'>Create New Task</h2>
                  <p className='text-blue-100 text-sm'>Add a new task to your project workflow</p>
                </div>
              </div>

              {isModal && onClose && (
                <button
                  onClick={onClose}
                  className='w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-105'
                >
                  <X className='w-5 h-5 text-white' />
                </button>
              )}
            </div>
          </div>

          <div className='p-6'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Task Name <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <FileText
                        className={`w-4 h-4 ${errors.taskName ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <input
                      type='text'
                      {...register('taskName')}
                      placeholder='Enter task name'
                      className={`
                        w-full pl-10 pr-3 py-3 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 placeholder-gray-500 text-sm
                        ${
                          errors.taskName
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                  </div>
                  {errors.taskName && (
                    <div className='flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-3 bg-red-500 rounded-full'></div>
                      {errors.taskName.message}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Priority <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Flag
                        className={`w-4 h-4 ${errors.priority ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <select
                      defaultValue={'High'}
                      {...register('priority')}
                      className={`
                        w-full pl-10 pr-3 py-3 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 text-sm
                        ${
                          errors.priority
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    >
                      <option value=''>Select Priority</option>
                      <option value='Low' className='text-green-600'>
                        🟢 Low
                      </option>
                      <option value='Medium' className='text-yellow-600'>
                        🟡 Medium
                      </option>
                      <option value='High' className='text-orange-600'>
                        🟠 High
                      </option>
                      <option value='Urgent' className='text-red-600'>
                        🔴 Urgent
                      </option>
                    </select>
                  </div>
                  {errors.priority && (
                    <div className='flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-3 bg-red-500 rounded-full'></div>
                      {errors.priority.message}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Start Date <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Calendar
                        className={`w-4 h-4 ${errors.startDate ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <input
                      type='date'
                      {...register('startDate')}
                      className={`
                        w-full pl-10 pr-3 py-3 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 text-sm
                        ${
                          errors.startDate
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                  </div>
                  {errors.startDate && (
                    <div className='flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-3 bg-red-500 rounded-full'></div>
                      {errors.startDate.message}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    End Date <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Clock
                        className={`w-4 h-4 ${errors.endDate ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <input
                      type='date'
                      {...register('endDate')}
                      className={`
                        w-full pl-10 pr-3 py-3 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 text-sm
                        ${
                          errors.endDate
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                  </div>
                  {errors.endDate && (
                    <div className='flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-3 bg-red-500 rounded-full'></div>
                      {errors.endDate.message}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Status <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <CheckCircle
                        className={`w-4 h-4 ${errors.status ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <select
                      defaultValue={'Pending'}
                      {...register('status')}
                      className={`
                        w-full pl-10 pr-3 py-3 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 text-sm
                        ${
                          errors.status
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    >
                      <option value=''>Select Status</option>
                      <option value='Pending' className='text-gray-600'>
                        ⏳ Pending
                      </option>
                      <option value='In Progress' className='text-blue-600'>
                        🔄 In Progress
                      </option>
                      <option value='Completed' className='text-green-600'>
                        ✅ Completed
                      </option>
                    </select>
                  </div>
                  {errors.status && (
                    <div className='flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-3 bg-red-500 rounded-full'></div>
                      {errors.status.message}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>Assigned To</label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <User className='w-4 h-4 text-gray-400' />
                    </div>
                    <input
                      type='text'
                      {...register('assignedTo')}
                      placeholder='Team member name'
                      className='
                        w-full pl-10 pr-3 py-3 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 placeholder-gray-500 text-sm
                        border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300
                      '
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-semibold text-gray-700'>
                  Description <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <textarea
                    {...register('description')}
                    rows={3}
                    placeholder='Detailed task description...'
                    className={`
                      w-full p-3 
                      border-2 rounded-xl 
                      bg-gray-50/50 backdrop-blur-sm
                      focus:outline-none focus:ring-4 focus:bg-white
                      transition-all duration-200
                      text-gray-900 placeholder-gray-500 text-sm
                      resize-none
                      ${
                        errors.description
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                      }
                    `}
                  />
                </div>
                {errors.description && (
                  <div className='flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200'>
                    <div className='w-1 h-3 bg-red-500 rounded-full'></div>
                    {errors.description.message}
                  </div>
                )}
              </div>

              <div className='flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200'>
                <button
                  type='button'
                  onClick={handleReset}
                  className='
                    px-5 py-2.5 
                    text-sm font-semibold text-gray-700 
                    bg-gray-100/80 backdrop-blur-sm
                    rounded-xl border-2 border-gray-200
                    hover:bg-gray-200/80 hover:border-gray-300
                    focus:outline-none focus:ring-4 focus:ring-gray-500/20
                    transition-all duration-200
                    flex items-center justify-center gap-2
                    hover:scale-[1.02]
                  '
                >
                  <RotateCcw className='w-4 h-4' />
                  Reset Form
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`
                    px-6 py-2.5 
                    text-sm font-semibold text-white
                    bg-gradient-to-r from-blue-600 to-purple-600
                    hover:from-blue-700 hover:to-purple-700
                    focus:outline-none focus:ring-4 focus:ring-blue-500/20
                    rounded-xl
                    transform transition-all duration-200
                    hover:scale-[1.02] hover:shadow-xl
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    flex items-center justify-center gap-2
                    relative overflow-hidden
                    ${isSubmitting ? 'animate-pulse' : ''}
                  `}
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>

                  {isSubmitting ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                      <span className='relative z-10'>Creating Task...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className='w-4 h-4 relative z-10' />
                      <span className='relative z-10'>Create Task</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {decorativeElements}
      </div>
    </div>
  )
}
