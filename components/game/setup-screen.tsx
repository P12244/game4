'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoArrowBack, IoRemove, IoAdd, IoTime } from 'react-icons/io5'
import { GiPerson, GiSpy } from 'react-icons/gi'
import { NeonButton } from './neon-button'
import { GlassCard } from './glass-card'
import type { GameSettings, Category } from '@/lib/game-types'
import { CATEGORIES, DEFAULT_SETTINGS } from '@/lib/game-types'

interface SetupScreenProps {
  onBack: () => void
  onStart: (settings: GameSettings) => void
}

export function SetupScreen({ onBack, onStart }: SetupScreenProps) {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS)

  const updateSetting = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value }
      // Ensure imposter count is valid
      if (key === 'playerCount') {
        const maxImposters = Math.floor((value as number) / 3)
        if (newSettings.imposterCount > maxImposters) {
          newSettings.imposterCount = Math.max(1, maxImposters)
        }
      }
      return newSettings
    })
  }

  const maxImposters = Math.max(1, Math.floor(settings.playerCount / 3))

  const timerOptions = [
    { value: 60, label: '1 นาที' },
    { value: 120, label: '2 นาที' },
    { value: 180, label: '3 นาที' },
    { value: 300, label: '5 นาที' },
  ]

  return (
    <div className="min-h-screen p-6 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={onBack}
          className="p-2 rounded-full glass touch-manipulation"
        >
          <IoArrowBack className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-neon-pink">ตั้งค่าเกม</h1>
        <div className="w-10" />
      </motion.div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Player Count */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard glow="cyan">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-neon-cyan/20">
                <GiPerson className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="font-bold text-lg">จำนวนผู้เล่น</h3>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => updateSetting('playerCount', Math.max(3, settings.playerCount - 1))}
                className="p-3 rounded-xl glass touch-manipulation active:scale-95 transition-transform"
                disabled={settings.playerCount <= 3}
              >
                <IoRemove className="w-6 h-6" />
              </button>
              <span className="text-4xl font-bold text-neon-cyan">
                {settings.playerCount}
              </span>
              <button
                onClick={() => updateSetting('playerCount', Math.min(12, settings.playerCount + 1))}
                className="p-3 rounded-xl glass touch-manipulation active:scale-95 transition-transform"
                disabled={settings.playerCount >= 12}
              >
                <IoAdd className="w-6 h-6" />
              </button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">3-12 คน</p>
          </GlassCard>
        </motion.div>

        {/* Imposter Count */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard glow="pink">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-neon-pink/20">
                <GiSpy className="w-6 h-6 text-neon-pink" />
              </div>
              <h3 className="font-bold text-lg">จำนวน Imposter</h3>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => updateSetting('imposterCount', Math.max(1, settings.imposterCount - 1))}
                className="p-3 rounded-xl glass touch-manipulation active:scale-95 transition-transform"
                disabled={settings.imposterCount <= 1}
              >
                <IoRemove className="w-6 h-6" />
              </button>
              <span className="text-4xl font-bold text-neon-pink">
                {settings.imposterCount}
              </span>
              <button
                onClick={() => updateSetting('imposterCount', Math.min(maxImposters, settings.imposterCount + 1))}
                className="p-3 rounded-xl glass touch-manipulation active:scale-95 transition-transform"
                disabled={settings.imposterCount >= maxImposters}
              >
                <IoAdd className="w-6 h-6" />
              </button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">สูงสุด {maxImposters} คน</p>
          </GlassCard>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard glow="green">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-neon-green/20">
                <IoTime className="w-6 h-6 text-neon-green" />
              </div>
              <h3 className="font-bold text-lg">เวลาพูดคุย</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timerOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateSetting('timerDuration', option.value)}
                  className={`p-3 rounded-xl transition-all touch-manipulation ${
                    settings.timerDuration === option.value
                      ? 'bg-neon-green/30 border-2 border-neon-green text-neon-green'
                      : 'glass hover:bg-muted/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard glow="orange">
            <h3 className="font-bold text-lg mb-4">หมวดหมู่คำศัพท์</h3>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => updateSetting('category', category)}
                  className={`p-3 rounded-xl transition-all touch-manipulation text-sm ${
                    settings.category === category
                      ? 'bg-neon-orange/30 border-2 border-neon-orange text-neon-orange'
                      : 'glass hover:bg-muted/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Start Button - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 left-6 right-6 max-w-md mx-auto"
      >
        <NeonButton
          onClick={() => onStart(settings)}
          variant="primary"
          size="xl"
          fullWidth
        >
          เริ่มเกม!
        </NeonButton>
      </motion.div>
    </div>
  )
}
