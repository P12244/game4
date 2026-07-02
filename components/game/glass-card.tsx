'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: 'pink' | 'blue' | 'cyan' | 'green' | 'orange' | 'none'
  animate?: boolean
}

export function GlassCard({ children, className, glow = 'none', animate = true }: GlassCardProps) {
  const glowColors = {
    pink: 'shadow-[0_0_50px_rgba(255,100,200,0.15)]',
    blue: 'shadow-[0_0_50px_rgba(100,150,255,0.15)]',
    cyan: 'shadow-[0_0_50px_rgba(100,255,255,0.15)]',
    green: 'shadow-[0_0_50px_rgba(100,255,150,0.15)]',
    orange: 'shadow-[0_0_50px_rgba(255,150,100,0.15)]',
    none: '',
  }

  const Wrapper = animate ? motion.div : 'div'
  const animateProps = animate ? {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
    transition: { duration: 0.3, ease: 'easeOut' },
  } : {}

  return (
    <Wrapper
      className={cn(
        'glass rounded-2xl p-6',
        glowColors[glow],
        className
      )}
      {...animateProps}
    >
      {children}
    </Wrapper>
  )
}
