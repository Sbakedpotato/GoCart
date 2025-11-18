import React from 'react'
import { notificationCopy } from '../../data/mockData'

const NotificationBar = () => (
  <div className="bg-brand-blue text-white text-sm px-4 py-2 text-center">
    {notificationCopy}
  </div>
)

export default NotificationBar

