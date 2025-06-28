'use client'

import { ArrowRight, Calendar, CheckCircle2, Circle, Clock, Flag, Tag, Timer } from 'lucide-react'
import Link from 'next/link'

interface Task {
  _id: string
  taskName: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  priority: string
  status: string
  isCompleted: boolean
  category?: string
}

const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200 shadow-red-100'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-yellow-100'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200 shadow-green-100'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 shadow-gray-100'
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${getPriorityStyles(
        priority
      )}`}
    >
      <Flag className='w-3 h-3 mr-1' />
      {priority}
    </span>
  )
}

const StatusBadge = ({ status, isCompleted }: { status: string; isCompleted: boolean }) => {
  const getStatusStyles = () => {
    if (isCompleted) {
      return 'bg-green-100 text-green-800 border-green-200 shadow-green-100'
    }
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200 shadow-blue-100'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-yellow-100'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 shadow-green-100'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 shadow-gray-100'
    }
  }

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle2 className='w-3 h-3 mr-1' />
    return <Circle className='w-3 h-3 mr-1' />
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${getStatusStyles()}`}
    >
      {getStatusIcon()}
      {isCompleted ? 'Completed' : status}
    </span>
  )
}

export default function TaskCard({ task }: { task: Task }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getDaysRemaining = () => {
    const endDate = new Date(task.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining()

  const getCardBorderColor = () => {
    switch (task.priority.toLowerCase()) {
      case 'high':
        return 'border-red-200 hover:border-red-300'
      case 'medium':
        return 'border-yellow-200 hover:border-yellow-300'
      case 'low':
        return 'border-green-200 hover:border-green-300'
      default:
        return 'border-gray-200 hover:border-gray-300'
    }
  }

  return (
    <div className='group h-full'>
      <Link href={`/tasker/${task._id}`}>
        <div
          className={`
        bg-white rounded-2xl shadow-lg border-2 ${getCardBorderColor()}
        hover:shadow-xl transition-all duration-300 
        hover:-translate-y-1 cursor-pointer h-full
        overflow-hidden relative
      `}
        >
          {/* Header with gradient background */}
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white relative overflow-hidden'>
            {/* Decorative elements */}
            <div className='absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10'></div>
            <div className='absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8'></div>

            <div className='relative z-10'>
              <div className='flex items-start justify-between mb-3'>
                <div className='flex-1 min-w-0'>
                  <h3 className='text-lg font-bold leading-tight mb-1 line-clamp-2 group-hover:text-blue-100 transition-colors'>
                    {task.taskName}
                  </h3>
                  {task.category && (
                    <div className='flex items-center gap-1 text-blue-100'>
                      <Tag className='w-3 h-3' />
                      <span className='text-xs font-medium uppercase tracking-wider'>
                        {task.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className='ml-3 flex-shrink-0'>
                  <div
                    className={`text-right ${
                      daysRemaining < 0
                        ? 'text-red-200'
                        : daysRemaining < 3
                        ? 'text-yellow-200'
                        : 'text-white'
                    }`}
                  >
                    <div className='text-xs opacity-90 mb-1'>Days left</div>
                    <div className='text-sm font-bold'>
                      {daysRemaining < 0
                        ? 'Overdue'
                        : daysRemaining === 0
                        ? 'Due Today'
                        : `${daysRemaining}d`}
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap gap-2'>
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} isCompleted={task.isCompleted} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='p-4 flex-1 flex flex-col'>
            {/* Description */}
            <div className='mb-4 flex-1'>
              <p className='text-gray-700 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-900 transition-colors'>
                {task.description}
              </p>
            </div>

            {/* Date Information */}
            <div className='grid grid-cols-2 gap-3 mb-4'>
              {/* Start Date */}
              <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100'>
                <div className='flex items-center mb-2'>
                  <div className='w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-2'>
                    <Calendar className='w-3 h-3 text-green-600' />
                  </div>
                  <span className='text-xs font-medium text-green-800'>Start</span>
                </div>
                <p className='text-sm font-semibold text-green-900'>{formatDate(task.startDate)}</p>
                {task.startTime && (
                  <div className='flex items-center gap-1 mt-1'>
                    <Clock className='w-3 h-3 text-green-600' />
                    <span className='text-xs text-green-700'>{task.startTime}</span>
                  </div>
                )}
              </div>

              {/* End Date */}
              <div className='bg-gradient-to-br from-red-50 to-rose-50 p-3 rounded-xl border border-red-100'>
                <div className='flex items-center mb-2'>
                  <div className='w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center mr-2'>
                    <Timer className='w-3 h-3 text-red-600' />
                  </div>
                  <span className='text-xs font-medium text-red-800'>End</span>
                </div>
                <p className='text-sm font-semibold text-red-900'>{formatDate(task.endDate)}</p>
                {task.endTime && (
                  <div className='flex items-center gap-1 mt-1'>
                    <Clock className='w-3 h-3 text-red-600' />
                    <span className='text-xs text-red-700'>{task.endTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer with hover effect */}
            <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
              <div className='text-xs text-gray-500'>Click to view details</div>
              <div className='flex items-center text-blue-600 group-hover:text-blue-700 transition-colors'>
                <span className='text-xs font-medium mr-1'>View Task</span>
                <ArrowRight className='w-3 h-3 group-hover:translate-x-1 transition-transform' />
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
        </div>
      </Link>
    </div>
  )
}
