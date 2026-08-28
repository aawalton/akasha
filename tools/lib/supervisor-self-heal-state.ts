import { LOG } from "./supervisor-config.ts"
import { armDeferredRestart } from "./supervisor-deferred-restart.ts"
import type { DeferredRestartRuleSource } from "./supervisor-deferred-restart-rule.ts"
import { isProcessAlive } from "./supervisor-exec.ts"
import { liveIdleRule } from "./supervisor-idle-rule.ts"
import { getInheritedClaude } from "./supervisor-state.ts"
import { defaultRunInstall, type SelfHealRunInstall } from "./supervisor-self-heal-install.ts"
import { reExecAsked, takeReExecAsk } from "./supervisor-reexec-mark.ts"
import type { SelfHealJitterRuleSource } from "./supervisor-self-heal-jitter-rule.ts"

export function inheritedClaudePid(): number | null {
  const inherited = getInheritedClaude()
  if (inherited === null) return null
  return isProcessAlive(inherited.pid) ? inherited.pid : null
}

export const SUPERVISOR_SCRIPT = process.argv[1] ?? ""
export const ORIGINAL_ARGV = process.argv.slice(2)

function refuseUnwiredSelfHealRule(which: string): never {
  throw new Error(
    `supervisor-self-heal: the ${which} was reached before \`setSelfHealIdleProbe\` wired one. ` +
      "Either this path should not be deciding, or the composition root has not run — a " +
      "supervisor that guessed a re-exec window here would act on the fleet with confidence " +
      "it had not earned."
  )
}

const UNWIRED_DEFERRED_RESTART_RULE: DeferredRestartRuleSource = {
  constants: () => refuseUnwiredSelfHealRule("deferred-restart rule"),
  decide: () => refuseUnwiredSelfHealRule("deferred-restart rule"),
  windows: () => refuseUnwiredSelfHealRule("deferred-restart rule"),
}

export type ArmReExecGate = (opts: { onIdle: () => void; maxDeferMs: number }) => {
  cancel: () => void
}

const defaultArmReExecGate: ArmReExecGate = (opts) =>
  armDeferredRestart({
    getClaudePid: selfHealState.getClaudePidForSelfHeal,
    getProxyPort: selfHealState.getProxyPortForSelfHeal,
    getAgentId: () => selfHealState.currentAgentIdForSelfHeal,
    onIdle: opts.onIdle,
    idleRule: liveIdleRule,
    deferredRestartRule: selfHealState.deferredRestartRuleForSelfHeal,
    maxDeferMs: opts.maxDeferMs,
    log: (line) => console.log(`${LOG} Self-heal ${line}`),
  })

const defaultScheduleReExec: (cb: () => void, delayMs: number) => void = (cb, delayMs) => {
  setTimeout(cb, delayMs)
}

export const selfHealState: {
  pendingReExec: boolean
  reExecScheduled: boolean
  installInFlight: boolean
  initialSupervisorVersion: string | null
  currentAgentIdForSelfHeal: string | null
  currentSessionIdForSelfHeal: string | null
  proxyOwnerAgentIdForSelfHeal: string | null
  unsubVersion: (() => void) | null
  getClaudePidForSelfHeal: () => number | null
  getProxyPortForSelfHeal: () => number | null
  deferredReExecGate: { cancel: () => void } | null
  selfHealJitterRuleForSelfHeal: SelfHealJitterRuleSource
  deferredRestartRuleForSelfHeal: DeferredRestartRuleSource
  armReExecGate: ArmReExecGate
  killSelf: (signal: NodeJS.Signals) => boolean
  scheduleReExec: (cb: () => void, delayMs: number) => void
  randomFloat: () => number
  runInstall: SelfHealRunInstall
} = {
  pendingReExec: false,
  reExecScheduled: false,
  installInFlight: false,
  initialSupervisorVersion: null,
  currentAgentIdForSelfHeal: null,
  currentSessionIdForSelfHeal: null,
  proxyOwnerAgentIdForSelfHeal: null,
  unsubVersion: null,
  getClaudePidForSelfHeal: inheritedClaudePid,
  getProxyPortForSelfHeal: () => null,
  deferredReExecGate: null,
  selfHealJitterRuleForSelfHeal: () => refuseUnwiredSelfHealRule("self-heal jitter rule"),
  deferredRestartRuleForSelfHeal: UNWIRED_DEFERRED_RESTART_RULE,
  armReExecGate: defaultArmReExecGate,
  killSelf: (sig) => process.kill(process.pid, sig),
  scheduleReExec: defaultScheduleReExec,
  randomFloat: Math.random,
  runInstall: defaultRunInstall,
}

export function isPendingReExec(): boolean {
  return selfHealState.pendingReExec || reExecAsked(selfHealState.currentAgentIdForSelfHeal)
}

export function setCurrentAgentIdForSelfHeal(agentId: string | null): undefined {
  selfHealState.currentAgentIdForSelfHeal = agentId
  takeReExecAsk(agentId)
}

export function getCurrentAgentIdForSelfHeal(): string | null {
  return selfHealState.currentAgentIdForSelfHeal
}

export function setCurrentSessionIdForSelfHeal(sessionId: string | null): undefined {
  selfHealState.currentSessionIdForSelfHeal = sessionId
}

export function getCurrentSessionIdForSelfHeal(): string | null {
  return selfHealState.currentSessionIdForSelfHeal
}

export function setProxyOwnerAgentIdForSelfHeal(agentId: string | null): undefined {
  selfHealState.proxyOwnerAgentIdForSelfHeal = agentId
}

export function getProxyOwnerAgentIdForSelfHeal(): string | null {
  return selfHealState.proxyOwnerAgentIdForSelfHeal
}

export function setUnsubVersion(unsub: (() => void) | null): undefined {
  selfHealState.unsubVersion = unsub
}

export function setSelfHealIdleProbe(opts: {
  getClaudePid: () => number | null
  getProxyPort: () => number | null
  selfHealJitterRule: SelfHealJitterRuleSource
  deferredRestartRule: DeferredRestartRuleSource
}): undefined {
  selfHealState.getClaudePidForSelfHeal = opts.getClaudePid
  selfHealState.getProxyPortForSelfHeal = opts.getProxyPort
  selfHealState.selfHealJitterRuleForSelfHeal = opts.selfHealJitterRule
  selfHealState.deferredRestartRuleForSelfHeal = opts.deferredRestartRule
}

export function teardownVersionSubscription(): undefined {
  if (selfHealState.unsubVersion) {
    try {
      selfHealState.unsubVersion()
    } catch {}
    selfHealState.unsubVersion = null
  }
}

export function _setKillSelfForTesting(fn: (signal: NodeJS.Signals) => boolean): undefined {
  selfHealState.killSelf = fn
}

export function _setRunInstallForTesting(fn: SelfHealRunInstall): undefined {
  selfHealState.runInstall = fn
}

export function _setScheduleReExecForTesting(
  fn: (cb: () => void, delayMs: number) => void
): undefined {
  selfHealState.scheduleReExec = fn
}

export function _setRandomFloatForTesting(fn: () => number): undefined {
  selfHealState.randomFloat = fn
}

export function _setArmReExecGateForTesting(fn: ArmReExecGate): undefined {
  selfHealState.armReExecGate = fn
}

export function _setSelfHealRuleSourcesForTesting(sources: {
  selfHealJitterRule: SelfHealJitterRuleSource
  deferredRestartRule: DeferredRestartRuleSource
}): undefined {
  selfHealState.selfHealJitterRuleForSelfHeal = sources.selfHealJitterRule
  selfHealState.deferredRestartRuleForSelfHeal = sources.deferredRestartRule
}

export function _resetSelfHealStateForTesting(): undefined {
  selfHealState.pendingReExec = false
  selfHealState.reExecScheduled = false
  selfHealState.installInFlight = false
  selfHealState.initialSupervisorVersion = null
  selfHealState.currentAgentIdForSelfHeal = null
  selfHealState.currentSessionIdForSelfHeal = null
  selfHealState.proxyOwnerAgentIdForSelfHeal = null
  selfHealState.unsubVersion = null
  selfHealState.killSelf = (sig) => process.kill(process.pid, sig)
  selfHealState.runInstall = defaultRunInstall
  selfHealState.scheduleReExec = defaultScheduleReExec
  selfHealState.randomFloat = Math.random
  selfHealState.deferredReExecGate?.cancel()
  selfHealState.deferredReExecGate = null
  selfHealState.getClaudePidForSelfHeal = inheritedClaudePid
  selfHealState.getProxyPortForSelfHeal = () => null
  selfHealState.armReExecGate = defaultArmReExecGate
  selfHealState.selfHealJitterRuleForSelfHeal = () =>
    refuseUnwiredSelfHealRule("self-heal jitter rule")
  selfHealState.deferredRestartRuleForSelfHeal = UNWIRED_DEFERRED_RESTART_RULE
}
