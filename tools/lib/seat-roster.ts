import { slugNamed } from "@akasha/markdown-pages/page-address"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { akashaSeatsInHistory } from "./seat-akasha-history.ts"
import { akashaSeatsStated } from "./seat-akasha-read.ts"
import { agentPresence } from "./seat-presence-read.ts"
import type { SeatPresence } from "./seat-proc-key.ts"
import { sessionOf } from "./seat-session.ts"

const SESSION_KEY = "claude-code-session-uuid"

const SEAT_SUFFIX = ".seat.ts"

// The seat's name is the name its page in akasha stands under, which is the path with its folder
// and its suffix taken off. `pageStemOf` reads the old system's spelling and refuses this one.
function nameInPath(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1)
  return base.endsWith(SEAT_SUFFIX) ? base.slice(0, -SEAT_SUFFIX.length) : base
}

export interface Seated {
  readonly id: string
  readonly name: string | null
  readonly domain: string | null
  readonly role: string | null
  readonly activeAtMs: number
  readonly session: string | null
}

function bareSlug(value: string | null): string | null {
  return value === null ? null : slugNamed(value)
}

function slugAt(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  return typeof held === "string" && held !== "" ? held : null
}

function seqAt(frontmatter: Record<string, unknown>, key: string): number | null {
  const held = frontmatter[key]
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held.trim() === "") return null
  const read = Number(held)
  return Number.isFinite(read) ? read : null
}

function seatedFrom(
  frontmatter: Record<string, unknown> | null,
  name: string,
  activeAtMs: number
): Seated | null {
  if (frontmatter === null) return null
  const id = slugAt(frontmatter, "id")
  if (id === null) return null
  return {
    id,
    name,
    domain: bareSlug(slugAt(frontmatter, "domain-slug")),
    role: slugAt(frontmatter, "role-slug"),
    activeAtMs,
    session: slugAt(frontmatter, SESSION_KEY),
  }
}

// THE FLEET IS LISTED FROM AKASHA. This opened every file in the old seat directory and read its
// frontmatter for an id, a role and a domain, which made the roster the last listing reader still
// standing on a store nothing writes.
//
// WHAT IT COST WAS ALREADY BEING PAID IN THE WRONG PLACE. `activeAtMs` is what `message-to` sorts
// candidates by and what `seat-handle` breaks a tie on, and it was the newest of the old page and
// the old sidecar — both frozen at the moment the old writes stopped. Every seat read as last
// active hours ago and in the same order forever. Taken from akasha it moves again.
//
// A qualified assignment is spelled back to its bare slug, akasha naming the domain, person or
// package the value reaches into where the old page carried the slug alone.
export function seatsStanding(): readonly (Seated & {
  readonly presence: SeatPresence
  readonly present: boolean
})[] {
  const found: (Seated & { presence: SeatPresence; present: boolean })[] = []
  for (const one of akashaSeatsStated()) {
    const seated = seatedFrom(one.values, one.name, one.activeAtMs)
    if (seated === null) continue
    const presence = agentPresence(one.id)
    const session = sessionOf(one.id)?.value ?? seated.session
    found.push({ ...seated, session, presence, present: presence === "present" })
  }
  return found
}

export function seatsPresent(): readonly Seated[] {
  return seatsStanding().filter((one) => one.present)
}

// A SEAT NOBODY SITS IN, WHICH IS WHAT A REVIVAL IS OFFERED FROM. A seat standing but unheld is one
// of them; a seat whose page has gone entirely is the other, and only the history knows those.
//
// That history is akasha's now. This read the old store's, which meant a seat opened since the
// write moved could never appear here however long it had been stopped — and once that store was
// drained, no seat could. Every value is already answered under the old page's key names, so the
// body is not parsed here any more either.
export function seatsAbsent(): readonly Seated[] {
  const standing = seatsStanding()
  const byId = new Map<string, Seated>()
  for (const one of standing) {
    if (one.presence === "absent") byId.set(one.id, one)
  }
  const live = new Set(standing.filter((one) => one.presence !== "absent").map((one) => one.id))
  for (const [id, held] of akashaSeatsInHistory(rootFor(resolveRoots(), AKASHA))) {
    if (live.has(id)) continue
    const seated = seatedFrom(held.values, nameInPath(held.path), held.atMs)
    if (seated === null) continue
    const already = byId.get(seated.id)
    if (already === undefined || already.activeAtMs < seated.activeAtMs) byId.set(seated.id, seated)
  }
  return [...byId.values()]
}

export function seatRoster(live: boolean): readonly Seated[] {
  return live ? seatsPresent() : seatsAbsent()
}
