import React, { useState, useEffect } from 'react'
import { GiftTag } from './GiftTag'
import { FrostyIceCube } from './FrostyIceCube'
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
  const [pickaxeMode, setPickaxeMode] = useState(false)

  useEffect(() => {
    fetch('/advent/data.json')
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

  const handleDayClick = (content: string) => {
    alert(content)
  }

  const togglePickaxeMode = () => {
    setPickaxeMode(!pickaxeMode)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={`app ${pickaxeMode ? 'pickaxe-cursor' : ''}`}>
      {/* Pickaxe Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={togglePickaxeMode}
          className={`pickaxe-button px-4 py-2 rounded-lg font-bold text-white ${
            pickaxeMode ? 'active' : ''
          }`}
        >
          ⛏️ {pickaxeMode ? 'Pickaxe Active!' : 'Get Pickaxe'}
        </button>
      </div>

      <div className="flex items-start justify-between mb-8 mt-16">
        {/* Title Section */}
        <div className="flex-1 text-center">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 relative" style={{
            color: '#FFD700',
            textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.5)',
            fontFamily: '"Brush Script MT", "Lucida Handwriting", "Kalam", "Caveat", cursive',
            fontWeight: '900',
            letterSpacing: '2px',
            transform: 'rotate(-1deg)',
            filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.3))'
          }}>
            Scrive{' '}
            <span className="inline-block relative">
              <span style={{
                textDecoration: 'line-through',
                textDecorationStyle: 'wavy',
                textDecorationColor: '#DC2626',
                textDecorationThickness: '4px',
                opacity: 0.7,
                fontSize: '0.9em'
              }}>
                Advent
              </span>
              <span style={{
                position: 'absolute',
                top: '-2.5rem',
                left: '0',
                color: '#FF6B6B',
                fontSize: '0.9em',
                fontStyle: 'italic',
                transform: 'rotate(-4deg)',
                textShadow: '3px 3px 6px rgba(0,0,0,0.6), 0 0 15px rgba(255,107,107,0.4)',
                fontWeight: '900',
                fontFamily: '"Brush Script MT", "Lucida Handwriting", "Kalam", "Caveat", cursive',
                letterSpacing: '1px',
                filter: 'drop-shadow(0 0 8px rgba(255,107,107,0.3))'
              }}>
                Winter
              </span>
            </span>{' '}
            <span className="inline-block" style={{ paddingLeft: '0.5em' }}>
              Calendar 2025
            </span>
          </h1>
          <div className="text-lg md:text-xl text-white/90 font-light tracking-wide" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
          }}>
            ✨ A magical winter journey awaits ✨
          </div>
        </div>

        {/* Gift Tag Component - Moved to the right */}
        <div className="ml-8">
          <GiftTag />
        </div>
      </div>

      {/* Calendar */}
      <div id="calendar" className="calendar">
        {days.map(day => (
          <div
            key={day.day}
            className="day-container cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => handleDayClick(day.content)}
          >
            <FrostyIceCube day={day.day} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
