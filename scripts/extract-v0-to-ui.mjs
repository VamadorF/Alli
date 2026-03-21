/**
 * Copia salida típica de v0 (Next + shadcn): carpetas `components/ui` y `lib`
 * hacia `packages/ui/src`, y regenera el barrel `src/index.ts`.
 *
 * Uso: pnpm extract:v0-ui -- <ruta-al-proyecto-v0>
 * Ejemplo: pnpm extract:v0-ui -- ../copiando
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { spawnSync } from "child_process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

const argv = process.argv.slice(2)
const dash = argv.indexOf("--")
const srcRoot = dash >= 0 ? argv[dash + 1] : null

if (!srcRoot) {
  console.error("Uso: pnpm extract:v0-ui -- <ruta-proyecto-v0>")
  process.exit(1)
}

const abs = path.resolve(process.cwd(), srcRoot)
const uiSrc = path.join(abs, "components", "ui")
const libSrc = path.join(abs, "lib")
const uiDest = path.join(root, "packages", "ui", "src", "components", "ui")
const libDest = path.join(root, "packages", "ui", "src", "lib")

for (const [label, p] of [
  ["components/ui", uiSrc],
  ["lib", libSrc],
]) {
  if (!fs.existsSync(p)) {
    console.error(`No existe ${label} en: ${p}`)
    process.exit(1)
  }
}

fs.mkdirSync(path.dirname(uiDest), { recursive: true })
fs.mkdirSync(libDest, { recursive: true })

const robocopy = (from, to) => {
  const r = spawnSync("robocopy", [from, to, "/E", "/NFL", "/NDL", "/NJH", "/NJS"], {
    stdio: "inherit",
    shell: true,
  })
  if (r.error) throw r.error
  if (r.status >= 8) process.exit(r.status)
}

robocopy(uiSrc, uiDest)
robocopy(libSrc, libDest)

spawnSync(process.execPath, [path.join(__dirname, "generate-ui-barrel.mjs")], {
  cwd: root,
  stdio: "inherit",
})

const uiSrc = path.join(root, "packages", "ui", "src")
for (const f of walkTs(uiSrc)) {
  let c = fs.readFileSync(f, "utf8")
  const next = c.replaceAll("@/lib/utils", "../../lib/utils").replaceAll("@/components/ui/", "./")
  if (next !== c) fs.writeFileSync(f, next)
}

console.log("Listo: componentes copiados a packages/ui, alias @/ normalizados y barrel regenerado.")

function walkTs(dir) {
  const out = []
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name)
    if (name.isDirectory()) out.push(...walkTs(p))
    else if (/\.(tsx?)$/.test(name.name)) out.push(p)
  }
  return out
}
