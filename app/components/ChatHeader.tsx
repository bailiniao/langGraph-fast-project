import { useState } from 'react'
import { Sparkles, ChevronDown, Bell, GitBranch } from 'lucide-react'

/**
 * 聊天页面头部导航栏组件
 *
 * 显示内容:
 * - 左侧: 应用图标、标题和状态指示器
 * - 右侧: 技术标签(模型名称、技术栈、特性)
 *
 * 特性:
 * - 毛玻璃效果背景
 * - 在线状态指示(绿色脉冲点)
 * - 技术标签展示当前使用的 AI 模型和技术
 */
export function ChatHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentModel, setCurrentModel] = useState('GPT-4 Turbo')
    const models = ['GPT-4 Turbo', 'GPT-3.5 Turbo', 'Claude 3 Opus', 'Llama 3']

    return (
    <header className="h-16 flex items-center justify-between px-8 z-50 w-full mb-0 bg-transparent border-b-0 shadow-none sticky top-0">
      <div className="relative">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/30 cursor-pointer transition backdrop-blur-md"
          >
            <Sparkles className="text-yellow-500 w-3 h-3" />
            <span className="text-xs font-medium text-slate-300">{currentModel}</span>
            <ChevronDown className={`w-2.5 h-2.5 text-slate-500 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#0B0E14]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-fade-in-up">
                  {models.map((model) => (
                          <div 
                            key={model}
                            onClick={() => {
                                setCurrentModel(model)
                                setIsOpen(false)
                            }}
                            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-2 ${
                                currentModel === model 
                                    ? 'bg-blue-600/20 text-blue-400' 
                                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                            }`}
                          >
                              <span className={`w-2 h-2 rounded-full mr-1 ${currentModel === model ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-transparent'}`}></span>
                              {model}
                          </div>
                  ))}
              </div>
          )}
      </div>
      
      <div className="flex gap-5 text-slate-400 text-sm">
        <button className="hover:text-white transition"><Bell className="w-4 h-4" /></button>
        <button className="hover:text-white transition"><GitBranch className="w-4 h-4" /></button>
      </div>
    </header>
  )
}
