import { readFileSync } from "node:fs"
import { parseFrontmatter, textField } from "@akasha/markdown-pages/frontmatter"
import { pageFileIn } from "@akasha/markdown-pages/page-file"
import { placeDirOf } from "@akasha/markdown-pages/page-types"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import type { SeatTurnState } from "./seat-turn-state.ts"

const DRAWN_AS: Record<SeatTurnState, string> = {
  working: "agent-turn-working",
  "idle-pending": "agent-turn-idle-pending",
  idle: "agent-turn-idle",
  stopped: "agent-turn-stopped",
}

export function stateStandsAs(state: SeatTurnState): string {
  return DRAWN_AS[state]
}

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
