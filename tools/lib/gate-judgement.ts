import { scanIn } from "../../page/page-types.ts"
import { AKASHA } from "../../repo/roots/roots.ts"
import { blockOf, stringAt, textAt } from "../../page/text/text.ts"
import { stemOf as slugOf } from "../../page/name/name"
import { onceInCall } from "../../during-call/during-call.ts"

export const GATE_PAGE_GLOB = "pages/gate/**/*.md"

export const JUDGES = "judges"

export type Judged = "text" | "writer"

function judgementsIn(root: string): ReadonlyMap<string, Judged> {
  const found = new Map<string, Judged>()
  for (const relPath of scanIn(root, [GATE_PAGE_GLOB], AKASHA)) {
    const text = textAt(root, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const judges = stringAt(fm, JUDGES)
    if (judges === "text" || judges === "writer") found.set(slugOf(relPath), judges)
  }
  return found
}

export function judgementByGate(root: string): ReadonlyMap<string, Judged> {
  return onceInCall(`gate-judgement:${root}`, () => judgementsIn(root))
}

export function judgesTheWriter(root: string): ReadonlySet<string> {
  const named = new Set<string>()
  for (const [name, judged] of judgementByGate(root)) if (judged === "writer") named.add(name)
  return named
}

export function standsAsideFor(root: string): ReadonlySet<string> {
  return judgesTheWriter(root)
}
