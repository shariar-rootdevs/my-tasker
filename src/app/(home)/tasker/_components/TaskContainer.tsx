'use client'
import { FaUserCircle } from 'react-icons/fa'
import TaskList from './TaskList'

interface User {
  userId: string
  email: string
  firstName: string
  lastName: string
}

export default function TaskContainer({ user }: { user: User }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 items-center'>
      <header className='sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md py-2 '>
        <div className='flex items-center justify-between px-4 py-2'>
          <div className='flex items-center gap-2'>
            <FaUserCircle className='text-2xl text-purple-700' />
            <p className='text-sm font-medium text-gray-800'>
              {user.firstName} {user.lastName}
            </p>
          </div>

          <button className='px-4 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:from-purple-700 hover:to-indigo-700 transition'>
            Add New Task
          </button>
        </div>
      </header>

      <main className='p-4 sm:p-6'>
        <TaskList />
      </main>
    </div>
  )
}
