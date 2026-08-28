import { existsSync, readFileSync } from "node:fs"
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { judge, over, skip } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "editor-extension-single"

const BUILT_IN = "extensions/ops/package.json"

export function editorRoot(): string {
  const fromEnv = process.env.CODE_EDITOR_ROOT
  if (fromEnv !== undefined) return fromEnv
  const home = process.env.HOME
  return home === undefined ? "/nonexistent" : `${home}/repos/code-editor`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function parse(raw: string | null): unknown {
  if (raw === null) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function registryPaths(product: unknown, home: string): readonly string[] {
  if (!isRecord(product)) return []
  const folders: string[] = []
  for (const key of ["dataFolderName", "serverDataFolderName"]) {
    const base = product[key]
    if (typeof base !== "string" || base === "") continue
    for (const name of [base, `${base}-dev`]) {
      if (!folders.includes(name)) folders.push(name)
    }
  }
  return folders.map((name) => `${home}/${name}/extensions/extensions.json`)
}

export function commandIds(manifest: unknown): readonly string[] {
  if (!isRecord(manifest)) return []
  const contributes = manifest.contributes
  if (!isRecord(contributes)) return []
  const commands = contributes.commands
  if (!Array.isArray(commands)) return []
  const ids: string[] = []
  for (const entry of commands) {
    if (!isRecord(entry)) continue
    const id = entry.command
    if (typeof id === "string" && id !== "" && !ids.includes(id)) ids.push(id)
  }
  return ids
}

export interface Registration {
  readonly id: string
  readonly fsPath: string
}

export function registrationsIn(document: unknown): readonly Registration[] {
  if (!Array.isArray(document)) return []
  const found: Registration[] = []
  for (const entry of document) {
    if (!isRecord(entry)) continue
    const identifier = isRecord(entry.identifier) ? entry.identifier.id : undefined
    const location = isRecord(entry.location) ? entry.location.fsPath : undefined
    if (typeof location !== "string" || location === "") continue
    found.push({ id: typeof identifier === "string" ? identifier : location, fsPath: location })
  }
  return found
}

export const editorExtensionSingle: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const editor = editorRoot()
  const nothing = over(0, "extension registry(ies) his editor reads")
  const read = (at: string): string | null => (existsSync(at) ? readFileSync(at, "utf8") : null)

  const manifest = parse(read(`${editor}/${BUILT_IN}`))
  if (manifest === null) {
    return {
      ...skip(
        NAME,
        `${editor}/${BUILT_IN} could not be read, so this tree carries no ops extension for anything to shadow`
      ),
      population: nothing,
    }
  }

  const claimed = commandIds(manifest)
  if (claimed.length === 0) {
    return {
      ...skip(NAME, `${BUILT_IN} contributes no command, so no second copy could collide with it`),
      population: nothing,
    }
  }

  const home = process.env.HOME
  const product = parse(read(`${editor}/product.json`))
  if (product === null || home === undefined) {
    return {
      ...skip(
        NAME,
        `${editor}/product.json could not be read, so which registry his editor uses is unknown ` +
          `rather than answered, and so is whether anything shadows the ${claimed.length} command id(s) it claims`
      ),
      population: nothing,
    }
  }

  const paths = registryPaths(product, home)
  const present: string[] = []
  const documents: unknown[] = []
  for (const path of paths) {
    const raw = read(path)
    if (raw === null) continue
    present.push(path)
    documents.push(parse(raw))
  }
  if (present.length === 0) {
    return {
      ...skip(
        NAME,
        `none of the ${paths.length} registry path(s) this product derives is on disk, so nothing ` +
          `is registered to load beside the built-in`
      ),
      population: nothing,
    }
  }

  const refusals: string[] = []
  let examined = 0
  for (const [index, path] of present.entries()) {
    for (const registration of registrationsIn(documents[index])) {
      examined += 1
      const other = parse(read(`${registration.fsPath}/package.json`))
      if (other === null) continue
      const collisions = commandIds(other).filter((id) => claimed.includes(id))
      if (collisions.length === 0) continue
      refusals.push(
        refusalText(
          "editor-extension-shadowed",
          {
            id: registration.id,
            path: registration.fsPath,
            registry: path,
            commands: collisions.join("`, `"),
          },
          root
        )
      )
    }
  }

  return {
    ...judge(
      NAME,
      `${claimed.length} command id(s) the built-in claims, against ${examined} registration(s) ` +
        `across ${present.length} of ${paths.length} derived registry path(s)`,
      refusals
    ),
    population: over(present.length, "extension registry(ies) his editor reads"),
  }
}
