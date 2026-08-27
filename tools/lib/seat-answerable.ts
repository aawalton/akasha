import { composedNameOf } from "./seat-rename.ts"

export function seatAnswerable(agentId: string): string | null {
  return composedNameOf(agentId)
}

export function callingSeat(): string | null {
  return seatAnswerable(process.env.AGENT_ID ?? "")
}
