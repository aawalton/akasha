import { readdirSync } from "node:fs"
import { resolve } from "node:path"

export const DECLARED_TABLE_DIRECTORY = "tools/lib/check-workflow"

const isTableModule = (file: string): boolean =>
  /^check-configs.*\.ts$/.test(file) && !file.includes(".test.")

const isCheckConfig = (
  value: unknown
): value is Record<string, unknown> & { readonly name: string } => {
  if (typeof value !== "object" || value === null) return false
  if (!("name" in value) || typeof value.name !== "string") return false
  const hasScript = "script" in value && typeof value.script === "string"
  const hasCommands = "commands" in value && typeof value.commands === "function"
  return hasScript || hasCommands
}

export interface DeclaredCheckConfigs {
  readonly names: ReadonlySet<string>
  readonly modules: number
}

export interface DeclaredCheckEntry {
  readonly table: string
  readonly exported: string
  readonly config: Record<string, unknown> & { readonly name: string }
}

export interface DeclaredCheckEntries {
  readonly entries: readonly DeclaredCheckEntry[]
  readonly modules: number
  readonly builtFromCode: number
  readonly unread: readonly string[]
}

const builtBy = (held: unknown, codeRoot: string): readonly unknown[] | null => {
  if (typeof held !== "function") return null
  try {
    const made: unknown = (held as (root: string) => unknown)(codeRoot)
    return Array.isArray(made) ? made : null
  } catch {
    return null
  }
}

export async function declaredCheckEntries(codeRoot: string): Promise<DeclaredCheckEntries> {
  const directory = import.meta.dir
  const files = readdirSync(directory).filter(isTableModule)
  const entries: DeclaredCheckEntry[] = []
  const unread: string[] = []
  let builtFromCode = 0
  for (const file of files) {
    const module: Record<string, unknown> = await import(resolve(directory, file))
    for (const [exported, held] of Object.entries(module)) {
      let table: readonly unknown[]
      if (Array.isArray(held)) table = held
      else {
        const made = builtBy(held, codeRoot)
        if (made === null) {
          if (typeof held === "function") unread.push(`${file} \`${exported}\``)
          continue
        }
        table = made
      }
      const before = entries.length
      for (const config of table) {
        if (isCheckConfig(config)) entries.push({ table: file, exported, config })
      }
      if (!Array.isArray(held) && entries.length > before) builtFromCode += 1
    }
  }
  return { entries, modules: files.length, builtFromCode, unread }
}

export async function declaredCheckNames(codeRoot: string): Promise<DeclaredCheckConfigs> {
  const { entries, modules } = await declaredCheckEntries(codeRoot)
  return { names: new Set(entries.map((one) => one.config.name)), modules }
}
