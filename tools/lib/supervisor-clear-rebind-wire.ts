
import { rotatedOf } from "./seat-rotated-session.ts"
import { claimSeatSupervision } from "./seat-supervisor-claim.ts"
import type { buildAgentLogRedirect } from "./supervisor-console.ts"
import { clearSeatRotation } from "./supervisor-heartbeat-beat.ts"
import { type ClearRebindHooks, performClearRebind } from "./supervisor-rebind.ts"
import { watchSeatRotation } from "./supervisor-rotation-watch"
import type { ClearRebindDeps } from "./supervisor-rebind-deps.ts"
import { setCurrentAgentIdForSelfHeal, setCurrentSessionIdForSelfHeal } from "./supervisor-self-heal-state"
import type { AgentIdHandle } from "./supervisor-self-identity.ts"
import { setRestoreConsoleHandle } from "./supervisor-state.ts"
import type { AgentProcess } from "./supervisor-types.ts"

export function wireSessionRotatedWatcher(args: {
  selectedAccount: string
  projDir: string
  deferredRestart: { cancel: (() => void) | null }
  agentIdHandle: AgentIdHandle
  agentLog: ReturnType<typeof buildAgentLogRedirect>
  getAgentId: () => string | null
  getAgentProc: () => AgentProcess | undefined
  setLoopAgentId: (id: string) => void
  setLoopSessionId: (id: string) => void
  deps: ClearRebindDeps
  startSessionWatch: ClearRebindHooks["startSessionWatch"]
}): () => void {
  const claimRotation = (): string | null => {
    const live = args.getAgentId()
    if (live === null) return null
    const stated = rotatedOf(live)
    if (stated === null) return null
    clearSeatRotation(live)
    return stated.value
  }
  return watchSeatRotation(claimRotation, (sessionId) => {
    args.deferredRestart.cancel?.()
    args.deferredRestart.cancel = null
    return performClearRebind(
      sessionId,
      {
        selectedAccount: args.selectedAccount,
        projDir: args.projDir,
        getAgentId: args.getAgentId,
        getAgentProc: args.getAgentProc,
        setAgentId: (id) => {
          args.setLoopAgentId(id)
          args.agentIdHandle.bind(id)
          setCurrentAgentIdForSelfHeal(id)
        },
        setSessionId: (id) => {
          args.setLoopSessionId(id)
          setCurrentSessionIdForSelfHeal(id)
          claimSeatSupervision(args.getAgentId())
        },
        applyConsoleRedirect: (id) => setRestoreConsoleHandle(args.agentLog.redirectTo(id)),
        startSessionWatch: args.startSessionWatch,
      },
      args.deps
    )
  })
}
