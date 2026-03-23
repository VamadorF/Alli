"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Check, ChevronRight, Sparkles } from "lucide-react"

type Step = "welcome" | "pain" | "feeling" | "notes" | "done"

const feelings = [
  { emoji: "😴", label: "Cansado/a", value: "cansado" },
  { emoji: "😰", label: "Ansioso/a", value: "ansioso" },
  { emoji: "😊", label: "Tranquilo/a", value: "tranquilo" },
  { emoji: "😔", label: "Triste", value: "triste" },
  { emoji: "💪", label: "Con energia", value: "energia" },
  { emoji: "😐", label: "Normal", value: "normal" },
]

const painEmojis = ["😊","🙂","😐","😕","😣","😖","😫","😩","😭","🆘","🚨"]
const painLabels = ["Sin dolor","Muy leve","Leve","Leve-mod","Moderado","Moderado","Fuerte","Fuerte","Muy fuerte","Severo","Insoportable"]

export function PainDiary() {
  const [step, setStep] = useState<Step>("welcome")
  const [painLevel, setPainLevel] = useState(3)
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const toggleFeeling = (value: string) => {
    setSelectedFeelings(prev =>
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
    )
  }

  const handleComplete = () => setStep("done")

  const resetDiary = () => {
    setStep("welcome")
    setPainLevel(3)
    setSelectedFeelings([])
    setNotes("")
  }

  if (step === "welcome") {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
        <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
          <span className="text-fluid-icon">💚</span>
        </div>
        <div className="space-y-2 px-2">
          <h2 className="text-fluid-2xl font-bold text-foreground text-balance">
            Hola, como estas hoy?
          </h2>
          <p className="text-fluid-base text-muted-foreground leading-relaxed max-w-[260px] mx-auto text-balance">
            Tomemos un momento para registrar como te sientes
          </p>
        </div>
        <Button
          onClick={() => setStep("pain")}
          size="lg"
          className="w-full max-w-[280px] h-13 text-fluid-lg rounded-2xl font-semibold"
        >
          Comenzar
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
        <button
          onClick={handleComplete}
          className="text-muted-foreground text-fluid-sm hover:text-foreground transition-colors py-2"
        >
          Ahora no puedo
        </button>
      </div>
    )
  }

  if (step === "done") {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
        <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
          <Check className="w-10 h-10 text-primary" strokeWidth={3} />
        </div>
        <div className="space-y-2 px-2">
          <h2 className="text-fluid-2xl font-bold text-foreground">Registro guardado</h2>
          <p className="text-fluid-base text-muted-foreground leading-relaxed max-w-[260px] mx-auto text-balance">
            Gracias por tomarte este momento. Cuidarte es importante.
          </p>
        </div>
        <div className="w-full max-w-[320px] p-4 rounded-2xl bg-accent/50 border border-border/30">
          <div className="flex items-start gap-3 text-left">
            <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-fluid-sm text-foreground leading-relaxed">
              La respiracion profunda puede ayudarte en momentos dificiles
            </p>
          </div>
        </div>
        <button
          onClick={resetDiary}
          className="text-primary text-fluid-sm font-medium hover:underline py-2"
        >
          Agregar mas detalles
        </button>
      </div>
    )
  }

  if (step === "pain") {
    return (
      <div className="space-y-5">
        {/* Progress */}
        <div className="flex justify-center gap-2 pt-2">
          <div className="w-8 h-1.5 rounded-full bg-primary" />
          <div className="w-8 h-1.5 rounded-full bg-muted" />
          <div className="w-8 h-1.5 rounded-full bg-muted" />
        </div>

        <div className="text-center space-y-1 px-2">
          <h2 className="text-fluid-2xl font-bold text-foreground">Tu nivel de dolor</h2>
          <p className="text-fluid-sm text-muted-foreground">Toca el numero que mejor lo describa</p>
        </div>

        {/* Emoji + level display */}
        <div className="flex flex-col items-center py-4 space-y-1">
          <span className="text-fluid-icon leading-none">{painEmojis[painLevel]}</span>
          <span className="text-5xl font-bold text-foreground leading-none mt-2">{painLevel}</span>
          <span className="text-fluid-sm text-muted-foreground">{painLabels[painLevel]}</span>
        </div>

        {/* Pain level grid — 4 cols x 3 rows fits any screen */}
        <div className="grid grid-cols-4 gap-2 px-1">
          {[0,1,2,3,4,5,6,7,8,9,10].map((level) => (
            <button
              key={level}
              onClick={() => setPainLevel(level)}
              className={`h-12 rounded-2xl text-fluid-base font-bold transition-all active:scale-95 ${
                level === painLevel
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              {level}
            </button>
          ))}
          {/* 11th button fills the 4th col of the 3rd row */}
          <div className="h-12" />
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={() => setStep("feeling")} size="lg" className="w-full h-12 text-fluid-base rounded-2xl font-semibold">
            Continuar
          </Button>
          <button onClick={handleComplete} className="text-muted-foreground text-fluid-sm py-2 hover:text-foreground transition-colors">
            Solo guardar el dolor
          </button>
        </div>
      </div>
    )
  }

  if (step === "feeling") {
    return (
      <div className="space-y-5">
        {/* Progress */}
        <div className="flex justify-center gap-2 pt-2">
          <div className="w-8 h-1.5 rounded-full bg-primary" />
          <div className="w-8 h-1.5 rounded-full bg-primary" />
          <div className="w-8 h-1.5 rounded-full bg-muted" />
        </div>

        <div className="text-center space-y-1 px-2">
          <h2 className="text-fluid-2xl font-bold text-foreground">Como te sientes?</h2>
          <p className="text-fluid-sm text-muted-foreground">Puedes elegir varias opciones</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {feelings.map((feeling) => {
            const isSelected = selectedFeelings.includes(feeling.value)
            return (
              <button
                key={feeling.value}
                onClick={() => toggleFeeling(feeling.value)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                  isSelected
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border/50 hover:border-primary/30"
                }`}
              >
                <span className="text-fluid-icon leading-none mb-2">{feeling.emoji}</span>
                <span className={`text-fluid-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {feeling.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={() => setStep("notes")} size="lg" className="w-full h-12 text-fluid-base rounded-2xl font-semibold">
            Continuar
          </Button>
          <button onClick={() => setStep("pain")} className="text-muted-foreground text-fluid-sm py-2 hover:text-foreground transition-colors">
            Atras
          </button>
        </div>
      </div>
    )
  }

  if (step === "notes") {
    return (
      <div className="space-y-5">
        {/* Progress */}
        <div className="flex justify-center gap-2 pt-2">
          <div className="w-8 h-1.5 rounded-full bg-primary" />
          <div className="w-8 h-1.5 rounded-full bg-primary" />
          <div className="w-8 h-1.5 rounded-full bg-primary" />
        </div>

        <div className="text-center space-y-1 px-2">
          <h2 className="text-fluid-2xl font-bold text-foreground">Algo mas?</h2>
          <p className="text-fluid-sm text-muted-foreground">Opcional — escribe lo que quieras</p>
        </div>

        <Textarea
          placeholder="Que paso hoy? Como dormiste? Algo te preocupa?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[130px] rounded-2xl resize-none text-fluid-base p-4 bg-card border-border/50"
        />

        <div className="flex flex-wrap gap-2">
          {["No dormi bien","Estres","Clima frio","Ejercicio","Me siento mejor"].map((t) => (
            <button
              key={t}
              onClick={() => setNotes(prev => prev ? `${prev}. ${t}` : t)}
              className="px-3 py-2 rounded-full bg-muted text-muted-foreground text-fluid-sm font-medium hover:bg-accent transition-colors"
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleComplete} size="lg" className="w-full h-12 text-fluid-base rounded-2xl font-semibold">
            Guardar registro
          </Button>
          <button onClick={() => setStep("feeling")} className="text-muted-foreground text-fluid-sm py-2 hover:text-foreground transition-colors">
            Atras
          </button>
        </div>
      </div>
    )
  }

  return null
}
