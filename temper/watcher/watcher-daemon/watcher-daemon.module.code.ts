import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  watcherConfigDir,
  watcherLogDir,
} from "akasha/temper/watcher/watcher-paths/watcher-paths.module.code.ts"
import { pidAliveOrAssumeDead } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"
import { z } from "zod"

export type WatcherDaemonState = {
  readonly pid: number
  readonly startedAt: string
  readonly logPath: string
}

const STATE_SHAPE = z
  .object({
    pid: z.number().int().positive(),
    startedAt: z.string().min(1),
    logPath: z.string().min(1),
  })
  .strict()

const STATE_FILE = "daemon.json"

export const WORKER_LOG = "watcher.log"

export const ROLLED_LOG = "watcher.1.log"

const MODULE = "module"

const WORKER = "watcher-worker"

const CODE = "code"

const TS = "ts"

function workerEntryAt(root: string): string {
  const page = listedAt(root, MODULE, WORKER)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new OperationalError(
      `no \`${MODULE}\` is slugged \`${WORKER}\`, so the watcher worker entry is nowhere`
    )
  }
  return at
}

function stateFilePath(): string {
  return join(watcherConfigDir(), STATE_FILE)
}

export function workerLogPath(): string {
  return join(watcherLogDir(), WORKER_LOG)
}

export function readState(): WatcherDaemonState | undefined {
  const path = stateFilePath()
  if (!existsSync(path)) return undefined
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return undefined
  }
  try {
    const read = STATE_SHAPE.safeParse(JSON.parse(raw))
    return read.success ? read.data : undefined
  } catch {
    return undefined
  }
}

export function writeState(state: WatcherDaemonState): undefined {
  const path = stateFilePath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(state)}\n`, { mode: 0o600 })
  return undefined
}

export function clearState(): undefined {
  const path = stateFilePath()
  if (existsSync(path)) rmSync(path)
  return undefined
}

export const isPidAlive = pidAliveOrAssumeDead

export function resolveWorkerEntry(): { readonly workerEntry: string; readonly repoRoot: string } {
  const repoRoot = akashaRoot()
  const workerEntry = join(repoRoot, workerEntryAt(repoRoot))
  if (!existsSync(workerEntry)) {
    throw new OperationalError(
      `the watcher worker entry is not at ${workerEntry} (akasha root ${repoRoot})`
    )
  }
  return { workerEntry, repoRoot }
}
