"use client"

import { useState } from "react"
import { Button } from "@alli/ui"
import { ChevronDown, ChevronUp, Play, Sparkles } from "lucide-react"

interface Recommendation {
  id: string
  emoji: string
  title: string
  benefit: string
  time: string
  details: string
}

export function PersonalizedRecommendations() {
  const [dayRec] = useState<Recommendation>({
    id: "1", emoji: "🧘", title: "Respiracion 4-7-8",
    benefit: "Reduce tension y ayuda con el dolor", time: "5 minutos",
    details: "Inhala 4 segundos, manten 7 segundos, exhala 8 segundos. Repite 3-4 veces. Reduce la percepcion del dolor de forma inmediata.",
  })

  const [otherRecs] = useState<Recommendation[]>([
    { id: "2", emoji: "🚶", title: "Caminata suave", benefit: "Tu dolor suele ser menor por las mananas", time: "15 minutos", details: "Aprovecha las mananas cuando tu dolor es menor. Una caminata suave mejora circulacion y reduce rigidez." },
    { id: "3", emoji: "🥗", title: "Alimentos antiinflamatorios", benefit: "Pueden ayudar a reducir inflamacion", time: "Cambio gradual", details: "Incorpora omega-3 (pescado, nueces) y antioxidantes (frutas, verduras de hoja verde). Evita procesados y azucar." },
    { id: "4", emoji: "💤", title: "Higiene del sueno", benefit: "Mejor sueno = menor dolor", time: "Cada noche", details: "Mantén un horario regular, evita pantallas 1 hora antes, y mantén la habitacion fresca y oscura." },
  ])

  const [showDayDetails, setShowDayDetails] = useState(false)
  const [expandedRecs, setExpandedRecs] = useState<string[]>([])

  const toggleRec = (id: string) => {
    setExpandedRecs(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
  }

  return (
    <div className="space-y-5 py-2">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="w-14 h-14 rounded-full bg-primary/15 mx-auto flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-fluid-2xl font-bold text-foreground">Para Ti Hoy</h2>
        <p className="text-fluid-sm text-muted-foreground">Basado en como te has sentido</p>
      </div>

      {/* Featured */}
      <div className="rounded-2xl bg-primary/8 border border-primary/20 p-4 space-y-4" style={{ background: "hsl(var(--primary) / 0.07)" }}>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shrink-0">
            <span className="text-fluid-icon leading-none">{dayRec.emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-0.5">Recomendacion del dia</p>
            <h3 className="text-fluid-lg font-bold text-foreground">{dayRec.title}</h3>
            <p className="text-fluid-sm text-muted-foreground mt-0.5">{dayRec.benefit}</p>
            <p className="text-fluid-sm text-primary font-semibold mt-1">{dayRec.time}</p>
          </div>
        </div>

        {showDayDetails && (
          <div className="rounded-xl bg-card/80 p-3">
            <p className="text-fluid-sm text-foreground leading-relaxed">{dayRec.details}</p>
            <p className="text-[11px] text-muted-foreground mt-2 italic">No reemplaza indicacion medica.</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1 h-11 text-fluid-sm rounded-xl font-semibold gap-2">
            <Play className="w-4 h-4" />
            Comenzar
          </Button>
          <Button variant="outline" onClick={() => setShowDayDetails(!showDayDetails)} className="h-11 px-4 rounded-xl bg-card">
            {showDayDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Other recs */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1">Otras sugerencias</p>
        {otherRecs.map((rec) => {
          const isExpanded = expandedRecs.includes(rec.id)
          return (
            <div key={rec.id} className="rounded-2xl bg-card border border-border/50 overflow-hidden">
              <button onClick={() => toggleRec(rec.id)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <span className="text-fluid-icon leading-none">{rec.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-fluid-sm font-semibold text-foreground truncate">{rec.title}</p>
                  <p className="text-fluid-sm text-muted-foreground truncate">{rec.benefit}</p>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-fluid-sm text-foreground leading-relaxed">{rec.details}</p>
                    <p className="text-fluid-sm text-primary font-semibold mt-1">{rec.time}</p>
                  </div>
                  <Button className="w-full h-10 rounded-xl text-fluid-sm font-semibold">Comenzar</Button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-[11px] text-muted-foreground text-center leading-relaxed px-2 italic">
        Estas sugerencias son orientativas y no reemplazan a tu equipo medico.
      </p>
    </div>
  )
}
