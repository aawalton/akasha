import { statSync } from "node:fs"
import { join } from "node:path"
import {
  everyOfTypeAnswered,
  standingById,
} from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"
import { uncommittedAt } from "../../akasha/pages-system/page/page-file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "../../akasha/pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"
import { onceInCall } from "../../during-call/during-call.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"

// WHERE A SEAT STANDS IN AKASHA, AND WHERE EACH OF ITS VALUES STANDS ON IT. This holds nothing but
// that, and imports nothing of the seat libraries, because the two ends of the migration both need
// it: the writer carries values out through these tables and the readers carry them back in.
//
// It is its own file for that reason. The tables sat with the writer, so a reader reaching them
// pulled in the writer and everything the writer composes a page from — and the presence read,
// which is the one every other reader stands on, could not reach them at all without a cycle.

export type Beside = Record<string, unknown>

export type Kind = "text" | "number" | "instant"

export type Carried = { readonly at: readonly string[]; readonly kind: Kind }

// What akasha declares of a seat, and where each old key stands there. A key absent from this
// table reaches the old store alone: nothing checks an uncommitted value, so one written to
// akasha under a name it does not declare would land and never be caught.
//
// `claude-code-session-uuid` is absent because akasha commits it: it stands on the seat's page
// there, written by the composer, rather than beside it. A value the page carries and the sidecar
// carries too would drift, and the sidecar is the copy that goes when the page does.
//
// `context-replaced` is absent because it alone is carried as a record built from a value and its
// stamp, which is neither shape this table describes.
export const CARRIED: Readonly<Record<string, Carried>> = {
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

export const SUPERVISOR_PROCESS = "supervisor-process"

// The records akasha declares of a seat, and the name each stands under there. A record is carried
// whole, so it is named here rather than in `CARRIED`, whose entries are single values.
//
// THIS IS THE WHOLE TEST, so a record absent from it reaches the old store alone rather than being
// dropped by a condition written for one key. `turn-working` is absent because akasha declares no
// such property, and writing it there would land under a name nothing checks: it is carried by
// adding the property first and a line here second.
export const RECORDS: Readonly<Record<string, string>> = {
  "turn-pending": "turnPending",
}

const PAGE_TYPE = "seat"

const SEAT_DIR = "akasha/seat-system/seat/seats/"

export function akashaRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

// Refuses a root that names no seat index at all, and answers for one that does. The listing is
// taken once per call rather than per seat, because every reader below reaches this.
//
// A TRUE EMPTY AND A FAILURE MUST NOT READ ALIKE. A root holding no seat index is a root that
// cannot be read, so it is refused. A root whose index stands but names no such seat is an answer:
// that seat really is not there. This is the `Answer Or Refuse` directive the pages system states,
// and the difference between this failing loudly and failing the way the sweep did.
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

const SEAT_SUFFIX = ".seat.ts"

// A SEAT'S SLUG IS THE NAME ITS PAGE FILE STANDS UNDER, so it is read off the path rather than out
// of the page. The index answers the path already, and a name that had to open every page would
// cost the corpus rather than the seat.
export function akashaSeatSlugOf(agentId: string): string | null {
  const page = akashaSeatPathForAgent(agentId)
  if (page === null) return null
  const name = page.slice(SEAT_DIR.length)
  return name.endsWith(SEAT_SUFFIX) ? name.slice(0, -SEAT_SUFFIX.length) : null
}

// The agent standing in the seat of this name, or null where akasha holds no such seat.
export function akashaSeatIdForName(name: string): string | null {
  const at = `${SEAT_DIR}${name}${SEAT_SUFFIX}`
  for (const [id, path] of seatsStandingInAkasha()) if (path === at) return id
  return null
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
export function besideWrittenAtMs(page: string): number {
  const at = uncommittedAt(page)
  if (at === null) return 0
  const stood = statSync(join(akashaRoot(), at), { throwIfNoEntry: false })
  return stood === undefined ? 0 : stood.mtimeMs
}

// One value read straight out of what stands beside a seat in akasha, by the key the old sidecar
// carried it under. This is here rather than with the other readers so that the presence read can
// reach it: everything else a seat is read for stands on presence, and presence cannot stand on
// the writer.
export function akashaValueOf(agentId: string, key: string): unknown {
  const where = CARRIED[key]
  if (where === undefined) return undefined
  const values = akashaBesideOf(agentId)
  if (values === null) return undefined
  const [one, two] = where.at
  if (one === undefined) return undefined
  const first = values[one]
  if (two === undefined) return first
  if (first === null || typeof first !== "object" || Array.isArray(first)) return undefined
  return (first as Record<string, unknown>)[two]
}
