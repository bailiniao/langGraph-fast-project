'use client'

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { ArrowUp, Paperclip, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export interface ChatInputHandle {
  setInput: (value: string) => void
  focus: () => void
}

/**
 * Chat Input Component
 * Refactored to match demo.html "Floating Glass Island" style.
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
    <div className={`w-full max-w-5xl glass-panel rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300 ${
      disabled
        ? 'ring-1 ring-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.15)]'
        : 'focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:shadow-[0_0_40px_rgba(59,130,246,0.2)]'
    }`}>
      <div className="flex items-end p-3 gap-3">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition" disabled={disabled}>
            <Paperclip className="w-5 h-5" />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "AI 正在回复中..." : "输入您的问题，开启 AI 之旅..."}
          className={`w-full bg-transparent border-none outline-none text-slate-200 text-base resize-none py-2 max-h-32 transition-opacity ${
            disabled ? 'placeholder-yellow-400/60 opacity-60' : 'placeholder-slate-500'
          }`}
          rows={1}
          disabled={disabled}
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className={`p-2 rounded-lg shadow-lg transition-all mb-[1px] min-w-10 min-h-10 flex items-center justify-center ${
            disabled
                ? 'bg-yellow-600/20 text-yellow-400 cursor-wait'
                : input.trim()
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white shadow-blue-600/20 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowUp className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  )
})

ChatInput.displayName = 'ChatInput'
