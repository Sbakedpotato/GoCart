import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'

const NotificationBar = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    api
      .getNotification()
      .then((data) => setMessage(data?.message || ''))
      .catch(() => setMessage(''))
  }, [])

  if (!message) return null
  return <div className="bg-brand-blue px-4 py-2 text-center text-sm text-white">{message}</div>
}

export default NotificationBar
