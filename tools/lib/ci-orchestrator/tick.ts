import type { Roots } from "../../../page/page"
import { resolveBranchFailures } from "./branch-resolution.ts"
import { ceilingIn } from "./ceiling.ts"
import { loadDesiredPipelines } from "./desired-pipelines.ts"
import { LOG } from "./log.ts"

export const TICK_MS = 60_000

export const TICK_CEILING_MS = 300_000

const READING = "reading which pipelines have not reached a verdict"

export function runBoundedOrchestratorTick(roots: Roots): void {
  const ceiling = ceilingIn(TICK_CEILING_MS)

  const desired = loadDesiredPipelines(roots)
  console.log(`${LOG} pipelines owed=${desired.seqs.size} healing=${desired.healing.length}`)
  for (const one of desired.healing) {
    console.log(
      `${LOG} healing seq=${one.seq} status=${one.status ?? "unstated"} ` +
        "reason=non-terminal-descendants"
    )
  }
  if (ceiling.reached()) throw ceiling.refuse(READING)

  const resolved = resolveBranchFailures(roots, ceiling)
  console.log(
    `${LOG} branch resolution scanned=${resolved.scanned} answered=${resolved.answered} ` +
      `errors=${resolved.errors}`
  )
  if (resolved.scanned > 0 && resolved.errors === resolved.scanned) {
    throw new Error(
      `${LOG} tick: every one of the ${resolved.scanned} pipelines it tried to answer failed — ` +
        "see prior errors"
    )
  }
}
