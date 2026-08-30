import { basename } from "node:path"
import { pageStemOf } from "../../page/name/name"
import { slugNamed } from "../../page/page-address.ts"
import { attributesOf, recordedModeOf } from "./attributes.ts"
import { resolveRoots } from "../../repo/roots/roots"
import { frontmatterFromHistory, nameFromHistory } from "./seat-page-history.ts"
import { principalOf, principalSeatIdOf } from "./seat-principal.ts"
import { frontmatterOf, seatIdForName, seatPageForAgent } from "./seat-presence-read.ts"

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

function fromStanding(agentId: string, page: string): SeatWhoami {
  const stated = attributesOf(agentId)
  return {
    id: agentId,
    name: pageStemOf(page),
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

export function seatWhoami(agentId: string): SeatWhoami | null {
  const page = seatPageForAgent(agentId)
  if (page !== null && frontmatterOf(page) !== null) return fromStanding(agentId, page)
  return fromHistory(agentId)
}

export function seatTitle(agentId: string): string | null {
  const page = seatPageForAgent(agentId)
  const frontmatter =
    page === null ? frontmatterFromHistory(agentId, resolveRoots()) : frontmatterOf(page)
  return slugAt(frontmatter, "title")
}
