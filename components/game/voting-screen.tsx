'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCheckmark } from 'react-icons/io5'
import { GiVote, GiPerson } from 'react-icons/gi'
import { NeonButton } from './neon-button'
import { GlassCard } from './glass-card'
import type { Player } from '@/lib/game-types'

interface VotingScreenProps {
  players: Player[]
  onVoteComplete: (votedPlayerId: number | null) => void
}

export function VotingScreen({ players, onVoteComplete }: VotingScreenProps) {
  const [votes, setVotes] = useState<Record<number, number>>({})
  const [currentVoter, setCurrentVoter] = useState(0)
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const activePlayers = players.filter(p => !p.isEliminated)
  const currentVoterPlayer = activePlayers[currentVoter]

  const handleVote = () => {
    if (selectedPlayer !== null) {
      setVotes(prev => ({
        ...prev,
        [selectedPlayer]: (prev[selectedPlayer] || 0) + 1,
      }))
    }

    if (currentVoter < activePlayers.length - 1) {
      setCurrentVoter(prev => prev + 1)
      setSelectedPlayer(null)
    } else {
      setShowResults(true)
    }
  }

  const getMostVoted = (): number | null => {
    const entries = Object.entries(votes)
    if (entries.length === 0) return null
    
    const maxVotes = Math.max(...entries.map(([, v]) => v))
    const topVoted = entries.filter(([, v]) => v === maxVotes)
    
    // If tie, return null (no elimination)
    if (topVoted.length > 1) return null
    
    return parseInt(topVoted[0][0])
  }

  const handleConfirmResults = () => {
    const mostVoted = getMostVoted()
    onVoteComplete(mostVoted)
  }

  if (showResults) {
    const mostVotedId = getMostVoted()
    const mostVotedPlayer = mostVotedId !== null ? players.find(p => p.id === mostVotedId) : null

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-neon-cyan mb-8">ผลโหวต</h2>

          {/* Vote Results */}
          <div className="space-y-3 mb-8">
            {activePlayers.map((player, index) => {
              const playerVotes = votes[player.id] || 0
              const isTopVoted = player.id === mostVotedId
              
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard
                    className={`!p-4 ${isTopVoted ? 'border-2 border-neon-pink' : ''}`}
                    glow={isTopVoted ? 'pink' : 'none'}
                    animate={false}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isTopVoted ? 'bg-neon-pink/30' : 'bg-muted/50'
                        }`}>
                          <GiPerson className={`w-6 h-6 ${isTopVoted ? 'text-neon-pink' : ''}`} />
                        </div>
                        <span className="font-medium">ผู้เล่น {player.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${isTopVoted ? 'text-neon-pink' : 'text-muted-foreground'}`}>
                          {playerVotes}
                        </span>
                        <span className="text-sm text-muted-foreground">โหวต</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>

          {/* Result Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            {mostVotedPlayer ? (
              <GlassCard glow="pink" className="text-center">
                <p className="text-lg">ผู้เล่นที่ถูกโหวตมากที่สุด</p>
                <p className="text-3xl font-bold text-neon-pink mt-2">
                  ผู้เล่น {mostVotedPlayer.id}
                </p>
              </GlassCard>
            ) : (
              <GlassCard glow="cyan" className="text-center">
                <p className="text-lg">เสมอกัน!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  ไม่มีใครถูกจับในรอบนี้
                </p>
              </GlassCard>
            )}
          </motion.div>

          <NeonButton
            onClick={handleConfirmResults}
            variant="primary"
            size="xl"
            fullWidth
          >
            ดูผลลัพธ์
          </NeonButton>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center w-full max-w-sm"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <GiVote className="w-5 h-5 text-neon-pink" />
            <span>โหวตหาสายลับ</span>
          </div>
          
          {/* Progress */}
          <div className="flex justify-center gap-2 mb-4">
            {activePlayers.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index < currentVoter
                    ? 'bg-neon-green'
                    : index === currentVoter
                    ? 'bg-neon-pink animate-pulse'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <p className="text-lg">
            <span className="text-neon-cyan">ผู้เล่น {currentVoterPlayer.id}</span> กำลังโหวต
          </p>
        </div>

        {/* Player Selection */}
        <div className="space-y-3 mb-8">
          {activePlayers
            .filter(p => p.id !== currentVoterPlayer.id)
            .map((player, index) => (
              <motion.button
                key={player.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPlayer(player.id)}
                className={`w-full p-4 rounded-xl transition-all touch-manipulation ${
                  selectedPlayer === player.id
                    ? 'bg-neon-pink/30 border-2 border-neon-pink'
                    : 'glass hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedPlayer === player.id ? 'bg-neon-pink/30' : 'bg-muted/50'
                    }`}>
                      <GiPerson className={`w-6 h-6 ${selectedPlayer === player.id ? 'text-neon-pink' : ''}`} />
                    </div>
                    <span className="font-medium">ผู้เล่น {player.id}</span>
                  </div>
                  {selectedPlayer === player.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-full bg-neon-pink flex items-center justify-center"
                    >
                      <IoCheckmark className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
        </div>

        {/* Vote Button */}
        <div className="space-y-3">
          <NeonButton
            onClick={handleVote}
            variant="primary"
            size="lg"
            fullWidth
            disabled={selectedPlayer === null}
          >
            ยืนยันโหวต
          </NeonButton>
          
          <button
            onClick={handleVote}
            className="w-full p-3 rounded-xl glass text-muted-foreground touch-manipulation"
          >
            ไม่โหวต (ข้าม)
          </button>
        </div>
      </motion.div>
    </div>
  )
}
