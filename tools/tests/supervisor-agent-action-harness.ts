
import type { AgentActionEvent } from "../lib/supervisor-agent-action-types.ts"
import type { armDeferredRestart } from "../lib/supervisor-deferred-restart.ts"
import { buildAgentActionSubsystem } from "../lib/supervisor-agent-action.ts"
import { deferredRestartRuleDouble, unusedIdleRule } from "./supervisor-rule-test-helpers.ts"

export type ArmOpts = Parameters<typeof armDeferredRestart>[0]

export const deferredRestartRule = deferredRestartRuleDouble()

export const ARM_ON_IDLE: AgentActionEvent = {
  action: "restart_preserve_on_idle",
  interruptMessage: null,
  restartArmedAt: null,
}

export function build(
  armSpy: (opts: ArmOpts) => { cancel: () => void },
  onProxySwap: () => Promise<void> = async () => {}
) {
  let killed = 0
  const sub = buildAgentActionSubsystem({
    idleRule: unusedIdleRule,
    deferredRestartRule,
    killProc: () => {
      killed++
    },
    getClaudePid: () => 111,
    getAgentId: () => "amy",
    getProxyPort: () => 5123,
    log: () => {},
    armDeferred: armSpy,
    onProxySwap,
  })
  return { sub, killed: () => killed }
}

export function buildCapturing() {
  const arms: ArmOpts[] = []
  const { sub, killed } = build((opts) => {
    arms.push(opts)
    return { cancel: () => {} }
  })
  return { sub, killed, arms }
}

export function buildFireHarness() {
  const order: string[] = []
  const arms: ArmOpts[] = []
  const sub = buildAgentActionSubsystem({
    idleRule: unusedIdleRule,
    deferredRestartRule,
    killProc: () => {
      order.push("kill")
    },
    getClaudePid: () => 111,
    getAgentId: () => "amy",
    getProxyPort: () => 5123,
    log: () => {},
    armDeferred: (opts) => {
      arms.push(opts)
      return { cancel: () => {} }
    },
    clearAction: async (id) => {
      order.push(`clear:${id}`)
    },
    onProxySwap: async () => {},
  })
  const armIdle = () => sub.handleAgentAction(ARM_ON_IDLE)
  return { sub, order, arms, armIdle }
}

export interface Scenario {
  readonly name: string
  readonly drive: () => Promise<Record<string, unknown>>
  readonly standing: Record<string, unknown>
}
