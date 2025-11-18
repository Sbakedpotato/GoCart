import { useEffect, useState } from 'react'

const getTimeParts = (distance) => {
  const hours = Math.floor(distance / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  return { hours, minutes, seconds }
}

export const useCountdown = (durationInHours = 4) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const distance = durationInHours * 60 * 60 * 1000
    return getTimeParts(distance)
  })

  useEffect(() => {
    const endTime = Date.now() + durationInHours * 60 * 60 * 1000
    const interval = setInterval(() => {
      const distance = endTime - Date.now()
      if (distance <= 0) {
        clearInterval(interval)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft(getTimeParts(distance))
    }, 1000)

    return () => clearInterval(interval)
  }, [durationInHours])

  return timeLeft
}

