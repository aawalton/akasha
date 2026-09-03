import { scanProcEntries } from "@akasha/seat-system/proc-scan"
import { seatRecord } from "@akasha/seat-system/seat-facts"
import { liveAgentPidsFromProc } from "@akasha/seat-system/seat-proc-liveness"
import { resolveSessionIdByAgentId } from "@akasha/seat-system/seat-session-resolve"
import { SEAT_START_DIR } from "@akasha/seat-system/supervisor-config"
import { ending } from "@akasha/utils-process/process-ending"
import { dataError, operationalError } from "./exit.ts"
import { decideKillTarget } from "./kill-target-plan.ts"
import { resolveSeatTarget } from "./seat-handle.ts"
import { materializeLocalTranscript } from "./transcript-materialize.ts"

export interface TakenSeat {
  readonly agentId: string
  readonly name: string | null
  readonly sessionId: string
  readonly tookOver: boolean
}

export async function resolveTakeoverTarget(target: string): Promise<string> {
  const resolved = resolveSeatTarget(target)
  if ("error" in resolved) throw dataError(resolved.error)
  return resolved.id
}

async function stopHolder(pids: readonly number[], name: string | null): Promise<boolean> {
  const outcome = await ending(pids)
  if (!outcome.asked) return false
  if (!outcome.allGone) {
    throw operationalError(
      `supervisor process(es) ${pids.join(", ")} for '${name}' did not exit within the poll ` +
        "budget — not handing off to avoid two supervisors on one session"
    )
  }
  return true
}

export async function takeoverSeat(agentId: string): Promise<TakenSeat> {
  const sess = await resolveSessionIdByAgentId(agentId)
  if ("error" in sess) throw dataError(sess.error)
  const sessionId = sess.session

  const seat = seatRecord(agentId)
  const name = seat?.name ?? null
  const livePids = liveAgentPidsFromProc(scanProcEntries().entries)
  const killTarget = decideKillTarget({
    supervisorPid: seat?.supervisorPid ?? null,
    supervisorStands: seat?.presence === "present",
    procPidsForId: livePids.get(agentId) ?? [],
    seatName: name,
    selfPid: process.pid,
  })

  const tookOver = killTarget.kind === "signal" ? await stopHolder(killTarget.pids, name) : false

  try {
    await materializeLocalTranscript({ agentId, sessionId, cwd: SEAT_START_DIR })
  } catch (err) {
    process.stderr.write(
      `no stored transcript for agent ${agentId}; the resume may fail: ` +
        `${err instanceof Error ? err.message : String(err)}\n`
    )
  }

  return { agentId, name, sessionId, tookOver }
}
