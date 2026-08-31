import { spawnSync } from "node:child_process"
import { slugNamed } from "../../page/page-address.ts"
import { pageStemOf } from "../../page/name/name.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { akashaSeatsStated } from "./seat-akasha-read.ts"
import { newestBodyPerPath, seatHistoryRoot } from "./seat-page-history.ts"
import { agentPresence, frontmatterIn } from "./seat-presence-read.ts"
import type { SeatPresence } from "./seat-proc-key.ts"
import { sessionOf } from "./seat-session.ts"

const SESSION_KEY = "claude-code-session-uuid"

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

const OUTPUT_CEILING = 64 * 1024 * 1024

function gitAt(root: string, args: readonly string[]): string | null {
  const proc = spawnSync("git", [...args], {
    cwd: root,
    maxBuffer: OUTPUT_CEILING,
    stdio: ["ignore", "pipe", "ignore"],
  })
  if (proc.status !== 0) return null
  return new TextDecoder().decode(proc.stdout ?? new Uint8Array())
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

export function seatsAbsent(): readonly Seated[] {
  const standing = seatsStanding()
  const byId = new Map<string, Seated>()
  for (const one of standing) {
    if (one.presence === "absent") byId.set(one.id, one)
  }
  const live = new Set(
    standing.filter((one) => one.presence !== "absent").map((one) => one.id)
  )
  const roots = resolveRoots()
  const seatRoot = seatHistoryRoot(roots) ?? rootFor(roots, AKASHA)
  for (const held of newestBodyPerPath(seatRoot)) {
    const body = gitAt(seatRoot, ["show", `${held.commit}:${held.path}`])
    if (body === null) continue
    const seated = seatedFrom(frontmatterIn(body), pageStemOf(held.path), held.atMs)
    if (seated === null || live.has(seated.id)) continue
    const already = byId.get(seated.id)
    if (already === undefined || already.activeAtMs < seated.activeAtMs) byId.set(seated.id, seated)
  }
  return [...byId.values()]
}

export function seatRoster(live: boolean): readonly Seated[] {
  return live ? seatsPresent() : seatsAbsent()
}
