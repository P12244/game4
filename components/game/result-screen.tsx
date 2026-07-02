'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { GiTrophy, GiSpy, GiPerson, GiSkullCrossedBones } from 'react-icons/gi'
import { NeonButton } from './neon-button'
import { GlassCard } from './glass-card'
import type { Player } from '@/lib/game-types'

interface ResultScreenProps {
  winner: 'imposters' | 'villagers'
  players: Player[]
  secretWord: string
  onPlayAgain: () => void
  onBackToHome: () => void
}

export function ResultScreen({
  winner,
  players,
  secretWord,
  onPlayAgain,
  onBackToHome,
}: ResultScreenProps) {
  const imposters = players.filter(p => p.isImposter)
  const villagers = players.filter(p => !p.isImposter)

  useEffect(() => {
    // Fire confetti
    const duration = 3000
    const end = Date.now() + duration

    const colors = winner === 'villagers' 
      ? ['#00ffff', '#00ff88', '#88ffff']
      : ['#ff69b4', '#ff1493', '#ff6b6b']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [winner])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="text-center w-full max-w-sm"
      >
        {/* Winner Announcement */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block mb-4"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
              winner === 'villagers'
                ? 'bg-gradient-to-br from-neon-cyan to-neon-green shadow-[0_0_50px_rgba(100,255,255,0.5)]'
                : 'bg-gradient-to-br from-neon-pink to-red-500 shadow-[0_0_50px_rgba(255,100,200,0.5)]'
            }`}>
              {winner === 'villagers' ? (
                <GiTrophy className="w-12 h-12 text-white" />
              ) : (
                <GiSpy className="w-12 h-12 text-white" />
              )}
            </div>
          </motion.div>

          <h1 className={`text-4xl font-bold mb-2 ${
            winner === 'villagers' ? 'text-neon-cyan' : 'text-neon-pink'
          }`}>
            {winner === 'villagers' ? 'ชาวบ้านชนะ!' : 'Imposter ชนะ!'}
          </h1>
          <p className="text-muted-foreground">
            {winner === 'villagers' 
              ? 'จับสายลับได้สำเร็จ'
              : 'สายลับหลบรอดไปได้'}
          </p>
        </motion.div>

        {/* Secret Word Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard glow="cyan" className="text-center">
            <p className="text-sm text-muted-foreground mb-2">คำลับคือ</p>
            <p className="text-3xl font-bold text-neon-cyan">{secretWord}</p>
          </GlassCard>
        </motion.div>

        {/* Player Roles Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold mb-4">บทบาททั้งหมด</h3>
          
          {/* Imposters */}
          <div className="mb-4">
            <p className="text-sm text-neon-pink mb-2 flex items-center justify-center gap-2">
              <GiSpy className="w-4 h-4" />
              Imposter
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {imposters.map(player => (
                <motion.div
                  key={player.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="px-4 py-2 rounded-xl bg-neon-pink/20 border border-neon-pink/50 flex items-center gap-2"
                >
                  <GiSkullCrossedBones className="w-4 h-4 text-neon-pink" />
                  <span>ผู้เล่น {player.id}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Villagers */}
          <div>
            <p className="text-sm text-neon-cyan mb-2 flex items-center justify-center gap-2">
              <GiPerson className="w-4 h-4" />
              ชาวบ้าน
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {villagers.map(player => (
                <motion.div
                  key={player.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="px-4 py-2 rounded-xl bg-neon-cyan/20 border border-neon-cyan/50"
                >
                  ผู้เล่น {player.id}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <NeonButton
            onClick={onPlayAgain}
            variant="primary"
            size="xl"
            fullWidth
          >
            เล่นอีกครั้ง
          </NeonButton>
          
          <NeonButton
            onClick={onBackToHome}
            variant="secondary"
            size="lg"
            fullWidth
            className="!bg-muted/50 !shadow-none"
          >
            กลับหน้าแรก
          </NeonButton>
        </motion.div>
      </motion.div>
    </div>
  )
}
