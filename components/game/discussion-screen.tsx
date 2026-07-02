'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { IoPlay, IoPause, IoRefresh, IoArrowForward } from 'react-icons/io5'
import { GiTalk, GiLightBulb } from 'react-icons/gi'
import { NeonButton } from './neon-button'
import { GlassCard } from './glass-card'

interface DiscussionScreenProps {
  timerDuration: number
  secretWord: string
  hint: string
  onTimeUp: () => void
  onSkipToVoting: () => void
}

export function DiscussionScreen({
  timerDuration,
  secretWord,
  hint,
  onTimeUp,
  onSkipToVoting,
}: DiscussionScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState(timerDuration)
  const [isPaused, setIsPaused] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = () => {
    const percentage = timeRemaining / timerDuration
    if (percentage > 0.5) return 'text-neon-green'
    if (percentage > 0.25) return 'text-neon-orange'
    return 'text-red-500'
  }

  const getProgressPercentage = () => {
    return (timeRemaining / timerDuration) * 100
  }

  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, timeRemaining, onTimeUp])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Timer Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative mb-8"
      >
        {/* Background Circle */}
        <svg className="w-64 h-64 -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - getProgressPercentage() / 100)}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--neon-cyan)" />
              <stop offset="50%" stopColor="var(--neon-green)" />
              <stop offset="100%" stopColor="var(--neon-orange)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={timeRemaining}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={`text-6xl font-bold font-mono ${getTimerColor()}`}
          >
            {formatTime(timeRemaining)}
          </motion.span>
          <span className="text-muted-foreground mt-2">
            {isPaused ? 'หยุดชั่วคราว' : 'เวลาพูดคุย'}
          </span>
        </div>
      </motion.div>

      {/* Discussion Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
          <GiTalk className="w-5 h-5 text-neon-cyan" />
          <span className="text-sm">ผลัดกันอธิบายคำลับ</span>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 mb-8"
      >
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-4 rounded-full glass touch-manipulation active:scale-95 transition-transform"
        >
          {isPaused ? (
            <IoPlay className="w-8 h-8 text-neon-green" />
          ) : (
            <IoPause className="w-8 h-8 text-neon-orange" />
          )}
        </button>
        <button
          onClick={() => setTimeRemaining(timerDuration)}
          className="p-4 rounded-full glass touch-manipulation active:scale-95 transition-transform"
        >
          <IoRefresh className="w-8 h-8 text-neon-cyan" />
        </button>
      </motion.div>

      {/* Hint Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm mb-6"
      >
        <button
          onClick={() => setShowHint(!showHint)}
          className="w-full p-4 rounded-xl glass flex items-center justify-center gap-2 touch-manipulation"
        >
          <GiLightBulb className={`w-5 h-5 ${showHint ? 'text-neon-orange' : 'text-muted-foreground'}`} />
          <span>{showHint ? 'ซ่อนคำใบ้' : 'แสดงคำใบ้'}</span>
        </button>
        
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <GlassCard glow="orange" className="!p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">คำใบ้</p>
              <p className="text-lg text-neon-orange">{hint}</p>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>

      {/* Skip to Voting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm"
      >
        <NeonButton
          onClick={onSkipToVoting}
          variant="primary"
          size="lg"
          fullWidth
        >
          <span className="flex items-center justify-center gap-2">
            ไปโหวต
            <IoArrowForward className="w-5 h-5" />
          </span>
        </NeonButton>
      </motion.div>
    </div>
  )
}
