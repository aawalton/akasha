export type Timers = {
  set: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>
  clear: (handle: ReturnType<typeof setTimeout>) => void
}

const SYSTEM_TIMERS: Timers = {
  set: (fn, ms) => setTimeout(fn, ms),
  clear: (handle) => clearTimeout(handle),
}

export type ArmedTimer = {
  readonly arm: () => undefined
  readonly reset: () => undefined
  readonly stop: () => undefined
  readonly isStopped: () => boolean
}

export function armedTimer(
  ms: number,
  fire: () => void,
  timers: Timers = SYSTEM_TIMERS
): ArmedTimer {
  let pending: ReturnType<typeof setTimeout> | null = null
  let stopped = false

  const clear = (): undefined => {
    if (pending != null) {
      timers.clear(pending)
      pending = null
    }
  }

  const arm = (): undefined => {
    pending = timers.set(() => {
      pending = null
      fire()
    }, ms)
  }

  return {
    arm,
    reset: (): undefined => {
      if (stopped) return
      clear()
      arm()
    },
    stop: (): undefined => {
      stopped = true
      clear()
    },
    isStopped: (): boolean => stopped,
  }
}
