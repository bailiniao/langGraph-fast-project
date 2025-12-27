'use client'

import Image from 'next/image'


// 竹林山水风格图标组件
const ScrollIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 120, height: 120, display: 'inline-block', fontSize: '60px' }}>📜</span>
    )

const ScholarIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 120, height: 120, display: 'inline-block', fontSize: '60px' }}>📚</span>
    )

// Demo feature cards actions could be passed as props or just mocked for now
// The user might want these buttons to populate the input.
interface EmptyStateProps {
    onAction?: (text: string) => void;
}

export function EmptyState({ onAction }: EmptyStateProps) {
  return (
    <div className="relative min-h-screen z-10">
      
      {/* 主要内容层 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center animate-[wuxia-fade-in-up_1s_ease-out] w-full max-w-5xl mx-auto px-4 py-12 opacity-80">
        {/* 竹林风格太极八卦阵动画 */}
        <div className="mb-10 relative w-[140px] h-[140px] flex items-center justify-center">
          <div className="absolute rounded-full border-2 border-transparent border-t-bamboo-qing border-r-bamboo-stone/60 w-full h-full opacity-40 animate-[wuxia-taiji-rotate_20s_linear_infinite]"></div>
          <div className="absolute rounded-full border-2 border-transparent border-t-bamboo-stone/70 border-l-bamboo-qing/50 w-[75%] h-[75%] animate-[wuxia-taiji-rotate_15s_linear_infinite_reverse] opacity-40"></div>
          <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-bamboo-qing/20 to-bamboo-stone/15 opacity-60 filter blur-[8px] animate-[wuxia-seal-glow_3s_ease-in-out_infinite] border border-bamboo-qing/10"></div>
          {/* 八卦方位标记 */}
          <div className="absolute w-2 h-2 bg-bamboo-qing rounded-full top-2 left-1/2 transform -translate-x-1/2 animate-[wuxia-brush-stroke_2s_ease-in-out_infinite] opacity-60"></div>
          <div className="absolute w-2 h-2 bg-bamboo-stone rounded-full bottom-2 left-1/2 transform -translate-x-1/2 animate-[wuxia-brush-stroke_2s_ease-in-out_infinite] opacity-60" style={{ animationDelay: '1s' }}></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          <span className="text-white">归园</span>
          <span className="wuxia-text-gradient px-2">竹里编程</span>
          <span className="text-white">间</span>
        </h1>
        <p className="text-slate-400 max-w-lg text-lg mb-12 leading-relaxed font-light">
          坐看竹影摇曳，为君指点<span className="text-bamboo-qing font-medium">代码之趣</span>、<span className="text-bamboo-stone font-medium">算法之妙</span>与<span className="text-bamboo-ochre font-medium">调试之法</span>。
        </p>

        {/* 武林绝学卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl w-full px-4 text-left">
          <button 
             onClick={() => onAction?.('如何学习LangGraph JS')}
             className="wuxia-panel p-5 rounded-2xl flex items-start text-left gap-4 transition-all hover:-translate-y-1 hover:shadow-lg group border-bamboo-qing/10 bg-bamboo-paper/60 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-lg bg-bamboo-qing/5 flex items-center justify-center text-bamboo-qing group-hover:bg-bamboo-qing/15 group-hover:text-bamboo-cloud transition-all duration-300 border border-bamboo-qing/10">
              <ScrollIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-bamboo-qing font-semibold mb-1 group-hover:text-bamboo-qing transition-colors ">LangGraph 竹间心法</div>
              <div className="text-slate-500 text-sm leading-snug">悟透图之脉络，节点相连，边引智慧，自成智能之境。</div>
            </div>
          </button>

          <button 
             onClick={() => onAction?.('分析这个 React 组件的性能瓶颈')}
             className="wuxia-panel p-5 rounded-2xl flex items-start text-left gap-4 transition-all hover:-translate-y-1 hover:shadow-lg group border-bamboo-stone/10 bg-bamboo-paper/60 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-lg bg-bamboo-stone/5 flex items-center justify-center text-bamboo-stone group-hover:bg-bamboo-stone/15 group-hover:text-bamboo-qing transition-all duration-300 border border-bamboo-stone/10">
              <ScholarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-bamboo-stone font-semibold mb-1 group-hover:text-bamboo-stone transition-colors">React 竹里修行</div>
              <div className="text-slate-500 text-sm leading-snug">静修组件之道，useMemo 如竹节坚韧，优化自然而成。</div>
            </div>
          </button>
        </div>

        {/* 底部装饰性诗句 */}
        <div className="mt-12 text-center">
          <div className="wuxia-text-gradient text-sm italic opacity-80 animate-[wuxia-text-shimmer_4s_ease-in-out_infinite]">
            "竹影扫阶尘不动，代码入心情自闲"
          </div>
        </div>
      </div>
    </div>
  )
}
