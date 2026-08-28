
import { readFileSync } from "node:fs"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { placeDirOf } from "../../page/page-types.ts"
import { pageFileIn } from "../../page/page-file.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"
import type { SeatTurnState } from "./seat-turn-state.ts"

const DRAWN_AS: Record<SeatTurnState, string> = {
  working: "agent-turn-working",
  "idle-pending": "agent-turn-idle-pending",
  idle: "agent-turn-idle",
  "idle-on-call": "agent-turn-idle-on-call",
  stopped: "agent-turn-stopped",
}

export function stateStandsAs(state: SeatTurnState): string {
  return DRAWN_AS[state]
}

/**
 * The color a domain states, read from the akasha checkout its page stands in.
 *
 * THE ROOT IS AKASHA BECAUSE THE PAGE IS. Domain pages are akasha's, and a root naming any other
 * repository finds no file and answers null. Every caller reads null as "this state is drawn in
 * no color" and draws at the default, so a wrong root takes the color off every tab in the strip
 * and every row on the trees while nothing on screen says why.
 */
export function colorStatedOn(akasha: string, slug: string): string | null {
  let body: string
  try {
    const at = placeDirOf("domain")
    body = readFileSync(`${akasha}/${pageFileIn(akasha, at, slug) ?? `${at}/${slug}.md`}`, "utf8")
  } catch {
    return null
  }
  return textField(parseFrontmatter(body), "color-slug")
}

export function colorOfState(state: SeatTurnState, akasha?: string): string | null {
  const where = akasha ?? akashaRoot()
  return colorStatedOn(where, DRAWN_AS[state])
}
