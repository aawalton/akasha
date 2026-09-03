import { ending } from "@akasha/utils-process/process-ending"
import { liveAgentPidsFromProc } from "./decide-proc-liveness.ts"
import { inputError } from "./exit.ts"
import { decideKillTarget } from "./kill-target-plan.ts"
import { killSeatSession } from "./launch-seat-tmux.ts"
import { scanProcEntries } from "./proc-scan.ts"
import { seatRecord } from "./seat-facts.ts"
import { removeSeatPage } from "./seat-page.ts"
import { decideSubagentGuard } from "./subagent-guard.ts"
import { removeSubagentPagesOf, standingSubagentsOf } from "./subagent-page.ts"

export const SEAT_STOP_STATUSES = ["stopped", "already-exited", "reconciled"] as const

export type SeatStopStatus = (typeof SEAT_STOP_STATUSES)[number]

export interface SeatStopSaying {
  readonly acting: string
  readonly ended: string
  readonly took: string
}

export const A_STOP: SeatStopSaying = {
  acting: "Stopping",
  ended: "was stopped",
  took: "a deliberate stop",
}

export const A_RESET: SeatStopSaying = {
  acting: "Resetting",
  ended: "was reset",
  took: "a reset",
}

export interface StopSeatInput {
  readonly agentId: string
  readonly force: boolean
  readonly saying: SeatStopSaying
}

export interface SeatStopped {
  readonly agentId: string
  readonly name: string | null
  readonly pid: number | null
  readonly signaled: boolean
  readonly status: SeatStopStatus
}

export async function stopSeat(input: StopSeatInput): Promise<SeatStopped> {
  const { agentId, force, saying } = input
  const seat = seatRecord(agentId)
  const name = seat?.name ?? null

  const guard = decideSubagentGuard({
    standing: standingSubagentsOf(agentId),
    targetLive: seat !== null && seat.presence !== "absent",
    force,
    seatName: name ?? agentId,
    act: saying.acting,
  })
  if (guard.kind === "reject") throw inputError(guard.reason)

  removeSubagentPagesOf(agentId, saying.ended)

  const livePids = liveAgentPidsFromProc(scanProcEntries().entries)
  const target = decideKillTarget({
    supervisorPid: seat?.supervisorPid ?? null,
    supervisorStands: seat?.presence === "present",
    procPidsForId: livePids.get(agentId) ?? [],
    seatName: name,
    selfPid: process.pid,
  })
  switch (target.kind) {
    case "signal": {
      const outcome = await ending(target.pids)
      if (outcome.allGone) removeSeatPage(agentId, `${saying.took} reached it`)
      return {
        agentId,
        name,
        pid: target.pids[0] ?? null,
        signaled: outcome.asked,
        status: "stopped",
      }
    }
    case "session": {
      const ended = await killSeatSession(target.name)
      removeSeatPage(
        agentId,
        ended ? `${saying.took} ended its session` : "no session stood for it"
      )
      return {
        agentId,
        name,
        pid: null,
        signaled: ended,
        status: ended ? "stopped" : "already-exited",
      }
    }
    case "reconcile":
      removeSeatPage(agentId, "no live supervisor stood for it")
      return { agentId, name, pid: null, signaled: false, status: "reconciled" }
  }
}
