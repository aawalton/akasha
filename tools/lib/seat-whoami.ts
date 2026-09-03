import { basename } from "node:path"
import { slugNamed } from "@akasha/markdown-pages/page-address"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import {
  attributesOf,
  recordedModeOf,
} from "../../akasha/seat-system/seat-attributes/seat-attributes.module.code.ts"
import {
  frontmatterFromHistory,
  nameFromHistory,
} from "../../akasha/seat-system/seat-page-history/seat-page-history.module.code.ts"
import { pageTextOf } from "../../akasha/seat-system/seat-page-values/seat-page-values.module.code.ts"
import {
  seatIdForName,
  seatNameForAgent,
} from "../../akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import {
  principalOf,
  principalSeatIdOf,
} from "../../akasha/seat-system/seat-principal/seat-principal.module.code.ts"

const PAGE_SUFFIX = ".md"

export interface SeatWhoami {
  readonly id: string
  readonly name: string | null
  readonly role: string | null
  readonly domain: string | null
  readonly persona: string | null
  readonly mode: string | null
  readonly principal: string | null
  readonly parentAgentId: string | null
}

function bareSlug(value: string | null): string | null {
  return value === null ? null : slugNamed(value)
}

function slugAt(frontmatter: Record<string, unknown> | null, key: string): string | null {
  const held = frontmatter?.[key]
  return typeof held === "string" && held !== "" ? held : null
}

function seqAt(frontmatter: Record<string, unknown> | null, key: string): number | null {
  const held = frontmatter?.[key]
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held.trim() === "") return null
  const read = Number(held)
  return Number.isFinite(read) ? read : null
}

function parentFromFrontmatter(frontmatter: Record<string, unknown> | null): string | null {
  const name = slugAt(frontmatter, "principal-seat-name")
  return name === null ? null : seatIdForName(name)
}

function fromStanding(agentId: string, seatName: string): SeatWhoami {
  const stated = attributesOf(agentId)
  return {
    id: agentId,
    name: seatName,
    role: stated.role?.slug ?? null,
    domain: stated.domain?.slug ?? null,
    persona: stated.persona?.slug ?? null,
    mode: recordedModeOf(agentId)?.value ?? null,
    principal: principalOf(agentId)?.value ?? null,
    parentAgentId: principalSeatIdOf(agentId),
  }
}

function fromHistory(agentId: string): SeatWhoami | null {
  const roots = resolveRoots()
  const frontmatter = frontmatterFromHistory(agentId, roots)
  if (frontmatter === null) return null
  return {
    id: agentId,
    name: nameFromHistory(agentId, roots),
    role: slugAt(frontmatter, "role-slug"),
    domain: bareSlug(slugAt(frontmatter, "domain-slug")),
    persona: slugAt(frontmatter, "persona-slug"),
    mode: slugAt(frontmatter, "start-mode"),
    principal: slugAt(frontmatter, "person-slug") ?? slugAt(frontmatter, "principal-seat-name"),
    parentAgentId: parentFromFrontmatter(frontmatter),
  }
}

// A SEAT STANDING IS ANSWERED FROM AKASHA, AND ONLY A SEAT GONE IS ANSWERED FROM THE HISTORY.
// This opened the old page and read its frontmatter to decide which of the two a seat was. The
// page was never read for an attribute — `fromStanding` took the name off its path and every other
// field from readers that answer out of akasha already — so what the frontmatter read decided was
// only whether a file existed.
//
// The history stands behind akasha rather than in front of it, unchanged: a seat still standing is
// answered from what it holds now rather than from what it last committed.
export function seatWhoami(agentId: string): SeatWhoami | null {
  const seatName = seatNameForAgent(agentId)
  if (seatName !== null) return fromStanding(agentId, seatName)
  return fromHistory(agentId)
}

// The old page, then akasha, then the history. History is where a seat's attributes are read back
// from once it has stopped, so it stands behind akasha rather than in front of it: a seat still
// standing in the new system is answered from what it holds now rather than from what it last
// committed.
export function seatTitle(agentId: string): string | null {
  const held = pageTextOf(agentId, "title")
  if (held !== null) return held
  return slugAt(frontmatterFromHistory(agentId, resolveRoots()), "title")
}
