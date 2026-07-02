'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
  fullWidth?: boolean
}

export function NeonButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  fullWidth = false,
}: NeonButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-neon-pink to-neon-orange text-white shadow-[0_0_30px_rgba(255,100,200,0.4)]',
    secondary: 'bg-gradient-to-r from-neon-blue to-neon-cyan text-white shadow-[0_0_30px_rgba(100,200,255,0.4)]',
    danger: 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_30px_rgba(255,100,100,0.4)]',
    success: 'bg-gradient-to-r from-neon-green to-neon-cyan text-white shadow-[0_0_30px_rgba(100,255,150,0.4)]',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'font-bold transition-all duration-200 touch-manipulation',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
