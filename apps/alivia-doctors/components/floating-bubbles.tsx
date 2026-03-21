"use client"

import { useState } from "react"
import {
  Pill, Stethoscope, Sparkles, TrendingUp, X, LayoutGrid, Activity,
} from "lucide-react"

interface FloatingBubblesProps {
  onSectionChange: (section: string) => void
  activeSection: string
}

const quickActions = [
  { title: "Medicamentos", icon: Pill,        id: "medications",     color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  { title: "Mi Doctor",    icon: Stethoscope, id: "messages",        color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  { title: "Para Ti",      icon: Sparkles,    id: "recommendations", color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
  { title: "Resumen",      icon: TrendingUp,  id: "overview",        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  { title: "Clínica",      icon: Activity,    id: "clinical",        color: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300" },
]

export function FloatingBubbles({ onSectionChange }: FloatingBubblesProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = (id: string) => {
    onSectionChange(id)
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Quick-access bar — sits just above the bottom nav */}
      {isOpen && (
        <div className="fixed left-2 right-2 z-50" style={{ bottom: "calc(68px + 8px)" }}>
          <div className="bg-card/97 backdrop-blur-md rounded-2xl shadow-lg border border-border/40 p-2">
            <div className="flex items-center justify-around">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className="flex flex-col items-center justify-center py-2 px-2 rounded-xl hover:bg-muted/60 transition-all active:scale-95 flex-1 min-w-0"
                >
                  <div className={`w-9 h-9 rounded-xl ${action.color} flex items-center justify-center mb-1`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-semibold text-foreground leading-tight text-center truncate w-full px-1">
                    {action.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trigger button — bottom-right, just above nav */}
      <div className="fixed right-3 z-50" style={{ bottom: "calc(68px + 12px)" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-10 h-10 rounded-xl shadow-md flex items-center justify-center transition-all active:scale-95 ${
            isOpen ? "bg-muted text-muted-foreground" : "bg-primary/90 text-primary-foreground"
          }`}
        >
          {isOpen ? <X className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
        </button>
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
        )}
      </div>
    </>
  )
}
