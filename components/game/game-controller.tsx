'use client'

import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AnimatedBackground } from './animated-background'
import { HomeScreen } from './home-screen'
import { TutorialScreen } from './tutorial-screen'
import { SetupScreen } from './setup-screen'
import { RoleRevealScreen } from './role-reveal-screen'
import { DiscussionScreen } from './discussion-screen'
import { VotingScreen } from './voting-screen'
import { ResultScreen } from './result-screen'
import type { GamePhase, GameSettings, Player, Category } from '@/lib/game-types'
import { WORD_DATA, DEFAULT_SETTINGS } from '@/lib/game-types'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getRandomWord(category: Category): { word: string; hint: string } {
  if (category === 'สุ่มทั้งหมด') {
    const allCategories = Object.keys(WORD_DATA) as (keyof typeof WORD_DATA)[]
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)]
    const words = WORD_DATA[randomCategory]
    return words[Math.floor(Math.random() * words.length)]
  }
  const words = WORD_DATA[category]
  return words[Math.floor(Math.random() * words.length)]
}

export function GameController() {
  const [phase, setPhase] = useState<GamePhase>('home')
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [secretWord, setSecretWord] = useState('')
  const [hint, setHint] = useState('')
  const [winner, setWinner] = useState<'imposters' | 'villagers' | null>(null)

  const initializeGame = useCallback((gameSettings: GameSettings) => {
    setSettings(gameSettings)
    
    // Get random word
    const wordData = getRandomWord(gameSettings.category)
    setSecretWord(wordData.word)
    setHint(wordData.hint)

    // Create players with random imposter assignment
    const playerIds = Array.from({ length: gameSettings.playerCount }, (_, i) => i + 1)
    const shuffledIds = shuffleArray(playerIds)
    const imposterIds = new Set(shuffledIds.slice(0, gameSettings.imposterCount))

    const newPlayers: Player[] = playerIds.map(id => ({
      id,
      name: `ผู้เล่น ${id}`,
      isImposter: imposterIds.has(id),
      hasRevealed: false,
      votes: 0,
      isEliminated: false,
    }))

    setPlayers(newPlayers)
    setCurrentPlayerIndex(0)
    setWinner(null)
    setPhase('roleReveal')
  }, [])

  const handleVoteComplete = useCallback((votedPlayerId: number | null) => {
    let gameWinner: 'imposters' | 'villagers' | null = null

    if (votedPlayerId !== null) {
      // Update player elimination status
      setPlayers(prev => prev.map(p => 
        p.id === votedPlayerId ? { ...p, isEliminated: true } : p
      ))

      const votedPlayer = players.find(p => p.id === votedPlayerId)
      
      if (votedPlayer?.isImposter) {
        // Check if all imposters are eliminated
        const remainingImposters = players.filter(p => p.isImposter && !p.isEliminated && p.id !== votedPlayerId)
        if (remainingImposters.length === 0) {
          gameWinner = 'villagers'
        }
      } else {
        // Villager was eliminated - check if imposters win
        const remainingVillagers = players.filter(p => !p.isImposter && !p.isEliminated && p.id !== votedPlayerId)
        const remainingImposters = players.filter(p => p.isImposter && !p.isEliminated)
        
        if (remainingImposters.length >= remainingVillagers.length) {
          gameWinner = 'imposters'
        }
      }
    } else {
      // No one eliminated - imposters win by default in single round
      gameWinner = 'imposters'
    }

    setWinner(gameWinner || 'imposters')
    setPhase('result')
  }, [players])

  const resetGame = useCallback(() => {
    setPhase('home')
    setPlayers([])
    setCurrentPlayerIndex(0)
    setSecretWord('')
    setHint('')
    setWinner(null)
  }, [])

  const playAgain = useCallback(() => {
    initializeGame(settings)
  }, [initializeGame, settings])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <AnimatePresence mode="wait">
        {phase === 'home' && (
          <HomeScreen
            key="home"
            onStartGame={() => setPhase('setup')}
            onShowTutorial={() => setPhase('tutorial')}
            onShowSettings={() => setPhase('setup')}
          />
        )}

        {phase === 'tutorial' && (
          <TutorialScreen
            key="tutorial"
            onBack={() => setPhase('home')}
          />
        )}

        {phase === 'setup' && (
          <SetupScreen
            key="setup"
            onBack={() => setPhase('home')}
            onStart={initializeGame}
          />
        )}

        {phase === 'roleReveal' && (
          <RoleRevealScreen
            key="roleReveal"
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            secretWord={secretWord}
            hint={hint}
            onNextPlayer={() => setCurrentPlayerIndex(prev => prev + 1)}
            onAllRevealed={() => setPhase('discussion')}
          />
        )}

        {phase === 'discussion' && (
          <DiscussionScreen
            key="discussion"
            timerDuration={settings.timerDuration}
            secretWord={secretWord}
            hint={hint}
            onTimeUp={() => setPhase('voting')}
            onSkipToVoting={() => setPhase('voting')}
          />
        )}

        {phase === 'voting' && (
          <VotingScreen
            key="voting"
            players={players}
            onVoteComplete={handleVoteComplete}
          />
        )}

        {phase === 'result' && winner && (
          <ResultScreen
            key="result"
            winner={winner}
            players={players}
            secretWord={secretWord}
            onPlayAgain={playAgain}
            onBackToHome={resetGame}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
