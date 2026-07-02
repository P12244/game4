'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiSpy, GiPerson } from 'react-icons/gi'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { NeonButton } from './neon-button'
import { GlassCard } from './glass-card'
import type { Player } from '@/lib/game-types'

interface RoleRevealScreenProps {
  players: Player[]
  currentPlayerIndex: number
  secretWord: string
  hint: string
  onNextPlayer: () => void
  onAllRevealed: () => void
}

type RevealState = 'waiting' | 'revealed' | 'hidden'

export function RoleRevealScreen({
  players,
  currentPlayerIndex,
  secretWord,
  hint,
  onNextPlayer,
  onAllRevealed,
}: RoleRevealScreenProps) {
  const [revealState, setRevealState] = useState<RevealState>('waiting')
  const currentPlayer = players[currentPlayerIndex]
  const isLastPlayer = currentPlayerIndex === players.length - 1

  const handleReveal = () => {
    setRevealState('revealed')
  }

  const handleHide = () => {
    setRevealState('hidden')
  }

  const handleNext = () => {
    if (isLastPlayer) {
      onAllRevealed()
    } else {
      setRevealState('waiting')
      onNextPlayer()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {revealState === 'waiting' && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center w-full max-w-sm"
          >
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="flex justify-center gap-2 mb-4">
                {players.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index < currentPlayerIndex
                        ? 'bg-neon-green'
                        : index === currentPlayerIndex
                        ? 'bg-neon-cyan animate-pulse'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">
                ผู้เล่นที่ {currentPlayerIndex + 1} / {players.length}
              </p>
            </motion.div>

            {/* Pass Phone Message */}
            <GlassCard glow="cyan" className="mb-8">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neon-cyan/30 to-neon-blue/30 flex items-center justify-center">
                  <GiPerson className="w-12 h-12 text-neon-cyan" />
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">
                ส่งต่อเครื่อง
              </h2>
              <p className="text-lg text-neon-cyan">
                ผู้เล่นคนที่ {currentPlayerIndex + 1}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                รับมือถือแล้วกดปุ่มด้านล่าง
              </p>
            </GlassCard>

            <NeonButton
              onClick={handleReveal}
              variant="secondary"
              size="xl"
              fullWidth
            >
              <span className="flex items-center justify-center gap-2">
                <IoEye className="w-6 h-6" />
                แตะเพื่อดูบทบาท
              </span>
            </NeonButton>
          </motion.div>
        )}

        {revealState === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="text-center w-full max-w-sm"
          >
            {currentPlayer.isImposter ? (
              // Imposter Card
              <GlassCard glow="pink" className="border-2 border-neon-pink/50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-pink to-red-500 flex items-center justify-center shadow-[0_0_40px_rgba(255,100,200,0.5)]">
                    <GiSpy className="w-14 h-14 text-white" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-neon-pink mb-2">
                    IMPOSTER
                  </h2>
                  <p className="text-xl text-foreground/80">
                    คุณคือสายลับ!
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    คุณไม่รู้คำลับ<br />
                    ต้องแกล้งทำเป็นรู้และหลบเลี่ยง
                  </p>
                </motion.div>
              </GlassCard>
            ) : (
              // Normal Player Card
              <GlassCard glow="cyan" className="border-2 border-neon-cyan/50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center shadow-[0_0_40px_rgba(100,255,255,0.5)]">
                    <GiPerson className="w-14 h-14 text-white" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-muted-foreground mb-2">คำลับของคุณคือ</p>
                  <h2 className="text-4xl font-bold text-neon-cyan mb-4">
                    {secretWord}
                  </h2>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-sm text-muted-foreground">คำใบ้</p>
                    <p className="text-lg text-foreground">{hint}</p>
                  </div>
                </motion.div>
              </GlassCard>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <NeonButton
                onClick={handleHide}
                variant="danger"
                size="lg"
                fullWidth
              >
                <span className="flex items-center justify-center gap-2">
                  <IoEyeOff className="w-5 h-5" />
                  ซ่อนบทบาท
                </span>
              </NeonButton>
            </motion.div>
          </motion.div>
        )}

        {revealState === 'hidden' && (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center w-full max-w-sm"
          >
            <GlassCard glow="green" className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-green/20 flex items-center justify-center">
                <IoEyeOff className="w-8 h-8 text-neon-green" />
              </div>
              <h2 className="text-xl font-bold mb-2">จำบทบาทแล้ว?</h2>
              <p className="text-muted-foreground">
                ส่งต่อให้ผู้เล่นคนถัดไป
              </p>
            </GlassCard>

            <NeonButton
              onClick={handleNext}
              variant={isLastPlayer ? 'primary' : 'secondary'}
              size="xl"
              fullWidth
            >
              {isLastPlayer ? 'เริ่มเกม!' : 'ส่งต่อผู้เล่นถัดไป'}
            </NeonButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
