import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createTask, getAllTasks } from '../../../../db/queries'
import { verifyToken } from '../../../../lib/auth'
import { ITaskInput } from '../../../../types/user'

export async function POST(request: NextRequest) {
  try {
    const taskData = await request.json()
    const task: ITaskInput = await createTask(taskData)
    return NextResponse.json(
      {
        message: 'Task created successfully',
        task,
      },
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('authToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    const userId = decoded?.userId
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    const tasks = await getAllTasks(userId)
    return NextResponse.json(tasks, { status: 200 })
  } catch (error) {
    console.error('Error fetching tasks', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}
