import type { RemoteControlQuestion } from "./decide-remote-control.ts"
import { shape } from "./shape.ts"

export type { RemoteControlQuestion }

export const UNCLAIMED_SEAT = "unclaimed"

export function seatLabel(agentId: string | null): string {
  return agentId ?? UNCLAIMED_SEAT
}

export const REMOTE_CONTROL_DECISION = "remoteControl"

export const RemoteControlVerdictShape = shape.object({
  seat: shape.string(),
  remoteControl: shape.boolean(),
})

export function remoteControlFallback(headless: boolean): boolean {
  return !headless
}

export function readRemoteControlQuestion(opts: { headless: boolean }): RemoteControlQuestion {
  return { headless: opts.headless }
}
