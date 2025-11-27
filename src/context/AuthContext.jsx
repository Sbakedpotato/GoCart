import React, { createContext, useContext, useEffect, useState } from 'react'
import { login as apiLogin, register as apiRegister } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        setUser(null)
      }
    }
  }, [])

  const handleAuth = (data) => {
    if (!data?.token || !data?.user) throw new Error('Invalid auth response')
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const login = async (email, password) => {
    const data = await apiLogin(email, password)
    handleAuth(data)
    return data.user
  }

  const register = async (name, email, password) => {
    const data = await apiRegister(name, email, password)
    handleAuth(data)
    return data.user
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
