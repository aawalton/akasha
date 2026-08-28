import { shape } from "./shape.ts"
import { buildReExecArgv } from "./supervisor-args.ts"
import { LOG, REPO_ROOT } from "./supervisor-config.ts"
import { ORIGINAL_ARGV, selfHealState } from "./supervisor-self-heal-state.ts"


export function resolveReExecArgv(): readonly string[] {
  const agentId = selfHealState.currentAgentIdForSelfHeal
  const sessionId = selfHealState.currentSessionIdForSelfHeal
  if (agentId == null || sessionId == null) return ORIGINAL_ARGV
  return buildReExecArgv({ originalArgv: ORIGINAL_ARGV, agentId, sessionId })
}

export function requestReExec(why: string): undefined {
  if (selfHealState.pendingReExec) return
  selfHealState.pendingReExec = true
  try {
    selfHealState.killSelf("SIGTERM")
    console.log(`${LOG} Re-exec: SIGTERM sent to self (${why})`)
  } catch (err) {
    selfHealState.pendingReExec = false
    selfHealState.reExecScheduled = false
    console.error(`${LOG} Re-exec: failed to SIGTERM self (${why}):`, err)
  }
}

export function requestSelfHealRestart(newVersion: string): undefined {
  requestReExec(`version ${newVersion}`)
}

export async function handleVersionUpdate(
  data: { liveVersion: string; deployedAt: number } | null
): Promise<undefined> {
  if (data?.liveVersion == null) return
  if (selfHealState.initialSupervisorVersion === null) {
    selfHealState.initialSupervisorVersion = data.liveVersion
    console.log(`${LOG} Supervisor version marker initialized: ${data.liveVersion}`)
    return
  }
  if (data.liveVersion === selfHealState.initialSupervisorVersion) return
  if (selfHealState.pendingReExec || selfHealState.reExecScheduled) return
  if (selfHealState.installInFlight) return
  selfHealState.installInFlight = true
  const newVersion = data.liveVersion
  console.log(
    `${LOG} New supervisor version detected: ${selfHealState.initialSupervisorVersion} -> ${newVersion}; running single-flight bun install in ${REPO_ROOT}`
  )
  try {
    const result = await selfHealState.runInstall(newVersion)
    if (!result.ok) {
      console.error(
        `${LOG} Self-heal: bun install failed; staying on current image. stderr:\n${result.stderr}`
      )
      return
    }
    selfHealState.reExecScheduled = true
    console.log(
      `${LOG} Self-heal: bun install succeeded; deferring re-exec until agent idle (or max-defer ceiling)`
    )
    const { value: windows, notice } = await selfHealState.deferredRestartRuleForSelfHeal.windows({
      maxDeferMs: shape.string().optional().parse(process.env.SUPERVISOR_REEXEC_MAX_DEFER_MS),
      staleWedgeMs: undefined,
      preCliffOverrideMs: undefined,
    })
    if (windows === null) {
      selfHealState.reExecScheduled = false
      console.error(
        `${LOG} Self-heal: re-exec NOT armed — the max-defer ceiling could not be read, so ` +
          `nothing would bound the deferral: ${notice ?? "no reason given"}`
      )
      return
    }
    selfHealState.deferredReExecGate = selfHealState.armReExecGate({
      maxDeferMs: windows.maxDeferMs,
      onIdle: async () => {
        selfHealState.deferredReExecGate = null
        const { value: delayMs } = await selfHealState.selfHealJitterRuleForSelfHeal(
          selfHealState.randomFloat(),
          shape.string().optional().parse(process.env.SUPERVISOR_REEXEC_MAX_JITTER_MS)
        )
        console.log(
          `${LOG} Self-heal: agent idle; scheduling re-exec SIGTERM in ${delayMs}ms (jitter)`
        )
        selfHealState.scheduleReExec(() => requestSelfHealRestart(newVersion), delayMs)
      },
    })
  } finally {
    selfHealState.installInFlight = false
  }
}
