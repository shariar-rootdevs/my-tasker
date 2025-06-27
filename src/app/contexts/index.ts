'use client'
import { createContext } from 'react'
import { IAuthUser } from '../../../types/user'

interface AuthContextType {
  auth: IAuthUser | null
  setAuth: (user: IAuthUser | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
