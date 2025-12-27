import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';

interface Session {
    id: string;
    name: string;
    created_at: string;
}

interface SessionSidebarProps {
    currentSessionId: string;
    onSelect: (id: string) => void;
    onNew: (id: string) => void;
}

// 田园风格会话标题生成函数
function getSessionTitle(session: Session) {
    if (session.name && session.name.trim()) {
        return session.name;
    }
    // 田园风格默认标题
    const pastoralTitles = [
        '东篱采菊', '南山归隐', '桃花源记', '田园杂兴', 
        '饮酒·其一', '归园田居', '种豆南山', '榆柳荫后',
        '狗吠深巷', '鸡鸣桑树', '虚室有余闲', '久在樊笼'
    ];
    const randomTitle = pastoralTitles[Math.floor(Math.random() * pastoralTitles.length)];
    return `${randomTitle} ${session.id.slice(0, 4)}`;
}

const SessionSidebar = forwardRef(function SessionSidebar(
    { currentSessionId, onSelect, onNew }: SessionSidebarProps,
    ref
) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
    const [newSessionName, setNewSessionName] = useState('');

    useImperativeHandle(ref, () => ({ fetchSessions }), []);

    useEffect(() => {
        fetchSessions();
    }, [currentSessionId]);

    async function fetchSessions() {
        try {
            const res = await fetch('/api/chat/sessions');
            const data = await res.json();
            if (Array.isArray(data.sessions)) {
                setSessions(data.sessions);
            }
        } catch {
            // ignore
        }
    }

    async function handleNew() {
        const res = await fetch('/api/chat/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: '' })
        });
        const data = await res.json();
        if (data.id) {
            onNew(data.id);
            fetchSessions();
        }
    }

    async function handleDelete(id: string, e: React.MouseEvent) {
        e.stopPropagation();

        
        await fetch('/api/chat/sessions', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        fetchSessions();
        // If current session deleted, might want to redirect or clear (parent specific)
    }

    function handleRename(id: string, currentName: string, e: React.MouseEvent) {
        e.stopPropagation();
        setEditingSessionId(id);
        setNewSessionName(currentName);
    }

    async function saveRename(id: string) {
        if (!newSessionName.trim()) {
            setEditingSessionId(null);
            return;
        }
        await fetch('/api/chat/sessions', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name: newSessionName.trim() })
        });
        setEditingSessionId(null);
        setNewSessionName('');
        fetchSessions();
    }

    function handleRenameKeyDown(e: React.KeyboardEvent, id: string) {
        if (e.key === 'Enter') {
            saveRename(id);
        } else if (e.key === 'Escape') {
            setEditingSessionId(null);
            setNewSessionName('');
        }
    }

    // 武侠风格图标组件
    const WuxiaIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 24, height: 24, display: 'inline-block' }}>📖</span>
    )

    const PlusIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 20, height: 20, display: 'inline-block' }}>➕</span>
    )

    const EditIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 18, height: 18, display: 'inline-block' }}>✏️</span>
    )

    const DeleteIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 18, height: 18, display: 'inline-block' }}>🗑️</span>
    )

    const ScrollIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 20, height: 20, display: 'inline-block' }}>📜</span>
    )

    const UserIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 18, height: 18, display: 'inline-block' }}>👤</span>
    )

    const SealIcon = ({ className }: { className?: string }) => (
        <span className={className} style={{ width: 20, height: 20, display: 'inline-block' }}>🔍</span>
    )

    return (
        <aside className="w-64 wuxia-panel flex flex-col h-full z-20 relative border-r-2 border-stone-800/30 hidden md:flex">
            {/* 武侠风格标题 */}
            <div className="p-6 flex items-center gap-3 border-b border-stone-800/30">
                <div className="w-10 h-10 wuxia-paper-bg flex items-center justify-center shadow-lg">
                    <WuxiaIcon className="w-6 h-6 text-stone-600" />
                </div>
                <div className="flex flex-col">
                    <span className="wuxia-text-gradient text-xl font-bold tracking-wide">竹间雅集</span>
                    <span className="text-xs text-stone-700/80 font-medium">归隐雅士之会</span>
                </div>
            </div>

            {/* 新建对话按钮 */}
            <div className="px-4 py-4">
                <button 
                    onClick={handleNew}
                    className="wuxia-button w-full py-3 px-4 flex items-center justify-center gap-3 group"
                >
                    <PlusIcon className="w-5 h-5 group-hover:animate-wuxia-spin-sword" />
                    <span className="font-medium">开卷成文</span>
                </button>
            </div>

            {/* 会话列表 */}
            <div className="flex-1 overflow-y-auto px-3 wuxia-scrollbar">
                <div className="text-xs font-bold text-stone-800/80 uppercase tracking-widest mb-3 px-3 font-serif">
                    田园杂记
                </div>
                <div className="space-y-2">
                    {sessions.length === 0 ? (
                         <div className="wuxia-paper-bg p-6 text-center text-stone-800/60 text-sm italic rounded-lg">
                            暂无田园诗篇
                        </div>
                    ) : (
                        sessions.map((session) => (
                            <div
                        key={session.id}
                        className={`group wuxia-paper-bg flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-300 relative border-2 ${
                            currentSessionId === session.id 
                                ? 'border-bamboo-qing/60 bg-bamboo-paper/40 text-bamboo-ink shadow-lg' 
                                : 'border-bamboo-stone/20 hover:border-bamboo-qing/40 text-bamboo-ink hover:bg-bamboo-paper/60 hover:text-bamboo-ink'
                        }`}
                        onClick={() => onSelect(session.id)}
                    >
                        {/* 左侧装饰线 */}
                        <div className={`w-1 h-8 rounded-full absolute left-0 transition-all duration-300 ${
                            currentSessionId === session.id ? 'bg-bamboo-qing opacity-100' : 'bg-transparent opacity-0'
                        }`} />
                                
                                {/* 卷轴图标 */}
                                <div className={`w-5 h-5 flex-shrink-0 transition-colors ${
                                    currentSessionId === session.id ? 'text-bamboo-qing' : 'text-bamboo-stone group-hover:text-bamboo-qing'
                                }`}>
                                    <ScrollIcon />
                                </div>
                                
                                {editingSessionId === session.id ? (
                                    <input
                                        type="text" 
                                        value={newSessionName}
                                        onChange={(e) => setNewSessionName(e.target.value)}
                                        onBlur={() => saveRename(session.id)}
                                        onKeyDown={(e) => handleRenameKeyDown(e, session.id)}
                                        className="flex-1 wuxia-input text-sm rounded px-3 py-2 outline-none min-w-0"
                                        autoFocus
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="请输入诗篇名称..."
                                    />
                                ) : (
                                    <span className="flex-1 truncate text-sm font-medium">{getSessionTitle(session)}</span>
                                )}

                                {/* 悬浮操作按钮 */}
                                {editingSessionId !== session.id && (
                                    <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 absolute right-3 bg-stone-50/90 backdrop-blur-sm rounded-lg p-1 border border-stone-700/30 shadow-lg`}>
                                        <button
                                            onClick={(e) => handleRename(session.id, session.name, e)}
                                            className="p-1.5 text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
                                            title="重命名"
                                        >
                                            <EditIcon className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(session.id, e)}
                                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100/60 rounded-md transition-colors"
                                            title="删除"
                                        >
                                            <DeleteIcon className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 用户信息区域 */}
            <div className="p-4 border-t border-stone-800/30">
                <div className="wuxia-paper-bg flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50/60 cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-stone-700/30">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-600 to-stone-800 border-2 border-stone-700/50 flex items-center justify-center text-stone-50 shadow-lg">
                            <UserIcon className="w-5 h-5" />
                        </div>
                        {/* 状态指示器 */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-stone-100 animate-pulse"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-stone-900">田园隐士</span>
                        <div className="flex items-center gap-1">
                            <SealIcon className="w-3 h-3 text-stone-600" />
                            <span className="text-xs text-stone-700/80 font-medium">雅客令牌</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
});

export default SessionSidebar;