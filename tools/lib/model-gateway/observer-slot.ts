import type { ArmableStreamObserver } from "./transport-log.ts"

export type ObserverSlot = {
  current: ArmableStreamObserver | null
  endInFlight?: () => void
}

export function buildEndInFlightOnce(end: () => void): () => undefined {
  let ended = false
  return () => {
    if (ended) return
    ended = true
    end()
  }
}
