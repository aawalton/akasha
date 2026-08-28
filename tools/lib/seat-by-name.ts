import { frontmatterOf, seatPagePaths, seatPresence } from "./seat-presence-read.ts"
import type { SeatPresence } from "./seat-proc-key.ts"

const TITLE = "title"

const ID = "id"

export interface SeatByName {
  readonly id: string
  readonly name: string
  readonly presence: SeatPresence
}

function textAt(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  return typeof held === "string" && held !== "" ? held : null
}

export function seatByName(name: string): SeatByName | null {
  for (const page of seatPagePaths()) {
    const frontmatter = frontmatterOf(page)
    if (frontmatter === null || textAt(frontmatter, TITLE) !== name) continue
    return { id: textAt(frontmatter, ID) ?? "", name, presence: seatPresence(page) }
  }
  return null
}
