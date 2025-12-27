'use client'

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import Image from 'next/image'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export interface ChatInputHandle {
  setInput: (value: string) => void
  focus: () => void
}

// 竹林山水风格图标组件
const ScrollIcon = ({ className }: { className?: string }) => (
    <span className={className} style={{ width: 20, height: 20, display: 'inline-block' }}>📜</span>
)

const SendBambooIcon = ({ className }: { className?: string }) => (
    <span className={className} style={{ width: 20, height: 20, display: 'inline-block' }}>🎋</span>
)

const BambooSplashIcon = ({ className }: { className?: string }) => (
    <span className={className} style={{ width: 20, height: 20, display: 'inline-block' }}>💧</span>
)

/**
 * 竹林山水风格聊天输入组件
 * 重构为令牌按钮和古典输入框样式
 */
export const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(({ onSend, disabled }, ref) => {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useImperativeHandle(ref, () => ({
    setInput: (value: string) => {
      setInput(value)
      // Focus textarea after setting input
      setTimeout(() => textareaRef.current?.focus(), 0)
    },
    focus: () => textareaRef.current?.focus()
  }))

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={`w-full max-w-5xl wuxia-panel rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300 ${disabled ? 'ring-2 ring-bamboo-stone/30 shadow-[0_0_30px_rgba(87,83,74,0.2)]' : 'focus-within:ring-2 focus-within:ring-bamboo-qing/50 focus-within:shadow-[0_0_40px_rgba(87,83,74,0.25)]'}`}>
      <div className="flex items-end p-4 gap-3">
        {/* 附件令牌按钮 */}
        <button 
          className="wuxia-button p-2 text-bamboo-qing hover:text-bamboo-ink hover:bg-bamboo-cloud/10 rounded-lg transition-colors duration-300" 
          disabled={disabled}
          title="竹间传书"
        >
          <ScrollIcon className="w-5 h-5" />
        </button>

        {/* 古典输入框 */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "雅士正在东篱下深思..." : "请输入您的疑问或闲谈..."}
          className={`w-full bg-transparent border-none outline-none text-bamboo-ink text-base resize-none py-3 max-h-32 transition-all duration-300 font-serif ${disabled ? 'placeholder-bamboo-stone/60 opacity-60' : 'placeholder-bamboo-stone/50'}`}
          style={{ fontFamily: 'var(--font-wuxia-body)' }}
          rows={1}
          disabled={disabled}
        />

        {/* 传书令牌按钮 */}
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className={`wuxia-button p-3 rounded-lg shadow-lg transition-all duration-300 mb-[1px] min-w-12 min-h-12 flex items-center justify-center group ${disabled ? 'bg-bamboo-stone/30 text-bamboo-stone cursor-wait ring-1 ring-bamboo-stone/30' : input.trim() ? 'bg-gradient-to-r from-bamboo-qing to-bamboo-stone hover:from-bamboo-qing/80 hover:to-bamboo-stone/80 text-white shadow-bamboo-qing/30 active:scale-95 ring-1 ring-bamboo-qing/20 hover:shadow-[0_0_20px_rgba(87,83,74,0.4)]' : 'bg-bamboo-cloud/50 text-bamboo-stone cursor-not-allowed ring-1 ring-bamboo-stone/20'}`}
          title={disabled ? "雅士深思中..." : "竹间传书"}
        >
          {disabled ? (
            <BambooSplashIcon className="w-5 h-5 animate-wuxia-ink-spread" />
          ) : (
            <SendBambooIcon className="w-5 h-5 group-hover:animate-wuxia-spin-sword" />
          )}
        </button>
      </div>
      
      {/* 底部装饰线 */}
      <div className="h-px bg-gradient-to-r from-transparent via-bamboo-stone/20 to-transparent"></div>
    </div>
  )
})

ChatInput.displayName = 'ChatInput'