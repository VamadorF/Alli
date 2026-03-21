"use client"

import { useState } from "react"
import { Button } from "@alli/ui"
import { Textarea } from "@alli/ui"
import { Avatar, AvatarFallback } from "@alli/ui"
import { Send, Phone, AlertTriangle, Stethoscope, User } from "lucide-react"

interface Message {
  id: string
  from: "patient" | "doctor"
  content: string
  time: string
}

const quickMessages = [
  { icon: "📈", text: "Mi dolor ha aumentado mucho" },
  { icon: "💊", text: "Tengo dudas sobre mis medicamentos" },
  { icon: "📉", text: "Me siento mejor, quiero contarle" },
  { icon: "❓", text: "Tengo una pregunta" },
]

export function DoctorMessages() {
  const [messages] = useState<Message[]>([
    { id: "1", from: "doctor", content: "Hola Maria, revise tu diario de esta semana. Me alegra ver que mejoras. Como te sientes con la nueva dosis?", time: "Ayer 15:30" },
    { id: "2", from: "patient", content: "Doctor, mi dolor aumento desde ayer. Esta en 8/10 y no mejora con la medicacion.", time: "Hoy 10:15" },
  ])
  const [newMessage, setNewMessage] = useState("")

  return (
    <div className="space-y-5 py-2">
      {/* Doctor card */}
      <div className="rounded-2xl bg-card border border-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-fluid-base font-bold text-foreground truncate">Dr. Carlos Rodriguez</p>
            <p className="text-fluid-sm text-muted-foreground">Especialista en Dolor</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
              <span className="text-fluid-sm text-muted-foreground">Disponible hoy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick message options */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1">Mensaje rapido</p>
        <div className="grid grid-cols-2 gap-2">
          {quickMessages.map((msg) => (
            <button
              key={msg.text}
              onClick={() => setNewMessage(msg.text)}
              className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all active:scale-95 ${
                newMessage === msg.text ? "bg-primary/10 border-primary" : "bg-card border-border/50 hover:border-primary/30"
              }`}
            >
              <span className="text-fluid-icon leading-none mb-1">{msg.icon}</span>
              <span className="text-fluid-sm font-medium text-foreground leading-snug">{msg.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="rounded-2xl bg-card border border-border/50 p-4 space-y-3">
        <Textarea
          placeholder="Escribe tu mensaje al doctor..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="min-h-[100px] rounded-xl resize-none border-0 bg-muted text-fluid-sm p-3"
        />
        <Button className="w-full h-11 text-fluid-sm rounded-xl font-semibold gap-2">
          <Send className="w-4 h-4" />
          Enviar mensaje
        </Button>
      </div>

      {/* Recent messages */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1">Mensajes recientes</p>
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-2xl p-3 ${message.from === "patient" ? "bg-primary/10 ml-8" : "bg-muted mr-8"}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {message.from === "doctor"
                  ? <Stethoscope className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  : <User className="w-3.5 h-3.5 text-primary shrink-0" />
                }
                <span className="text-fluid-sm font-semibold text-foreground">
                  {message.from === "doctor" ? "Dr. Rodriguez" : "Tu"}
                </span>
                <span className="text-[11px] text-muted-foreground ml-auto">{message.time}</span>
              </div>
              <p className="text-fluid-sm text-foreground leading-relaxed">{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency */}
      <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-fluid-sm font-bold text-foreground">Ayuda urgente</p>
            <p className="text-fluid-sm text-muted-foreground mt-0.5 leading-snug">
              Si tu dolor es muy severo (9-10) o tienes sintomas preocupantes, llama directamente.
            </p>
          </div>
        </div>
        <Button variant="destructive" className="w-full h-11 text-fluid-sm rounded-xl font-semibold gap-2">
          <Phone className="w-4 h-4" />
          Llamar a emergencias
        </Button>
      </div>
    </div>
  )
}
