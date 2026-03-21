"use client"

import { useMemo, useState } from "react"
import {
  TOPOLOGY_VECTOR_LENGTH,
  VENTRAL_REGION_COUNT,
  DORSAL_REGION_COUNT,
  createEmptyTopology,
  countActiveCells,
  scorePhq2,
  deriveTriageDestination,
  DEFAULT_MINSAL_POLICY,
  FPS_R_CANONICAL,
  PainAssessmentService,
} from "@alli/clinical-models"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Slider,
} from "@alli/ui"
import { Activity, Brain, Map, Stethoscope, Users } from "lucide-react"

const assessment = new PainAssessmentService()

export function ClinicalCapabilities() {
  const [nrs, setNrs] = useState(5)
  const [fps, setFps] = useState<number>(FPS_R_CANONICAL[3])
  const [phqA, setPhqA] = useState(1)
  const [phqB, setPhqB] = useState(1)

  const topologyDemo = useMemo(() => {
    const v = createEmptyTopology()
    v[12] = true
    v[13] = true
    v[VENTRAL_REGION_COUNT * 7 + 2] = true
    return v
  }, [])

  const phq = useMemo(() => scorePhq2({ littleInterest: phqA, feelingDown: phqB }), [phqA, phqB])
  const triage = useMemo(
    () =>
      deriveTriageDestination(
        {
          nrs,
          redFlags: false,
          phq2Total: phq.total,
          unstableVitals: false,
        },
        DEFAULT_MINSAL_POLICY,
      ),
    [nrs, phq.total],
  )

  const resolved = assessment.resolveIntensity({ nrsPrimary: nrs })

  return (
    <div className="space-y-4 py-2">
      <div className="text-center space-y-1">
        <div className="w-14 h-14 rounded-full bg-primary/15 mx-auto flex items-center justify-center">
          <Stethoscope className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-fluid-2xl font-bold text-foreground">Capacidades clínicas</h2>
        <p className="text-fluid-sm text-muted-foreground text-balance max-w-[300px] mx-auto">
          Resumen de las herramientas de dominio integradas en AlivIA (paquete{" "}
          <span className="font-mono text-xs">@alli/clinical-models</span>).
        </p>
      </div>

      <Card className="rounded-2xl border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-fluid-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            NRS-11 y FPS-R
          </CardTitle>
          <CardDescription>
            Ingreso multimodal priorizando NRS-11; FPS-R como alternativa accesible (valores típicos{" "}
            {FPS_R_CANONICAL.join(", ")}).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">NRS-11: {nrs}</p>
            <Slider min={0} max={10} step={1} value={[nrs]} onValueChange={(v) => setNrs(v[0] ?? 0)} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">FPS-R (sincronizado con escala 0–10)</p>
            <div className="flex flex-wrap gap-2">
              {FPS_R_CANONICAL.map((face) => (
                <Button
                  key={face}
                  type="button"
                  size="sm"
                  variant={fps === face ? "default" : "outline"}
                  className="rounded-xl"
                  onClick={() => setFps(face)}
                >
                  {face}
                </Button>
              ))}
            </div>
          </div>
          {resolved && (
            <p className="text-sm text-muted-foreground">
              Intensidad resuelta: <strong>{resolved.value}</strong> (fuente: {resolved.source})
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-fluid-lg flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            SF-MPQ-2 y PHQ-2
          </CardTitle>
          <CardDescription>
            Cualidades sensoriales y afectivas (SF-MPQ-2) y tamizaje PHQ-2 con alerta automática si la suma supera 3
            puntos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">PHQ-2 (0–3 por ítem)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Poco interés</p>
                <Slider min={0} max={3} step={1} value={[phqA]} onValueChange={(v) => setPhqA(v[0] ?? 0)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">¿Decaído/a?</p>
                <Slider min={0} max={3} step={1} value={[phqB]} onValueChange={(v) => setPhqB(v[0] ?? 0)} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm">Total PHQ-2: {phq.total}</span>
            {phq.alertRecommended ? (
              <Badge variant="destructive" className="rounded-lg">
                Alerta recomendada
              </Badge>
            ) : (
              <Badge variant="secondary" className="rounded-lg">
                Sin umbral de alerta
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-fluid-lg flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            Mapeo digital del dolor
          </CardTitle>
          <CardDescription>
            Vector fijo de {TOPOLOGY_VECTOR_LENGTH} valores booleanos: {VENTRAL_REGION_COUNT} regiones ventrales y{" "}
            {DORSAL_REGION_COUNT} dorsales, con subceldas por región.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Celdas activas en demostración: <strong>{countActiveCells(topologyDemo)}</strong>
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-fluid-lg flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            Triaje MINSAL
          </CardTitle>
          <CardDescription>
            Reglas parametrizables hacia SAR, SAPU, SUR (atención primaria) o UEH; los umbrales viven en política de
            dominio sustituible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Destino sugerido con señal actual:{" "}
            <Badge className="rounded-lg">{triage}</Badge>
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-fluid-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Foros inteligentes (TCC)
          </CardTitle>
          <CardDescription>
            Hilos estructurados por etapas de Terapia Cognitivo-Conductual: psicoeducación, cognitiva, conductual y
            prevención de recaídas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            El modelo de foro se expone en <span className="font-mono text-xs">@alli/clinical-models</span> para
            orquestación desde el API gateway.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
