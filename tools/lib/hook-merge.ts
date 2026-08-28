import { refusalText } from "../../refusal/refusal.ts"
import { canonicalize } from "../../repo/path/path"

export const KEY_FIELDS = ["shell", "command", "args", "if"] as const

const NUL = String.fromCharCode(0)

const SCRIPT_SUFFIXES = [".ts", ".sh", ".js", ".mjs", ".cjs", ".py"] as const

const HOME_PREFIXES = ["$HOME/", "${HOME}/", "~/"] as const

export interface HookEntry {
  readonly event: string
  readonly matcher: string
  readonly target: string
  readonly fields: Readonly<Record<string, string>>
  readonly key: string
}

export interface Divergence {
  readonly event: string
  readonly target: string
  readonly times: number
  readonly left: HookEntry
  readonly right: HookEntry
}

export interface Agreement {
  readonly divergences: readonly Divergence[]
  readonly shared: number
  readonly unshared: number
}

function asField(value: unknown): string {
  if (value === undefined || value === null) return ""
  return typeof value === "string" ? value : JSON.stringify(value)
}

function oneSpelling(token: string): string {
  for (const prefix of HOME_PREFIXES) {
    if (token.startsWith(prefix)) return token.slice(prefix.length)
  }
  if (!token.startsWith("/")) return token
  const home = canonicalize(process.env.HOME ?? "/nonexistent")
  const real = canonicalize(token)
  return real.startsWith(`${home}/`) ? real.slice(home.length + 1) : real
}

export function targetOf(command: string): string {
  const scripts = command
    .split(/\s+/)
    .map((word) => word.replace(/^['"]+|['"]+$/g, ""))
    .filter((word) => word.includes("/") && SCRIPT_SUFFIXES.some((suffix) => word.endsWith(suffix)))
    .map(oneSpelling)
  return scripts.length === 0 ? command.trim().replace(/\s+/g, " ") : scripts.join(" ")
}

export function entriesOf(document: unknown): readonly HookEntry[] {
  const hooks = (document as { hooks?: unknown } | null | undefined)?.hooks
  if (hooks === null || typeof hooks !== "object") return []
  const found: HookEntry[] = []
  for (const [event, groups] of Object.entries(hooks as Record<string, unknown>)) {
    if (!Array.isArray(groups)) continue
    for (const group of groups) {
      if (group === null || typeof group !== "object") continue
      const listed = (group as Record<string, unknown>).hooks
      const matcher = asField((group as Record<string, unknown>).matcher)
      if (!Array.isArray(listed)) continue
      for (const entry of listed) {
        if (entry === null || typeof entry !== "object") continue
        const record = entry as Record<string, unknown>
        const fields: Record<string, string> = {}
        for (const field of KEY_FIELDS) fields[field] = asField(record[field])
        found.push({
          event,
          matcher,
          target: targetOf(fields.command),
          fields,
          key: ["", ...KEY_FIELDS.map((field) => fields[field])].join(NUL),
        })
      }
    }
  }
  return found
}

function indexed(entries: readonly HookEntry[]): Map<string, Map<string, HookEntry[]>> {
  const index = new Map<string, Map<string, HookEntry[]>>()
  for (const entry of entries) {
    let byTarget = index.get(entry.event)
    if (byTarget === undefined) {
      byTarget = new Map<string, HookEntry[]>()
      index.set(entry.event, byTarget)
    }
    const already = byTarget.get(entry.target)
    if (already === undefined) byTarget.set(entry.target, [entry])
    else already.push(entry)
  }
  return index
}

export function agreement(authoritative: unknown, user: unknown): Agreement {
  const ours = indexed(entriesOf(authoritative))
  const theirs = indexed(entriesOf(user))
  const divergences: Divergence[] = []
  let shared = 0
  let unshared = 0
  for (const [event, byTarget] of ours) {
    for (const [target, mine] of byTarget) {
      const yours = theirs.get(event)?.get(target)
      if (yours === undefined) {
        unshared += 1
        continue
      }
      const keys = new Set([...mine, ...yours].map((entry) => entry.key))
      if (keys.size === 1) {
        shared += 1
        continue
      }
      divergences.push({
        event,
        target,
        times: keys.size,
        left: mine.find((entry) => !yours.some((one) => one.key === entry.key)) ?? mine[0],
        right: yours.find((entry) => !mine.some((one) => one.key === entry.key)) ?? yours[0],
      })
    }
  }
  for (const [event, byTarget] of theirs) {
    for (const target of byTarget.keys()) {
      if (ours.get(event)?.get(target) === undefined) unshared += 1
    }
  }
  return { divergences, shared, unshared }
}

function firstDifference(left: string, right: string): number {
  const limit = Math.min(left.length, right.length)
  for (let i = 0; i < limit; i += 1) if (left[i] !== right[i]) return i
  return limit
}

function byteOffset(text: string, at: number): number {
  return new TextEncoder().encode(text.slice(0, at)).length
}

function partsOn(divergence: Divergence, leftName: string, rightName: string): string {
  for (const field of KEY_FIELDS) {
    const left = divergence.left.fields[field]
    const right = divergence.right.fields[field]
    if (left === right) continue
    return (
      `\`${field}\` parts at byte ${byteOffset(left, firstDifference(left, right))} — ` +
      `${leftName} has ${JSON.stringify(left)} and ${rightName} has ${JSON.stringify(right)}`
    )
  }
  return `${leftName} and ${rightName} part outside ${KEY_FIELDS.join(", ")}`
}

export function refusalFor(
  divergence: Divergence,
  leftName: string,
  rightName: string,
  root: string
): string {
  return refusalText(
    "hook-registered-twice",
    {
      target: divergence.target,
      event: divergence.event,
      times: `${divergence.times}`,
      parts: partsOn(divergence, leftName, rightName),
    },
    root
  )
}
