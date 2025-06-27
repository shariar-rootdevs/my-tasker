'use client'
import { useAuth } from '../hooks/useAuth'
export default function TaskPage() {
  const { auth } = useAuth()
  console.log(auth)
  return (
    <div>
      <p>This is the task page</p>
      <p>Welcome, {auth ? auth.firstName : 'Guest'}!</p>
    </div>
  )
}
