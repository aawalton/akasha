import { LOG } from "@akasha/seat-system/supervisor-config"
import { agentHolderProcess } from "./seat-presence-read.ts"
import {
  formatSeatProcKey,
  parseSeatProcKey,
  readSeatProcKey,
  type SeatPresence,
  statedProcessPresence,
} from "./seat-proc-key.ts"

export interface SeatSupervisionInput {
  readonly holderProcess: string | null
  readonly holderPresence: SeatPresence
  readonly selfProcess: string
}

export type SeatSupervisionVerdict =
  | { readonly kind: "unheld" }
  | { readonly kind: "held-by-self" }
  | { readonly kind: "took-over"; readonly goneProcess: string }
  | {
      readonly kind: "refuse"
      readonly holderProcess: string
      readonly holderPresence: SeatPresence
    }

export function decideSeatSupervision(input: SeatSupervisionInput): SeatSupervisionVerdict {
  const { holderProcess, holderPresence, selfProcess } = input
  if (holderProcess === null) return { kind: "unheld" }
  if (holderProcess === selfProcess) return { kind: "held-by-self" }
  if (holderPresence === "absent") return { kind: "took-over", goneProcess: holderProcess }
  return { kind: "refuse", holderProcess, holderPresence }
}

export class SeatSupervisionCollisionError extends Error {
  readonly agentId: string
  readonly holderProcess: string
  readonly holderPid: number | null

  constructor(agentId: string, holderProcess: string, holderPresence: SeatPresence) {
    const pid = parseSeatProcKey(holderProcess)?.pid ?? null
    super(
      `refusing to supervise agent ${agentId}: its seat page states supervisor-process ` +
        `${holderProcess}, which /proc reads as ${holderPresence}. ` +
        (pid === null
          ? "That is not a process key this can parse, so nothing here can say the process it " +
            "names has gone, and supervising anyway would put two supervisors on one seat."
          : `Kill pid ${pid} first — it is the process that started when that key was written, ` +
            "not merely whatever holds that pid now.")
    )
    this.name = "SeatSupervisionCollisionError"
    this.agentId = agentId
    this.holderProcess = holderProcess
    this.holderPid = pid
  }
}

function selfProcessOrRefuse(): string {
  const key = readSeatProcKey(process.pid)
  if (key === null) {
    throw new Error(
      `refusing to supervise from pid ${process.pid}: /proc states no start time for it, so ` +
        "nothing could tell this process from the next one to take that pid"
    )
  }
  return formatSeatProcKey(key)
}

export function claimSeatSupervision(agentId: string | null): undefined {
  if (agentId === null) return
  const holderProcess = agentHolderProcess(agentId)
  const verdict = decideSeatSupervision({
    holderProcess,
    holderPresence: statedProcessPresence(holderProcess),
    selfProcess: selfProcessOrRefuse(),
  })
  if (verdict.kind === "refuse") {
    const err = new SeatSupervisionCollisionError(
      agentId,
      verdict.holderProcess,
      verdict.holderPresence
    )
    console.error(`${LOG} ${err.message}`)
    throw err
  }
  if (verdict.kind === "took-over") {
    console.log(
      `${LOG} seat-supervision: agent=${agentId} was held by ${verdict.goneProcess}, which /proc ` +
        "no longer stands for; taking it over"
    )
  }
}
