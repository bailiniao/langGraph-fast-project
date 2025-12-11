'use client'

import { Bot, User } from 'lucide-react'
import { MarkdownRenderer } from './MarkdownRenderer'

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
  // Styles from demo.html
  // User: max-w-2xl bg-[#1E293B] border border-white/10 rounded-2xl rounded-tr-none p-4 text-slate-100 leading-relaxed shadow-lg
  // AI: bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-4 text-slate-300
  // Avatar styles...

  const isUser = message.role === 'user'

  return (
    <div
      className={`flex gap-4 mb-8 w-full animate-fade-in-up ${isUser ? 'justify-end' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {!isUser && (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0">
           <Bot className="text-white w-4 h-4" />
        </div>
      )}

      {/* Message Content Bubble */}
      <div className={`
        ${isUser 
            ? 'max-w-2xl bg-[#1E293B] border border-white/10 rounded-2xl rounded-tr-none p-4 text-slate-100 leading-relaxed shadow-lg' 
            : 'flex-1 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-4 text-slate-300'
        }
      `}>


         <div className={`text-[15px] leading-relaxed ${isUser ? 'text-slate-100' : 'text-slate-300'}`}>
            <MarkdownRenderer content={message.content} />
         </div>

         {/* If streaming cursor */}
         {message.isStreaming && (
             <span className="inline-block w-1.5 h-4 bg-cyan-400 ml-1 align-middle animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
         )}
         

      </div>

      {isUser && (
        <div className="ml-0 w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
            {/* Fallback avatar or icon */}
            <div className="w-full h-full flex items-center justify-center text-slate-400">
                <User className="w-5 h-5" />
            </div>
            {/* Use img if available */}
        </div>
      )}
    </div>
  )
}
