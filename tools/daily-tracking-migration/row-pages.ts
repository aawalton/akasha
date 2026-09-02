/**
 * The seam: the other shape a session or a completed task could take.
 *
 * The converter's settled arm keeps the 780 session rows and the 1028 task rows as
 * `page-property-entry` values beside the day page, because that page type and its read path are
 * both landed under `akasha/pages-system/`. This file holds the arm that is not settled — one page
 * per row, which is what `tools/daily-tracking-fidelity/read-corpus.ts:155` assumes when it walks a
 * migrated corpus looking for `tracking-session` and `completed-task` page types.
 *
 * It exists so the two shapes can be measured against each other with the one checker rather than
 * argued about. Nothing here is the recommendation.
 */

import type { Converted, JsonObject } from "./convert.ts"
import { exportNameOf } from "./convert.ts"
import { DAY_REFERENCE_KEY, SESSIONS_SLUG } from "./shape.ts"

export const SESSION_PAGE_TYPE = "tracking-session"

export const TASK_PAGE_TYPE = "completed-task"

export type RowPage = {
  readonly name: string
  readonly text: string
}

function render(exportName: string, value: Record<string, unknown>): string {
  const lines = [`export const ${exportName} = {`]
  for (const [key, held] of Object.entries(value)) lines.push(`  ${key}: ${JSON.stringify(held)},`)
  lines.push("} as const", "")
  return lines.join("\n")
}

/**
 * Every row of a converted day as a page of its own.
 *
 * `ordinal` says whether each session page states the position it held in its file. A session row
 * carries no ordering field of any kind, and file order is real: nothing rebuilds it from
 * `start-time` because two rows share one exactly. So a page-per-row shape must state an ordinal or
 * lose that order — and the checker's session ledger declares no key for one, so the ordinal it
 * needs is a key it will not judge. That is the measurement this arm exists to take.
 */
export function rowPagesOf(one: Converted, ordinal: boolean): readonly RowPage[] {
  const out: RowPage[] = []
  for (const file of one.entries) {
    const sessions = file.name.includes(`.${SESSIONS_SLUG}.`)
    const pageType = sessions ? SESSION_PAGE_TYPE : TASK_PAGE_TYPE
    const lines = file.text.split("\n").filter((line) => line.trim() !== "")
    lines.forEach((line, index) => {
      const row = JSON.parse(line) as JsonObject
      const id = String(row["id"] ?? `${one.day}-${index}`)
      const slug = `${sessions ? "session" : "task"}-${id}`
      // The row's keys are camel already: the converter keys every row the way akasha reads one.
      const value: Record<string, unknown> = { ...row }
      value["id"] = id
      value["pageTypeSlug"] = pageType
      value["slug"] = slug
      value[exportNameOf(DAY_REFERENCE_KEY)] = one.idIs
      if (sessions && ordinal) value["seq"] = index
      out.push({ name: `${slug}.${pageType}.ts`, text: render(exportNameOf(slug), value) })
    })
  }
  return out
}
