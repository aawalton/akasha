import {
  askSupervisorDecide,
  SUPERVISOR_DECIDE_COMMAND,
} from "@akasha/seat-system/supervisor-limit-resume-effects"
import { shape } from "./shape.ts"
import { LOG } from "./supervisor-config.ts"
import {
  REMOTE_CONTROL_DECISION,
  RemoteControlVerdictShape,
  readRemoteControlQuestion,
  remoteControlFallback,
  seatLabel,
} from "./supervisor-remote-control-default.ts"

const SeatSpawnAnswerShape = shape.object({
  [REMOTE_CONTROL_DECISION]: shape.tuple([RemoteControlVerdictShape]),
})

export type SeatSpawnDecisions = {
  readonly remoteControl: boolean
}

export type SeatSpawnDeps = {
  readonly ask: (stdin: string) => Promise<unknown>
}

function fallback(headless: boolean): SeatSpawnDecisions {
  return { remoteControl: remoteControlFallback(headless) }
}

export const defaultSeatSpawnDeps: SeatSpawnDeps = {
  ask: askSupervisorDecide,
}

export async function resolveSeatSpawnDecisions(
  agentId: string | null,
  opts: { headless: boolean },
  deps: SeatSpawnDeps = defaultSeatSpawnDeps
): Promise<SeatSpawnDecisions> {
  const seat = seatLabel(agentId)
  const question = readRemoteControlQuestion(opts)
  try {
    const answer = SeatSpawnAnswerShape.parse(
      await deps.ask(JSON.stringify({ [REMOTE_CONTROL_DECISION]: [{ seat, question }] }))
    )
    return { remoteControl: answer[REMOTE_CONTROL_DECISION][0].remoteControl }
  } catch (err) {
    const safe = fallback(opts.headless)
    console.warn(
      `${LOG} ${SUPERVISOR_DECIDE_COMMAND} could not be reached for ${seat}, so this spawn takes ` +
        `Remote Control ${safe.remoteControl ? "on" : "off"}:`,
      err
    )
    return safe
  }
}
