import { existsSync } from "node:fs"
import {
  dropUncommitted as dropAkasha,
  mergeUncommitted,
} from "../../akasha/pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"
import { pageStemOf } from "../../page/name/name.ts"
import {
  dropUncommitted,
  patchUncommitted,
  patchUncommittedUnder,
  removeUncommitted,
} from "../../page/uncommitted/uncommitted.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { akashaSeatRelPath } from "./seat-page-akasha.ts"

// Every write of what is observed of a seat goes through here, and is carried to both systems.
// The store beneath takes the same calls from anything with a page path, and a dozen callers
// reached it directly, so this is where the second write goes rather than in twelve places.

export type Beside = Record<string, unknown>

type Kind = "text" | "number" | "instant"

type Carried = { readonly at: readonly string[]; readonly kind: Kind }

// What akasha declares of a seat, and where each old key stands there. A key absent from this
// table reaches the old store alone: nothing checks an uncommitted value, so one written to
// akasha under a name it does not declare would land and never be caught.
const CARRIED: Readonly<Record<string, Carried>> = {
  "claude-code-session-uuid": { at: ["claudeCodeSessionUuid"], kind: "text" },
  "transcript-path": { at: ["transcriptPath"], kind: "text" },
  "rotated-session-uuid": { at: ["rotatedSessionUuid"], kind: "text" },
  model: { at: ["model"], kind: "text" },
  "context-tokens": { at: ["contextTokens"], kind: "number" },
  "supervisor-process": { at: ["supervisorProcess"], kind: "text" },
  "proxy-process": { at: ["proxy", "process"], kind: "text" },
  "proxy-port": { at: ["proxy", "port"], kind: "number" },
  "proxy-version": { at: ["proxy", "version"], kind: "text" },
  requestedAction: { at: ["request", "action"], kind: "text" },
  interruptMessage: { at: ["request", "message"], kind: "text" },
  restartArmedAt: { at: ["request", "armedAt"], kind: "instant" },
}

// The one key whose instant is the stamp rather than the value. What it holds is the source, and a
// context carried across a restart replaces nothing, so a resume stands as nothing at all.
const REPLACED = "context-replaced"

const RESUMED = "resume"

const PENDING = "turn-pending"

function bare(held: unknown): unknown {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return held
  const rec = held as Record<string, unknown>
  const keys = Object.keys(rec)
  if (keys.length === 2 && keys.includes("value") && keys.includes("at")) return rec["value"]
  return held
}

function stampOf(held: unknown): number | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const at = (held as Record<string, unknown>)["at"]
  return typeof at === "number" && Number.isFinite(at) ? at : null
}

function asKind(held: unknown, kind: Kind): unknown {
  if (held === null || held === undefined || held === "") return null
  if (kind === "text") return String(held)
  const said = Number(held)
  if (!Number.isFinite(said)) return null
  return kind === "number" ? said : new Date(said).toISOString()
}

function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}

// A record is written whole or not at all: the store merges at the top level, so a second write
// naming one field of `proxy` would take the other two away. Every caller writes all of a record's
// fields in one call, and this holds them together as one value.
function carriedFrom(values: Beside): Beside | null {
  const held: Beside = {}
  let any = false
  for (const [key, value] of Object.entries(values)) {
    if (key === PENDING) {
      held["turnPending"] = value
      any = true
      continue
    }
    if (key === REPLACED) {
      const stamp = stampOf(value)
      held["contextReplacedAt"] = bare(value) === RESUMED || stamp === null ? null : new Date(stamp).toISOString()
      any = true
      continue
    }
    const where = CARRIED[key]
    if (where === undefined) continue
    const said = asKind(bare(value), where.kind)
    const [one, two] = where.at
    if (one === undefined) continue
    if (two === undefined) held[one] = said
    else {
      const under = (held[one] ?? {}) as Beside
      under[two] = said
      held[one] = under
    }
    any = true
  }
  return any ? held : null
}

function akashaPageOf(page: string): string | null {
  const root = rootFor(resolveRoots(), AKASHA)
  const relPath = akashaSeatRelPath(pageStemOf(page))
  return existsSync(`${root}/${relPath}`) ? relPath : null
}

// The old write is the one the fleet stands on until the readers move, so what the second one
// throws is caught here and never reaches the caller.
function alsoInAkasha(page: string, values: Beside): void {
  try {
    const carried = carriedFrom(values)
    if (carried === null) return
    const at = akashaPageOf(page)
    if (at === null) return
    mergeUncommitted(rootFor(resolveRoots(), AKASHA), at, carried)
  } catch (thrown) {
    process.stderr.write(
      `what is observed of ${pageStemOf(page)} stands beside its page and not beside its page in akasha: ` +
        `${thrown instanceof Error ? thrown.message : String(thrown)}\n`
    )
  }
}

export function keepBeside(page: string, values: Beside): void {
  patchUncommitted(page, values)
  alsoInAkasha(page, values)
}

export function keepBesideUnder(page: string, key: string, values: Beside): void {
  patchUncommittedUnder(page, key, values)
  if (key !== PENDING) return
  const under: Beside = {}
  for (const [name, value] of Object.entries(values)) under[camel(name)] = bare(value)
  alsoInAkasha(page, { [PENDING]: under })
}

export function dropBeside(page: string, keys: readonly string[]): void {
  dropUncommitted(page, keys)
  // Only a key standing at the top of the page in akasha can be taken away on its own. A field of
  // a record goes with the record, and nothing drops one.
  const gone = keys.flatMap((key) => {
    const where = CARRIED[key]
    return where !== undefined && where.at.length === 1 ? [where.at[0] as string] : []
  })
  if (gone.length === 0) return
  try {
    const at = akashaPageOf(page)
    if (at !== null) dropAkasha(rootFor(resolveRoots(), AKASHA), at, gone)
  } catch (thrown) {
    process.stderr.write(
      `${pageStemOf(page)} let a value go beside its page and not beside its page in akasha: ` +
        `${thrown instanceof Error ? thrown.message : String(thrown)}\n`
    )
  }
}

export function removeBeside(page: string): void {
  removeUncommitted(page)
}

export const besideForTests = { carriedFrom }
