'use client'

import { motion } from 'framer-motion'
import { IoArrowBack, IoClose } from 'react-icons/io5'
import { GiSpyglass, GiSpy, GiTalk, GiVote } from 'react-icons/gi'
import { NeonButton } from './neon-button'
import { GlassCard } from './glass-card'

interface TutorialScreenProps {
  onBack: () => void
}

const steps = [
  {
    icon: GiSpyglass,
    title: 'ตั้งค่าเกม',
    description: 'เลือกจำนวนผู้เล่น จำนวน Imposter และหมวดหมู่คำศัพท์',
    color: 'text-neon-pink',
  },
  {
    icon: GiSpy,
    title: 'รับบทบาท',
    description: 'ส่งต่อมือถือให้ผู้เล่นแต่ละคนดูบทบาทของตัวเอง ชาวบ้านจะเห็นคำลับ แต่ Imposter จะไม่เห็น',
    color: 'text-neon-cyan',
  },
  {
    icon: GiTalk,
    title: 'พูดคุยกัน',
    description: 'ผู้เล่นทุกคนต้องพูดอธิบายคำลับโดยไม่พูดคำนั้นตรงๆ Imposter ต้องแกล้งทำเป็นรู้',
    color: 'text-neon-green',
  },
  {
    icon: GiVote,
    title: 'โหวตหาสายลับ',
    description: 'เมื่อหมดเวลา ทุกคนโหวตว่าใครเป็น Imposter คนที่โดนโหวตมากสุดจะถูกจับได้',
    color: 'text-neon-orange',
  },
]

export function TutorialScreen({ onBack }: TutorialScreenProps) {
  return (
    <div className="min-h-screen p-6">
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
        <h1 className="text-2xl font-bold text-neon-cyan">วิธีเล่น</h1>
        <div className="w-10" />
      </motion.div>

      {/* Steps */}
      <div className="space-y-4 max-w-md mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="!p-4" glow="none">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-muted/50 ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-bold text-lg">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 max-w-md mx-auto"
      >
        <GlassCard className="!p-4 border-neon-pink/30" glow="pink">
          <h3 className="font-bold text-neon-pink mb-2">เคล็ดลับ</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>- Imposter ควรฟังคำใบ้จากคนอื่นก่อนพูด</li>
            <li>- อย่าพูดคำตอบตรงๆ ให้ใบ้อ้อมๆ</li>
            <li>- สังเกตคนที่พูดกว้างหรือตอบช้า</li>
          </ul>
        </GlassCard>
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 max-w-md mx-auto"
      >
        <NeonButton onClick={onBack} variant="secondary" fullWidth>
          กลับหน้าแรก
        </NeonButton>
      </motion.div>
    </div>
  )
}
