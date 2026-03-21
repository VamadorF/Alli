import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { parseNrs11, FPS_R_CANONICAL } from "@alli/clinical-models"

export default function App() {
  const [nrs, setNrs] = useState(5)
  const parsed = parseNrs11(nrs)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AlivIA — Pacientes</Text>
      <Text style={styles.sub}>Registro multimodal (NRS-11 / FPS-R)</Text>
      <Text style={styles.label}>NRS actual: {nrs}</Text>
      <Text style={styles.hint}>Válido: {parsed === null ? "no" : "sí"}</Text>
      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => setNrs((n) => Math.max(0, n - 1))}>
          <Text style={styles.btnText}>-</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => setNrs((n) => Math.min(10, n + 1))}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
      <Text style={styles.fps}>FPS-R canónico: {FPS_R_CANONICAL.join(", ")}</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf8f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8, color: "#1a1f2e" },
  sub: { fontSize: 14, color: "#5c6578", marginBottom: 24, textAlign: "center" },
  label: { fontSize: 18, fontWeight: "600", color: "#2a6f62" },
  hint: { fontSize: 14, color: "#5c6578", marginTop: 4 },
  row: { flexDirection: "row", gap: 16, marginTop: 20 },
  btn: {
    backgroundColor: "#2a6f62",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  btnText: { color: "#fff", fontSize: 20, fontWeight: "700" },
  fps: { marginTop: 28, fontSize: 12, color: "#7a8499", textAlign: "center" },
})
