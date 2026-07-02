'use client'

import { motion } from 'framer-motion'
import { GiSpyglass, GiMagnifyingGlass } from 'react-icons/gi'
import { NeonButton } from './neon-button'
import { GlassCard } from './glass-card'

interface HomeScreenProps {
  onStartGame: () => void
  onShowTutorial: () => void
  onShowSettings: () => void
}

export function HomeScreen({ onStartGame, onShowTutorial, onShowSettings }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Logo and Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <motion.div
          className="relative inline-block mb-6"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative">
            <GiSpyglass className="w-24 h-24 text-neon-pink drop-shadow-[0_0_20px_rgba(255,100,200,0.6)]" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GiMagnifyingGlass className="w-10 h-10 text-neon-cyan drop-shadow-[0_0_15px_rgba(100,255,255,0.6)]" />
            </motion.div>
          </div>
        </motion.div>
        
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-neon-pink via-neon-orange to-neon-cyan bg-clip-text text-transparent">
            IMPOSTER
          </span>
        </h1>
        <p className="text-xl text-neon-cyan/80 font-medium">เกมหาสายลับ</p>
        <p className="text-muted-foreground mt-2 text-sm">ส่งต่อมือถือ เล่นได้ทันที</p>
      </motion.div>

      {/* Main Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="w-full max-w-xs space-y-4"
      >
        <NeonButton
          onClick={onStartGame}
          variant="primary"
          size="xl"
          fullWidth
        >
          เริ่มเกม
        </NeonButton>

        <NeonButton
          onClick={onShowTutorial}
          variant="secondary"
          size="lg"
          fullWidth
        >
          วิธีเล่น
        </NeonButton>

        <NeonButton
          onClick={onShowSettings}
          variant="secondary"
          size="md"
          fullWidth
          className="!bg-muted/50 !shadow-none"
        >
          ตั้งค่า
        </NeonButton>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <GlassCard className="!p-4" glow="none">
          <p className="text-sm text-muted-foreground">
            เล่นได้ <span className="text-neon-cyan font-semibold">3-12</span> คน
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            ใช้มือถือเครื่องเดียว ไม่ต้องสมัคร
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
