import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { akashaSeatIdForName } from "./seat-akasha-beside.ts"
import { pageFromHistory } from "./seat-page-history.ts"

const ID_KEY = "id"

export interface SeatIdentity {
  readonly id: string
}

export function seatIdentityIn(frontmatter: Record<string, unknown>): SeatIdentity | null {
  const id = frontmatter[ID_KEY]
  if (typeof id !== "string" || id === "") return null
  return { id }
}

// A SEAT STILL STANDING IS ANSWERED BY AKASHA, AND A SEAT THAT HAS STOPPED BY THE HISTORY. This
// tried each spelling the old pages were ever written under, in each place they were ever kept,
// and opened whichever file it found for the id inside. Akasha files a seat under its name and the
// index reaches the id from there.
//
// The history stays. It is what answers for a seat whose page has gone, which is the case this
// exists for: a name in an old message still resolves to whoever held it.
//
// `roots` is the history's now, akasha resolving its own.
export function seatIdentityForName(name: string, roots: Roots): SeatIdentity | null {
  const standing = akashaSeatIdForName(name)
  if (standing !== null) return { id: standing }
  const held = pageFromHistory(name, roots)?.frontmatter ?? null
  return held === null ? null : seatIdentityIn(held)
}
