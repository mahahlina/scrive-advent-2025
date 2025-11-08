import React, { useState, useEffect } from 'react'
import { GiftTag } from './GiftTag'
import { NameEntryModal } from './NameEntryModal'
import { getCookie, setCookie, getFirstOpener, setFirstOpener } from './utils/cookies'
import './App.css'

interface DayData {
  day: number
  title: string
  content: string
}

// Declare Snow class for TypeScript
declare global {
  interface Window {
    Snow: any;
  }
}

function App() {
  const [days, setDays] = useState<DayData[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState<string | null>(null)
  const [showNameModal, setShowNameModal] = useState(false)

  useEffect(() => {
    fetch('./advent/data.json')
      .then(response => response.json())
      .then(data => {
        setDays(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data.json', err)
        setLoading(false)
      })
  }, [])

  // Check for stored user name on mount
  useEffect(() => {
    const storedName = getCookie('advent_user_name')
    if (storedName) {
      setUserName(storedName)
      setShowNameModal(false)
    } else {
      setShowNameModal(true)
    }
  }, [])

  // Initialize snowflakes effect
  useEffect(() => {
    const initializeSnow = () => {
      if (window.Snow) {
        new window.Snow({
          iconColor: '#a6e7ff',
          iconSize: 8,
          showSnowBalls: true,
          showSnowflakes: true,
          countSnowflake: 100
        })
      }
    }

    // Wait for the Snow script to load
    const checkSnow = () => {
      if (window.Snow) {
        initializeSnow()
      } else {
        setTimeout(checkSnow, 100)
      }
    }

    checkSnow()
  }, [])

  const handleNameSubmit = (name: string) => {
    setUserName(name)
    setCookie('advent_user_name', name, 30)
    setShowNameModal(false)
  }

  const handleDayClick = (day: number, content: string, title: string) => {
    if (!userName) {
      setShowNameModal(true)
      return
    }

    // Check if this is the first time this day is being opened
    const firstOpener = getFirstOpener(day)
    const isFirstTime = !firstOpener

    if (isFirstTime) {
      // Record this user as the first opener
      setFirstOpener(day, userName)
    }

    // Build message with first opener info
    let message = `${title}\n\n${content}`

    if (isFirstTime) {
      message = `🎉 Congratulations! You're the first to open day ${day}!\n\n${message}`
    } else if (firstOpener !== userName) {
      message = `Day ${day} was first opened by: ${firstOpener}\n\n${message}`
    } else {
      message = `You were the first to open day ${day}!\n\n${message}`
    }

    alert(message)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="app">
      {/* Name Entry Modal */}
      {showNameModal && <NameEntryModal onNameSubmit={handleNameSubmit} />}

      {/* Gift Tag Component - Fixed in top right corner */}
      <GiftTag />

      {/* User Name Display - Top left corner */}
      {userName && (
        <div className="fixed top-4 left-4 z-30">
          <div className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm rounded-xl shadow-lg px-6 py-3 border-2 border-white/50">
            <p className="text-sm text-gray-600 mb-1">Welcome,</p>
            <p className="text-lg font-semibold" style={{ color: '#DC2626' }}>
              {userName}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-8 mt-16">
        {/* Title Section */}
        <div className="flex-1 text-center">
          <h1 className="flex items-center justify-center gap-4 text-6xl md:text-7xl lg:text-8xl font-semibold mb-2" style={{
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.05em',
            fontWeight: '600'
          }}>
            <img
              src="./resources/scrive.webp"
              alt="Scrive"
              className="inline-block"
              style={{
                height: '1.2em',
                width: 'auto',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
              }}
            />
            <span>Winter Calendar</span>
          </h1>
          <div className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light tracking-wide" style={{
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            fontWeight: '300',
            letterSpacing: '0.1em',
            marginLeft: '2rem'
          }}>
            2025
          </div>
        </div>

      </div>

      {/* Calendar */}
      <div id="calendar" className="calendar">
        {days.map((day) => {
          // Generate consistent random values based on day number for reproducibility
          const seed = day.day * 12345;
          const random1 = Math.sin(seed) * 10000;
          const random2 = Math.sin(seed * 2) * 10000;
          const random3 = Math.sin(seed * 3) * 10000;

          // Random width between 100px and 180px
          const width = 100 + (Math.abs(random1 % 1000) / 1000) * 80;
          // Random height between 80px and 160px
          const height = 80 + (Math.abs(random2 % 1000) / 1000) * 80;
          // Random border radius between 8px and 20px
          const borderRadius = 8 + (Math.abs(random3 % 1000) / 1000) * 12;

          return (
            <div
              key={day.day}
              className="day-cell cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => handleDayClick(day.day, day.content, day.title)}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: `${borderRadius}px`,
              }}
            >
              <div className="day-number">{day.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App
