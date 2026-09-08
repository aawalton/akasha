export interface SpawnLike {
  readonly exited: Promise<number>
  readonly kill: (signal?: number | NodeJS.Signals) => void
}

export class SubprocessTimeoutError extends Error {
  readonly label: string
  readonly timeoutMs: number
  constructor(label: string, timeoutMs: number) {
    super(`${label} timed out after ${timeoutMs}ms`)
    this.name = "SubprocessTimeoutError"
    this.label = label
    this.timeoutMs = timeoutMs
  }
}

export function isSubprocessTimeoutError(err: unknown): err is SubprocessTimeoutError {
  return (
    err instanceof Error &&
    err.name === "SubprocessTimeoutError" &&
    "label" in err &&
    typeof err.label === "string" &&
    "timeoutMs" in err &&
    typeof err.timeoutMs === "number"
  )
}

export async function awaitSpawnWithTimeout(
  proc: SpawnLike,
  label: string,
  timeoutMs: number
): Promise<number> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      try {
        proc.kill("SIGKILL")
      } catch {}
      reject(new SubprocessTimeoutError(label, timeoutMs))
    }, timeoutMs)
  })
  try {
    return await Promise.race([proc.exited, timeout])
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId)
  }
}
