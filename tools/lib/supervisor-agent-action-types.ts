
export type AgentActionEvent =
  | { action: "restart_preserve"; interruptMessage: string | null }
  | {
      action: "restart_preserve_on_idle"
      interruptMessage: string | null
      restartArmedAt: number | null
    }
  | { action: "proxy_swap" }

export type PendingAgentAction = {
  event: AgentActionEvent
  maintenance: boolean
}

export interface AgentActionSubsystem {
  handleAgentAction: (event: AgentActionEvent) => Promise<undefined>
  pendingEvent: { value: PendingAgentAction | null }
  deferredRestart: { cancel: (() => void) | null }
  wasSupervisorKill: () => boolean
  armPreCliffRestart: () => Promise<boolean>
}
