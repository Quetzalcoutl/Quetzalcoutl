"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Loader2,
  Sparkles,
  Minimize2,
  Maximize2,
  HelpCircle,
} from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
}

interface NewtonConfig {
  name: string
  avatar: string
  greeting: string
  available: boolean
}

const quickQuestions = [
  "Quais são os planos disponíveis?",
  "Como funciona a instalação?",
  "Quero contratar um plano!",
]

export default function NewtonChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState<NewtonConfig | null>(null)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // static greeting (no city)
  const getGreeting = () => {
    return (
      config?.greeting ||
      "Olá! 👋 Sou seu assistente virtual. Temos três planos de internet: Start (R$ 1.500), Pro (R$ 2.000) e Premium (R$ 3.000). Como posso ajudar?"
    )
  }

  // simple contact list
  const contacts = [
    {
      name: "Atendimento",
      phone: "92982610073",
      whatsapp: "5592982610073",
    },
  ]

  // Fetch Newton config on mount
  useEffect(() => {
    fetch("/api/newton")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data)
      })
      .catch(console.error)
  }, [])

  // Update greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: getGreeting(),
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setShowQuickQuestions(false)

    try {
      const response = await fetch("/api/newton", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content }].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        model: data.model,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const contactInfo = contacts[0]
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato:\n\n📞 ${contactInfo.name}: ${contactInfo.phone}\n💬 WhatsApp: wa.me/${contactInfo.whatsapp}`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleQuickQuestion = (question: string) => {
    sendMessage(question)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!config) return null

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <Bot className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></span>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          <p className="text-sm font-medium">Fale com o Newton 🤖</p>
          <p className="text-xs text-muted-foreground">Assistente virtual</p>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? "bottom-24 right-6 w-72"
              : "bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100%-2rem)] md:w-[420px] h-[600px] max-h-[calc(100vh-2rem)]"
          }`}
        >
          <Card className="h-full flex flex-col overflow-hidden shadow-2xl border-2 border-primary/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  {config.avatar}
                </div>
                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    {config.name}
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online agora
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <span className="text-sm">{config.avatar}</span>
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] ${
                          message.role === "user" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-2.5 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-sm"
                              : "bg-background border border-border rounded-tl-sm shadow-sm"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 px-1">
                          <span className="text-[10px] text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.model && message.model !== "fallback" && (
                            <Badge variant="outline" className="text-[9px] py-0 px-1.5 h-4">
                              {message.model}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                        <span className="text-sm">{config.avatar}</span>
                      </div>
                      <div className="bg-background border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Newton está digitando...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {showQuickQuestions && messages.length <= 1 && (
                  <div className="px-4 py-3 border-t border-border bg-background shrink-0">
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      Perguntas rápidas:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="p-4 border-t border-border bg-background shrink-0"
                >
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!inputValue.trim() || isLoading}
                      className="shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-muted-foreground">
                      Powered by AI • AmazoniaSat
                    </p>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {contacts.map((contact, idx) => (
                        <a
                          key={idx}
                          href={`https://wa.me/${contact.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-green-600 hover:underline flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          {contact.name}
                        </a>
                      ))}
                      <a
                        href={`tel:+55${contacts[0].phone}`}
                        className="text-[10px] text-primary hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        Ligar
                      </a>
                    </div>
                  </div>
                </form>
              </>
            )}

            {isMinimized && (
              <div className="p-3 bg-background">
                <p className="text-sm text-muted-foreground">
                  Chat minimizado. Clique para expandir.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
