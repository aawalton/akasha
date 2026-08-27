
import { type Dirent, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { akashaCommandPages, akashaCommands, akashaEntryFor } from "../ops/akasha.ts"
import { declaredCommands } from "../ops/declared.ts"
import { HELP_FLAGS, type CommandModule } from "../ops/surface.ts"
import { blobId } from "../../repo/git/git.ts"

const DECLARATION_DIRS: readonly string[] = ["commands", "lib"]

const TOOLS_DIR = `${import.meta.dir}/..`

const CACHE_DIR = ".cache/ops"

const NO_HOME = "/var/tmp"

export interface OpsCall {
  readonly words: readonly string[]
  readonly rest: readonly string[]
  readonly help: boolean
}

export function parseOpsCalls(command: string): readonly OpsCall[] {
  const calls: OpsCall[] = []
  for (const segment of command.split(/[|;&]+/)) {
    const words = segment.trim().split(/\s+/).filter((word) => word !== "")
    let at = 0
    while (at < words.length) {
      const word = words[at] ?? ""
      if (/^[A-Za-z_][A-Za-z0-9_]*=|^(sudo|env|bun|export)$/.test(word)) {
        at += 1
        continue
      }
      if (word !== "timeout") break
      at += 1
      while (at < words.length && (words[at] ?? "").startsWith("-")) at += 1
      while (at < words.length && /^\d+(?:\.\d+)?[smhd]?$/.test(words[at] ?? "")) at += 1
    }
    const head = words[at]
    if (head === undefined || (head !== "ops" && !head.endsWith("/ops"))) continue
    const rest = words.slice(at + 1)
    calls.push({
      words: rest.filter((word) => !word.startsWith("-")),
      rest,
      help: rest.some((word) => HELP_FLAGS.includes(word)),
    })
  }
  return calls
}

export function matchCommand(call: OpsCall, declared: ReadonlyMap<string, DeclaredCommand>): string | null {
  for (let take = Math.min(call.words.length, 3); take > 0; take -= 1) {
    const candidate = call.words.slice(0, take).join(" ")
    if (declared.has(candidate)) return candidate
  }
  return null
}

function cachePath(): string {
  return `${process.env.HOME ?? NO_HOME}/${CACHE_DIR}/irreversible.json`
}

export interface DeclaredCommand {
  readonly source: string
  readonly help: string
}

async function deriveManifest(): Promise<Record<string, DeclaredCommand> | null> {
  const commands = [...akashaCommands(), ...declaredCommands()]
  if (commands.length === 0) return null
  const out: Record<string, DeclaredCommand> = {}
  const taken = new Set<string>()
  for (const command of commands) {
    const at = command.path.join(" ")
    if (taken.has(at)) continue
    taken.add(at)
    if (command.source === undefined) continue
    let module: CommandModule
    try {
      module = await command.load()
    } catch {
      continue
    }
    if (module.help?.irreversible === "irreversible") {
      out[at] = { source: command.source, help: helpOid(module.help) }
    }
  }
  return out
}

function fileMarks(dir: string, into: string[]): boolean {
  let entries: readonly Dirent[]
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return false
  }
  for (const entry of entries) {
    const at = `${dir}/${entry.name}`
    if (entry.isDirectory()) {
      if (!fileMarks(at, into)) return false
      continue
    }
    if (!entry.name.endsWith(".ts")) continue
    try {
      const found = statSync(at)
      into.push(`${at}:${found.mtimeMs}:${found.size}`)
    } catch {
      return false
    }
  }
  return true
}

function akashaMarks(into: string[]): boolean {
  for (const page of akashaCommandPages()) {
    for (const at of [page, akashaEntryFor(page)]) {
      try {
        const found = statSync(at)
        into.push(`${at}:${found.mtimeMs}:${found.size}`)
      } catch {
        return false
      }
    }
  }
  return true
}

export function declarationFingerprint(): string | null {
  const marks: string[] = []
  for (const dir of DECLARATION_DIRS) {
    if (!fileMarks(`${TOOLS_DIR}/${dir}`, marks)) return null
  }
  if (!akashaMarks(marks)) return null
  marks.sort()
  return `${marks.length}:${Bun.hash(marks.join("\n")).toString(16)}`
}

export async function irreversibleCommands(): Promise<ReadonlyMap<string, DeclaredCommand>> {
  const fingerprint = declarationFingerprint()
  const path = cachePath()
  if (fingerprint !== null && existsSync(path)) {
    try {
      const cached: unknown = JSON.parse(readFileSync(path, "utf8"))
      const held = cached as { fingerprint?: unknown; verbs?: unknown }
      if (
        typeof held.fingerprint === "string" &&
        held.fingerprint === fingerprint &&
        held.verbs !== null &&
        typeof held.verbs === "object"
      ) {
        return new Map(Object.entries(held.verbs as Record<string, DeclaredCommand>))
      }
    } catch {
    }
  }
  const fetched = await deriveManifest()
  if (fetched === null) return new Map()
  if (fingerprint !== null) {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, `${JSON.stringify({ fingerprint, verbs: fetched })}\n`, "utf8")
  }
  return new Map(Object.entries(fetched))
}

export function helpKey(source: string): string {
  return `${source}::help`
}

export function helpOid(help: unknown): string {
  const text = JSON.stringify(help ?? {}) ?? "{}"
  return blobId(new TextEncoder().encode(text))
}
