import React from 'react'
import { Outlet } from 'react-router-dom'
import NotificationBar from '../components/layout/NotificationBar'
import Header from '../components/layout/Header'
import NavBar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'

const PublicLayout = () => (
  <div className="min-h-screen bg-brand-white text-brand-dark font-sans selection:bg-brand-light selection:text-brand-black">
    <NotificationBar />
    <div className="sticky top-0 z-50 w-full">
      <Header />
      <NavBar />
    </div>
    <main className="mx-auto w-full max-w-[1400px] px-6 py-12">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default PublicLayout
