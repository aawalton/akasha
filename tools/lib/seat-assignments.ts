
import type { Roots } from "../../page/page"
import { initiativeFinishedIn } from "./seat-sweep.ts"
import { statedOf } from "./seat-stated.ts"

export interface SeatAssignments {
  readonly onCall: boolean
  readonly dispatched: readonly string[]
  readonly handedBack: boolean
}

export function seatAssignments(agent: string, roots: Roots): SeatAssignments {
  const stated = statedOf(agent)
  const initiative = stated.initiative
  const handedBack =
    initiative !== null && initiativeFinishedIn(roots.memory)(initiative.value)

  const named = [
    stated.task === null ? null : `task ${stated.task.value}`,
    initiative === null ? null : `initiative ${initiative.value}`,
  ]
  return {
    onCall: stated.onCall,
    dispatched: handedBack ? [] : named.filter((one): one is string => one !== null),
    handedBack,
  }
}
