import { errnoCodeOf, pidAliveOrAssumeAlive } from "@akasha/utils-process/pid-signal"

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return String(err)
}

const LOG = "memory-reaper:"

const TERM_POLL_MS = 100
const TERM_TIMEOUT_MS = 5000

export async function killPidWithTimeout(pid: number): Promise<void> {
  try {
    process.kill(pid, "SIGTERM")
  } catch (err) {
    if (errnoCodeOf(err) === "ESRCH") return
    console.error(`${LOG} SIGTERM pid=${pid} failed: ${errorMessage(err)}`)
    return
  }

  const deadline = Date.now() + TERM_TIMEOUT_MS
  while (Date.now() < deadline) {
    if (!pidAliveOrAssumeAlive(pid)) return
    await new Promise((resolve) => setTimeout(resolve, TERM_POLL_MS))
  }

  if (!pidAliveOrAssumeAlive(pid)) return
  try {
    process.kill(pid, "SIGKILL")
  } catch (err) {
    if (errnoCodeOf(err) === "ESRCH") return
    console.error(`${LOG} SIGKILL pid=${pid} failed: ${errorMessage(err)}`)
  }
}

export async function killTreeWithTimeout(pids: readonly number[]): Promise<void> {
  for (const pid of pids) {
    try {
      process.kill(pid, "SIGTERM")
    } catch (err) {
      if (errnoCodeOf(err) === "ESRCH") continue
      console.error(`${LOG} SIGTERM pid=${pid} failed: ${errorMessage(err)}`)
    }
  }
  const deadline = Date.now() + TERM_TIMEOUT_MS
  while (Date.now() < deadline) {
    if (!pids.some(pidAliveOrAssumeAlive)) return
    await new Promise((resolve) => setTimeout(resolve, TERM_POLL_MS))
  }
  for (const pid of pids) {
    if (!pidAliveOrAssumeAlive(pid)) continue
    try {
      process.kill(pid, "SIGKILL")
    } catch (err) {
      if (errnoCodeOf(err) === "ESRCH") continue
      console.error(`${LOG} SIGKILL pid=${pid} failed: ${errorMessage(err)}`)
    }
  }
}
