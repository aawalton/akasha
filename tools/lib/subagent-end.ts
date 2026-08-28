import { closeSync, existsSync, openSync, readdirSync, readSync, statSync } from "node:fs"
import { subagentUnder } from "./subagent.ts"
import { normalizeRecord } from "./transcript-records.ts"

const TASKS_DIR = "tasks"

const OUTPUT_SUFFIX = ".output"

const TAIL_BYTES = 128 * 1024

const SAID_CEILING = 300

export function taskRoot(): string {
  const uid = typeof process.getuid === "function" ? process.getuid() : 0
  return `/tmp/claude-${String(uid)}`
}

function dirNamesIn(at: string): readonly string[] {
  try {
    return readdirSync(at, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  } catch {
    return []
  }
}

export function transcriptsOf(
  ids: readonly string[],
  root: string = taskRoot()
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  if (ids.length === 0) return found
  for (const project of dirNamesIn(root)) {
    for (const session of dirNamesIn(`${root}/${project}`)) {
      for (const id of ids) {
        if (found.has(id)) continue
        const at = `${root}/${project}/${session}/${TASKS_DIR}/${id}${OUTPUT_SUFFIX}`
        if (existsSync(at)) found.set(id, at)
      }
      if (found.size === ids.length) return found
    }
  }
  return found
}

function tailLinesOf(path: string): readonly string[] {
  let handle: number | null = null
  try {
    const size = statSync(path).size
    const from = size > TAIL_BYTES ? size - TAIL_BYTES : 0
    handle = openSync(path, "r")
    const held = Buffer.alloc(size - from)
    readSync(handle, held, 0, held.length, from)
    const lines = held.toString("utf8").split("\n")
    if (from > 0) lines.shift()
    return lines
  } catch {
    return []
  } finally {
    if (handle !== null) closeSync(handle)
  }
}

export function lastWordsIn(lines: readonly string[]): string | null {
  for (let at = lines.length - 1; at >= 0; at--) {
    const line = lines[at]
    if (line === undefined || line.trim() === "") continue
    let raw: unknown
    try {
      raw = JSON.parse(line)
    } catch {
      continue
    }
    const record = normalizeRecord(raw)
    if (record.kind !== "assistant") continue
    const said = record.text.trim()
    if (said === "") continue
    return said.length > SAID_CEILING ? `${said.slice(0, SAID_CEILING)}…` : said
  }
  return null
}

export interface StandingName {
  readonly name: string
  readonly dispatchedAs: string
}

export interface SubagentEnd {
  readonly name: string
  readonly dispatchedAs: string
  readonly transcript: string | null
  readonly lastWords: string | null
}

export function endsOf(
  standing: readonly StandingName[],
  root: string = taskRoot()
): readonly SubagentEnd[] {
  const idsByName = new Map<string, string>()
  for (const one of standing) {
    const id = subagentUnder(one.name)
    if (id !== null) idsByName.set(one.name, id)
  }
  const found = transcriptsOf([...new Set(idsByName.values())], root)
  return standing.map((one) => {
    const id = idsByName.get(one.name)
    const at = id === undefined ? null : (found.get(id) ?? null)
    return {
      name: one.name,
      dispatchedAs: one.dispatchedAs,
      transcript: at,
      lastWords: at === null ? null : lastWordsIn(tailLinesOf(at)),
    }
  })
}

function lineFor(end: SubagentEnd): string {
  const head = `- ${end.name} (${end.dispatchedAs})`
  if (end.transcript === null) return `${head} left no transcript to read`
  if (end.lastWords === null) return `${head} left no last words — its transcript: ${end.transcript}`
  return `${head} ended saying: ${end.lastWords}\n  its transcript: ${end.transcript}`
}

export function reportOf(ends: readonly SubagentEnd[]): string {
  if (ends.length === 0) return ""
  const many = ends.length !== 1
  const opening =
    `${String(ends.length)} subagent${many ? "s were" : " was"} still out when this seat's process ` +
    `ended, so ${many ? "none of them" : "it"} returned. Nothing else reports ` +
    `${many ? "them" : "it"}, and this is what ${many ? "each" : "it"} was last doing:`
  return [opening, ...ends.map(lineFor)].join("\n")
}
