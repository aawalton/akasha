import type { RowAgentLaunch } from "@akasha/seat-system/supervisor-agent-create"
import { LOG } from "@akasha/seat-system/supervisor-config"
import { AGENT_LAUNCH_OPENED, AGENT_LAUNCH_SPAWNED } from "@akasha/seat-system/supervisor-env"
import { keepSeatTranscript } from "./supervisor-heartbeat-beat.ts"
import { type CarriedAgentName, carriedForSeat } from "./supervisor-rebind-carry.ts"
import type { ClearRebindDeps } from "./supervisor-rebind-deps.ts"
import type { AgentProcess } from "./supervisor-types.ts"

export type ClearRebindHooks = {
  selectedAccount: string
  projDir: string
  getAgentId: () => string | null
  getAgentProc: () => AgentProcess | undefined
  setAgentId: (id: string) => void
  setSessionId: (id: string) => void
  applyConsoleRedirect: (id: string) => void
  startSessionWatch: (agentId: string, sessionId: string, projDir: string) => () => void
}

function reportNoSuccessor(oldAgentId: string): void {
  console.error(
    `${LOG} /clear rebind: no successor for ${oldAgentId} — its seat page was taken when it was ` +
      `stopped, so nothing stands for this seat until \`ops seat resume\` brings it back`
  )
}

export async function performClearRebind(
  sessionId: string,
  hooks: ClearRebindHooks,
  deps: ClearRebindDeps
): Promise<void> {
  const oldAgentId = hooks.getAgentId()
  if (oldAgentId == null) {
    console.warn(`${LOG} /clear rebind: no current agentId — ignoring`)
    return
  }
  console.log(`${LOG} /clear rebind: ${oldAgentId} → session=${sessionId}`)
  const oldProc = hooks.getAgentProc()
  oldProc?.stopSessionWatch?.()
  let carried: CarriedAgentName | null = null
  let predecessorLaunch: RowAgentLaunch | null = null
  let predecessorParent: string | null = null
  try {
    const predecessor = await deps.readPredecessor(oldAgentId)
    carried = carriedForSeat(oldAgentId, predecessor)
    const stated = predecessor?.launch
    predecessorLaunch =
      stated === AGENT_LAUNCH_SPAWNED || stated === AGENT_LAUNCH_OPENED ? stated : null
    predecessorParent = predecessor?.parent ?? null
  } catch (err) {
    console.error(
      `${LOG} /clear rebind: reading the predecessor ${oldAgentId} for name carry-over failed:`,
      err
    )
  }
  try {
    await deps.markStopped(oldAgentId)
  } catch (err) {
    console.error(`${LOG} /clear rebind: taking the seat page for ${oldAgentId} failed:`, err)
  }
  let newAgentId: string
  try {
    newAgentId = await deps.createSuccessor(
      hooks.selectedAccount,
      predecessorLaunch ?? AGENT_LAUNCH_OPENED,
      predecessorParent
    )
  } catch (err) {
    console.error(`${LOG} /clear rebind: createAgent failed:`, err)
    reportNoSuccessor(oldAgentId)
    return
  }
  try {
    await deps.setSessionId(newAgentId, sessionId)
  } catch (err) {
    console.error(`${LOG} /clear rebind: setSessionId(${newAgentId}) failed:`, err)
  }
  if (carried != null) {
    try {
      await deps.bindAgentName(newAgentId, carried.name, carried.title, carried.slots)
    } catch (err) {
      console.error(
        `${LOG} /clear rebind: bindAgentName(${newAgentId}, ${carried.name}) failed:`,
        err
      )
    }
  }
  hooks.setAgentId(newAgentId)
  hooks.setSessionId(sessionId)
  keepSeatTranscript(newAgentId, `${hooks.projDir}/${sessionId}.jsonl`)
  if (oldProc) {
    oldProc.agent_id = newAgentId
    oldProc.session_id = sessionId
    oldProc.stopSessionWatch = hooks.startSessionWatch(newAgentId, sessionId, hooks.projDir)
  }
  hooks.applyConsoleRedirect(newAgentId)
  console.log(`${LOG} /clear rebind complete — new agent=${newAgentId}`)
}
