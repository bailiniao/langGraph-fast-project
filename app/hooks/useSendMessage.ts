import { useCallback, useContext } from 'react'
import { ModelContext } from '@/app/components/ChatHeader'

/**
 * 消息发送 Hook 的参数接口
 */
interface UseSendMessageParams {
  sessionId: string                                    // 当前会话 ID
  setIsLoading: (loading: boolean) => void             // 设置加载状态
  addUserMessage: (content: string) => void            // 添加用户消息
  addAssistantMessage: () => { id: string }            // 添加 AI 消息
  updateMessageContent: (id: string, content: string) => void  // 更新消息内容
  finishStreaming: (id: string) => void                // 完成流式传输
  addErrorMessage: () => void                          // 添加错误消息
  updateSessionName: (name: string) => void            // 更新会话名称
}

/**
 * 消息发送 Hook
 *
 * 负责处理消息发送的完整流程:
 * 1. 发送用户消息到服务器
 * 2. 接收并处理流式响应
 * 3. 实时更新 AI 回复
 * 4. 错误处理
 *
 * 流式响应格式:
 * - { type: 'chunk', content: '...' } - 内容片段
 * - { type: 'end' } - 流结束
 * - { type: 'error', message: '...' } - 错误信息
 */
export function useSendMessage({
  sessionId,
  setIsLoading,
  addUserMessage,
  addAssistantMessage,
  updateMessageContent,
  finishStreaming,
  addErrorMessage,
  updateSessionName
}: UseSendMessageParams) {

  // 获取模型上下文
  const { currentModel } = useContext(ModelContext)

  /**
   * 发送消息并处理响应
   *
   * 流程:
   * 1. 添加用户消息到列表
   * 2. 发送 POST 请求到 /api/chat
   * 3. 更新会话名称(如果是第一条消息)
   * 4. 创建空的 AI 消息
   * 5. 读取流式响应并逐步更新消息内容
   * 6. 完成后移除打字光标
   *
   * @param input - 用户输入的消息内容
   */
  const sendMessage = useCallback(async (input: string) => {
    // 1. 添加用户消息
    addUserMessage(input)
    setIsLoading(true)

    try {
      // 直接从 context 中获取最新模型值
      console.log('发送消息，当前模型:', currentModel);
      
      // 2. 发送请求到 API，包含模型名称
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input, 
          thread_id: sessionId,
          model_name: currentModel  // 直接使用 context 中的最新值
        })
      })

      if (!response.ok) {
        throw new Error('网络请求失败')
      }

      // 3. 更新会话名称(首次消息)
      updateSessionName(input)

      // 4. 创建 AI 消息占位符
      const assistantMessage = addAssistantMessage()

      // 5. 处理流式响应
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('无法读取响应流')
      }

      const decoder = new TextDecoder()
      let buffer = ''  // 缓冲区,处理跨块的 JSON

      // 6. 逐块读取响应流
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // 解码二进制数据为文本
        buffer += decoder.decode(value, { stream: true })

        // 按行分割(每行是一个 JSON 对象)
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''  // 保留不完整的行到缓冲区

        // 处理每一行
        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line)

              // 处理内容片段
              if (data.type === 'chunk' && data.content) {
                updateMessageContent(assistantMessage.id, data.content)
              }
              // 流结束
              else if (data.type === 'end') {
                finishStreaming(assistantMessage.id)
                break
              }
              // 服务器错误
              else if (data.type === 'error') {
                throw new Error(data.message || '服务器错误')
              }
            } catch (parseError) {
              console.error('解析流数据错误:', parseError)
            }
          }
        }
      }

    } catch (error) {
      // 7. 错误处理
      console.error('发送消息时出错:', error)
      addErrorMessage()
    } finally {
      // 8. 清理加载状态
      setIsLoading(false)
    }
  }, [
    sessionId,
    currentModel,  // 使用解构后的currentModel作为依赖
    setIsLoading,
    addUserMessage,
    addAssistantMessage,
    updateMessageContent,
    finishStreaming,
    addErrorMessage,
    updateSessionName
  ])

  return { sendMessage }
}