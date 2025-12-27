'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

interface MarkdownRendererProps {
  content: string
  className?: string
}

// 竹林山水风格代码块装饰组件
const CodeBlockWrapper = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className="relative">
    <div className="wuxia-panel p-4 my-4 rounded-lg border-2 border-bamboo-qing/30 bg-gradient-to-br from-bamboo-cloud/5 to-bamboo-stone/5">
      {/* 左上角竹节装饰 */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-bamboo-qing to-bamboo-ochre rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-bamboo-paper rounded-full"></div>
      </div>
      {/* 右下角竹节装饰 */}
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-bamboo-stone to-bamboo-qing rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-bamboo-paper rounded-full"></div>
      </div>
      <div className={`${className} font-mono text-bamboo-ink`} style={{ fontFamily: 'var(--font-wuxia-body)' }}>
        {children}
      </div>
    </div>
  </div>
)

// 竹林山水风格表格装饰组件
const BambooTable = ({ children }: { children: React.ReactNode }) => (
  <div className="relative wuxia-panel rounded-lg border-2 border-bamboo-qing/30 my-4 overflow-hidden">
    <div className="bg-gradient-to-r from-bamboo-qing/10 to-bamboo-stone/10 p-1">
      <table className="w-full text-bamboo-ink">
        {children}
      </table>
    </div>
    {/* 表格四角竹节装饰 */}
    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-bamboo-qing/50"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-bamboo-qing/50"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-bamboo-qing/50"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-bamboo-qing/50"></div>
  </div>
)

// 竹林山水风格引用块组件
const BambooQuote = ({ children }: { children: React.ReactNode }) => (
  <div className="relative wuxia-panel rounded-lg border-l-4 border-bamboo-qing/60 bg-gradient-to-r from-bamboo-cloud/5 to-transparent my-4 p-4">
    <div className="absolute top-2 left-2 text-bamboo-qing/40 text-2xl">"</div>
    <div className="pl-6 text-bamboo-ink italic" style={{ fontFamily: 'var(--font-wuxia-body)' }}>
      {children}
    </div>
  </div>
)

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`wuxia-paper-bg ${className} max-w-full overflow-hidden prose prose-invert`}>
      <style>{`
        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3,
        .markdown-body h4,
        .markdown-body h5,
        .markdown-body h6 {
          color: var(--bamboo-accent);
          font-family: var(--font-wuxia-title);
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .markdown-body h1 {
          font-size: 2.5rem;
          border-bottom: 2px solid var(--bamboo-accent);
          padding-bottom: 0.5rem;
        }
        .markdown-body h2 {
          font-size: 2rem;
          border-bottom: 1px solid var(--bamboo-accent);
          padding-bottom: 0.3rem;
        }
        .markdown-body h3 {
          font-size: 1.5rem;
        }
        .markdown-body p {
          font-family: var(--font-wuxia-body);
          line-height: 1.8;
          margin-bottom: 1rem;
          color: var(--bamboo-text);
        }
        .markdown-body code {
          background-color: rgba(45, 164, 82, 0.1);
          color: var(--bamboo-accent);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: var(--font-wuxia-body);
        }
        .markdown-body pre {
          background: none !important;
        }
        .markdown-body blockquote {
          border-left: 4px solid var(--bamboo-accent);
          background: linear-gradient(90deg, rgba(45, 164, 82, 0.05), transparent);
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .markdown-body ul, .markdown-body ol {
          padding-left: 2rem;
          margin-bottom: 1rem;
        }
        .markdown-body li {
          margin-bottom: 0.5rem;
          color: var(--bamboo-text);
        }
        .markdown-body strong {
          color: var(--bamboo-accent);
          font-weight: 600;
        }
        .markdown-body em {
          color: var(--bamboo-text-secondary);
          font-style: italic;
        }
        .markdown-body a {
          color: var(--bamboo-accent);
          text-decoration: underline;
          transition: color 0.3s ease;
        }
        .markdown-body a:hover {
          color: var(--bamboo-surface);
        }
        .markdown-body hr {
          border: none;
          border-top: 1px solid var(--bamboo-accent);
          margin: 2rem 0;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // 代码块使用武侠风格装饰
          code({ node, inline, className, children, ...props }: any) {
            if (!inline) {
              return (
                <CodeBlockWrapper className={className}>
                  <code
                    className="block break-words whitespace-pre-wrap"
                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                    {...props}
                  >
                    {children}
                  </code>
                </CodeBlockWrapper>
              )
            }
            return (
              <code
                className={`${className} break-all`}
                style={{ wordBreak: 'break-all' }}
                {...props}
              >
                {children}
              </code>
            )
          },
          // 表格使用竹林山水风格装饰
          table({ node, children, ...props }: any) {
            return (
              <BambooTable>
                <tbody {...props}>
                  {children}
                </tbody>
              </BambooTable>
            )
          },
          th({ node, children, ...props }: any) {
            return (
              <th
                className="bg-bamboo-qing/20 px-4 py-3 text-left font-semibold text-bamboo-ink"
                style={{ wordBreak: 'break-word' }}
                {...props}
              >
                {children}
              </th>
            )
          },
          td({ node, children, ...props }: any) {
            return (
              <td
                className="px-4 py-3 border-t border-bamboo-qing/20"
                style={{ wordBreak: 'break-word' }}
                {...props}
              >
                {children}
              </td>
            )
          },
          // 段落样式
          p({ node, children, ...props }: any) {
            return (
              <p
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                {...props}
              >
                {children}
              </p>
            )
          },
          // 标题样式
          h1({ node, children, ...props }: any) {
            return (
              <h1
                className="wuxia-text-gradient text-3xl font-bold mb-4 pb-2 border-b-2 border-bamboo-qing/50"
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                {...props}
              >
                {children}
              </h1>
            )
          },
          h2({ node, children, ...props }: any) {
            return (
              <h2
                className="text-2xl font-semibold text-bamboo-ink mt-8 mb-4 pb-1 border-b border-bamboo-qing/30"
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                {...props}
              >
                {children}
              </h2>
            )
          },
          h3({ node, children, ...props }: any) {
            return (
              <h3
                className="text-xl font-medium text-bamboo-ink mt-6 mb-3"
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                {...props}
              >
                {children}
              </h3>
            )
          },
          // 引用块样式
          blockquote({ node, children, ...props }: any) {
            return (
              <BambooQuote>
                <blockquote {...props}>
                  {children}
                </blockquote>
              </BambooQuote>
            )
          },
          // 列表样式
          ul({ node, children, ...props }: any) {
            return (
              <ul className="list-disc pl-6 mb-4 space-y-2" {...props}>
                {children}
              </ul>
            )
          },
          ol({ node, children, ...props }: any) {
            return (
              <ol className="list-decimal pl-6 mb-4 space-y-2" {...props}>
                {children}
              </ol>
            )
          },
          li({ node, children, ...props }: any) {
            return (
              <li className="text-bamboo-ink" {...props}>
                {children}
              </li>
            )
          },
          // 链接样式
          a({ node, href, children, ...props }: any) {
            return (
              <a
                href={href}
                className="text-bamboo-qing hover:text-bamboo-ink underline transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            )
          },
          // 强调文本
          strong({ node, children, ...props }: any) {
            return (
              <strong className="text-bamboo-qing font-semibold" {...props}>
                {children}
              </strong>
            )
          },
          // 斜体文本
          em({ node, children, ...props }: any) {
            return (
              <em className="text-bamboo-ink italic" {...props}>
                {children}
              </em>
            )
          },
          // 水平线
          hr({ node, ...props }: any) {
            return (
              <hr
                className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-bamboo-qing/50 to-transparent"
                {...props}
              />
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
