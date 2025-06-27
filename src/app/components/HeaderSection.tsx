'use client'
import { useAuth } from '@/app/hooks/useAuth'
import Link from 'next/link'
import SignOut from './auth/SignOut'

export default function HeaderSection() {
  const { auth } = useAuth()
  return (
    <div>
      {auth ? (
        <SignOut />
      ) : (
        <div className='flex space-x-4'>
          <Link
            href='/login'
            className='px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all'
          >
            Login
          </Link>
          <Link
            href='/register'
            className='px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md'
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  )
}
