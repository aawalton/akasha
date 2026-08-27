import { patchUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { resolveRoots } from "../../repo/roots/roots"
import { nameFromHistory, parentFromHistory } from "./seat-page-history.ts"
import { writeSeatPage } from "./seat-page.ts"
import { seatPageDestination } from "./seat-presence-read.ts"
import { rotatedOf } from "./seat-rotated-session.ts"
import { sessionRecordOf } from "./seat-session.ts"
import { type Stated, fallBackToHistory, statedOf } from "./seat-stated.ts"
import { transcriptRecordOf } from "./seat-transcript-path.ts"
import {
  getCurrentAgentIdForSelfHeal,
  getCurrentSessionIdForSelfHeal,
} from "./supervisor-self-heal-state.ts"
import { formatSeatProcKey, readSeatProcKey } from "./seat-proc-key.ts"
import { composedNameOf } from "./seat-rename.ts"
import { LOG } from "./supervisor-config.ts"

export function writeSeatProcessKey(seatName: string, supervisorPid: number): void {
  const key = readSeatProcKey(supervisorPid)
  if (key === null) return
  try {
    patchUncommitted(seatPageDestination(seatName), { "supervisor-process": formatSeatProcKey(key) })
  } catch (err) {
    console.error(`${LOG} heartbeat: writing the seat process key failed for ${seatName}:`, err)
  }
}

export function statedForPage(agentId: string, account: string | null = null): Stated {
  const read = statedOf(agentId)
  const stood = account === null ? read : { ...read, registration: { value: account } }
  if (getCurrentAgentIdForSelfHeal() !== agentId) return stood
  const running = sessionRecordOf(getCurrentSessionIdForSelfHeal())
  return running === null ? stood : { ...stood, session: running }
}

export function keepSeatSession(agentId: string, sessionId: string): void {
  const running = sessionRecordOf(sessionId)
  if (running === null) return
  const seatName = composedNameOf(agentId) ?? nameFromHistory(agentId, resolveRoots())
  if (seatName === null) return
  try {
    const outcome = writeSeatPage({ ...statedOf(agentId), session: running }, seatName)
    if (outcome.kind === "refused") {
      console.error(`${LOG} the session did not reach ${seatName}: ${outcome.detail}`)
    }
  } catch (err) {
    console.error(`${LOG} writing the session to ${seatName} threw:`, err)
  }
}

export function keepSeatTranscript(agentId: string, transcriptPath: string): void {
  const watching = transcriptRecordOf(transcriptPath)
  if (watching === null) return
  const seatName = composedNameOf(agentId) ?? nameFromHistory(agentId, resolveRoots())
  if (seatName === null) return
  try {
    const outcome = writeSeatPage({ ...statedOf(agentId), transcript: watching }, seatName)
    if (outcome.kind === "refused") {
      console.error(`${LOG} the transcript path did not reach ${seatName}: ${outcome.detail}`)
    }
  } catch (err) {
    console.error(`${LOG} writing the transcript path to ${seatName} threw:`, err)
  }
}

export function clearSeatRotation(agentId: string): void {
  if (rotatedOf(agentId) === null) return
  const seatName = composedNameOf(agentId) ?? nameFromHistory(agentId, resolveRoots())
  if (seatName === null) return
  try {
    const outcome = writeSeatPage({ ...statedOf(agentId), rotated: null }, seatName)
    if (outcome.kind === "refused") {
      console.error(`${LOG} the rotation was not cleared from ${seatName}: ${outcome.detail}`)
    }
  } catch (err) {
    console.error(`${LOG} clearing the rotation from ${seatName} threw:`, err)
  }
}

export async function keepSeatPage(
  agentId: string,
  seatName: string,
  account: string | null = null
): Promise<void> {
  try {
    const stated = fallBackToHistory(statedForPage(agentId, account), seatName, resolveRoots())
    const outcome = writeSeatPage(stated, seatName)
    if (outcome.kind === "refused") {
      console.error(`${LOG} heartbeat: writing the seat page failed for ${seatName}: ${outcome.detail}`)
      return
    }
    if (outcome.kind !== "unstated") return
    const above = parentFromHistory(agentId, resolveRoots())
    if (above === null) return
    const again = writeSeatPage(stated, seatName, above)
    if (again.kind === "refused") {
      console.error(`${LOG} heartbeat: writing the seat page failed for ${seatName}: ${again.detail}`)
    }
  } catch (err) {
    console.error(`${LOG} heartbeat: writing the seat page threw for ${seatName}:`, err)
  }
}

export async function recordHeartbeat(
  agentId: string,
  account: string | null = null
): Promise<void> {
  const seatName = composedNameOf(agentId) ?? nameFromHistory(agentId, resolveRoots())
  if (seatName === null) return
  writeSeatProcessKey(seatName, process.pid)
  await keepSeatPage(agentId, seatName, account)
}
