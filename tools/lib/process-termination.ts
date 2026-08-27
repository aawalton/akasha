import { errnoCode } from "./pid-signal.ts"
import { pidAliveOrRefuse } from "./pid-signal.ts"

const DEFAULT_EXIT_TIMEOUT_MS = 15_000
const DEFAULT_EXIT_POLL_MS = 200

export async function pollUntilPidExit(
  pid: number,
  opts?: { readonly timeoutMs?: number; readonly pollMs?: number }
): Promise<boolean> {
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_EXIT_TIMEOUT_MS
  const pollMs = opts?.pollMs ?? DEFAULT_EXIT_POLL_MS
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (!pidAliveOrRefuse(pid)) return true
    await new Promise((resolve) => setTimeout(resolve, pollMs))
  }
  return !pidAliveOrRefuse(pid)
}

export interface TerminationEffects {
  readonly isAlive: (pid: number) => boolean
  readonly signal: (pid: number, sig: "SIGTERM" | "SIGKILL") => void
  readonly waitForExit: (pid: number) => Promise<boolean>
}

export interface TerminationOutcome {
  readonly signaled: boolean
  readonly escalated: boolean
  readonly allExited: boolean
}

function killTolerant(pid: number, sig: "SIGTERM" | "SIGKILL"): undefined {
  try {
    process.kill(pid, sig)
  } catch (err) {
    if (errnoCode(err) !== "ESRCH") throw err
  }
}

export const PROCESS_TERMINATION_EFFECTS: TerminationEffects = {
  isAlive: pidAliveOrRefuse,
  signal: killTolerant,
  waitForExit: (pid) => pollUntilPidExit(pid),
}

export async function terminatePidsEscalating(
  pids: readonly number[],
  effects: TerminationEffects = PROCESS_TERMINATION_EFFECTS
): Promise<TerminationOutcome> {
  const alive = pids.filter((pid) => effects.isAlive(pid))
  for (const pid of alive) effects.signal(pid, "SIGTERM")
  let escalated = false
  let allExited = true
  for (const pid of alive) {
    if (await effects.waitForExit(pid)) continue
    effects.signal(pid, "SIGKILL")
    escalated = true
    if (!(await effects.waitForExit(pid))) allExited = false
  }
  return { signaled: alive.length > 0, escalated, allExited }
}
