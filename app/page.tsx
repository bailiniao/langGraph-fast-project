'use client'

import { useRef, useState, useMemo } from 'react'

// 导入组件
import SessionSidebar from './components/SessionSidebar'
import { ChatHeader, ModelContext } from './components/ChatHeader'
import { MessageList } from './components/MessageList'
import { ChatInput, type ChatInputHandle } from './components/ChatInput'
import { BackgroundEffects } from './components/BackgroundEffects'

// 导入自定义 Hooks
import { useChatMessages } from './hooks/useChatMessages'
import { useSessionManager } from './hooks/useSessionManager'
import { useChatHistory } from './hooks/useChatHistory'
import { useSendMessage } from './hooks/useSendMessage'

/**
 * 聊天页面主组件
 *
 * 该组件是聊天应用的主页面,负责:
 * 1. 整合所有子组件(头部、侧边栏、消息列表、输入框)
 * 2. 管理聊天消息状态
 * 3. 管理会话(session)状态
 * 4. 处理消息发送和历史记录加载
 *
 * 架构说明:
 * - 使用自定义 hooks 分离业务逻辑
 * - 组件只负责 UI 渲染和状态组合
 * - 所有复杂逻辑都封装在 hooks 中
 */
export default function ChatPage() {
  const chatInputRef = useRef<ChatInputHandle>(null)
  
  // 模型状态管理
  const [currentModel, setCurrentModel] = useState('qwen3-max')
  
  // 使用 useMemo 确保 context value 对象稳定
  const modelContextValue = useMemo(() => ({
    currentModel,
    setCurrentModel
  }), [currentModel])

  // ==================== 消息管理 ====================
  // 使用 useChatMessages hook 管理所有消息相关的状态和方法
  const {
    messages,              // 当前会话的所有消息
    isLoading,             // 是否正在加载(发送消息中)
    setIsLoading,          // 设置加载状态
    addUserMessage,        // 添加用户消息
    addAssistantMessage,   // 添加 AI 助手消息
    updateMessageContent,  // 更新消息内容(用于流式响应)
    finishStreaming,       // 完成流式传输
    addErrorMessage,       // 添加错误消息
    loadMessages           // 加载历史消息
  } = useChatMessages()

  // ==================== 会话管理 ====================
  // 使用 useSessionManager hook 管理会话(session)相关状态
  const {
    sessionId,             // 当前会话 ID
    sidebarRef,            // 侧边栏组件引用
    createNewSession,      // 创建新会话
    selectSession,         // 切换会话
    updateSessionName,     // 更新会话名称
    setHasUserMessage      // 设置是否有用户消息(用于判断是否需要更新会话名)
  } = useSessionManager()

  // ==================== 历史记录加载 ====================
  // 使用 useChatHistory hook 自动加载会话历史
  // 当 sessionId 变化时,会自动触发历史记录加载
  useChatHistory(sessionId, loadMessages, setHasUserMessage)

  // 恢复正常的useSendMessage调用，我们将通过其他方式确保它能访问到ModelContext

  // 处理建议点击
  const handleSuggestionClick = (text: string) => {
    if (chatInputRef.current) {
      chatInputRef.current.setInput(text)
    }
  }

  // ==================== 渲染 UI ====================
  return (
    <ModelContext.Provider value={modelContextValue}>
      <ChatPageContent
        sessionId={sessionId}
        chatInputRef={chatInputRef}
        messages={messages}
        isLoading={isLoading}
        handleSuggestionClick={handleSuggestionClick}
        createNewSession={createNewSession}
        selectSession={selectSession}
        sidebarRef={sidebarRef}
        setIsLoading={setIsLoading}
        addUserMessage={addUserMessage}
        addAssistantMessage={addAssistantMessage}
        updateMessageContent={updateMessageContent}
        finishStreaming={finishStreaming}
        addErrorMessage={addErrorMessage}
        updateSessionName={updateSessionName}
      />
    </ModelContext.Provider>
  )
}

// 创建一个内部组件来确保useSendMessage能访问到ModelContext
function ChatPageContent({
  sessionId,
  chatInputRef,
  messages,
  isLoading,
  handleSuggestionClick,
  createNewSession,
  selectSession,
  sidebarRef,
  setIsLoading,
  addUserMessage,
  addAssistantMessage,
  updateMessageContent,
  finishStreaming,
  addErrorMessage,
  updateSessionName
}: any) {
  // 在ModelContext.Provider内部调用useSendMessage钩子
  const { sendMessage } = useSendMessage({
    sessionId,
    setIsLoading,
    addUserMessage,
    addAssistantMessage,
    updateMessageContent,
    finishStreaming,
    addErrorMessage,
    updateSessionName
  })

  return (
    <main className="flex-1 flex flex-row relative h-full overflow-hidden">
      {/* 动态背景 */}
      <div className="absolute inset-0 tech-grid-bg z-0 pointer-events-none"></div>
      <div className="ambient-glow"></div>

      {/* 左侧会话历史侧边栏 - Full Height */}
      <SessionSidebar
        ref={sidebarRef}
        currentSessionId={sessionId}
        onSelect={selectSession}
        onNew={createNewSession}
      />

      {/* 右侧主体内容区域 */}
      <div className="flex-1 flex flex-col z-10 overflow-hidden relative h-full">
        {/* 顶部导航栏 - Moved inside right column */}
        <ChatHeader />

        <div className="flex-1 flex flex-col relative overflow-hidden">
             <div className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth flex flex-col z-10 pb-32" id="chat-container">
                {/* 消息列表 */}
                <MessageList 
                  messages={messages} 
                  isLoading={isLoading} 
                  onSuggestionClick={handleSuggestionClick}
                />
             </div>

             {/* 消息输入框 */}
             <div className="absolute bottom-8 left-0 right-0 px-4 md:px-8 flex justify-center z-30">
                <ChatInput 
                  ref={chatInputRef}
                  onSend={sendMessage} 
                  disabled={isLoading} 
                />
             </div>
        </div>
      </div>
    </main>
  )
}
