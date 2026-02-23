import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

export default function ChatAssistant({ contextData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am BlueVector AI. How can I help you understand your water system today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            // Build the payload mapping the frontend UI data directly to the backend Pydantic model
            const payload = {
                messages: [
                    ...messages.map(m => ({ role: m.role, content: m.content })),
                    { role: 'user', content: userMsg }
                ],
                context: contextData ? {
                    score: contextData.score,
                    status: contextData.status,
                    pH: contextData.metrics.pH,
                    turbidity: contextData.metrics.turbidity,
                    tds: contextData.metrics.tds,
                    temperature: contextData.metrics.temperature,
                    flow_rate: contextData.metrics.flow_rate
                } : null
            };

            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'aqua_guard_secret_2026' // Syncing this with what is in frontend Services
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to get answer');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the Gemini server right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Toggle Button */}
            {!isOpen && (
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative p-4 bg-slate-900/90 hover:bg-slate-800 text-sky-400 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-in fade-in border border-sky-500/30 backdrop-blur-sm"
                    >
                        <MessageSquare className="w-6 h-6 drop-shadow-md" />
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 w-80 sm:w-[400px] h-[550px] max-h-[80vh] rounded-[2rem] flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden animate-in slide-in-from-bottom-8 duration-500">

                    {/* Glowing Header Underlay */}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-sky-500/10 to-transparent pointer-events-none"></div>

                    {/* Header */}
                    <div className="bg-slate-900/60 border-b border-white/5 p-5 flex justify-between items-center relative z-10 backdrop-blur-md">
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg shadow-sky-500/20 text-white">
                                <Bot className="w-5 h-5 drop-shadow-md" />
                            </div>
                            <div>
                                <h3 className="text-slate-100 font-semibold tracking-wide">BlueVector Support</h3>
                                <p className="text-[11px] font-bold text-sky-400 flex items-center tracking-wider uppercase mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-sky-400 mr-2 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse"></span>
                                    Gemini Engine Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-300 border border-slate-700/50"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar relative z-10">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`} style={{ animationFillMode: 'both' }}>
                                <div className={`max-w-[85%] rounded-[1.5rem] p-4 shadow-lg backdrop-blur-md ${m.role === 'user'
                                    ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-tr-sm border border-sky-400/30'
                                    : 'bg-slate-800/80 text-slate-200 rounded-tl-sm border border-slate-700/50'
                                    }`}>
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start animate-in fade-in">
                                <div className="bg-slate-800/80 border border-slate-700/50 text-slate-300 rounded-[1.5rem] rounded-tl-sm px-5 py-3.5 flex items-center space-x-3 backdrop-blur-md shadow-lg">
                                    <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                                    <span className="text-sm font-medium tracking-wide">Processing logic...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Field */}
                    <div className="p-4 bg-slate-900/80 border-t border-slate-700/50 relative z-10 backdrop-blur-xl">
                        <form onSubmit={handleSendMessage} className="flex relative items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message BlueVector AI..."
                                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl pl-5 pr-14 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:bg-slate-800 transition-all backdrop-blur-sm shadow-inner"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 p-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 text-white rounded-xl transition-all shadow-md disabled:shadow-none"
                            >
                                <Send className="w-4 h-4 translate-x-px translate-y-px" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
