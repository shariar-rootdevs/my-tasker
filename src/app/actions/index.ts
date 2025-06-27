'use server'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authenticateUser, createUser } from '../../../db/queries'
import { IUserInput, IUserLoginInput } from '../../../types/user'

const JWT_SECRET =
  process.env.JWT_SECRET || '9d22a27f63b440fd8adfac1cfa0122eaa264e99c2b72d3a7f83bb57e7e5f8c78'

async function registerUser(userData: IUserInput) {
  const hashedPassword = await hash(userData.password, 10)
  await createUser({ ...userData, password: hashedPassword })
  redirect('/login')
}
async function verifyUserLogin(loginData: IUserLoginInput) {
  try {
    const user = await authenticateUser(loginData)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      JWT_SECRET,
      { expiresIn: '1d' }
    )
    const cookieStore = await cookies()
    cookieStore.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    throw error instanceof Error ? error : new Error('Login failed')
  }
}

async function logout() {
  const cookieStore = await cookies()
  cookieStore.set('authToken', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })

  redirect('/')
}
export { logout, registerUser, verifyUserLogin }
