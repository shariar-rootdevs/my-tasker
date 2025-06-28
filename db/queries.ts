import { compare } from 'bcrypt'
import Task from '../models/task-model'
import User from '../models/user-model'
import { ITaskInput, IUserInput, IUserLoginInput } from '../types/user'
export async function createUser(user: IUserInput) {
  return await User.create(user)
}

export async function authenticateUser(credentials: IUserLoginInput) {
  const { email, password } = credentials
  const user = await User.findOne({ email })

  if (!user) {
    return null
  }

  const isValidPassword = await compare(password, user.password)

  if (!isValidPassword) {
    return null
  }
  return user
}

export async function createTask(task: ITaskInput) {
  try {
    const newTask = await Task.create(task)
    return newTask
  } catch (error) {
    console.error('Failed to create task:', error)
    throw new Error('Could not create task')
  }
}

export async function getAllTasks(userId: string) {
  try {
    const tasks = await Task.find({ userId })
    return tasks
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    throw new Error('Could not fetch tasks from database')
  }
}

export async function getTaskById(taskId: string) {
  try {
    const task = await Task.findById({ _id: taskId })
    return task
  } catch (error) {
    console.error('Failed to fetch task', error)
    throw new Error('Failed to fetch task')
  }
}

export async function deleteTaskById(taskId: string) {
  try {
    const deletedTask = await Task.findByIdAndDelete({ _id: taskId })
    return deletedTask
  } catch (error) {
    console.error('Failed to delete task', error)
    throw new Error('Failed to delete task')
  }
}
