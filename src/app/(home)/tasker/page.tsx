import { redirect } from 'next/navigation'
import { getSession } from '../../../../lib/auth'
import TaskContainer from './_components/TaskContainer'

export default async function TaskPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  const { userId, email, firstName, lastName } = session || {}
  const user = { userId, email, firstName, lastName }

  return (
    <div>
      <TaskContainer user={user} />
    </div>
  )
}
