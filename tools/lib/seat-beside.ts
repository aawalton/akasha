import { existsSync } from "node:fs"
import {
  dropUncommitted as dropAkasha,
  mergeUncommitted,
  removeUncommitted as removeAkasha,
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

export type Kind = "text" | "number" | "instant"

export type Carried = { readonly at: readonly string[]; readonly kind: Kind }

// What akasha declares of a seat, and where each old key stands there. A key absent from this
// table reaches the old store alone: nothing checks an uncommitted value, so one written to
// akasha under a name it does not declare would land and never be caught.
//
// The reader in `seat-akasha-read.ts` walks this same table the other way, so where a value
// stands in akasha is stated once and the write and the read cannot drift apart.
export // `claude-code-session-uuid` is absent because akasha commits it: it stands on the seat's page
// there, written by the composer, rather than beside it. A value the page carries and the sidecar
// carries too would drift, and the sidecar is the copy that goes when the page does.
const CARRIED: Readonly<Record<string, Carried>> = {
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
  "reexec-asked": { at: ["reExecAsk"], kind: "text" },
}

// The one key whose stamp is half the fact rather than the moment of writing, so it is carried as a
// record holding both halves. It was an instant alone until the 31st, which threw the source away:
// `hold-seat-words.ts` renders that word into what a seat is told, `epoch.ts` and `read-record.ts`
// each branch on it, and nothing re-derives how a context was come by once the moment has passed.
const REPLACED = "context-replaced"

const PENDING = "turn-pending"

// The records akasha declares of a seat, and the name each stands under there. A record is carried
// whole, so it is named here rather than in `CARRIED`, whose entries are single values.
//
// THIS IS THE WHOLE TEST, so a record absent from it reaches the old store alone rather than being
// dropped by a condition written for one key. `turn-working` is absent because akasha declares no
// such property, and writing it there would land under a name nothing checks: it is carried by
// adding the property first and a line here second.
const RECORDS: Readonly<Record<string, string>> = {
  [PENDING]: "turnPending",
}

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
    const record = RECORDS[key]
    if (record !== undefined) {
      held[record] = value
      any = true
      continue
    }
    if (key === REPLACED) {
      const stamp = stampOf(value)
      const source = bare(value)
      held["contextReplaced"] =
        typeof source !== "string" || source === "" || stamp === null
          ? null
          : { source, at: new Date(stamp).toISOString() }
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
  if (RECORDS[key] === undefined) return
  const under: Beside = {}
  for (const [name, value] of Object.entries(values)) under[camel(name)] = bare(value)
  alsoInAkasha(page, { [key]: under })
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

// WHAT STANDS BESIDE A PAGE GOES WITH THE PAGE, IN BOTH SYSTEMS. A sidecar outliving its page is
// what the outage was made of, and akasha states the rule of itself: the gate refuses a file no
// page claims.
//
// This waited on the session moving onto the page. While what a seat was bound to stood beside it
// and nowhere else, taking akasha's sidecar was forgetting rather than tidying — it would have
// left a swept seat with nothing to come back on. Committed, the session outlives both sidecars,
// and everything still standing beside a seat can be observed again by watching it for a few
// seconds. So there is nothing left here worth keeping past the page.
//
// The seat is named rather than the page looked up, so this does not turn on whether the akasha
// page has already gone. Its callers take the pages away in opposite orders.
export function removeBeside(page: string): void {
  removeUncommitted(page)
  try {
    removeAkasha(rootFor(resolveRoots(), AKASHA), akashaSeatRelPath(pageStemOf(page)))
  } catch (thrown) {
    process.stderr.write(
      `what was observed of ${pageStemOf(page)} is gone, and what was observed of it in akasha stands: ` +
        `${thrown instanceof Error ? thrown.message : String(thrown)}\n`
    )
  }
}

export const besideForTests = { carriedFrom }
