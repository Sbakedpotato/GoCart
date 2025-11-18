import React from 'react'
import { Outlet } from 'react-router-dom'
import NotificationBar from '../components/layout/NotificationBar'
import Header from '../components/layout/Header'
import NavBar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'

const PublicLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <NotificationBar />
    <Header />
    <NavBar />
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default PublicLayout

