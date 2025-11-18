import React from 'react'
import { useCountdown } from '../../hooks/useCountdown'

const CountdownTimer = ({ durationInHours }) => {
  const { hours, minutes, seconds } = useCountdown(durationInHours)

  const format = (value) => String(value).padStart(2, '0')

  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-white">
      <span className="rounded-md bg-white/20 px-3 py-1">{format(hours)}h</span>
      <span className="rounded-md bg-white/20 px-3 py-1">{format(minutes)}m</span>
      <span className="rounded-md bg-white/20 px-3 py-1">{format(seconds)}s</span>
    </div>
  )
}

export default CountdownTimer

