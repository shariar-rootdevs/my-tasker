'use client'

import { Calendar, Clock, Flag, Tag } from 'lucide-react'

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

export default function TaskCard({ task }: { task: Task }) {
  // Dynamic background patterns and colors based on priority
  const getCardStyle = () => {
    switch (task.priority) {
      case 'High':
        return {
          gradient: 'bg-gradient-to-br from-red-500/20 via-pink-500/30 to-rose-600/20',
          pattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1)_0%,transparent_50%)]',
          accent: 'border-red-400/30',
          glow: 'shadow-red-500/20',
        }
      case 'Medium':
        return {
          gradient: 'bg-gradient-to-br from-amber-500/20 via-orange-500/30 to-yellow-600/20',
          pattern:
            'bg-[radial-gradient(circle_at_30%_70%,rgba(245,158,11,0.1)_0%,transparent_50%)]',
          accent: 'border-amber-400/30',
          glow: 'shadow-amber-500/20',
        }
      default:
        return {
          gradient: 'bg-gradient-to-br from-emerald-500/20 via-teal-500/30 to-green-600/20',
          pattern:
            'bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.1)_0%,transparent_50%)]',
          accent: 'border-emerald-400/30',
          glow: 'shadow-emerald-500/20',
        }
    }
  }

  const cardStyle = getCardStyle()

  // Status color mapping
  const getStatusStyle = () => {
    switch (task.status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-100 border border-green-400/30'
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-100 border border-blue-400/30'
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30'
      default:
        return 'bg-gray-500/20 text-gray-100 border border-gray-400/30'
    }
  }

  const getPriorityStyle = () => {
    switch (task.priority) {
      case 'High':
        return 'bg-red-500/20 text-red-100 border border-red-400/30'
      case 'Medium':
        return 'bg-amber-500/20 text-amber-100 border border-amber-400/30'
      default:
        return 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/30'
    }
  }

  return (
    <div className='group perspective-1000'>
      <div
        className={`
          relative rounded-2xl overflow-hidden 
          shadow-xl hover:shadow-2xl transition-all 
          duration-500 hover:-translate-y-2 hover:rotate-1
          border ${cardStyle.accent}
          ${cardStyle.gradient}
          ${cardStyle.glow}
          backdrop-blur-sm
          transform-gpu
          h-full min-h-[320px]
        `}
      >
        {/* Animated background patterns */}
        <div className={`absolute inset-0 ${cardStyle.pattern} animate-pulse`}></div>

        {/* Geometric decorations */}
        <div className='absolute top-0 right-0 w-32 h-32 opacity-10'>
          <div className='absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow'></div>
          <div className='absolute top-8 right-8 w-8 h-8 bg-white/10 rounded-full'></div>
        </div>

        {/* Bottom left decoration */}
        <div className='absolute bottom-0 left-0 w-24 h-24 opacity-10'>
          <div className='absolute bottom-4 left-4 w-12 h-12 border border-white/20 rotate-45'></div>
          <div className='absolute bottom-2 left-2 w-6 h-6 bg-white/10 rotate-12'></div>
        </div>

        {/* Main content */}
        <div className='relative z-10 p-6 h-full flex flex-col backdrop-blur-sm bg-black/10'>
          {/* Header section */}
          <div className='flex justify-between items-start mb-4'>
            <div className='flex-1'>
              <h3 className='text-xl font-bold text-white drop-shadow-lg mb-2 line-clamp-2 group-hover:text-white/90 transition-colors'>
                {task.taskName}
              </h3>
              {task.category && (
                <div className='flex items-center gap-1 text-white/70'>
                  <Tag className='w-3 h-3' />
                  <span className='text-xs font-medium uppercase tracking-wider'>
                    {task.category}
                  </span>
                </div>
              )}
            </div>

            {/* Priority indicator */}
            <div className='flex items-center gap-1'>
              <Flag className='w-4 h-4 text-white/80' />
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityStyle()}`}>
                {task.priority}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className='flex-1 mb-6'>
            <p className='text-white/80 text-sm leading-relaxed line-clamp-3 group-hover:text-white/90 transition-colors'>
              {task.description}
            </p>
          </div>

          {/* Timeline section */}
          <div className='mt-auto'>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div className='bg-black/20 rounded-lg p-3 border border-white/10'>
                <div className='flex items-center gap-2 mb-1'>
                  <Calendar className='w-3 h-3 text-white/60' />
                  <span className='text-white/60 text-xs uppercase tracking-wider font-medium'>
                    Start
                  </span>
                </div>
                <p className='text-white font-semibold text-sm'>
                  {new Date(task.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                {task.startTime && (
                  <div className='flex items-center gap-1 mt-1'>
                    <Clock className='w-3 h-3 text-white/50' />
                    <span className='text-white/70 text-xs'>{task.startTime}</span>
                  </div>
                )}
              </div>

              <div className='bg-black/20 rounded-lg p-3 border border-white/10'>
                <div className='flex items-center gap-2 mb-1'>
                  <Calendar className='w-3 h-3 text-white/60' />
                  <span className='text-white/60 text-xs uppercase tracking-wider font-medium'>
                    End
                  </span>
                </div>
                <p className='text-white font-semibold text-sm'>
                  {new Date(task.endDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                {task.endTime && (
                  <div className='flex items-center gap-1 mt-1'>
                    <Clock className='w-3 h-3 text-white/50' />
                    <span className='text-white/70 text-xs'>{task.endTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status indicator */}
            <div className='flex justify-center'>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle()} backdrop-blur-sm`}
              >
                {task.status}
              </span>
            </div>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>
    </div>
  )
}
