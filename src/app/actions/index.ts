'use server'
import { hash } from 'bcrypt'
import { redirect } from 'next/navigation'
import { authenticateUser, createUser } from '../../../db/queries'
import { IUserInput, IUserLoginInput } from '../../../types/user'

async function registerUser(userData: IUserInput) {
  const hashedPassword = await hash(userData.password, 10)
  await createUser({ ...userData, password: hashedPassword })
  redirect('/login')
}

async function verifyUserLogin(loginData: IUserLoginInput) {
  const isValid = await authenticateUser(loginData)

  if (isValid) {
    return { success: true }
  } else {
    throw new Error('Invalid email or password')
  }
}

export { registerUser, verifyUserLogin }
