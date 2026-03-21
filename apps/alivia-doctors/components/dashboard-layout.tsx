"use client"

import type React from "react"
import { Heart, Users, MessageCircle, User } from "lucide-react"
import { FloatingBubbles } from "@/components/floating-bubbles"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

const navItems = [
  { title: "Diario", icon: Heart, id: "pain-diary" },
  { title: "Comunidad", icon: Users, id: "community" },
  { title: "AlivIA", icon: MessageCircle, id: "ai-assistant" },
  { title: "Perfil", icon: User, id: "settings" },
]

const sectionTitles: Record<string, string> = {
  "pain-diary": "Mi Diario",
  community: "Comunidad",
  "ai-assistant": "AlivIA",
  overview: "Resumen",
  messages: "Mi Doctor",
  medications: "Medicamentos",
  recommendations: "Para Ti",
  settings: "Mi Perfil",
  clinical: "Funciones clínicas",
}

export function DashboardLayout({ children, activeSection, onSectionChange }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col bg-background" style={{ height: "100dvh", maxWidth: "100vw", overflow: "hidden" }}>
      {/* Header */}
      <header className="shrink-0 bg-background/95 backdrop-blur-md border-b border-border/30 px-4 py-3 safe-area-top" style={{ zIndex: 30 }}>
        <div className="flex items-center gap-3 max-w-lg mx-auto w-full">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          </div>
          <div className="min-w-0">
            <h1 className="text-fluid-lg font-bold text-foreground leading-tight truncate">
              {sectionTitles[activeSection] || "AlivIA"}
            </h1>
            <p className="text-fluid-sm text-muted-foreground leading-none mt-0.5">
              {getGreeting()}
            </p>
          </div>
        </div>
      </header>

      {/* Scrollable content — takes all remaining space */}
      <main
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="max-w-lg mx-auto w-full px-3 py-4 pb-28">
          {children}
        </div>
      </main>

      {/* Floating quick-access */}
      <FloatingBubbles onSectionChange={onSectionChange} activeSection={activeSection} />

      {/* Bottom navigation */}
      <nav
        className="shrink-0 bg-card/98 backdrop-blur-lg border-t border-border/30 safe-area-bottom"
        style={{ zIndex: 40 }}
      >
        <div className="max-w-lg mx-auto px-1">
          <div className="flex items-stretch justify-around">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex flex-col items-center justify-center py-2.5 flex-1 rounded-xl mx-0.5 transition-all active:scale-95 touch-target ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 mb-1 ${isActive ? "stroke-[2.5]" : ""}`}
                    fill={isActive ? "currentColor" : "none"}
                  />
                  <span className={`text-[11px] font-semibold ${isActive ? "text-primary" : ""}`}>
                    {item.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Buenos dias"
  if (hour < 19) return "Buenas tardes"
  return "Buenas noches"
}
