import { namedIn } from "../../akasha/pages-system/page/page-file-name/page-file-name.module.code.ts"
import { textAt, valueAt } from "../../akasha/pages-system/page/page-value/page-value.module.code.ts"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Outcome } from "./gated-write.ts"
import { seatNameForAgent } from "./seat-presence-read.ts"
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

function namedAt(absolute: string): string {
  const named = namedIn(absolute)
  return named === null ? absolute : named.stem
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
