import { mkdirSync, openSync } from "node:fs"
import { dirname } from "node:path"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  clearState,
  isPidAlive,
  readState,
  type WatcherDaemonState,
  workerLogPath,
  writeState,
} from "akasha/temper/watcher/modules/watcher-daemon/watcher-daemon.module.code.ts"
import { runWorkerHere } from "akasha/temper/watcher/modules/watcher-worker/watcher-worker.module.code.ts"

export const FROM_SOURCE = "source"

const ROLE = "WATCHER_ROLE"

const WORKER = "worker"

export async function runWatcherWorker(): Promise<number> {
  if (process.env[ROLE] === WORKER) return await runWorkerHere()

  const held = readState()
  if (held !== undefined && isPidAlive(held.pid)) {
    throw new OperationalError(
      `a watcher worker is already running as pid ${held.pid}, so a second one is refused; restart the temper-watcher service instead`
    )
  }

  const logPath = workerLogPath()
  mkdirSync(dirname(logPath), { recursive: true })
  const logFd = openSync(logPath, "a", 0o600)

  let worker: Bun.Subprocess<"ignore", number, number>
  try {
    worker = Bun.spawn([process.execPath, import.meta.path], {
      cwd: akashaRoot(),
      env: { ...process.env, WATCHER_RUNTIME: FROM_SOURCE, [ROLE]: WORKER },
      stdin: "ignore",
      stdout: logFd,
      stderr: logFd,
    })
  } catch (thrown) {
    throw new OperationalError(
      `the watcher worker did not start: ${thrown instanceof Error ? thrown.message : String(thrown)}`
    )
  }

  const state: WatcherDaemonState = {
    pid: worker.pid,
    startedAt: new Date().toISOString(),
    logPath,
  }
  writeState(state)
  process.stdout.write(`the watcher worker runs as pid ${state.pid}, logging to ${state.logPath}\n`)

  let signalled = false
  const forward = (signal: NodeJS.Signals): undefined => {
    signalled = true
    try {
      worker.kill(signal)
    } catch {
      return undefined
    }
    return undefined
  }
  process.on("SIGTERM", () => forward("SIGTERM"))
  process.on("SIGINT", () => forward("SIGINT"))

  const ended = await worker.exited
  clearState()
  return signalled ? 0 : ended
}

if (import.meta.main) {
  try {
    process.exit(await runWatcherWorker())
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(3)
  }
}
