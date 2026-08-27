export const UPSTREAM_IDLE_TIMEOUT_TOKEN = "oauth-proxy upstream idle timeout"

export type IdleGuard = {
  readonly signal: AbortSignal
  reset: () => void
  stop: () => void
}

export type IdleResettable = Pick<IdleGuard, "reset" | "stop">

export function buildIdleGuard(idleMs: number, logPrefix: string, label: string): IdleGuard {
  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | null = null
  let stopped = false

  const clear = (): undefined => {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
  }

  const fire = (): undefined => {
    timer = null
    const message = `${UPSTREAM_IDLE_TIMEOUT_TOKEN}: no upstream bytes for ${idleMs}ms (${label})`
    console.error(`${logPrefix} upstream-idle-timeout ${label} idleMs=${idleMs}`)
    controller.abort(new DOMException(message, "TimeoutError"))
  }

  return {
    signal: controller.signal,
    reset: (): undefined => {
      if (stopped) return
      clear()
      timer = setTimeout(fire, idleMs)
    },
    stop: (): undefined => {
      stopped = true
      clear()
    },
  }
}

export type IdleGuardSpec = {
  idleMs: number
  logPrefix: string
  label: string
}

export async function fetchWithIdleGuard(
  url: string,
  init: RequestInit,
  spec: IdleGuardSpec | null
): Promise<{ response: Response; idle: IdleResettable | undefined }> {
  if (spec == null || spec.idleMs <= 0) {
    return { response: await fetch(url, init), idle: undefined }
  }
  const guard = buildIdleGuard(spec.idleMs, spec.logPrefix, spec.label)
  guard.reset()
  try {
    const response = await fetch(url, { ...init, signal: guard.signal })
    return { response, idle: guard }
  } catch (err) {
    guard.stop()
    throw err
  }
}
