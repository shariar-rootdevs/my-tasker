'use client'
import { logout } from '@/app/actions'
export default function SignOut() {
  async function handleLogout() {
    await logout()
  }
  return (
    <div>
      <button
        onClick={handleLogout}
        className='px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all'
      >
        Logout
      </button>
    </div>
  )
}
