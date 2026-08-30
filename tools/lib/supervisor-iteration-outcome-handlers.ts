
import { clearRequestedAction } from "./supervisor-agent-action-clear.ts"
import type { AgentActionEvent } from "./supervisor-agent-action-types.ts"
import { LOG } from "./supervisor-config.ts"
import { withTimeout } from "./supervisor-iteration-outcome-db.ts"
import type { LoopState } from "./supervisor-loop-state.ts"
import { askRestartNotice, type RestartNoticePlan } from "./supervisor-resume-asks.ts"
import { isPendingReExec } from "./supervisor-self-heal-state.ts"

type LoopDirective = "continue" | "break"

type ActionEventOf<K extends AgentActionEvent["action"]> = Extract<AgentActionEvent, { action: K }>

export function restartFirstTurn(plan: RestartNoticePlan): string {
  return plan.route === "spawn-argv" ? plan.notice : ""
}

export async function handleRestartPreserve(
  event: ActionEventOf<"restart_preserve">,
  maintenance: boolean,
  state: LoopState
): Promise<LoopDirective> {
  const agentId = state.getAgentId()
  const sessionId = state.getSessionId()
  const reExecPending = isPendingReExec()
  const plan = await askRestartNotice({
    event: { action: event.action, interruptMessage: event.interruptMessage },
    ctx: { maintenance, reExecPending },
  })
  try {
    try {
      await withTimeout(clearRequestedAction(agentId), "clearRequestedAction")
    } catch {
      await withTimeout(clearRequestedAction(agentId), "clearRequestedAction (retry)")
    }
  } catch (err) {
    console.error(`${LOG} Failed to finalize restart_preserve:`, err)
  }
  if (reExecPending) {
    console.log(`${LOG} restart_preserve + self-heal pending — exiting runInteractive to re-exec`)
    return "break"
  }
  console.log(`${LOG} restart_preserve — resuming session ${sessionId}`)
  state.setResume({
    resume: true,
    driver: plan.route === "rail" ? "deferred-notice" : "argv-prompt",
  })
  state.setCurrentPrompt(restartFirstTurn(plan))
  return "continue"
}
