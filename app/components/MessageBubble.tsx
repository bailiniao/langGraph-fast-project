'use client'

import { MarkdownRenderer } from './MarkdownRenderer'
import Image from 'next/image'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isStreaming?: boolean
}

interface MessageBubbleProps {
  message: Message
  index: number
}

export function MessageBubble({ message, index }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  // 泼墨竹林山水风格图标组件
  const BambooIcon = ({ className }: { className?: string }) => (
        <span style={{ width: 24, height: 24, display: 'inline-block' }} className={className}>🎋</span>
    )

  const UserIcon = ({ className }: { className?: string }) => (
        <span style={{ width: 20, height: 20, display: 'inline-block' }} className={className}>👤</span>
    )

  const ScholarIcon = ({ className }: { className?: string }) => (
        <span style={{ width: 24, height: 24, display: 'inline-block' }} className={className}>📚</span>
    )

  const InkBrushIcon = ({ className }: { className?: string }) => (
        <span style={{ width: 20, height: 20, display: 'inline-block' }} className={className}>🖌️</span>
    )

  return (
    <div
      className={`flex gap-4 mb-8 w-full animate-wuxia-fade-in-up ${isUser ? 'justify-end' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {!isUser && (
        <div className="w-12 h-12 wuxia-paper-bg rounded-xl flex items-center justify-center shadow-lg border-2 border-bamboo-qing/30 flex-shrink-0">
          <ScholarIcon className="w-6 h-6 text-bamboo-qing" />
        </div>
      )}

      {/* Message Content Bubble */}
      <div className={`
        ${isUser 
            ? 'max-w-2xl wuxia-paper-bg border-2 border-bamboo-qing/40 rounded-2xl rounded-tr-none p-6 text-bamboo-ink leading-relaxed shadow-lg' 
            : 'flex-1 wuxia-paper-bg border-2 border-bamboo-qing/30 rounded-2xl rounded-tl-none p-6 text-bamboo-ink shadow-lg'
        }
      `}>
        {/* 消息气泡装饰 - 水墨笔触效果 */}
        <div className={`absolute -top-1 ${isUser ? '-right-1' : '-left-1'} w-3 h-3 rotate-45 ${isUser ? 'bg-bamboo-qing/20' : 'bg-bamboo-stone/20'}`} />
        
        <div className={`text-[16px] leading-relaxed ${isUser ? 'text-bamboo-ink font-medium' : 'text-bamboo-ink'}`}>
          <MarkdownRenderer content={message.content} />
        </div>

        {/* 如果是流式传输，显示墨水闪烁效果 */}
        {message.isStreaming && (
          <div className="inline-flex items-center ml-2">
            <div className="w-1 h-6 bg-bamboo-qing animate-wuxia-ink-spread rounded-full shadow-sm"></div>
            <InkBrushIcon className="w-4 h-4 text-bamboo-qing ml-1 animate-wuxia-glow" />
          </div>
        )}

        {/* 时间戳装饰 */}
        <div className={`mt-3 pt-3 border-t ${isUser ? 'border-bamboo-qing/20' : 'border-bamboo-stone/20'}`}>
          <span className={`text-xs ${isUser ? 'text-bamboo-qing/70' : 'text-bamboo-stone/70'} font-medium`}>
            {isUser ? '竹林访客' : '竹间雅士'} · {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {isUser && (
        <div className="w-12 h-12 rounded-full wuxia-paper-bg overflow-hidden flex-shrink-0 border-2 border-bamboo-qing/40 shadow-lg">
          <div className="w-full h-full flex items-center justify-center text-bamboo-qing">
            <UserIcon className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  )
}
