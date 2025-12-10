import '../utils/loadEnv';
import {
  StateGraph,
  MessagesAnnotation,
  START,
  END,
} from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai'; // 替换 Google GenAI 为 OpenAI
import { HumanMessage } from '@langchain/core/messages';
import { SqliteSaver } from '@langchain/langgraph-checkpoint-sqlite';
import path from 'path';
import Database from 'better-sqlite3';
import { initSessionTable } from './db';
import { getEnabledToolsConfig } from './config/tools.config'; // 修改导入

// 存储当前模型名称的全局变量
let currentModelName: string = process.env.OPENAI_MODEL_NAME || 'qwen3-max';

// 创建模型工厂函数，根据模型名称动态创建 ChatOpenAI 实例
function createModel(modelName: string) {
  console.log('创建模型实例，使用模型:', modelName); // 添加调试日志
  return new ChatOpenAI({
    model: modelName,
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    },
    temperature: 0.7,
    streaming: true, // 启用流式响应
  });
}

// 聊天节点：处理用户输入并生成回复
async function chatbotNode(state: typeof MessagesAnnotation.State) {
  // 获取最新的用户消息
  const lastMessage = state.messages[state.messages.length - 1];
  
  // 检查是否是用户消息
  if (lastMessage._getType() === 'human') {
    const userMessage = lastMessage.content.toString();
    
    // 尝试使用特定回复工具
    try {
      const toolsConfig = getEnabledToolsConfig();
      const specificReplyTool = toolsConfig['specific_reply'];
      
      // 如果有特定回复工具，则直接调用其处理函数
      if (specificReplyTool) {
        const reply = await specificReplyTool.handler({ message: userMessage });
        
        // 如果有特定回复，则直接返回
        if (reply) {
          return { messages: [{ content: reply, type: 'ai' }] };
        }
      }
    } catch (error) {
      // 如果工具调用失败，继续使用大模型
      console.log('特定回复工具调用失败，使用大模型:', error);
    }
  }
  
  // 如果没有特定回复，则使用大模型生成回复
  // 根据当前模型名称创建模型实例
  const model = createModel(currentModelName);
  console.log('使用模型:', currentModelName);
  const response = await model.invoke(state.messages);
  return { messages: [response] };
}

const dbPath = path.resolve(process.cwd(), 'chat_history.db');
export const db = new Database(dbPath);

// 构建流式聊天机器人图
const workflow = new StateGraph(MessagesAnnotation)
  .addNode('chatbot', chatbotNode)
  .addEdge(START, 'chatbot')
  .addEdge('chatbot', END);

// 异步初始化检查点保存器和应用
let checkpointer: SqliteSaver;
let app: ReturnType<typeof workflow.compile>;

export const getCheckpointer = () => {
  if (!checkpointer) {
    // 创建 SQLite 检点保存器
    console.log('初始化 SqliteSaver，数据库路径:', dbPath);
    try {
      // 初始化自定义 sessions 表
      initSessionTable();
      checkpointer = new SqliteSaver(db);
      console.log('SqliteSaver 初始化成功');
    } catch (error) {
      console.error('SqliteSaver 初始化失败:', error);
      throw error;
    }
  }
  return checkpointer;
};

async function initializeApp() {
  if (!checkpointer) {
    // 创建 SQLite 检点保存器
    console.log('初始化 SqliteSaver，数据库路径:', dbPath);
    try {
      // 使用 better-sqlite3 创建数据库连接
      const db = new Database(dbPath);
      // 初始化自定义 sessions 表
      initSessionTable();
      checkpointer = new SqliteSaver(db);
      console.log('SqliteSaver 初始化成功');
    } catch (error) {
      console.error('SqliteSaver 初始化失败:', error);
      throw error;
    }
  }

  if (!app) {
    app = workflow.compile({ checkpointer });
  }

  return app;
}

// 获取应用实例的函数
const getApp = async () => {
  return await initializeApp();
};

// 设置当前模型名称的函数
export function setCurrentModelName(modelName: string) {
  console.log('设置当前模型名称为:', modelName); // 添加调试日志
  currentModelName = modelName;
}

// 流式响应示例
async function runStreamingChatbot() {
  console.log('=== 流式聊天机器人示例 ===');

  const threadConfig = {
    configurable: { thread_id: 'streaming-demo' + Math.random() },
  };

  console.log('\n--- 流式响应演示 ---');
  console.log('用户: 请详细介绍一下 React 的核心概念');
  console.log('AI: ', { newline: false });

  // 使用 streamEvents 获取流式响应
  for await (const event of app.streamEvents(
    {
      messages: [new HumanMessage('你是谁？')],
    },
    { version: 'v2', ...threadConfig }
  )) {
    // 过滤 LLM 流式输出事件
    if (event.event === 'on_chat_model_stream') {
      const chunk = event.data?.chunk;
      if (chunk?.content) {
        process.stdout.write(chunk.content);
      }
    }
  }

  console.log('\n\n--- 另一个流式响应 ---');
  console.log('用户: 能给我一些学习建议吗？');
  console.log('AI: ', { newline: false });

  for await (const event of app.streamEvents(
    {
      messages: [new HumanMessage('能给我一些学习建议吗？')],
    },
    { version: 'v2', ...threadConfig }
  )) {
    if (event.event === 'on_chat_model_stream') {
      const chunk = event.data?.chunk;
      if (chunk?.content) {
        process.stdout.write(chunk.content);
      }
    }
  }

  console.log('\n');
}

// 流式状态更新示例
async function runStreamingStates() {
  console.log('\n=== 流式状态更新示例 ===');

  const threadConfig = { configurable: { thread_id: 'state-streaming' } };

  console.log('\n--- 监听状态变化 ---');

  // 使用 stream 方法获取每步的状态更新
  const stream = await app.stream(
    {
      messages: [new HumanMessage('你好，请介绍一下自己')],
    },
    { streamMode: 'updates', ...threadConfig }
  );

  for await (const chunk of stream) {
    console.log('状态更新:', JSON.stringify(chunk, null, 2));
  }
}

// 自定义流式处理器
class StreamingHandler {
  private buffer: string = '';
  private onToken?: (token: string) => void;
  private onComplete?: (fullResponse: string) => void;

  constructor(options: {
    onToken?: (token: string) => void;
    onComplete?: (fullResponse: string) => void;
  }) {
    this.onToken = options.onToken;
    this.onComplete = options.onComplete;
  }

  async handleStream(
    graph: ReturnType<typeof workflow.compile>,
    input: { messages: HumanMessage[] },
    config: { configurable: { thread_id: string } }
  ) {
    this.buffer = '';

    for await (const event of graph.streamEvents(input, {
      version: 'v2',
      ...config,
    })) {
      if (event.event === 'on_chat_model_stream') {
        const chunk = event.data?.chunk;
        if (chunk?.content) {
          this.buffer += chunk.content;
          this.onToken?.(chunk.content);
        }
      }
    }

    this.onComplete?.(this.buffer);
    return this.buffer;
  }
}

// 使用自定义流式处理器的示例
async function runCustomStreamingHandler() {
  console.log('\n=== 自定义流式处理器示例 ===');

  const threadConfig = { configurable: { thread_id: 'custom-streaming' } };

  const handler = new StreamingHandler({
    onToken: (token) => {
      process.stdout.write(token);
    },
    onComplete: (fullResponse) => {
      console.log(`\n\n[完整响应长度: ${fullResponse.length} 字符]`);
    },
  });

  console.log('\n用户: 请解释一下什么是状态管理');
  console.log('AI: ');

  await handler.handleStream(
    app,
    {
      messages: [new HumanMessage('请解释一下什么是状态管理')],
    },
    threadConfig
  );
}

// 批量流式处理示例
async function runBatchStreaming() {
  console.log('\n=== 批量流式处理示例 ===');

  const questions = ['什么是组件？', '什么是 Props？', '什么是 State？'];

  for (let i = 0; i < questions.length; i++) {
    const threadConfig = { configurable: { thread_id: `batch-${i}` } };

    console.log(`\n--- 问题 ${i + 1}: ${questions[i]} ---`);
    console.log('AI: ');

    for await (const event of app.streamEvents(
      {
        messages: [new HumanMessage(questions[i])],
      },
      { version: 'v2', ...threadConfig }
    )) {
      if (event.event === 'on_chat_model_stream') {
        const chunk = event.data?.chunk;
        if (chunk?.content) {
          process.stdout.write(chunk.content);
        }
      }
    }

    console.log('\n');
  }
}

// 如果直接运行此文件
if (require.main === module) {
  // async function main() {
  //   // await runStreamingChatbot();
  //   // await runStreamingStates();
  //   // await runCustomStreamingHandler();
  //   // await runBatchStreaming();

  //   for await (const item of checkpointer.list({})) {
  //     console.log('%c Line:218 🍭 item', 'color:#ea7e5c', item);
  //   }
  // }

  // main().catch(console.error);
  // 初始化阿里云千问模型
  const model = new ChatOpenAI({
    model: process.env.OPENAI_MODEL_NAME || 'qwen3-max',
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    },
    temperature: 0.7,
    streaming: true, // 启用流式响应
  });
  model.invoke([new HumanMessage('你好')]).then(res => {

    console.log("%c Line:274 🍧 res", "color:#42b983", res);
  }).catch(err => {
    console.log("%c Line:277 🥛 err", "color:#33a5ff", err);

  })
}

export {
  getApp,
  runStreamingChatbot,
  runStreamingStates,
  StreamingHandler,
  runCustomStreamingHandler,
  runBatchStreaming,
  checkpointer
};
