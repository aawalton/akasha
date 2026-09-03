import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Outcome } from "../../akasha/command-system/gated-write/gated-write.module.code.ts"
import { partedIn } from "../../akasha/pages-system/pages/file-name/page-file-name.module.code.ts"
import { textAt, valueAt } from "../../akasha/pages-system/pages/value/page-value.module.code.ts"
import { seatNameForAgent } from "../../akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import type { StandingSubagent } from "./subagent-guard.ts"
import { removeAkashaSubagentPagesOf } from "./subagent-page-akasha.ts"
import { standingPagePathsOf } from "./subagent-page-read.ts"

const KIND = "dispatchedAs"

const UNSTATED = "unstated"

export function removeSubagentPagesOf(seat: string, why: string): Outcome {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return { kind: "unchanged" }
  return removeAkashaSubagentPagesOf(seatName, why)
}

// `namedIn` went at cc5d6552f9 and this call went with it unrepaired. What it answered here was
// its `stem`, which for a path carrying no section beyond the page type is the page's slug — and
// every path reaching this is a `.subagent.ts` page file, which carries none.
function namedAt(absolute: string): string {
  const said = partedIn(absolute)
  return said === null ? absolute : said.slug
}

function kindAt(absolute: string, root: string): string {
  const value = valueAt(absolute, root)
  const stated = value === null ? null : textAt(value, KIND)
  return stated === null || stated === "" ? UNSTATED : stated
}

export function standingSubagentsOf(seat: string): readonly StandingSubagent[] {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return []
  const root = rootFor(resolveRoots(), AKASHA)
  return standingPagePathsOf(seatName).map((absolute) => ({
    name: namedAt(absolute),
    dispatchedAs: kindAt(absolute, root),
  }))
}
