"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Heart, Brain, AlertTriangle, TrendingUp, TrendingDown, Eye, Zap, Shield, Clock } from "lucide-react"

interface VitalSign {
  name: string
  value: number
  unit: string
  status: "normal" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  lastUpdate: Date
}

interface MicroChange {
  id: string
  type: "pain" | "mood" | "activity" | "sleep" | "medication"
  description: string
  severity: "low" | "medium" | "high"
  timestamp: Date
  aiConfidence: number
}

export function RealTimeMonitoring() {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    {
      name: "Nivel de Dolor",
      value: 3.2,
      unit: "/10",
      status: "normal",
      trend: "down",
      lastUpdate: new Date(),
    },
    {
      name: "Estado de Ánimo",
      value: 7.5,
      unit: "/10",
      status: "normal",
      trend: "up",
      lastUpdate: new Date(),
    },
    {
      name: "Actividad Física",
      value: 65,
      unit: "%",
      status: "normal",
      trend: "stable",
      lastUpdate: new Date(),
    },
    {
      name: "Calidad del Sueño",
      value: 6.8,
      unit: "/10",
      status: "warning",
      trend: "down",
      lastUpdate: new Date(),
    },
  ])

  const [microChanges] = useState<MicroChange[]>([
    {
      id: "1",
      type: "pain",
      description: "Ligero aumento en dolor de espalda baja detectado",
      severity: "low",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      aiConfidence: 85,
    },
    {
      id: "2",
      type: "mood",
      description: "Mejora en indicadores de estado de ánimo",
      severity: "low",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      aiConfidence: 92,
    },
    {
      id: "3",
      type: "medication",
      description: "Adherencia a medicamentos por encima del promedio",
      severity: "low",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      aiConfidence: 78,
    },
  ])

  const [isMonitoring, setIsMonitoring] = useState(true)

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      setVitalSigns((prev) =>
        prev.map((vital) => ({
          ...vital,
          value: vital.value + (Math.random() - 0.5) * 0.2,
          lastUpdate: new Date(),
        })),
      )
    }, 30000) // Actualizar cada 30 segundos

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pain":
        return <Heart className="w-4 h-4" />
      case "mood":
        return <Brain className="w-4 h-4" />
      case "activity":
        return <Activity className="w-4 h-4" />
      case "sleep":
        return <Clock className="w-4 h-4" />
      case "medication":
        return <Shield className="w-4 h-4" />
      default:
        return <Eye className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Monitoring Status */}
      <Card className="border-l-4 border-l-teal-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-teal-600" />
              <span>Monitoreo en Tiempo Real</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${isMonitoring ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
              ></div>
              <Badge className={isMonitoring ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {isMonitoring ? "Activo" : "Pausado"}
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>Seguimiento continuo de microcambios en tu estado de salud</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">24/7</div>
              <div className="text-sm text-teal-700">Monitoreo Continuo</div>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">98.5%</div>
              <div className="text-sm text-emerald-700">Precisión IA</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">&lt; 1min</div>
              <div className="text-sm text-orange-700">Detección Cambios</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-purple-700">Patrones Analizados</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vitalSigns.map((vital, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 text-sm">{vital.name}</h3>
                {getTrendIcon(vital.trend)}
              </div>

              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-2xl font-bold text-gray-900">{vital.value.toFixed(1)}</span>
                <span className="text-sm text-gray-600">{vital.unit}</span>
              </div>

              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(vital.status)}>
                  {vital.status === "normal" ? "Normal" : vital.status === "warning" ? "Atención" : "Crítico"}
                </Badge>
                <span className="text-xs text-gray-500">{vital.lastUpdate.toLocaleTimeString()}</span>
              </div>

              {vital.status !== "normal" && (
                <div className="absolute top-2 right-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Micro-changes Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Detección de Microcambios</span>
          </CardTitle>
          <CardDescription>Cambios sutiles detectados por IA antes de que se vuelvan significativos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {microChanges.map((change) => (
              <div key={change.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getSeverityColor(change.severity)}`}>
                      {getTypeIcon(change.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{change.description}</p>
                      <p className="text-sm text-gray-600">{change.timestamp.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(change.severity)}>
                    {change.severity === "high" ? "Alta" : change.severity === "medium" ? "Media" : "Baja"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Confianza IA:</span>
                    <div className="w-20">
                      <Progress value={change.aiConfidence} className="h-2" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{change.aiConfidence}%</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <span>Análisis Predictivo</span>
            </CardTitle>
            <CardDescription>Predicciones basadas en patrones históricos y datos actuales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <h3 className="font-medium text-teal-800 mb-2">Predicción de Dolor</h3>
                <p className="text-sm text-teal-700 mb-3">
                  Basado en patrones actuales, se predice un nivel de dolor estable para las próximas 24 horas.
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-teal-600">Confianza:</span>
                  <Progress value={87} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-teal-800">87%</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="font-medium text-emerald-800 mb-2">Recomendación Preventiva</h3>
                <p className="text-sm text-emerald-700 mb-3">
                  Se recomienda mantener rutina actual de ejercicios y considerar sesión de mindfulness esta tarde.
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Aplicar Recomendación
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span>Alertas Inteligentes</span>
            </CardTitle>
            <CardDescription>Sistema de alertas basado en umbrales personalizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-green-800">Adherencia Medicamentos</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Normal</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-yellow-800">Patrón de Sueño</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Monitorear</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-green-800">Actividad Física</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Óptimo</Badge>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Monitoreo Activo</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMonitoring(!isMonitoring)}
                  className="bg-transparent"
                >
                  {isMonitoring ? "Pausar" : "Activar"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
