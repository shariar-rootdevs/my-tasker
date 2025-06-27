'use client'

import { logout } from '@/app/actions'
import Link from 'next/link'

export default function SignOut() {
  async function handleLogout() {
    await logout()
  }

  return (
    <div className='flex gap-2'>
      <Link
        href='/tasker'
        className='px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center'
      >
        Task Board
      </Link>

      <button
        onClick={handleLogout}
        className='px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all'
      >
        Logout
      </button>
    </div>
  )
}
