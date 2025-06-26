import { compare } from 'bcrypt'
import User from '../models/user-model'
import { IUserInput, IUserLoginInput } from '../types/user'
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
