'use client'
import { ReactNode, useState } from 'react'
import { IAuthUser } from '../../../types/user'
import { AuthContext } from '../contexts'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<IAuthUser | null>(null)

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}
