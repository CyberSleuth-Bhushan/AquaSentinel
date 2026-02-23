import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

export default function ChatAssistant({ contextData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am AquaGuard AI. How can I help you understand your water system today?' }
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
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the DeepSeek server right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 animate-in fade-in"
                >
                    <MessageSquare className="w-6 h-6" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-slate-800 border border-slate-700 w-80 sm:w-96 h-[500px] max-h-[80vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">

                    {/* Header */}
                    <div className="bg-slate-900 border-b border-slate-700 p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-sky-500/20 rounded-lg">
                                <Bot className="w-5 h-5 text-sky-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">AquaGuard Support</h3>
                                <p className="text-xs text-sky-400 flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mr-1.5 animate-pulse"></span>
                                    Powered by DeepSeek
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 ${m.role === 'user'
                                        ? 'bg-sky-600 text-white rounded-tr-sm'
                                        : 'bg-slate-700 text-slate-200 rounded-tl-sm'
                                    }`}>
                                    <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-700 text-slate-200 rounded-2xl rounded-tl-sm p-3 flex items-center space-x-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                                    <span className="text-sm">Analyzing data...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Field */}
                    <div className="p-4 bg-slate-900 border-t border-slate-700">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about your water quality..."
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="p-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
