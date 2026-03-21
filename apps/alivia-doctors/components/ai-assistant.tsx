"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@alli/ui"
import { Input } from "@alli/ui"
import { Heart, Send, Mic } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickChips = [
  { emoji: "😣", text: "Mi dolor empeoro" },
  { emoji: "🧘", text: "Tecnicas de relajacion" },
  { emoji: "💊", text: "Sobre mis medicamentos" },
  { emoji: "😴", text: "No puedo dormir" },
]

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", type: "assistant", content: "Hola, estoy aqui contigo. Como puedo ayudarte hoy?", timestamp: new Date() },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (text?: string) => {
    const content = text || inputMessage
    if (!content.trim()) return
    setMessages(prev => [...prev, { id: Date.now().toString(), type: "user", content, timestamp: new Date() }])
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), type: "assistant", content: generateResponse(content), timestamp: new Date() }])
    }, 800)
    setInputMessage("")
  }

  const generateResponse = (input: string): string => {
    const lower = input.toLowerCase()
    if (lower.includes("dolor") && (lower.includes("fuerte") || lower.includes("empeoro"))) {
      return "Entiendo que lo estas pasando mal. Intenta respirar lento: inhala 4 segundos, manten 4, exhala 4. Si no mejora, puedes enviar un mensaje a tu doctor desde la app."
    }
    if (lower.includes("medicamento") || lower.includes("medicina")) {
      return "Segun tu plan, tienes Ibuprofeno 400mg cada 8h y Paracetamol 500mg cada 6h. Tienes alguna duda especifica?"
    }
    if (lower.includes("dormir") || lower.includes("sueno")) {
      return "El dolor y el sueno estan muy conectados. Evita pantallas 1h antes de dormir, mantén la habitacion fresca, y prueba una respiracion relajante."
    }
    if (lower.includes("relajacion") || lower.includes("tecnica")) {
      return "Prueba la respiracion 4-7-8: inhala 4 segundos, manten 7, exhala 8. Repite 3-4 veces. Es muy efectiva para reducir tension."
    }
    return "Gracias por compartir. Estoy aqui para escucharte. Puedes contarme mas sobre como te sientes?"
  }

  return (
    /* Full height minus header (52px) and nav (68px) — uses flex column */
    <div className="flex flex-col" style={{ height: "calc(100dvh - 52px - 68px - 2rem)" }}>
      {/* Compact header */}
      <div className="text-center pb-3 shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary/15 mx-auto mb-2 flex items-center justify-center">
          <Heart className="w-6 h-6 text-primary" fill="currentColor" />
        </div>
        <p className="text-fluid-base font-bold text-foreground leading-tight">AlivIA</p>
        <p className="text-fluid-sm text-muted-foreground">Disponible 24/7</p>
      </div>

      {/* Quick chips */}
      <div className="flex flex-wrap gap-1.5 justify-center pb-3 shrink-0">
        {quickChips.map((chip) => (
          <button
            key={chip.text}
            onClick={() => handleSend(chip.text)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-fluid-sm font-medium hover:bg-accent transition-colors active:scale-95"
          >
            <span>{chip.emoji}</span>
            <span>{chip.text}</span>
          </button>
        ))}
      </div>

      {/* Messages — scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 pb-2 min-h-0">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[82%] rounded-2xl px-4 py-3 ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
              {message.type === "assistant" && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Heart className="w-3.5 h-3.5 text-primary" fill="currentColor" />
                  <span className="text-[11px] font-bold text-primary">AlivIA</span>
                </div>
              )}
              <p className="text-fluid-sm leading-relaxed">{message.content}</p>
              <p className="text-[10px] opacity-50 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="pt-3 border-t border-border/30 shrink-0">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Escribe tu mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="h-11 pr-10 rounded-2xl bg-muted border-0 text-fluid-sm"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-accent transition-colors"
              onClick={() => setIsListening(!isListening)}
            >
              <Mic className={`w-4 h-4 ${isListening ? "text-destructive" : "text-muted-foreground"}`} />
            </button>
          </div>
          <Button onClick={() => handleSend()} className="w-11 h-11 rounded-2xl shrink-0 p-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
