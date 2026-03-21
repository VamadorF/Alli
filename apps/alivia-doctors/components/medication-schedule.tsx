"use client"

import { useState } from "react"
import { Button } from "@alli/ui"
import { Check, Clock, Bell } from "lucide-react"

interface Medication {
  id: string
  name: string
  dosage: string
  time: string
  instructions: string
  taken: boolean
  color: string
}

export function MedicationSchedule() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Omeprazol",   dosage: "20mg",  time: "08:00", instructions: "Antes del desayuno",     taken: true,  color: "bg-purple-100 text-purple-700" },
    { id: "2", name: "Ibuprofeno",  dosage: "400mg", time: "08:30", instructions: "Con alimentos",          taken: true,  color: "bg-red-100 text-red-700" },
    { id: "3", name: "Paracetamol", dosage: "500mg", time: "14:30", instructions: "Puede ser sin alimentos", taken: true,  color: "bg-blue-100 text-blue-700" },
    { id: "4", name: "Ibuprofeno",  dosage: "400mg", time: "16:30", instructions: "Con alimentos",          taken: false, color: "bg-red-100 text-red-700" },
    { id: "5", name: "Paracetamol", dosage: "500mg", time: "20:30", instructions: "Puede ser sin alimentos", taken: false, color: "bg-blue-100 text-blue-700" },
  ])

  const markAsTaken = (id: string) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, taken: true } : m))
  }

  const pendingMeds = medications.filter(m => !m.taken)
  const takenMeds   = medications.filter(m => m.taken)
  const nextPending = pendingMeds[0]

  return (
    <div className="space-y-6 py-2">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="w-14 h-14 rounded-full bg-primary/15 mx-auto flex items-center justify-center">
          <span className="text-fluid-icon leading-none">💊</span>
        </div>
        <h2 className="text-fluid-2xl font-bold text-foreground">Medicamentos</h2>
        {nextPending ? (
          <p className="text-fluid-sm text-muted-foreground">
            Proxima dosis: <span className="font-bold text-foreground">{nextPending.time}</span>
          </p>
        ) : (
          <p className="text-fluid-sm text-primary font-semibold">Todas las dosis completadas</p>
        )}
      </div>

      {/* Pending */}
      {pendingMeds.length > 0 && (
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1">Pendientes</p>
          {pendingMeds.map((med) => (
            <div key={med.id} className="rounded-2xl bg-card border-2 border-primary/20 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${med.color} flex items-center justify-center shrink-0`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-fluid-base font-bold text-primary">{med.time}</span>
                  </div>
                  <p className="text-fluid-sm font-semibold text-foreground truncate">{med.name} {med.dosage}</p>
                  <p className="text-[12px] text-muted-foreground">{med.instructions}</p>
                </div>
              </div>
              <Button onClick={() => markAsTaken(med.id)} className="w-full h-11 text-fluid-sm rounded-xl font-semibold gap-2">
                <Check className="w-4 h-4" />
                Marcar como tomado
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Taken */}
      {takenMeds.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1">Completados</p>
          {takenMeds.map((med) => (
            <div key={med.id} className="rounded-2xl bg-muted/50 p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <p className="text-fluid-sm text-muted-foreground min-w-0 truncate">
                <span className="font-semibold">{med.time}</span> — {med.name} {med.dosage}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Reminder note */}
      <div className="rounded-2xl bg-accent/50 border border-border/30 p-4">
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-fluid-sm font-semibold text-foreground">Recordatorios activos</p>
            <p className="text-fluid-sm text-muted-foreground mt-0.5 leading-snug">
              Te avisamos 10 minutos antes de cada dosis
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
