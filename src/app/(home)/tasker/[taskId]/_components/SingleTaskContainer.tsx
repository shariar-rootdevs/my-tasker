'use client'

import { useGetTaskByIdQuery } from '@/features/api/apiSlice'
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Edit3,
  Flag,
  MoreHorizontal,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import AddTaskForm from '../../_components/AddTaskForm'

const LoadingState = () => (
  <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8'>
    <div className='max-w-4xl mx-auto'>
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 rounded-lg w-48 mb-8'></div>
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
          <div className='h-10 bg-gray-200 rounded-lg w-3/4 mb-6'></div>
          <div className='space-y-4 mb-8'>
            <div className='h-4 bg-gray-200 rounded w-full'></div>
            <div className='h-4 bg-gray-200 rounded w-5/6'></div>
            <div className='h-4 bg-gray-200 rounded w-4/6'></div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-20'></div>
                <div className='h-6 bg-gray-200 rounded w-32'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ErrorState = () => (
  <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 flex items-center justify-center'>
    <div className='max-w-md mx-auto text-center'>
      <div className='bg-white rounded-2xl shadow-xl border border-red-100 p-8'>
        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <AlertCircle className='w-8 h-8 text-red-600' />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>Something went wrong</h3>
        <p className='text-gray-600 mb-6'>We could not load the task details. Please try again.</p>
        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors'>
          Try Again
        </button>
      </div>
    </div>
  </div>
)

const EmptyState = () => (
  <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 flex items-center justify-center'>
    <div className='max-w-md mx-auto text-center'>
      <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <Circle className='w-8 h-8 text-gray-400' />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>No task found</h3>
        <p className='text-gray-600 mb-6'>
          The task you are looking for does not exist or has been removed.
        </p>
        <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors'>
          Go Back
        </button>
      </div>
    </div>
  </div>
)

const StatusBadge = ({ status, isCompleted }: { status: string; isCompleted: boolean }) => {
  const getStatusStyles = () => {
    if (isCompleted) {
      return 'bg-green-100 text-green-800 border-green-200'
    }
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle2 className='w-3 h-3 mr-1' />
    return <Circle className='w-3 h-3 mr-1' />
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles()}`}
    >
      {getStatusIcon()}
      {isCompleted ? 'Completed' : status}
    </span>
  )
}

const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityStyles(
        priority
      )}`}
    >
      <Flag className='w-3 h-3 mr-1' />
      {priority}
    </span>
  )
}

interface SingleTaskContainerProps {
  taskId: string
}
export default function SingleTaskContainer({ taskId }: SingleTaskContainerProps) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  console.log('The task is here in the compoentn is ', taskId)
  const { data, isLoading, isFetching, error } = useGetTaskByIdQuery(taskId)

  if (isLoading || isFetching) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState />
  }

  if (!data) {
    return <EmptyState />
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDaysRemaining = () => {
    const endDate = new Date(data.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining()

  return (
    <div>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center justify-between mb-8'>
            <Link href='/tasker'>
              <button className='flex items-center text-gray-600 hover:text-gray-900 transition-colors group cursor-pointer'>
                <ArrowLeft className='w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform' />
                Back to Tasks
              </button>
            </Link>

            <div className='flex items-center space-x-3'>
              <button
                onClick={() => setOpenDrawer(true)}
                className='p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all cursor-pointer'
              >
                <Edit3 className='w-5 h-5' />
              </button>
              <button className='p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all'>
                <MoreHorizontal className='w-5 h-5' />
              </button>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white'>
              <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                <div className='flex-1'>
                  <h1 className='text-3xl font-bold mb-3 leading-tight'>{data.taskName}</h1>
                  <div className='flex flex-wrap items-center gap-3'>
                    <PriorityBadge priority={data.priority} />
                    <StatusBadge status={data.status} isCompleted={data.isCompleted} />
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-sm opacity-90 mb-1'>Days remaining</div>
                  <div
                    className={`text-2xl font-bold ${
                      daysRemaining < 0
                        ? 'text-red-200'
                        : daysRemaining < 3
                        ? 'text-yellow-200'
                        : 'text-white'
                    }`}
                  >
                    {daysRemaining < 0
                      ? 'Overdue'
                      : daysRemaining === 0
                      ? 'Due Today'
                      : `${daysRemaining} days`}
                  </div>
                </div>
              </div>
            </div>

            <div className='p-8'>
              <div className='mb-8'>
                <h2 className='text-lg font-semibold text-gray-900 mb-3 flex items-center'>
                  <div className='w-1 h-6 bg-blue-600 rounded-full mr-3'></div>
                  Description
                </h2>
                <p className='text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100'>
                  {data.description}
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100'>
                  <div className='flex items-center mb-3'>
                    <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3'>
                      <Calendar className='w-5 h-5 text-green-600' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-green-800'>Start Date</p>
                    </div>
                  </div>
                  <p className='text-lg font-semibold text-green-900'>
                    {formatDate(data.startDate)}
                  </p>
                </div>

                <div className='bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-100'>
                  <div className='flex items-center mb-3'>
                    <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3'>
                      <Clock className='w-5 h-5 text-red-600' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-red-800'>End Date</p>
                    </div>
                  </div>
                  <p className='text-lg font-semibold text-red-900'>{formatDate(data.endDate)}</p>
                </div>

                <div className='bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100'>
                  <div className='flex items-center mb-3'>
                    <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3'>
                      <User className='w-5 h-5 text-purple-600' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-purple-800'>Assigned To</p>
                    </div>
                  </div>
                  <p className='text-lg font-semibold text-purple-900'>
                    User #{data.userId.slice(-6)}
                  </p>
                </div>
              </div>

              <div className='mt-8 pt-8 border-t border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                  <div className='w-1 h-6 bg-blue-600 rounded-full mr-3'></div>
                  Timeline
                </h2>
                <div className='space-y-4'>
                  <div className='flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mr-4'></div>
                    <div className='flex-1'>
                      <p className='font-medium text-gray-900'>Task Created</p>
                      <p className='text-sm text-gray-600'>{formatDateTime(data.createdAt)}</p>
                    </div>
                  </div>
                  <div className='flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100'>
                    <div className='w-2 h-2 bg-yellow-500 rounded-full mr-4'></div>
                    <div className='flex-1'>
                      <p className='font-medium text-gray-900'>Last Updated</p>
                      <p className='text-sm text-gray-600'>{formatDateTime(data.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openDrawer && (
        <div className='fixed inset-0 backdrop-blur-[10px] bg-black/30 transition-opacity'>
          <div
            className='fixed inset-0 backdrop-blur-[2px] transition-opacity'
            onClick={() => setOpenDrawer(false)}
          ></div>

          <div className='flex items-center justify-center p-4 min-h-screen'>
            <AddTaskForm
              isEditMode={true}
              isModal={true}
              onClose={() => setOpenDrawer(false)}
              taskData={data}
            />
          </div>
        </div>
      )}
    </div>
  )
}
