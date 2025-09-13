import React, { useState, useRef, useEffect } from 'react';
import { type ChatMessage } from '../types';
// Fix: Import GoogleGenAI according to guidelines.
import { GoogleGenAI } from "@google/genai";

// Fix: Initialize the GoogleGenAI client as per guidelines, assuming API_KEY is in environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const AIAssistant: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            sender: 'ai',
            text: 'Welcome to Synapse IDE. Describe a high-level goal, like "add a login button to the header."'
        }
    ]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Fix: Implement Gemini API call to replace the setTimeout mock.
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && prompt.trim()) {
            e.preventDefault();
            const newUserMessage: ChatMessage = {
                id: Date.now(),
                sender: 'user',
                text: prompt,
            };
            const newAiMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: 'Thinking...',
                isLoading: true,
            };

            const currentPrompt = prompt;
            setMessages(prev => [...prev, newUserMessage, newAiMessage]);
            setPrompt('');

            try {
                const systemInstruction = `You are a helpful AI assistant for a web-based IDE called Synapse. 
                You will be asked to help with coding tasks. Provide concise answers and code snippets.
                The user is working on a React project with TypeScript and Tailwind CSS.`;

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: currentPrompt,
                    config: {
                      systemInstruction: systemInstruction,
                    },
                });

                // Fix: Extract text correctly from the response as per guidelines.
                const text = response.text;
    
                setMessages(prev => prev.map(msg => 
                    msg.id === newAiMessage.id ? { ...msg, text: text, isLoading: false } : msg
                ));
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
                setMessages(prev => prev.map(msg => 
                    msg.id === newAiMessage.id ? { ...msg, text: `Error: ${errorMessage}`, isLoading: false } : msg
                ));
            }
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-3 flex flex-col ring-1 ring-gray-700/50 h-full">
            <h2 className="text-xs font-bold mb-3 text-gray-400 tracking-wider uppercase flex-shrink-0">
                AI Assistant
            </h2>
            <div ref={chatContainerRef} className="flex-grow bg-gray-900/50 rounded p-2 text-sm text-gray-300 overflow-auto flex flex-col gap-3">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`max-w-[85%] rounded-lg px-3 py-2 ${
                            message.sender === 'user'
                                ? 'bg-indigo-600 self-end text-white'
                                : 'bg-gray-700 self-start text-gray-200'
                        }`}
                    >
                        {message.isLoading ? (
                            <span className="italic opacity-75">{message.text}</span>
                        ) : (
                            <p className="whitespace-pre-wrap">{message.text}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-2 flex-shrink-0">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Chat with AI..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Chat with AI"
                />
            </div>
        </div>
    );
};

export default AIAssistant;
