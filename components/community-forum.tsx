"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, Heart, MessageCircle, Users } from "lucide-react"

interface TopicBubble {
  id: string
  label: string
  emoji: string
  colorClass: string
  bgClass: string
  description: string
  posts: ForumPost[]
}

interface ForumPost {
  id: string
  author: string
  initials: string
  content: string
  time: string
  likes: number
  isLiked: boolean
}

const topics: TopicBubble[] = [
  {
    id: "tecnicas",
    label: "Tecnicas",
    emoji: "🧘",
    colorClass: "text-teal-700 dark:text-teal-400",
    bgClass: "bg-teal-50 border-teal-200 dark:bg-teal-950/40 dark:border-teal-800",
    description: "Ejercicios que ayudan",
    posts: [
      { id: "1", author: "Ana", initials: "A", content: "La respiracion 4-7-8 me ha cambiado la vida. Dos semanas practicandola y noto diferencia real.", time: "2h", likes: 24, isLiked: false },
      { id: "2", author: "Pedro", initials: "P", content: "Estiramientos suaves antes de dormir. No quita todo pero relaja mucho.", time: "5h", likes: 18, isLiked: true },
    ],
  },
  {
    id: "preguntas",
    label: "Preguntas",
    emoji: "💬",
    colorClass: "text-amber-700 dark:text-amber-400",
    bgClass: "bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800",
    description: "Dudas sobre tratamiento",
    posts: [
      { id: "3", author: "Carlos", initials: "C", content: "Alguien ha probado terapia de frio para artritis? Mi doctor la recomendo.", time: "4h", likes: 12, isLiked: false },
    ],
  },
  {
    id: "apoyo",
    label: "Apoyo",
    emoji: "💚",
    colorClass: "text-rose-700 dark:text-rose-400",
    bgClass: "bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800",
    description: "Victorias y momentos dificiles",
    posts: [
      { id: "4", author: "Maria", initials: "M", content: "Esta semana no he pasado de 4/10 de dolor. Pequena victoria que queria compartir.", time: "6h", likes: 45, isLiked: true },
      { id: "5", author: "Jorge", initials: "J", content: "Hoy fue dificil. Me ayuda saber que no estoy solo. Gracias por leerme.", time: "8h", likes: 32, isLiked: false },
    ],
  },
  {
    id: "novedades",
    label: "Novedades",
    emoji: "✨",
    colorClass: "text-indigo-700 dark:text-indigo-400",
    bgClass: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800",
    description: "Info reciente sobre dolor",
    posts: [
      { id: "6", author: "AlivIA", initials: "AI", content: "Nuevo: Mindfulness y dolor cronico. Estudios recientes muestran mejoras con practica regular.", time: "12h", likes: 38, isLiked: false },
    ],
  },
]

export function CommunityForum() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null)
  const [newPost, setNewPost] = useState("")
  const [showComposer, setShowComposer] = useState(false)

  const selectedTopic = topics.find((t) => t.id === activeTopic)

  if (!selectedTopic) {
    return (
      <div className="space-y-5 py-2">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-primary/15 mx-auto flex items-center justify-center">
            <Users className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-fluid-2xl font-bold text-foreground">Comunidad</h2>
          <p className="text-fluid-sm text-muted-foreground">
            Conecta con personas que entienden
          </p>
        </div>

        {/* Topic bubbles — 2-column grid, controlled sizing */}
        <div className="grid grid-cols-2 gap-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all active:scale-95 ${topic.bgClass}`}
            >
              <span className="text-fluid-icon leading-none mb-2">{topic.emoji}</span>
              <span className={`text-fluid-base font-bold leading-tight ${topic.colorClass}`}>
                {topic.label}
              </span>
              <span className="text-fluid-sm text-muted-foreground mt-1 leading-snug">
                {topic.description}
              </span>
              <span className="text-[11px] text-muted-foreground/70 mt-2 bg-background/60 px-2 py-0.5 rounded-full">
                {topic.posts.length} {topic.posts.length === 1 ? "mensaje" : "mensajes"}
              </span>
            </button>
          ))}
        </div>

        <p className="text-fluid-sm text-muted-foreground text-center leading-relaxed px-2">
          Comparte con respeto. Las dudas medicas, consultalas con tu doctor.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-2">
      {/* Back header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setActiveTopic(null); setShowComposer(false); setNewPost("") }}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted hover:bg-accent transition-colors active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <span className="text-fluid-icon leading-none">{selectedTopic.emoji}</span>
        <div className="min-w-0">
          <h3 className="text-fluid-lg font-bold text-foreground truncate">{selectedTopic.label}</h3>
          <p className="text-fluid-sm text-muted-foreground">{selectedTopic.posts.length} mensajes</p>
        </div>
      </div>

      {/* Composer toggle */}
      {!showComposer ? (
        <button
          onClick={() => setShowComposer(true)}
          className="w-full text-left px-4 py-3 rounded-2xl bg-card border border-border/50 text-muted-foreground text-fluid-sm hover:bg-accent/30 transition-colors"
        >
          Compartir algo con el grupo...
        </button>
      ) : (
        <div className="rounded-2xl bg-card border border-border/50 p-4 space-y-3">
          <Textarea
            autoFocus
            placeholder="Escribe tu mensaje..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[90px] rounded-xl resize-none border-0 bg-muted text-fluid-sm p-3"
          />
          <div className="flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => { setShowComposer(false); setNewPost("") }} className="text-muted-foreground rounded-xl text-fluid-sm h-10">
              Cancelar
            </Button>
            <Button className="rounded-xl px-5 gap-2 h-10 text-fluid-sm">
              <Send className="w-4 h-4" />
              Publicar
            </Button>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-3">
        {selectedTopic.posts.map((post) => (
          <div key={post.id} className="rounded-2xl bg-card border border-border/50 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-fluid-sm font-bold">
                  {post.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <span className="text-fluid-sm font-semibold text-foreground">{post.author}</span>
                <span className="text-[11px] text-muted-foreground ml-2">hace {post.time}</span>
              </div>
            </div>
            <p className="text-fluid-sm text-foreground leading-relaxed">{post.content}</p>
            <div className="flex items-center gap-5">
              <button className={`flex items-center gap-1.5 text-fluid-sm transition-colors ${post.isLiked ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-fluid-sm text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Responder</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
