"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PainDiary } from "@/components/pain-diary"
import { AIAssistant } from "@/components/ai-assistant"
import { MedicationSchedule } from "@/components/medication-schedule"
import { CommunityForum } from "@/components/community-forum"
import { DoctorMessages } from "@/components/doctor-messages"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import { Button } from "@/components/ui/button"
import { Heart, Sun, Moon, Bell, ChevronRight, User, Lock, HelpCircle, TrendingUp, Sparkles } from "lucide-react"

export default function PatientDashboard() {
  const [activeSection, setActiveSection] = useState("pain-diary")

  const renderContent = () => {
    switch (activeSection) {
      case "pain-diary":
        return <PainDiary />
      case "community":
        return <CommunityForum />
      case "ai-assistant":
        return <AIAssistant />
      case "messages":
        return <DoctorMessages />
      case "medications":
        return <MedicationSchedule />
      case "recommendations":
        return <PersonalizedRecommendations />
      case "overview":
        return <Overview />
      case "settings":
        return <SettingsView />
      default:
        return <PainDiary />
    }
  }

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </DashboardLayout>
  )
}

/* ---- OVERVIEW (Resumen) ---- */
function Overview() {
  const days = ["L", "M", "X", "J", "V", "S", "D"]
  const values = [5, 4, 3, 4, 3, 2, 3]

  return (
    <div className="space-y-5 py-2">
      <div className="text-center space-y-1">
        <div className="w-14 h-14 rounded-full bg-primary/15 mx-auto flex items-center justify-center">
          <TrendingUp className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-fluid-2xl font-bold text-foreground">Tu Semana</h2>
        <p className="text-fluid-sm text-muted-foreground text-balance max-w-[260px] mx-auto">
          Tu dolor ha ido mejorando. Los ejercicios de respiracion estan ayudando.
        </p>
      </div>

      {/* Bar chart */}
      <div className="rounded-2xl bg-card border border-border/50 p-4">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Nivel de dolor — 7 dias</p>
        <div className="flex items-end justify-between gap-1.5" style={{ height: "7rem" }}>
          {days.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[10px] font-bold text-foreground">{values[i]}</span>
              <div className="w-full rounded-lg bg-muted relative overflow-hidden flex-1">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-lg bg-primary transition-all"
                  style={{ height: `${(values[i] / 10) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insight */}
      <div className="rounded-2xl bg-accent/50 border border-border/30 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-fluid-sm font-bold text-foreground">Patron detectado</p>
            <p className="text-fluid-sm text-muted-foreground mt-0.5 leading-relaxed">
              Tu dolor es menor entre las 8:00 y 11:00. Intenta hacer actividades importantes en ese horario.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- SETTINGS ---- */
function SettingsView() {
  const [isDark, setIsDark] = useState(false)
  const [subView, setSubView] = useState<string | null>(null)

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const settingsItems = [
    { id: "profile", icon: User, label: "Mi perfil", description: "Nombre, foto, datos personales", color: "bg-blue-100 text-blue-600" },
    { id: "notifications", icon: Bell, label: "Notificaciones", description: "Recordatorios y alertas", color: "bg-amber-100 text-amber-600" },
    { id: "privacy", icon: Lock, label: "Privacidad", description: "Quien ve mis datos", color: "bg-emerald-100 text-emerald-600" },
    { id: "help", icon: HelpCircle, label: "Ayuda", description: "Preguntas frecuentes", color: "bg-purple-100 text-purple-600" },
  ]

  // Sub-views content
  if (subView === "profile") {
    return <ProfileSubView onBack={() => setSubView(null)} />
  }
  if (subView === "notifications") {
    return <NotificationsSubView onBack={() => setSubView(null)} />
  }
  if (subView === "privacy") {
    return <PrivacySubView onBack={() => setSubView(null)} />
  }
  if (subView === "help") {
    return <HelpSubView onBack={() => setSubView(null)} />
  }

  return (
    <div className="space-y-8 py-4">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <Heart className="w-7 h-7 text-primary" fill="currentColor" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Maria Garcia</h2>
          <p className="text-sm text-muted-foreground">Paciente desde enero 2024</p>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="rounded-2xl bg-card border border-border/50 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isDark ? (
              <Moon className="w-6 h-6 text-primary" />
            ) : (
              <Sun className="w-6 h-6 text-primary" />
            )}
            <div>
              <p className="text-base font-semibold text-foreground">
                {isDark ? "Modo oscuro" : "Modo claro"}
              </p>
              <p className="text-sm text-muted-foreground">Cambiar apariencia</p>
            </div>
          </div>
          <button
            onClick={toggleDark}
            className={`w-14 h-8 rounded-full transition-colors relative ${
              isDark ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                isDark ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Settings list */}
      <div className="space-y-3">
        {settingsItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSubView(item.id)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:bg-accent/30 transition-colors text-left active:scale-[0.98]"
          >
            <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground truncate">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Version */}
      <p className="text-center text-sm text-muted-foreground">
        AlivIA version 1.0.0
      </p>
    </div>
  )
}

/* ---- PROFILE SUB-VIEW ---- */
function ProfileSubView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <button onClick={onBack} className="flex items-center gap-2 text-primary font-medium active:scale-95">
        <ChevronRight className="w-5 h-5 rotate-180" />
        <span>Volver</span>
      </button>
      
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto flex items-center justify-center">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Mi Perfil</h2>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl bg-card border border-border/50 p-4">
          <label className="text-sm text-muted-foreground">Nombre completo</label>
          <input 
            type="text" 
            defaultValue="Maria Garcia"
            className="w-full mt-2 p-3 rounded-xl bg-muted/50 border border-border/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="rounded-2xl bg-card border border-border/50 p-4">
          <label className="text-sm text-muted-foreground">Correo electronico</label>
          <input 
            type="email" 
            defaultValue="maria@ejemplo.com"
            className="w-full mt-2 p-3 rounded-xl bg-muted/50 border border-border/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="rounded-2xl bg-card border border-border/50 p-4">
          <label className="text-sm text-muted-foreground">Telefono</label>
          <input 
            type="tel" 
            defaultValue="+56 9 1234 5678"
            className="w-full mt-2 p-3 rounded-xl bg-muted/50 border border-border/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <Button className="w-full h-12 rounded-xl text-base font-semibold">
          Guardar cambios
        </Button>
      </div>
    </div>
  )
}

/* ---- NOTIFICATIONS SUB-VIEW ---- */
function NotificationsSubView({ onBack }: { onBack: () => void }) {
  const [reminders, setReminders] = useState(true)
  const [community, setCommunity] = useState(false)
  const [tips, setTips] = useState(true)

  return (
    <div className="space-y-6 py-4">
      <button onClick={onBack} className="flex items-center gap-2 text-primary font-medium active:scale-95">
        <ChevronRight className="w-5 h-5 rotate-180" />
        <span>Volver</span>
      </button>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
          <Bell className="w-6 h-6 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Notificaciones</h2>
      </div>

      <p className="text-muted-foreground">
        Elige que notificaciones quieres recibir para mantenerte al dia con tu tratamiento.
      </p>

      <div className="space-y-3">
        <div className="rounded-2xl bg-card border border-border/50 p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Recordatorios de medicamentos</p>
            <p className="text-sm text-muted-foreground">Te avisamos cuando tomar tu medicina</p>
          </div>
          <button
            onClick={() => setReminders(!reminders)}
            className={`w-12 h-7 rounded-full transition-colors relative ${reminders ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${reminders ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>

        <div className="rounded-2xl bg-card border border-border/50 p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Actividad en comunidad</p>
            <p className="text-sm text-muted-foreground">Respuestas a tus publicaciones</p>
          </div>
          <button
            onClick={() => setCommunity(!community)}
            className={`w-12 h-7 rounded-full transition-colors relative ${community ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${community ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>

        <div className="rounded-2xl bg-card border border-border/50 p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Tips y recomendaciones</p>
            <p className="text-sm text-muted-foreground">Consejos personalizados de AlivIA</p>
          </div>
          <button
            onClick={() => setTips(!tips)}
            className={`w-12 h-7 rounded-full transition-colors relative ${tips ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${tips ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- PRIVACY SUB-VIEW ---- */
function PrivacySubView({ onBack }: { onBack: () => void }) {
  const [shareDoctor, setShareDoctor] = useState(true)
  const [anonymous, setAnonymous] = useState(true)

  return (
    <div className="space-y-6 py-4">
      <button onClick={onBack} className="flex items-center gap-2 text-primary font-medium active:scale-95">
        <ChevronRight className="w-5 h-5 rotate-180" />
        <span>Volver</span>
      </button>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Lock className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Privacidad</h2>
      </div>

      <p className="text-muted-foreground">
        Tu informacion esta protegida. Controla quien puede ver tus datos.
      </p>

      <div className="space-y-3">
        <div className="rounded-2xl bg-card border border-border/50 p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Compartir con mi medico</p>
            <p className="text-sm text-muted-foreground">Tu doctor puede ver tu diario de dolor</p>
          </div>
          <button
            onClick={() => setShareDoctor(!shareDoctor)}
            className={`w-12 h-7 rounded-full transition-colors relative ${shareDoctor ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${shareDoctor ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>

        <div className="rounded-2xl bg-card border border-border/50 p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Perfil anonimo en comunidad</p>
            <p className="text-sm text-muted-foreground">Otros usuarios no veran tu nombre real</p>
          </div>
          <button
            onClick={() => setAnonymous(!anonymous)}
            className={`w-12 h-7 rounded-full transition-colors relative ${anonymous ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${anonymous ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-accent/50 border border-border/30 p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tus datos medicos estan encriptados y solo son accesibles por ti y los profesionales que autorices. Cumplimos con todas las normativas de proteccion de datos de salud.
        </p>
      </div>
    </div>
  )
}

/* ---- HELP SUB-VIEW ---- */
function HelpSubView({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<number | null>(null)
  
  const faqs = [
    {
      question: "Como registro mi dolor diario?",
      answer: "Ve a la seccion 'Diario' y toca el boton para registrar. Puedes indicar la intensidad, ubicacion y sintomas que sientes. Solo toma unos segundos."
    },
    {
      question: "Como hablo con AlivIA?",
      answer: "Toca el icono de AlivIA en la barra inferior. Puedes escribir o usar el microfono para hacer preguntas sobre tu dolor, medicamentos o bienestar."
    },
    {
      question: "Mi doctor puede ver mis registros?",
      answer: "Si, pero solo si lo autorizas en la seccion de Privacidad. Tu decides que informacion compartir con tu equipo medico."
    },
    {
      question: "Como contacto soporte tecnico?",
      answer: "Escribe a soporte@alivia.com o llama al 600 123 4567. Estamos disponibles de lunes a viernes de 9:00 a 18:00."
    },
  ]

  return (
    <div className="space-y-6 py-4">
      <button onClick={onBack} className="flex items-center gap-2 text-primary font-medium active:scale-95">
        <ChevronRight className="w-5 h-5 rotate-180" />
        <span>Volver</span>
      </button>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Ayuda</h2>
      </div>

      <p className="text-muted-foreground">
        Preguntas frecuentes sobre como usar AlivIA.
      </p>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl bg-card border border-border/50 overflow-hidden">
            <button 
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <p className="font-semibold text-foreground pr-4">{faq.question}</p>
              <ChevronRight className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${expanded === index ? "rotate-90" : ""}`} />
            </button>
            {expanded === index && (
              <div className="px-4 pb-4">
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4 text-center">
        <p className="text-sm text-foreground font-medium">Necesitas mas ayuda?</p>
        <p className="text-sm text-muted-foreground mt-1">soporte@alivia.com</p>
      </div>
    </div>
  )
}
