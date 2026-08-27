export type HoldHandle = { readonly startMs: number }

export type HoldSnapshot = {
  readonly heldCount: number
  readonly oldestHeldMs: number | null
}

export type HoldRegistry = {
  enter: (startMs: number) => HoldHandle
  exit: (handle: HoldHandle) => void
  snapshot: (now: number) => HoldSnapshot
}

export function buildHoldRegistry(): HoldRegistry {
  const active = new Set<HoldHandle>()
  return {
    enter(startMs) {
      const handle: HoldHandle = { startMs }
      active.add(handle)
      return handle
    },
    exit(handle) {
      active.delete(handle)
    },
    snapshot(now) {
      let oldestStart: number | null = null
      for (const h of active) {
        if (oldestStart === null || h.startMs < oldestStart) oldestStart = h.startMs
      }
      return {
        heldCount: active.size,
        oldestHeldMs: oldestStart === null ? null : Math.max(0, now - oldestStart),
      }
    },
  }
}
