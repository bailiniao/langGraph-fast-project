import { useState } from 'react'

interface ChatHeaderProps {
  currentModel: string
  availableModels: string[]
  onModelChange: (model: string) => void
}

/**
 * 泼墨竹林山水风格聊天页面头部导航栏组件
 * 
 * 特色:
 * - 竹林山水背景效果
 * - 书法牌匾样式标题
 * - 竹简名帖样式模型选择器
 * - 印章风格功能按钮
 */
export function ChatHeader({ currentModel, availableModels, onModelChange }: ChatHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  // 泼墨竹林山水风格图标组件
    const BambooIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 24, height: 24, display: 'inline-block' }}>🎋</span>
    )

    const SealIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 20, height: 20, display: 'inline-block' }}>🔍</span>
    )

    const ScrollIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 20, height: 20, display: 'inline-block' }}>📜</span>
    )

  return (
    <header className="relative h-16 flex items-center justify-between px-8 z-50 w-full border-b-2 border-bamboo-qing/30 shadow-lg sticky top-0">
      {/* 竹林山水背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-bamboo-cloud/90 via-bamboo-paper/90 to-bamboo-cloud/90">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-bamboo-qing/10 via-transparent to-bamboo-stone/10 animate-pulse"></div>
          {/* 竹叶纹理装饰 */}
          <div className="absolute top-2 left-4 w-16 h-8 bg-gradient-to-r from-transparent via-bamboo-qing/20 to-transparent rounded-full blur-sm"></div>
          <div className="absolute bottom-2 right-8 w-12 h-6 bg-gradient-to-r from-bamboo-stone/20 via-transparent to-transparent rounded-full blur-sm"></div>
        </div>
      </div>

      {/* 左侧标题区域 */}
      <div className="relative flex items-center gap-4">
        {/* 书法牌匾样式标题 */}
        <div className="wuxia-panel px-6 py-2 bg-gradient-to-b from-bamboo-cloud/20 to-bamboo-qing/20">
          <div className="flex items-center gap-3">
            <BambooIcon className="w-6 h-6 text-bamboo-qing" />
            <h1 className="wuxia-text-gradient text-lg font-bold tracking-wider">
              竹间闲谈
            </h1>
            {/* 竹林气息装饰 */}
            <div className="flex gap-1 ml-2">
              <div className="w-2 h-2 bg-bamboo-qing rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-bamboo-stone rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-bamboo-ochre rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* 模型选择器 - 竹简名帖样式 */}
        <div className="relative">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="wuxia-paper-bg flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-bamboo-qing/50 hover:border-bamboo-stone"
          >
            <div className="w-4 h-4 text-bamboo-qing">
              <ScrollIcon />
            </div>
            <span className="text-bamboo-ink font-medium text-sm">{currentModel}</span>
            <div className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" className="text-bamboo-stone">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 wuxia-panel bg-bamboo-paper/95 backdrop-blur-sm border-2 border-bamboo-qing rounded-xl shadow-xl overflow-hidden py-2 z-50 animate-wuxia-scroll-unfold">
              {availableModels.map((model) => (
                <div 
                  key={model}
                  onClick={() => {
                    onModelChange(model)
                    setIsOpen(false)
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition-all duration-200 flex items-center gap-3 hover:bg-bamboo-cloud/80 ${currentModel === model ? 'bg-bamboo-cloud/80 text-bamboo-ink border-r-4 border-bamboo-qing' : 'text-bamboo-ink hover:text-bamboo-ink'}`}
                >
                  {/* 印章样式指示器 */}
                  <div className={`w-3 h-3 rounded ${currentModel === model ? 'bg-bamboo-qing animate-wuxia-seal-stamp' : 'bg-bamboo-stone/50'}`}></div>
                  <span className="font-medium">{model}</span>
                  {/* 佳册标识 */}
                  {currentModel === model && (
                    <div className="ml-auto text-xs bg-bamboo-qing text-bamboo-paper px-2 py-1 rounded-full font-bold">
                      佳册
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 右侧功能按钮 - 印章风格 */}
      <div className="relative flex gap-4">
        {/* 消息按钮 - 竹简样式 */}
        <button className="wuxia-button group relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-2">
            <SealIcon className="w-4 h-4" />
            <span className="text-xs font-bold">竹间传语</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-bamboo-qing to-bamboo-stone opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* 设置按钮 - 卷轴样式 */}
        <button className="wuxia-button group relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-2">
            <ScrollIcon className="w-4 h-4" />
            <span className="text-xs font-bold">竹篱清居</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-bamboo-stone to-bamboo-ochre opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </header>
  )
}