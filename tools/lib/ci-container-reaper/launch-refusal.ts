import type { Roots } from "../../../page/page"
import { describeErr } from "./ceiling.ts"
import { type CiContainer, deleteCiContainer } from "./cluster.ts"
import { decideLaunchRefusal } from "./decide.ts"
import { takeStepIfStatus } from "../take-step-status.ts"
import { LAUNCH_REFUSED_REASON, type MatchedStep } from "./pages.ts"

export interface RefusalDeps {
  readonly roots: Roots
  readonly log: (line: string) => void
  readonly signal: AbortSignal
}

export async function markLaunchRefusals(
  deps: RefusalDeps,
  containers: readonly CiContainer[],
  stepByContainer: ReadonlyMap<string, MatchedStep>
): Promise<number> {
  const husks: string[] = []
  let refused = 0
  for (const container of containers) {
    const step = stepByContainer.get(container.name)
    if (step === undefined) continue
    const decision = decideLaunchRefusal({
      stepStatus: step.status,
      phase: container.phase,
      containerReason: container.reason,
    })
    if (!decision.mark) continue
    try {
      const marked = takeStepIfStatus(deps.roots, step.seq, "launching", {
        [LAUNCH_REFUSED_REASON]: decision.reason,
      })
      if (!marked) continue
      refused += 1
      husks.push(container.name)
      deps.log(
        `launch-refused step=${step.seq} container=${container.name} reason=${decision.reason}`
      )
    } catch (err) {
      deps.log(`launch-refused mark failed step=${step.seq} err=${describeErr(err)}`)
    }
    deps.signal.throwIfAborted()
  }

  if (husks.length === 0) return refused
  deps.signal.throwIfAborted()
  const removed = await Promise.allSettled(husks.map((name) => deleteCiContainer(name)))
  for (let i = 0; i < husks.length; i += 1) {
    const one = removed[i]
    const name = husks[i]
    if (one === undefined || name === undefined) continue
    if (one.status === "rejected") {
      deps.log(`husk delete failed container=${name} err=${describeErr(one.reason)}`)
    }
  }
  return refused
}
