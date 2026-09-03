import { LOG } from "@akasha/seat-system/supervisor-config"

const POLL_INTERVAL_MS = 1_000

export type RotationHandler = (sessionId: string) => Promise<void>

export function watchSeatRotation(
  claimRotation: () => string | null,
  onRotation: RotationHandler
): () => void {
  let stopped = false

  const tick = async (): Promise<void> => {
    if (stopped) return
    try {
      const rotated = claimRotation()
      if (rotated !== null) await onRotation(rotated)
    } catch (err) {
      console.error(`${LOG} rebind: reading the seat's rotation threw:`, err)
    }
    if (!stopped) setTimeout(tick, POLL_INTERVAL_MS)
  }

  void tick()
  return () => {
    stopped = true
  }
}
