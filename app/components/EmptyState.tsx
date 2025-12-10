'use client'

import { Network, Atom, Sparkles, PlayCircle, Code, Bot } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Demo feature cards actions could be passed as props or just mocked for now
// The user might want these buttons to populate the input.
interface EmptyStateProps {
    onAction?: (text: string) => void;
}

export function EmptyState({ onAction }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up w-full max-w-5xl mx-auto px-4 py-16 space-y-10">
      {/* Hero Section with Enhanced AI Core Animation */}
      <div className="w-full space-y-8">
        {/* AI Core Animation with Enhanced Effects */}
        <div className="relative flex items-center justify-center">
          {/* Outer Glow Ring */}
          <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-pink-500/20 to-blue-500/20 blur-3xl animate-pulse-slow"></div>
          
          {/* Animated Orbit Rings */}
          <div className="absolute rounded-full border-2 border-transparent border-t-pink-500 border-r-purple-500 w-[180px] h-[180px] opacity-70 animate-spin-slow"></div>
          <div className="absolute rounded-full border-2 border-transparent border-t-blue-500 border-l-teal-500 w-[140px] h-[140px] opacity-70 animate-spin-reverse-slow"></div>
          <div className="absolute rounded-full border-2 border-transparent border-t-yellow-500 border-b-pink-500 w-[100px] h-[100px] opacity-70 animate-spin-medium"></div>
          
          {/* Central AI Core */}
          <div className="relative w-[60px] h-[60px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 animate-pulse-glow"></div>
            <div className="absolute inset-2 rounded-full bg-[#050509] flex items-center justify-center">
              <Bot className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-float-1"></div>
          <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-blue-400 rounded-full animate-float-2"></div>
          <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-float-3"></div>
        </div>
        
        {/* Enhanced Title with Gradient and Animation */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-400 to-purple-500 animate-gradient-shift">
            AI 智能编程助手
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            利用下一代神经网络模型，为您提供 <span className="text-pink-400 font-medium">代码生成</span>、
            <span className="text-purple-400 font-medium">架构分析</span> 与 <span className="text-blue-400 font-medium">智能调试</span> 服务。
          </p>
        </div>
        
        {/* Main Action Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => onAction?.('开始对话')}
            size="lg"
            className="group bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            开始使用 AI 助手
          </Button>
        </div>
      </div>
      
      <Separator className="w-full max-w-2xl bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
      
      {/* Feature Cards with Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4">
        <Card 
           onClick={() => onAction?.('如何学习LangGraph JS')}
           className="bg-gradient-to-br from-white/5 to-white/2 border border-white/5 hover:border-pink-500/40 p-6 rounded-2xl flex flex-col items-start text-left gap-4 transition-all hover:-translate-y-2 hover:shadow-2xl group cursor-pointer overflow-hidden relative"
        >
          {/* Background Glow Effect */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all duration-500"></div>
          
          {/* Icon with Enhanced Design */}
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 z-10">
            <Network className="w-6 h-6" />
          </div>
          
          <div className="space-y-2 z-10">
            <div className="text-slate-200 font-bold text-xl group-hover:text-pink-300 transition-colors">LangGraph 学习</div>
            <div className="text-slate-500 text-sm leading-snug">掌握 StateGraph、Nodes 与 Edges 的核心概念，构建智能 Agent。</div>
          </div>
        </Card>

        <Card 
           onClick={() => onAction?.('分析这个 React 组件的性能瓶颈')}
           className="bg-gradient-to-br from-white/5 to-white/2 border border-white/5 hover:border-blue-500/40 p-6 rounded-2xl flex flex-col items-start text-left gap-4 transition-all hover:-translate-y-2 hover:shadow-2xl group cursor-pointer overflow-hidden relative"
        >
          {/* Background Glow Effect */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
          
          {/* Icon with Enhanced Design */}
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 z-10">
            <Atom className="w-6 h-6" />
          </div>
          
          <div className="space-y-2 z-10">
            <div className="text-slate-200 font-bold text-xl group-hover:text-blue-300 transition-colors">性能优化分析</div>
            <div className="text-slate-500 text-sm leading-snug">智能分析组件渲染逻辑，提供 useMemo 优化建议和性能瓶颈定位。</div>
          </div>
        </Card>

        <Card 
           onClick={() => onAction?.('帮我生成一个响应式布局组件')}
           className="bg-gradient-to-br from-white/5 to-white/2 border border-white/5 hover:border-yellow-500/40 p-6 rounded-2xl flex flex-col items-start text-left gap-4 transition-all hover:-translate-y-2 hover:shadow-2xl group cursor-pointer overflow-hidden relative"
        >
          {/* Background Glow Effect */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl group-hover:bg-yellow-500/30 transition-all duration-500"></div>
          
          {/* Icon with Enhanced Design */}
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300 z-10">
            <Code className="w-6 h-6" />
          </div>
          
          <div className="space-y-2 z-10">
            <div className="text-slate-200 font-bold text-xl group-hover:text-yellow-300 transition-colors">代码生成</div>
            <div className="text-slate-500 text-sm leading-snug">根据需求生成高质量的 React 组件和响应式布局代码。</div>
          </div>
        </Card>
      </div>
      
      {/* Quick Start Tips */}
      <div className="w-full max-w-3xl">
        <h3 className="text-xl font-semibold text-slate-200 mb-4">💡 快速开始提示</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => onAction?.('解释一下 React Hooks 的使用')}
            className="text-slate-400 hover:text-pink-400 hover:bg-white/5 transition-all"
          >
            React Hooks 教程
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => onAction?.('如何使用 TypeScript 接口')}
            className="text-slate-400 hover:text-blue-400 hover:bg-white/5 transition-all"
          >
            TypeScript 指南
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => onAction?.('帮我调试这个错误')}
            className="text-slate-400 hover:text-yellow-400 hover:bg-white/5 transition-all"
          >
            调试帮助
          </Button>
        </div>
      </div>
    </div>
  )
}
