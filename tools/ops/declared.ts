
import { type Dirent, readdirSync, readFileSync } from "node:fs"
import { akashaRoot } from "../../repo/roots/roots.ts"
import type { Command, CommandModule } from "./surface.ts"

const COMMANDS_DIR = "tools/commands"
const EXT = ".ts"
const DECLARED = /^export const summary =\s+(".*")$/m

export function summaryIn(source: string): string | null {
  const found = source.match(DECLARED)
  if (found === null) return null
  let value: unknown
  try {
    value = JSON.parse(found[1] as string)
  } catch {
    return null
  }
  return typeof value === "string" && value.trim() !== "" ? value : null
}

export function filesUnder(dir: string, ext: string = EXT): readonly string[] {
  let entries: readonly Dirent[]
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
  const found: string[] = []
  for (const entry of entries) {
    const at = `${dir}/${entry.name}`
    if (entry.isDirectory()) found.push(...filesUnder(at, ext))
    else if (entry.name.endsWith(ext) && entry.name.length > ext.length) found.push(at)
  }
  return found
}

export function declaredCommands(repoRoot: string = akashaRoot()): readonly Command[] {
  const root = `${repoRoot}/${COMMANDS_DIR}`
  const commands: Command[] = []
  for (const path of [...filesUnder(root)].sort()) {
    let source = ""
    try {
      source = readFileSync(path, "utf8")
    } catch {
      source = ""
    }
    commands.push({
      path: path.slice(root.length + 1, -EXT.length).split("/"),
      summary: summaryIn(source) ?? "",
      load: () => import(path) as Promise<CommandModule>,
      source: path,
    })
  }
  return commands
}
