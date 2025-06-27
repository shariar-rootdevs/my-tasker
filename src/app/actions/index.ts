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
  const user = await authenticateUser(loginData)

  if (user) {
    const { _id, firstName, lastName, email } = user
    return { success: true, user: { _id, firstName, lastName, email } }
  } else {
    throw new Error('Invalid email or password')
  }
}

export { registerUser, verifyUserLogin }
