import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET is missing in environment variables')
}

const devSecret = '9d22a27f63b440fd8adfac1cfa0122eaa264e99c2b72d3a7f83bb57e7e5f8c78'
const secret = JWT_SECRET || devSecret

interface TokenPayload {
  userId: string
  email: string
  firstName: string
  lastName: string
  iat?: number
  exp?: number
}

export function verifyToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error('JWT verification failed', err.message)
        return reject(new Error('Invalid or expired token'))
      }
      resolve(decoded as TokenPayload)
    })
  })
}

export async function getSession(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('authToken')?.value

    if (!token) {
      console.log('No auth token found in cookies')
      return null
    }

    const decoded = await verifyToken(token)
    return decoded
  } catch (error) {
    console.error('Session validation error:', error)
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}
