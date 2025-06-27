'use client'
import { useAuth } from '@/app/hooks/useAuth'
export default function SignOut() {
  const { setAuth } = useAuth()
  return (
    <div>
      <button
        type='button'
        onClick={() => setAuth(null)}
        className='px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all'
      >
        Logout
      </button>
    </div>
  )
}
