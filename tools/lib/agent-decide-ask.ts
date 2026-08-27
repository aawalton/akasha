
import { askInstructions } from "./instructions-command.ts"

export const AGENT_DECIDE_COMMAND = "agent-decide"

export type AskHarness = (payload: unknown) => Promise<unknown>

export const liveAsk: AskHarness = (payload) =>
  askInstructions({ verb: AGENT_DECIDE_COMMAND, stdin: JSON.stringify(payload) })

export function ruleRefusal(rule: string, call: string, detail: string): Error {
  return new Error(
    `${rule}: \`${AGENT_DECIDE_COMMAND}\` answered \`${rule}.${call}\` with something this command ` +
      `cannot act on. ${detail}`
  )
}
