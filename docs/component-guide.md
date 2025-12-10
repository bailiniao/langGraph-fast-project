# 组件开发指南

> 版本: 1.0.0
> 更新时间: 2025-11-22

---

## 1. 组件架构概览

本项目采用**组件驱动开发**模式,将 UI 拆分为独立、可复用的组件。

### 1.1 组件分层

```
Page 层 (page.tsx)
    ↓
Hooks 层 (业务逻辑)
    ↓
组件层 (UI 展示)
    ↓
原子组件 (基础元素)
```

### 1.2 现有组件清单

| 组件 | 类型 | 职责 | 复杂度 |
|------|------|------|--------|
| `ChatHeader` | 展示组件 | 头部导航栏 | ⭐ 简单 |
| `MessageList` | 容器组件 | 消息列表容器 | ⭐⭐ 中等 |
| `MessageBubble` | 展示组件 | 单条消息 | ⭐⭐ 中等 |
| `ChatInput` | 表单组件 | 输入框 | ⭐⭐⭐ 复杂 |
| `LoadingIndicator` | 展示组件 | 加载动画 | ⭐ 简单 |
| `BackgroundEffects` | 装饰组件 | 背景效果 | ⭐ 简单 |
| `SessionSidebar` | 容器组件 | 会话侧边栏 | ⭐⭐⭐ 复杂 |
| `MarkdownRenderer` | 展示组件 | Markdown渲染 | ⭐⭐ 中等 |

---

## 2. 组件开发模板

### 2.1 基础模板

```typescript
'use client'

import { ReactNode } from 'react'

/**
 * 组件的 Props 接口
 */
interface MyComponentProps {
  title: string           // 必需属性
  children?: ReactNode    // 可选属性
  onAction?: () => void   // 回调函数
}

/**
 * 组件说明
 *
 * 功能:
 * - 列出主要功能
 * - 使用场景
 *
 * Props:
 * - title: 标题文本
 * - children: 子组件
 * - onAction: 点击回调
 */
export function MyComponent({
  title,
  children,
  onAction
}: MyComponentProps) {
  return (
    <div className="container">
      <h2>{title}</h2>
      {children}
      <button onClick={onAction}>Action</button>
    </div>
  )
}
```

### 2.2 复杂组件模板

```typescript
'use client'

import { useState, useCallback, useEffect } from 'react'

interface ComplexComponentProps {
  data: DataType[]
  onUpdate: (item: DataType) => void
}

/**
 * 复杂组件说明
 *
 * 包含内部状态、副作用、事件处理
 */
export function ComplexComponent({
  data,
  onUpdate
}: ComplexComponentProps) {
  // 内部状态
  const [selected, setSelected] = useState<string | null>(null)

  // 事件处理(使用 useCallback 优化)
  const handleSelect = useCallback((id: string) => {
    setSelected(id)
  }, [])

  // 副作用
  useEffect(() => {
    // 初始化逻辑
    console.log('组件挂载')

    return () => {
      // 清理逻辑
      console.log('组件卸载')
    }
  }, [])

  return (
    <div className="complex-container">
      {data.map(item => (
        <div
          key={item.id}
          onClick={() => handleSelect(item.id)}
          className={selected === item.id ? 'active' : ''}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
```

---

## 3. 组件详解

### 3.1 ChatHeader 组件

**文件**: `app/components/ChatHeader.tsx`

**职责**: 显示应用头部,包括标题、状态和技术标签

**特点**:
- 纯展示组件
- 无内部状态
- 静态内容

**代码结构**:
```typescript
export function ChatHeader() {
  return (
    <header className="...">
      {/* 左侧: Logo + 标题 */}
      {/* 右侧: 技术标签 */}
    </header>
  )
}
```

**自定义指南**:
- 修改标题: 更改 `h1` 标签内容
- 更改技术标签: 修改右侧 `div` 内容
- 调整样式: 修改 Tailwind 类名

---

### 3.2 MessageBubble 组件

**文件**: `app/components/MessageBubble.tsx`

**职责**: 渲染单条消息气泡

**Props**:
```typescript
interface MessageBubbleProps {
  message: Message  // 消息对象
  index: number     // 列表索引(用于动画)
}
```

**核心逻辑**:
```typescript
// 1. 根据角色切换布局
const layout = message.role === 'user'
  ? 'flex-row-reverse'  // 用户消息靠右
  : 'flex-row'          // AI 消息靠左

// 2. 根据角色切换配色
const bgColor = message.role === 'user'
  ? 'from-blue-500 to-cyan-500'
  : 'from-purple-500 to-pink-500'

// 3. 显示流式打字光标
{message.isStreaming && <span className="typing-cursor" />}
```

**扩展示例**:

添加消息操作按钮:
```typescript
export function MessageBubble({ message, index }: MessageBubbleProps) {
  return (
    <div className="message-container">
      {/* 现有内容 */}

      {/* 新增操作按钮 */}
      <div className="message-actions">
        <button onClick={() => copyMessage(message)}>复制</button>
        <button onClick={() => shareMessage(message)}>分享</button>
      </div>
    </div>
  )
}
```

---

### 3.3 ChatInput 组件

**文件**: `app/components/ChatInput.tsx`

**职责**: 消息输入框,支持自动高度调整

**Props**:
```typescript
interface ChatInputProps {
  onSend: (message: string) => void  // 发送回调
  disabled?: boolean                  // 禁用状态
}
```

**核心功能**:

1. **自动高度调整**
```typescript
const adjustTextareaHeight = () => {
  const textarea = textareaRef.current
  if (textarea) {
    textarea.style.height = 'auto'
    // 最大高度 120px
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }
}
```

2. **快捷键处理**
```typescript
const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
```

**自定义示例**:

添加文件上传功能:
```typescript
export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }

  return (
    <div className="chat-input">
      {/* 现有 textarea */}

      {/* 新增文件上传 */}
      <input
        type="file"
        onChange={handleFileChange}
        disabled={disabled}
      />
      {file && <div className="file-preview">{file.name}</div>}

      {/* 发送按钮 */}
    </div>
  )
}
```

---

### 3.4 MessageList 组件

**文件**: `app/components/MessageList.tsx`

**职责**: 消息列表容器,自动滚动到底部

**Props**:
```typescript
interface MessageListProps {
  messages: Message[]  // 消息数组
  isLoading: boolean   // 加载状态
}
```

**核心功能**:

1. **自动滚动**
```typescript
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages])
```

2. **虚拟滚动优化** (未来)
```typescript
// 对于大量消息,可以使用虚拟滚动
import { VirtualList } from 'react-virtual-scroll'

<VirtualList
  items={messages}
  itemHeight={100}
  renderItem={(message) => <MessageBubble message={message} />}
/>
```

---

## 4. 组件通信模式

### 4.1 父子通信

**Props 向下传递**:
```typescript
// 父组件
<MessageList
  messages={messages}
  isLoading={isLoading}
/>

// 子组件
function MessageList({ messages, isLoading }: Props) {
  // 使用 props
}
```

**事件向上传递**:
```typescript
// 子组件
<ChatInput onSend={handleSend} />

// 父组件
const handleSend = (message: string) => {
  // 处理消息
}
```

### 4.2 跨组件通信

使用自定义 Hooks:
```typescript
// page.tsx
const { messages, addMessage } = useChatMessages()

// MessageList 读取
<MessageList messages={messages} />

// ChatInput 写入
<ChatInput onSend={(msg) => addMessage(msg)} />
```

---

## 5. 样式指南

### 5.1 Tailwind 类名规范

**推荐顺序**:
```typescript
className="
  // 布局
  flex flex-col items-center

  // 尺寸
  w-full h-screen max-w-4xl

  // 间距
  p-4 m-2 gap-4

  // 样式
  bg-white rounded-lg shadow-lg

  // 文本
  text-white text-sm font-bold

  // 交互
  hover:bg-gray-100 focus:ring-2

  // 动画
  transition-all duration-200
"
```

### 5.2 自定义样式

**在 globals.css 中定义**:
```css
.custom-component {
  /* 基础样式 */
  background: linear-gradient(...);

  /* 动画 */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

---

## 6. 性能优化

### 6.1 使用 React.memo

```typescript
export const MessageBubble = React.memo(({ message, index }: Props) => {
  return <div>...</div>
}, (prevProps, nextProps) => {
  // 自定义比较函数
  return prevProps.message.id === nextProps.message.id
})
```

### 6.2 使用 useCallback

```typescript
const handleClick = useCallback(() => {
  // 事件处理
}, [dependencies])
```

### 6.3 使用 useMemo

```typescript
const sortedMessages = useMemo(() => {
  return messages.sort((a, b) => a.timestamp - b.timestamp)
}, [messages])
```

---

## 7. 测试建议

### 7.1 单元测试示例

```typescript
import { render, screen } from '@testing-library/react'
import { MessageBubble } from './MessageBubble'

describe('MessageBubble', () => {
  it('renders user message', () => {
    const message = {
      id: '1',
      content: 'Hello',
      role: 'user',
      timestamp: new Date()
    }

    render(<MessageBubble message={message} index={0} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('shows typing cursor when streaming', () => {
    const message = {
      id: '1',
      content: 'Typing',
      role: 'assistant',
      timestamp: new Date(),
      isStreaming: true
    }

    render(<MessageBubble message={message} index={0} />)
    expect(screen.getByClassName('typing-cursor')).toBeInTheDocument()
  })
})
```

---

## 8. 最佳实践清单

### 8.1 组件设计

- ✅ 单一职责原则
- ✅ Props 接口清晰定义
- ✅ 使用 TypeScript 类型
- ✅ 添加 JSDoc 注释
- ✅ 保持组件小而专注

### 8.2 代码质量

- ✅ 提取复杂逻辑到 Hooks
- ✅ 避免过深的嵌套
- ✅ 使用有意义的变量名
- ✅ 添加错误边界
- ✅ 处理加载和错误状态

### 8.3 性能

- ✅ 合理使用 memo/useCallback/useMemo
- ✅ 避免不必要的重渲染
- ✅ 图片懒加载
- ✅ 虚拟滚动(大列表)

### 8.4 可访问性

- ✅ 使用语义化 HTML
- ✅ 添加 aria 属性
- ✅ 键盘导航支持
- ✅ 屏幕阅读器友好

---

## 9. 常见问题

### Q1: 如何添加新组件?

1. 在 `app/components/` 创建文件
2. 定义 Props 接口
3. 编写组件逻辑
4. 添加 JSDoc 注释
5. 在 page.tsx 中引入

### Q2: 组件应该多大?

- 小组件: < 100 行
- 中等组件: 100-300 行
- 大组件: 300-500 行
- 超过 500 行考虑拆分

### Q3: 何时提取 Hook?

当满足以下条件时:
- 逻辑复杂 (> 50 行)
- 需要在多处复用
- 包含多个 useState/useEffect
- 有副作用处理

### Q4: 如何处理异步状态?

使用 loading/error/data 模式:
```typescript
const [loading, setLoading] = useState(false)
const [error, setError] = useState<Error | null>(null)
const [data, setData] = useState<Data | null>(null)

if (loading) return <LoadingIndicator />
if (error) return <ErrorMessage error={error} />
return <DataDisplay data={data} />
```

---

**文档版本**: 1.0.0
**最后更新**: 2025-11-22
**维护者**: Claude Code Assistant
