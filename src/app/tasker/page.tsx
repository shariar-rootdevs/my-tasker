import { redirect } from 'next/navigation'
import { getSession } from '../../../lib/auth'

export default async function TaskPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div>
      <p>Welcome, {session.firstName}!</p>
    </div>
  )
}
