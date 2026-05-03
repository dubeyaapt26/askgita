import React, { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { getApiUrl } from "@/lib/api-url";

interface VerseRef {
  chapterId: number;
  verseId: number;
  skt: string;
  ref: string;
}

interface GitaMessage {
  role: "user" | "assistant";
  content: string;
  english?: string;
  hindi?: string;
  verses?: VerseRef[];
  refused?: boolean;
  refusedMsg?: string;
  refusedMsgHindi?: string;
}

async function askGitaV2(messages: Array<{ role: string; content: string }>) {
  const res = await fetch(getApiUrl("/api/gita/chat/v2"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}

const SUGGESTIONS = [
  "How to overcome fear?",
  "मेरा उद्देश्य क्या है?",
  "What is karma yoga?",
  "How to find inner peace?",
  "I am anxious about my future",
  "What does Gita say about duty?",
];

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-dark-brown text-base flex-shrink-0 shadow">
          🪷
        </div>
        <div className="bg-white border border-gold/20 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
          <span className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ msg }: { msg: GitaMessage }) {
  if (msg.refused) {
    return (
      <div className="flex justify-start">
        <div className="flex items-start gap-3 max-w-[88%]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-dark-brown text-base flex-shrink-0 shadow mt-0.5">
            🪷
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
            <p className="font-serif text-sm text-amber-800 leading-relaxed">{msg.refusedMsg}</p>
            {msg.refusedMsgHindi && (
              <p className="font-devanagari text-sm text-amber-700 mt-2 leading-relaxed">{msg.refusedMsgHindi}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[90%]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-dark-brown text-base flex-shrink-0 shadow mt-0.5">
          🪷
        </div>
        <div className="bg-white border border-gold/20 rounded-2xl rounded-tl-none shadow-sm overflow-hidden">
          {msg.english && (
            <div className="p-4 border-b border-gold/10">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs font-cinzel text-saffron uppercase tracking-widest">English</span>
              </div>
              <p className="font-serif text-sm text-text-dark leading-relaxed">{msg.english}</p>
            </div>
          )}
          {msg.hindi && (
            <div className="p-4 bg-parchment/30">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs font-cinzel text-saffron uppercase tracking-widest">हिंदी</span>
              </div>
              <p className="font-devanagari text-sm text-text-dark leading-[1.9]">{msg.hindi}</p>
            </div>
          )}
          {msg.verses && msg.verses.length > 0 && (
            <div className="px-4 py-3 bg-dark-brown/5 border-t border-gold/10">
              <p className="text-[10px] font-cinzel text-text-muted uppercase tracking-widest mb-2">Referenced Shlokas</p>
              <div className="flex flex-wrap gap-2">
                {msg.verses.map((v, i) => (
                  <Link
                    key={i}
                    href={`/chapter/${v.chapterId}/verse/${v.verseId}`}
                    className="group flex flex-col bg-white hover:bg-saffron/5 border border-gold/30 hover:border-saffron/50 rounded-xl px-3 py-2 transition-all cursor-pointer"
                  >
                    <span className="text-xs font-cinzel font-bold text-saffron group-hover:text-deep-saffron">
                      {v.chapterId}.{v.verseId}
                    </span>
                    {v.skt && (
                      <span className="font-devanagari text-[11px] text-text-medium leading-tight mt-0.5 line-clamp-1">
                        {v.skt.split("\n")[0]}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<GitaMessage[]>([]);
  const [apiHistory, setApiHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: GitaMessage = { role: "user", content: text };
    const newApiHistory = [...apiHistory, { role: "user", content: text }];

    setMessages((prev) => [...prev, userMsg]);
    setApiHistory(newApiHistory);
    setInput("");
    setIsLoading(true);

    try {
      const data = await askGitaV2(newApiHistory);

      if (data.refused) {
        const botMsg: GitaMessage = {
          role: "assistant",
          content: data.message,
          refused: true,
          refusedMsg: data.message,
          refusedMsgHindi: data.messageHindi,
        };
        setMessages((prev) => [...prev, botMsg]);
        setApiHistory((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        const botMsg: GitaMessage = {
          role: "assistant",
          content: data.english || "",
          english: data.english,
          hindi: data.hindi,
          verses: data.verses || [],
        };
        setMessages((prev) => [...prev, botMsg]);
        setApiHistory((prev) => [
          ...prev,
          { role: "assistant", content: `${data.english || ""}\n\nHindi: ${data.hindi || ""}` },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Unable to connect. Please try again.",
          refused: true,
          refusedMsg: "Unable to connect to Gita wisdom. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Gita chatbot" : "Ask the Bhagavad Gita"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-saffron via-[#E07000] to-gold rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 ring-4 ring-gold/20 focus:outline-none"
      >
        {isOpen ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl drop-shadow">🪷</span>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gold/20 animate-in slide-in-from-bottom-6 fade-in duration-300"
          style={{
            width: "min(480px, calc(100vw - 32px))",
            height: "min(680px, calc(100vh - 120px))",
            background: "#FDFAF4",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1A0A02, #2E1408)" }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-lg shadow-inner flex-shrink-0">
              🪷
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-cinzel text-gold text-sm font-semibold leading-tight tracking-wide">Gita Wisdom · गीता ज्ञान</h3>
              <p className="text-parchment/50 text-[11px] font-cinzel uppercase tracking-widest mt-0.5">
                Answers only from the Bhagavad Gita
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-parchment/40 text-[10px] font-cinzel uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 pb-4">
                <div className="text-5xl text-gold/30 font-devanagari mb-4">ॐ</div>
                <h4 className="font-cinzel text-dark-brown text-base font-semibold mb-1">Ask the Gita</h4>
                <p className="font-serif text-text-medium text-sm leading-relaxed mb-6 italic">
                  "Seek refuge in wisdom. Whatever troubles your heart, the Gita has answered it."
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="bg-white hover:bg-saffron/10 border border-gold/30 hover:border-saffron/50 text-dark-brown text-xs font-serif px-3 py-2 rounded-full transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) =>
                  msg.role === "user" ? (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[78%] bg-gradient-to-br from-saffron to-[#D06000] text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-sm">
                        <p className="font-serif text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <AssistantMessage key={i} msg={msg} />
                  )
                )}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-1.5 bg-white border-t border-gold/10 flex-shrink-0">
            <p className="text-[10px] font-cinzel text-text-muted text-center uppercase tracking-widest">
              Only answers based on Bhagavad Gita wisdom
            </p>
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 bg-white flex-shrink-0">
            <div className="flex items-center gap-2 bg-parchment/60 border border-gold/25 rounded-xl px-3 py-2 focus-within:border-saffron/60 focus-within:ring-1 focus-within:ring-saffron/20 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend(input)}
                placeholder="Ask the Gita anything about life…"
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm font-serif text-text-dark placeholder:text-text-muted focus:outline-none min-w-0"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-[#D06000] flex items-center justify-center text-white hover:opacity-90 disabled:opacity-40 transition-opacity flex-shrink-0"
                aria-label="Send"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m22 2-7 20-4-9-9-4Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
