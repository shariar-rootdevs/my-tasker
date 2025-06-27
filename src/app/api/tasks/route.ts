import { NextRequest, NextResponse } from 'next/server'
import { createTask } from '../../../../db/queries'
import { ITaskInput } from '../../../../types/user'

export async function POST(request: NextRequest) {
  try {
    const taskData = await request.json()
    const task: ITaskInput = await createTask(taskData)
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
