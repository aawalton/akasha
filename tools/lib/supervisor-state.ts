import type { AgentActionSubsystem } from "@akasha/seat-system/supervisor-agent-action-types"
import type { ChildExitClassification } from "@akasha/seat-system/supervisor-child-exit-rule"
import type { LogSink } from "@akasha/seat-system/supervisor-console"
import type { SupervisorHandoff } from "@akasha/seat-system/supervisor-handoff-env"
import type { SupervisorOAuthProxyHandle } from "./supervisor-spawn-oauth-proxy.ts"
import type { AgentProcess } from "./supervisor-types.ts"

export const processes = new Map<string, AgentProcess>()

let _inheritedClaude: SupervisorHandoff["claude"] = null

export function getInheritedClaude(): SupervisorHandoff["claude"] {
  return _inheritedClaude
}

export function setInheritedClaude(claude: SupervisorHandoff["claude"]): undefined {
  _inheritedClaude = claude
}

export const activeLifecycles = new Set<Promise<void>>()

export function trackLifecycle<T>(p: Promise<T>): Promise<T> {
  const settled: Promise<void> = p.then(
    () => undefined,
    () => undefined
  )
  activeLifecycles.add(settled)
  void settled.finally(() => {
    activeLifecycles.delete(settled)
  })
  return p
}

let _shuttingDown = false

export function isShuttingDown(): boolean {
  return _shuttingDown
}

export function setShuttingDown(value: boolean): undefined {
  _shuttingDown = value
}

let _observedChildExit: ChildExitClassification | null = null

export function getObservedChildExit(): ChildExitClassification | null {
  return _observedChildExit
}

export function setObservedChildExit(classification: ChildExitClassification): undefined {
  _observedChildExit = classification
}

let _restoreConsoleHandle: (() => void) | null = null

export function getRestoreConsoleHandle(): (() => void) | null {
  return _restoreConsoleHandle
}

export function setRestoreConsoleHandle(handle: (() => void) | null): undefined {
  _restoreConsoleHandle = handle
}

let _oauthProxyHandle: SupervisorOAuthProxyHandle | null = null

export function getOAuthProxyHandle(): SupervisorOAuthProxyHandle | null {
  return _oauthProxyHandle
}

export function setOAuthProxyHandle(handle: SupervisorOAuthProxyHandle | null): undefined {
  _oauthProxyHandle = handle
}

let _shutdownSinkGetter: (() => LogSink) | null = null

export function getShutdownSinkGetter(): (() => LogSink) | null {
  return _shutdownSinkGetter
}

export function setShutdownSinkGetter(getter: (() => LogSink) | null): undefined {
  _shutdownSinkGetter = getter
}

let _agentActionHandler: AgentActionSubsystem["handleAgentAction"] | null = null

export function getAgentActionHandler(): AgentActionSubsystem["handleAgentAction"] | null {
  return _agentActionHandler
}

export function setAgentActionHandler(
  handler: AgentActionSubsystem["handleAgentAction"] | null
): undefined {
  _agentActionHandler = handler
}
