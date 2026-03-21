import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const uiDir = path.join(root, "packages/ui/src/components/ui")
const skip = new Set(["sonner.tsx"])
const files = fs
  .readdirSync(uiDir)
  .filter((f) => /\.tsx?$/.test(f) && !skip.has(f))
let out = "export { cn } from './lib/utils'\n"
for (const f of files) {
  const b = f.replace(/\.tsx?$/, "")
  out += `export * from './components/ui/${b}'\n`
}
fs.writeFileSync(path.join(root, "packages/ui/src/index.ts"), out)
console.log("Barrel:", files.length, "modules")
