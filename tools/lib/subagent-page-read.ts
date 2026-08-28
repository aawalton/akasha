/**
 * Where a subagent's page stands, and which stand under a seat.
 *
 * SEPARATE FROM THE FILE THAT WRITES THEM, AND THAT SEPARATION IS THE WHOLE POINT OF THIS FILE.
 * Reading a subagent's turn state asks only whether its page is there — `subagent-turn.ts` calls
 * `subagentPagePathFor` and `existsSync` and nothing else. While that answer sat beside
 * `writeSubagentPage`, asking it loaded `gated-write.ts`, which spawns `ops write` in a subprocess,
 * reads `import.meta.dir` at module scope and calls `Bun.spawnSync`. So a read pulled in the write
 * path, and the write path pinned the runtime to bun: the editor's extension host is node, where
 * `import.meta.dir` is undefined and the whole chain threw at load. That is
 * `pages/finding/agent-harness/a-seat-turn-read-is-pinned-to-bun-by-the-writer-it-reaches.finding.md`.
 *
 * NOTHING HERE WRITES, and nothing here may. A function added below that lands a page would put the
 * writer back on the read path without anyone noticing, because the import that carries it is one
 * line in a file whose name says it reads.
 */

import { existsSync, readdirSync } from "node:fs"
import { dirsOfPlaces, rootOfPlace, SUBAGENT_PLACES, SUBAGENT_WRITE } from "./agent-page-place.ts"
import { seatNameForAgent } from "./seat-presence-read.ts"
import { SUBAGENT_MARK, seatAbove, subagentUnder } from "./subagent.ts"

export const SUBAGENT_PAGE_TYPE = "subagent"

export const SUBAGENT_PAGE_SUFFIX = ".md"

/** The name of the seat a subagent runs under, or null where the id names no subagent. */
export function subagentSeatName(agent: string): string | null {
  const seat = seatAbove(agent)
  return seat === null ? null : seatNameForAgent(seat)
}

export function subagentPageRelPath(seatName: string, own: string): string {
  return `${SUBAGENT_WRITE.dir}/${seatName}${SUBAGENT_MARK}${own}.${SUBAGENT_PAGE_TYPE}${SUBAGENT_PAGE_SUFFIX}`
}

function spellingsOf(seatName: string, own: string): readonly string[] {
  const stem = `${seatName}${SUBAGENT_MARK}${own}`
  return [`${stem}.${SUBAGENT_PAGE_TYPE}${SUBAGENT_PAGE_SUFFIX}`, `${stem}${SUBAGENT_PAGE_SUFFIX}`]
}

export function subagentPagePathFor(agent: string): string | null {
  const own = subagentUnder(agent)
  const seatName = subagentSeatName(agent)
  if (own === null || seatName === null) return null
  for (const dir of dirsOfPlaces(SUBAGENT_PLACES)) {
    for (const name of spellingsOf(seatName, own)) {
      const at = `${dir}/${name}`
      if (existsSync(at)) return at
    }
  }
  const root = rootOfPlace(SUBAGENT_WRITE)
  return root === null ? null : `${root}/${subagentPageRelPath(seatName, own)}`
}

export function standingPagePathsOf(seatName: string): readonly string[] {
  const mark = `${seatName}${SUBAGENT_MARK}`
  const found: string[] = []
  for (const dir of dirsOfPlaces(SUBAGENT_PLACES)) {
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) {
      if (name.startsWith(mark) && name.endsWith(SUBAGENT_PAGE_SUFFIX)) found.push(`${dir}/${name}`)
    }
  }
  return found
}
