import { statSync } from "node:fs"
import { join } from "node:path"
import {
  type Value,
  valueAt,
} from "../../akasha/pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfTypeAnswered,
  standingById,
} from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"
import { uncommittedAt } from "../../akasha/pages-system/page/page-file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "../../akasha/pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"
import { onceInCall } from "../../during-call/during-call.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { CARRIED, RECORDS } from "./seat-beside.ts"
import type { SeatRecord } from "./seat-record.ts"

// What is observed of a seat stands beside its page in akasha. Reaching it through the old page
// is what the sweep broke: taking that page away orphaned a sidecar that was still standing, and
// every reader below it answered nothing rather than saying it could not look.
//
// A TRUE EMPTY AND A FAILURE MUST NOT READ ALIKE. A root holding no seat index is a root that
// cannot be read, so it is refused. A root whose index stands but names no such seat is an
// answer: that seat really is not there. This is the `Answer Or Refuse` directive the pages
// system states, and the difference between this failing loudly and failing the way it just did.

const PAGE_TYPE = "seat"

const SEAT_DIR = "akasha/seat-system/seat/seats/"

function akashaRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

// Refuses a root that names no seat index at all, and answers for one that does. The listing is
// taken once per call rather than per seat, because every reader below reaches this.
function seatsStandingInAkasha(): ReadonlyMap<string, string> {
  return onceInCall("akasha-seat-path-by-id", () => {
    const root = akashaRoot()
    const found = new Map<string, string>()
    for (const one of everyOfTypeAnswered(root, PAGE_TYPE)) {
      if (!one.path.startsWith(SEAT_DIR)) continue
      if (!found.has(one.id)) found.set(one.id, one.path)
    }
    return found
  })
}

// The repository-relative path of the seat page carrying this agent's id, or null where akasha
// stands but holds no such seat.
export function akashaSeatPathForAgent(agentId: string): string | null {
  if (agentId === "") return null
  const held = seatsStandingInAkasha().get(agentId)
  if (held !== undefined) return held
  // The index answers by id across every page type, so a hit is checked to be a seat rather than
  // trusted for its id alone.
  const one = standingById(akashaRoot(), agentId)
  return one !== null && one.path.startsWith(SEAT_DIR) ? one.path : null
}

// The values standing beside a seat's page in akasha, under the camelCase keys akasha declares.
export function akashaBesideOf(agentId: string): Record<string, unknown> | null {
  const page = akashaSeatPathForAgent(agentId)
  if (page === null) return null
  const held = uncommittedIn(akashaRoot(), page)
  return held === null ? null : (held as Record<string, unknown>)
}

// The old store stamps every value it keeps and akasha keeps the value alone, so a value read
// back from akasha is stamped with the moment its sidecar was last written. That is the newest
// any value in it can be, which is what a stamp is read for.
function besideWrittenAtMs(page: string): number {
  const at = uncommittedAt(page)
  if (at === null) return 0
  const stood = statSync(join(akashaRoot(), at), { throwIfNoEntry: false })
  return stood === undefined ? 0 : stood.mtimeMs
}

function heldAt(values: Record<string, unknown>, at: readonly string[]): unknown {
  const [one, two] = at
  if (one === undefined) return undefined
  const first = values[one]
  if (two === undefined) return first
  if (first === null || typeof first !== "object" || Array.isArray(first)) return undefined
  return (first as Record<string, unknown>)[two]
}

function saidAsText(held: unknown): string | null {
  if (typeof held === "string") return held === "" ? null : held
  if (typeof held === "number") return Number.isFinite(held) ? String(held) : null
  return null
}

// What a seat STATES, as against what is observed of it, and where each old key stands in akasha.
// The old readers ask by the keys the markdown frontmatter carried, so a page read from akasha is
// answered under those names rather than akasha's own.
//
// `assignment-slug` answers `domain-slug`: akasha names the property for the assignment because a
// person and a persona each extend a domain, and the value either one holds is the same string
// the old page carried.
const STATED: Readonly<Record<string, string>> = {
  id: "id",
  slug: "slug",
  "page-type-slug": "pageTypeSlug",
  "persona-slug": "personaSlug",
  "domain-slug": "assignmentSlug",
  "role-slug": "roleSlug",
  "person-slug": "personSlug",
  "principal-seat-name": "principalSeatName",
  "start-mode": "startMode",
  "on-call": "onCall",
  "registration-account": "registrationAccount",
  "initiative-slug": "initiativeSlug",
  "transcript-path": "transcriptPath",
  // Observed of a seat and committed all the same, because nothing re-derives it. This is the
  // read that answers it for a seat whose old page has gone, which is what a resume needs.
  "claude-code-session-uuid": "claudeCodeSessionUuid",
}

const TITLE = "title"

const SLUG = "slug"

// What a seat states in akasha, under the keys the old page carried. Null where akasha stands and
// holds no such seat; refuses a root that names no seat index at all.
export function akashaSeatValuesOf(agentId: string): Record<string, unknown> | null {
  const page = akashaSeatPathForAgent(agentId)
  if (page === null) return null
  const held: Value | null = valueAt(page, akashaRoot())
  if (held === null) return null
  const values: Record<string, unknown> = {}
  for (const [key, from] of Object.entries(STATED)) {
    const said = (held as Record<string, unknown>)[from]
    if (said !== undefined && said !== null && said !== "") values[key] = said
  }
  // The old page carried a title and akasha carries none, because a seat's title was only ever its
  // slug spelled again. A reader asking for one is answered rather than left short.
  const slug = values[SLUG]
  if (typeof slug === "string" && values[TITLE] === undefined) values[TITLE] = slug
  return values
}

// The old store keeps an instant as milliseconds and akasha writes it as ISO 8601, so a value
// carried out through `CARRIED` is carried back the same way. A reader taking this instead of the
// raw sidecar must not have to know which of the two it is holding.
function asOldKind(held: unknown, kind: string): unknown {
  if (kind !== "instant") return held
  if (typeof held !== "string") return held
  const ms = Date.parse(held)
  return Number.isFinite(ms) ? ms : null
}

// EVERY VALUE AKASHA HOLDS BESIDE A SEAT, UNDER THE KEYS THE OLD SIDECAR CARRIED. `CARRIED` and
// `RECORDS` walked the other way, so a reader that took the raw sidecar can take this instead
// without learning akasha's names. What akasha does not carry is absent here rather than null,
// which lets a caller lay the old sidecar over the top and have a value it holds win.
//
// `context-replaced` is left out: it is the one key the old store stamps and reads back as a pair,
// and `akashaSeatRecordOf` answers it in that shape already.
export function akashaObservedOf(agentId: string): Record<string, unknown> | null {
  const values = akashaBesideOf(agentId)
  if (values === null) return null
  const held: Record<string, unknown> = {}
  for (const [key, where] of Object.entries(CARRIED)) {
    const said = asOldKind(heldAt(values, where.at), where.kind)
    if (said !== undefined && said !== null) held[key] = said
  }
  for (const [key, name] of Object.entries(RECORDS)) {
    const said = values[name]
    if (said !== undefined && said !== null) held[key] = said
  }
  return held
}

const REPLACED = "context-replaced"

// WHAT A SEAT CAME BY ITS CONTEXT AND WHEN ARE BOTH THE VALUE, so this one is read from the record
// akasha holds rather than from the sidecar's mtime. Every other key here is a bare value whose
// stamp is only ever "when the sidecar was last written", which is the newest it can be. This one's
// stamp is the moment of the event, and `epoch.ts` hands it to the read record as the cutoff before
// which a seat's reads no longer count. Taking the mtime would move that cutoff forward on every
// beat and read the whole fleet as having read nothing.
function replacedIn(values: Record<string, unknown>): SeatRecord | null {
  const held = values["contextReplaced"]
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const { source, at } = held as { source?: unknown; at?: unknown }
  if (typeof source !== "string" || source === "") return null
  if (typeof at !== "string") return null
  const ms = Date.parse(at)
  return Number.isFinite(ms) ? { value: source, at: ms } : null
}

// One value a seat carries, read from akasha under the old system's key and returned in the shape
// the old store's readers take. The mapping is `CARRIED`, walked the other way, so a key akasha
// does not carry answers null here rather than guessing at a name for it.
export function akashaSeatRecordOf(agentId: string, key: string): SeatRecord | null {
  if (key === REPLACED) {
    const values = akashaBesideOf(agentId)
    return values === null ? null : replacedIn(values)
  }
  const where = CARRIED[key]
  if (where === undefined) return null
  const values = akashaBesideOf(agentId)
  if (values === null) return null
  const value = saidAsText(heldAt(values, where.at))
  if (value === null) return null
  const page = akashaSeatPathForAgent(agentId)
  return { value, at: page === null ? 0 : besideWrittenAtMs(page) }
}
