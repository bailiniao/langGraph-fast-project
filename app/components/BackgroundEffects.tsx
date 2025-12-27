'use client'

/**
 * 燕云十六声主题视频背景组件
 */
const YanyanVideoBackground = () => (
  <div className="fixed inset-0 z-0">
    {/* 视频元素 */}
    <video
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E"
    >
      {/* 注意：请将燕云十六声视频文件放在 public/videos/ 目录下 */}
      <source src="/videos/yanyan-background.mp4" type="video/mp4" />
      <source src="/videos/yanyan-background.webm" type="video/webm" />
      {/* 备用渐变背景 */}
    </video>
    
    {/* 渐变遮罩层，确保文字可读性 */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
    
    {/* 竹色调色调层 */}
    <div className="absolute inset-0 bg-gradient-to-br from-bamboo-qing/10 via-transparent to-bamboo-stone/5"></div>
  </div>
)

/**
 * 泼墨竹林山水风格背景效果组件
 *
 * 提供页面泼墨竹林山水风格背景装饰效果:
 * 1. 燕云十六声视频背景 - 全屏视频背景，营造沉浸式体验
 * 2. 水墨竹林意境 - 淡墨渲染的竹林山水轮廓
 * 3. 书法笔触效果 - 动态的墨迹扩散效果
 * 4. 宣纸纹理 - 古典宣纸背景和竹节装饰
 * 5. 动态墨韵 - 三个水墨光晕,使用竹林风格动画
 *    - 竹青色墨韵(左上)
 *    - 石绿色光晕(右上,延迟 2s)
 *    - 赭石色印章光效(底部中间,延迟 4s)
 *
 * 视觉效果:
 * - 使用 mix-blend-overlay 混合模式
 * - 水墨渲染创造竹林意境深远效果
 * - 低透明度营造古典氛围
 * - 水墨流动动画营造竹林山水意境
 */
export function BackgroundEffects() {
  return (
    <>
      {/* 燕云十六声视频背景 */}
      <YanyanVideoBackground />
        {/* 宣纸纹理背景 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* 泼墨竹林山水轮廓 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-full h-32" style={{
          background: `radial-gradient(ellipse 60% 100% at 20% 100%, rgba(45, 164, 82, 0.3) 0%, transparent 50%),
                      radial-gradient(ellipse 40% 80% at 60% 100%, rgba(102, 163, 103, 0.2) 0%, transparent 60%),
                      radial-gradient(ellipse 50% 90% at 80% 100%, rgba(74, 113, 87, 0.25) 0%, transparent 70%)`
        }}></div>
      </div>

      {/* 动态墨韵效果 */}
      <div className="absolute inset-0">
        {/* 竹青色墨韵 - 左上 */}
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full mix-blend-overlay filter blur-2xl opacity-20 animate-[wuxia-ink-flow_8s_ease-in-out_infinite]" 
             style={{
               background: 'radial-gradient(circle, rgba(45, 164, 82, 0.4) 0%, rgba(74, 113, 87, 0.2) 30%, transparent 70%)'
             }}></div>
        
        {/* 石绿色光晕 - 右上，延迟2s */}
        <div className="absolute top-32 right-32 w-72 h-72 rounded-full mix-blend-overlay filter blur-2xl opacity-15 animate-[wuxia-ink-flow_10s_ease-in-out_infinite]" 
             style={{ 
               animationDelay: '2s',
               background: 'radial-gradient(circle, rgba(102, 163, 103, 0.3) 0%, rgba(74, 113, 87, 0.15) 40%, transparent 80%)'
             }}></div>
        
        {/* 赭石色印章光效 - 底部中间，延迟4s */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full mix-blend-overlay filter blur-2xl opacity-25 animate-[wuxia-seal-glow_6s_ease-in-out_infinite]" 
             style={{ 
               animationDelay: '4s',
               background: 'radial-gradient(circle, rgba(146, 92, 57, 0.3) 0%, rgba(107, 80, 56, 0.2) 50%, transparent 90%)'
             }}></div>
      </div>

      {/* 书法笔触装饰线条 - 竹青色 */}
      <div className="absolute top-1/4 left-0 w-full h-px opacity-10">
        <div className="h-full bg-gradient-to-r from-transparent via-bamboo-qing/30 to-transparent animate-[wuxia-brush-stroke_12s_ease-in-out_infinite]"></div>
      </div>
      <div className="absolute bottom-1/3 left-0 w-full h-px opacity-10">
        <div className="h-full bg-gradient-to-r from-transparent via-bamboo-stone/20 to-transparent animate-[wuxia-brush-stroke_15s_ease-in-out_infinite]" style={{ animationDelay: '3s' }}></div>
      </div>
    </>
  )
}
