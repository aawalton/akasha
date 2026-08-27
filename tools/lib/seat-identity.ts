
import { dirsOfPlaces, SEAT_PLACES } from "./agent-page-place.ts"
import type { Roots } from "../../page/page"
import { pageFromHistory } from "./seat-page-history.ts"
import { frontmatterOf } from "./seat-presence-read.ts"

const PAGE_SUFFIX = ".md"

const ID_KEY = "id"

export interface SeatIdentity {
  readonly id: string
}

export function seatIdentityIn(frontmatter: Record<string, unknown>): SeatIdentity | null {
  const id = frontmatter[ID_KEY]
  if (typeof id !== "string" || id === "") return null
  return { id }
}

const PAGE_TYPE = "seat"

function spellingsOf(name: string, roots: Roots): readonly string[] {
  return dirsOfPlaces(SEAT_PLACES, roots).flatMap((dir) => [
    `${dir}/${name}.${PAGE_TYPE}${PAGE_SUFFIX}`,
    `${dir}/${name}${PAGE_SUFFIX}`,
  ])
}

export function seatIdentityForName(name: string, roots: Roots): SeatIdentity | null {
  let standing: Record<string, unknown> | null = null
  for (const at of spellingsOf(name, roots)) {
    standing = frontmatterOf(at)
    if (standing !== null) break
  }
  const held = standing ?? pageFromHistory(name, roots)?.frontmatter ?? null
  return held === null ? null : seatIdentityIn(held)
}
