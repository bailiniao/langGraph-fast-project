# langGraph-fast-project
一键启动你的 LangGraph 1.0 应用 —— 专为初学者打造的最小可行模板，含状态管理、节点编排与持久化示例。

基于 Next.js 16 和 LangGraphJS 1.0 构建的智能聊天应用，支持流式响应、多会话管理和历史记录持久化。


## 特性

- **流式响应** - 实时 AI 对话体验
- **多会话管理** - 支持创建、切换、删除多个会话
- **历史记录** - 聊天记录自动保存到 SQLite
- **Markdown 渲染** - 支持表格、代码高亮
- **模块化架构** - 自定义 Hooks + 组件化设计

## 技术栈

| 类别     | 技术                         |
| -------- | ---------------------------- |
| 前端框架 | Next.js 16 + React 19        |
| 样式     | Tailwind CSS 4               |
| AI 模型  | 阿里云千问 qwen3-max         |
| AI 框架  | LangGraphJS + LangChain      |
| 数据库   | SQLite (better-sqlite3)      |
| 语言     | TypeScript 5                 |

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

```bash
touch .env
```

在 `.env` 中添加：

```bash
# 阿里云千问配置
OPENAI_API_KEY=your_qwen_api_key_here
OPENAI_MODEL_NAME=qwen3-max  # 可选，默认为 qwen3-max
```

**支持的模型：**
- `qwen3-max` - 阿里云千问 3.0 旗舰版（推荐，强大的推理能力）
- `qwen-max` - 阿里云千问 2.5 旗舰版
- `qwen-plus` - 阿里云千问 2.5 增强版
- `qwen-turbo` - 阿里云千问 2.5 快速版

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 项目结构

```
app/
├── page.tsx                 # 主页面
├── hooks/                   # 自定义 Hooks
│   ├── useChatMessages.ts   # 消息状态管理
│   ├── useSessionManager.ts # 会话管理
│   ├── useChatHistory.ts    # 历史记录加载
│   └── useSendMessage.ts    # 消息发送
├── components/              # UI 组件
│   ├── ChatHeader.tsx
│   ├── MessageList.tsx
│   ├── MessageBubble.tsx
│   ├── ChatInput.tsx
│   └── ...
├── api/chat/                # API 路由
│   ├── route.ts             # 聊天接口
│   └── sessions/route.ts    # 会话管理接口
└── agent/                   # LangGraph Agent
    ├── chatbot.ts           # 状态图定义
    ├── db.ts                # 数据库操作
    └── tools.ts             # 工具函数
```

## API 接口

| 方法   | 路径                      | 说明                 |
| ------ | ------------------------- | -------------------- |
| POST   | `/api/chat`               | 发送消息（流式响应） |
| GET    | `/api/chat?thread_id=xxx` | 获取历史记录         |
| GET    | `/api/chat/sessions`      | 获取会话列表         |
| POST   | `/api/chat/sessions`      | 创建会话             |
| PATCH  | `/api/chat/sessions`      | 更新会话名称         |
| DELETE | `/api/chat/sessions`      | 删除会话             |

## 生产部署

### 使用 PM2

```bash
# 启动
pnpm pm2:start

# 查看状态
pnpm pm2:status

# 查看日志
pnpm pm2:logs

# 停止
pnpm pm2:stop
```

## 文档

- [详细设置指南](./SETUP.md)
- [架构文档](./docs/architecture.md)
- [组件指南](./docs/component-guide.md)

## 许可证

MIT

