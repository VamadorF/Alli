/**
 * API Service — Endpoints al backend de AlivIA
 *
 * Todos los endpoints estan comentados ya que el backend aun no existe.
 * Cuando el backend este listo, descomentar las llamadas fetch y
 * reemplazar la BASE_URL con la URL real del servidor.
 */

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

// ─── Helpers ────────────────────────────────────────────────────────────────

// async function request<T>(path: string, options?: RequestInit): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: { "Content-Type": "application/json", ...options?.headers },
//     ...options,
//   });
//   if (!res.ok) throw new Error(`API error: ${res.status}`);
//   return res.json();
// }

// ─── Pain Diary ─────────────────────────────────────────────────────────────

// export interface PainEntry {
//   id: string;
//   patientId: string;
//   nrsScore: number;        // 0-10
//   bodyZones: string[];
//   feeling: string;
//   notes?: string;
//   createdAt: string;
// }

// /** POST /pain/entry — Crear nueva entrada de dolor */
// export async function createPainEntry(data: Omit<PainEntry, "id" | "createdAt">) {
//   return request<PainEntry>("/pain/entry", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// /** GET /pain/entries/:patientId — Historial de dolor */
// export async function getPainEntries(patientId: string) {
//   return request<PainEntry[]>(`/pain/entries/${patientId}`);
// }

// /** GET /pain/entries/:patientId/summary — Resumen semanal */
// export async function getPainSummary(patientId: string) {
//   return request<{ average: number; trend: "improving" | "stable" | "worsening"; entries: number }>(
//     `/pain/entries/${patientId}/summary`
//   );
// }

// ─── Triage ──────────────────────────────────────────────────────────────────

// export interface TriageResult {
//   category: "C1" | "C2" | "C3" | "C4" | "C5";
//   score: number;
//   recommendation: string;
// }

// /** POST /triage/evaluate — Evaluar nivel de urgencia */
// export async function evaluateTriage(data: { patientId: string; nrsScore: number; redFlags: string[] }) {
//   return request<TriageResult>("/triage/evaluate", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// ─── PHQ-2 Screening ────────────────────────────────────────────────────────

// export interface PHQ2Result {
//   score: number;
//   isPositive: boolean;    // score >= 3
//   recommendation: string;
// }

// /** POST /screening/phq2 — Enviar cuestionario PHQ-2 */
// export async function submitPHQ2(data: { patientId: string; q1: number; q2: number }) {
//   return request<PHQ2Result>("/screening/phq2", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// ─── Medications ─────────────────────────────────────────────────────────────

// export interface Medication {
//   id: string;
//   name: string;
//   dose: string;
//   frequency: string;
//   nextDose?: string;
//   taken: boolean;
// }

// /** GET /medications/:patientId — Lista de medicamentos */
// export async function getMedications(patientId: string) {
//   return request<Medication[]>(`/medications/${patientId}`);
// }

// /** PUT /medications/:id/taken — Marcar medicamento como tomado */
// export async function markMedicationTaken(medicationId: string) {
//   return request<Medication>(`/medications/${medicationId}/taken`, { method: "PUT" });
// }

// ─── Patient Profile ────────────────────────────────────────────────────────

// export interface Patient {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   createdAt: string;
// }

// /** GET /patients/:id — Obtener perfil de paciente */
// export async function getPatient(patientId: string) {
//   return request<Patient>(`/patients/${patientId}`);
// }

// /** PUT /patients/:id — Actualizar perfil */
// export async function updatePatient(patientId: string, data: Partial<Patient>) {
//   return request<Patient>(`/patients/${patientId}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//   });
// }

// ─── Dashboard ───────────────────────────────────────────────────────────────

// /** GET /patients/:id/dashboard — Panel con resumen completo */
// export async function getDashboard(patientId: string) {
//   return request<{
//     painSummary: { average: number; trend: string };
//     triageStatus: { category: string };
//     screeningStatus: { lastPHQ2Score: number };
//     medications: Medication[];
//     alerts: string[];
//   }>(`/patients/${patientId}/dashboard`);
// }

// ─── AI Assistant ────────────────────────────────────────────────────────────

// /** POST /ai/chat — Enviar mensaje al asistente IA */
// export async function sendAIMessage(data: { patientId: string; message: string }) {
//   return request<{ reply: string; suggestedActions?: string[] }>("/ai/chat", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// ─── Community Forum ────────────────────────────────────────────────────────

// /** GET /community/posts — Obtener publicaciones del foro */
// export async function getCommunityPosts(topic?: string) {
//   const query = topic ? `?topic=${encodeURIComponent(topic)}` : "";
//   return request<Array<{ id: string; author: string; content: string; likes: number; replies: number }>>(
//     `/community/posts${query}`
//   );
// }

// /** POST /community/posts — Crear publicacion */
// export async function createCommunityPost(data: { patientId: string; content: string; topic: string }) {
//   return request<{ id: string }>("/community/posts", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// ─── Doctor Messages ────────────────────────────────────────────────────────

// /** GET /messages/:patientId — Mensajes con el doctor */
// export async function getMessages(patientId: string) {
//   return request<Array<{ id: string; from: string; text: string; timestamp: string }>>(
//     `/messages/${patientId}`
//   );
// }

// /** POST /messages — Enviar mensaje al doctor */
// export async function sendMessage(data: { patientId: string; doctorId: string; text: string }) {
//   return request<{ id: string }>("/messages", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }
