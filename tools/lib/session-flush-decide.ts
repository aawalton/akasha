
export type FlushStatus = "flushed" | "empty" | "no-store" | "timeout"

export function flushOutcome(facts: {
  storePresent: boolean
  ready: boolean
  bytes: number
}): FlushStatus {
  if (!facts.storePresent) return "no-store"
  if (!facts.ready) return "timeout"
  if (facts.bytes === 0) return "empty"
  return "flushed"
}
