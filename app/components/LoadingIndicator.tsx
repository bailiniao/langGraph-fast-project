'use client'
import Image from 'next/image'

// 毛笔图标（保持原有设计，更新颜色）
const InkBrushIcon = ({ className }: { className?: string }) => (
    <span style={{ width: 24, height: 24, display: 'inline-block' }} className={className}>🖌️</span>
)

// 墨滴图标（保持原有设计，更新颜色）
const InkDropIcon = ({ className }: { className?: string }) => (
    <span style={{ width: 20, height: 20, display: 'inline-block' }} className={className}>🖋️</span>
)

// 竹节图标（替换剑图标）
const BambooNodeIcon = ({ className }: { className?: string }) => (
    <span style={{ width: 18, height: 18, display: 'inline-block' }} className={className}>🎍</span>
)

/**
 * 武侠风格加载指示器组件
 *
 * 在 AI 回复时显示的武侠风格加载动画,包括:
 * - 武侠风格毛笔图标头像（带脉冲动画）
 * - 水墨扩散效果代替跳动圆点
 * - "武林智者运筹帷幄中..." 文本提示（带闪烁效果）
 *
 * 特性:
 * - 水墨剑气动画效果
 * - 墨迹依次扩散(错开延迟)
 - 头像墨水脉冲动画
 - 与武侠风格消息气泡一致
 */
export function LoadingIndicator() {
  return (
    <div className="flex gap-4 opacity-0 animate-[wuxia-fade-in_0.8s_ease-out_forwards]">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-stone-400/20 to-stone-600/30 rounded-xl flex items-center justify-center shadow-lg animate-[wuxia-ink-pulse_2s_ease-in-out_infinite] border border-stone-400/30">
          <InkBrushIcon className="h-6 w-6 text-stone-300" />
        </div>
      </div>

      <div className="wuxia-panel rounded-xl rounded-bl-md p-4 shadow-lg border-stone-400/20">
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-stone-600/10 flex items-center justify-center text-stone-400 animate-[wuxia-ink-pulse_1.5s_ease-in-out_infinite] border border-stone-400/20">
            <InkBrushIcon className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 rounded-full bg-stone-500/10 flex items-center justify-center text-stone-300 animate-[wuxia-ink-pulse_1.5s_ease-in-out_infinite] border border-stone-500/20" style={{ animationDelay: '0.3s' }}>
            <InkDropIcon className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 rounded-full bg-stone-700/10 flex items-center justify-center text-stone-500 animate-[wuxia-ink-pulse_1.5s_ease-in-out_infinite] border border-stone-700/20" style={{ animationDelay: '0.6s' }}>
            <BambooNodeIcon className="w-6 h-6" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-slate-300 text-lg mb-2 font-light">竹林雅士深思熟虑中...</div>
          <div className="text-stone-500 text-sm">正在挥毫泼墨，为您推演最优方案</div>
        </div>
      </div>
    </div>
  )
}
