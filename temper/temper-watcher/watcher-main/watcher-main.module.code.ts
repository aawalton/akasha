import { existsSync, unwatchFile, watchFile } from "node:fs"
import { basename } from "node:path"
import { serverUrlFromEnv } from "../watcher-auth/watcher-auth.module.code.ts"
import {
  buildConfig as buildConfigFromDisk,
  sourcePathFor,
  type WatcherConfig,
} from "../watcher-config/watcher-config.module.code.ts"
import type {
  DispatchAnswer,
  DispatchAsk,
  DispatchHandlerArgs,
} from "../watcher-dispatch-handling/watcher-dispatch-handling.module.code.ts"
import { FILE_TYPES } from "../watcher-file-type/watcher-file-type.module.code.ts"
import {
  logError as writeError,
  log as writeInfo,
} from "../watcher-logging/watcher-logging.module.code.ts"
import { writeFileAtomicWithRetry } from "../watcher-retry/watcher-retry.module.code.ts"
import type { SyncOperation } from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { isSourceRuntime } from "../watcher-runtime/watcher-runtime.module.code.ts"
import { hashContent } from "../watcher-self-write-guard/watcher-self-write-guard.module.code.ts"
import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  looksStructurallyComplete,
  matchesSnapshot,
  readFileWhenStable,
  type StableRead,
  type StatSnapshot,
} from "../watcher-stable-read/watcher-stable-read.module.code.ts"
import { type FileState, initialWatcherState } from "../watcher-state/watcher-state.module.code.ts"
import { resolveWatcherToken } from "../watcher-token/watcher-token.module.code.ts"
import { WATCHER_VERSION } from "../watcher-version/watcher-version.module.code.ts"

export const POLL_INTERVAL_MS = 2000

export const UPDATE_CHECK_MIN_INTERVAL_MS = 60_000

export const HOURLY_UPDATE_CHECK_MS = 60 * 60_000

const WATCHED_NAME = /^Temper(.+)\.lua$/

export interface Logs {
  readonly log: (message: string) => undefined
  readonly logError: (message: string) => undefined
}

export type OpenSession = () => Promise<SignedInReader>

export type Dispatching = (ask: DispatchAsk) => Promise<DispatchAnswer>

export type Reporting = (operations: readonly SyncOperation[]) => Promise<void>

export type MakeDispatchHandler = (args: DispatchHandlerArgs) => () => void

export type UpdateCheck =
  | { readonly kind: "update-available"; readonly version: string }
  | { readonly kind: "up-to-date" }
  | { readonly kind: "check-failed"; readonly reason: string; readonly detail: string }

export interface SourceUpdateAnswer {
  readonly advanced: boolean
  readonly reason: string
}

export interface Updating {
  readonly sourceUpdateExitCode: number
  readonly checkForUpdate: (serverUrl: string, runningVersion: string) => Promise<UpdateCheck>
  readonly performSourceUpdate: (repoDir: string, targetSha: string) => SourceUpdateAnswer
  readonly performUpdate: (serverUrl: string) => Promise<void>
  readonly resolveSourceHeadSha: (repoDir: string) => string | null
  readonly cleanupOldExe: () => undefined
}

export interface ExitWanted {
  readonly kind: "exit"
  readonly code: number
  readonly reason: string
}

export type UpdateOutcome = { readonly kind: "carry-on" } | ExitWanted

export interface WatchingFiles {
  readonly kind: "watching"
  readonly watching: readonly string[]
  readonly stop: () => undefined
}

export type WatcherStart = WatchingFiles | ExitWanted

const CARRY_ON: UpdateOutcome = { kind: "carry-on" }

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

export function watchedLabel(fileName: string): string {
  return WATCHED_NAME.exec(fileName)?.[1] ?? fileName
}

export function fatalLine(kind: string, err: unknown): string {
  const detail = err instanceof Error ? `${err.message}\n${err.stack ?? "(no stack)"}` : String(err)
  return `FATAL ${kind} — watcher exiting: ${detail}`
}

function watchByPolling(path: string, onChange: () => void): () => undefined {
  watchFile(path, { interval: POLL_INTERVAL_MS }, onChange)
  return () => {
    unwatchFile(path)
    return undefined
  }
}

function repeatByTimer(ms: number, run: () => undefined): () => undefined {
  const timer = setInterval(run, ms)
  return () => {
    clearInterval(timer)
    return undefined
  }
}

export interface UpdateAttempt extends Logs {
  readonly serverUrl: string
  readonly runningVersion: string
  readonly repoDir: string
  readonly fromSource: boolean
  readonly updating: Updating
}

export async function tryUpdate(attempt: UpdateAttempt): Promise<UpdateOutcome> {
  const { log, logError, updating } = attempt
  const update = await updating.checkForUpdate(attempt.serverUrl, attempt.runningVersion)
  if (update.kind === "check-failed") {
    logError(`Update check failed (${update.reason}): ${update.detail}`)
    return CARRY_ON
  }
  if (update.kind === "up-to-date") return CARRY_ON

  try {
    if (attempt.fromSource) {
      const target = update.version.slice(0, 8)
      const answer = updating.performSourceUpdate(attempt.repoDir, update.version)
      if (answer.advanced) {
        log(
          `Source update ${attempt.runningVersion.slice(0, 8)} → ${target}; asking to exit for systemd respawn.`
        )
        return {
          kind: "exit",
          code: updating.sourceUpdateExitCode,
          reason: "source-update-advanced",
        }
      }
      log(`Source update to ${target} not applied (${answer.reason}).`)
      return CARRY_ON
    }

    log(`Update available: ${update.version}. Downloading...`)
    await updating.performUpdate(attempt.serverUrl)
  } catch (err) {
    logError(`Update apply failed: ${messageOf(err)}`)
  }
  return CARRY_ON
}

export interface InventorySync extends Logs {
  readonly inventoryPath: string
  readonly inventoryConfigPath: string
  readonly wtToken: string
  readonly serverUrl: string
  readonly fileState: FileState
  readonly dispatch: Dispatching
  readonly readWhenStable: (path: string) => Promise<StableRead | null>
  readonly stillMatches: (path: string, snapshot: StatSnapshot) => boolean
  readonly writeBack: (path: string, content: string) => undefined
}

export async function syncInventoryAtStart(sync: InventorySync): Promise<undefined> {
  const { fileState, log, logError } = sync
  try {
    log("Syncing inventory settings...")
    const stable = await sync.readWhenStable(sync.inventoryPath)
    if (stable === null) {
      log("Inventory sync skipped — file missing or never stabilized")
      return undefined
    }
    if (!looksStructurallyComplete(stable.content)) {
      log("Inventory sync skipped — content looks truncated (no closing brace)")
      return undefined
    }

    const answer = await sync.dispatch({
      fileType: "inventory",
      content: stable.content,
      token: sync.wtToken,
      serverUrl: sync.serverUrl,
      sourcePath: sync.inventoryPath,
      sourceMtimeMs: stable.snapshot.mtimeMs,
      inventoryConfigPath: sync.inventoryConfigPath,
    })
    if (answer.ok && answer.inventoryConfigSideFileHash != null) {
      fileState.lastInventoryConfigWriteBackHash = answer.inventoryConfigSideFileHash
    }
    if (!answer.ok) {
      logError(`Inventory sync failed: ${answer.error}`)
      return undefined
    }
    if (answer.writeBack == null) {
      log("Inventory settings up to date")
      return undefined
    }
    if (!sync.stillMatches(sync.inventoryPath, stable.snapshot)) {
      log("Inventory sync write-back skipped — file changed since the stable read")
      return undefined
    }
    sync.writeBack(sync.inventoryPath, answer.writeBack)
    fileState.lastWriteBackContentHash = hashContent(answer.writeBack)
    log("Inventory settings synced")
  } catch (err) {
    logError(`Startup sync error: ${messageOf(err)}`)
  }
  return undefined
}

export interface WatcherStartOptions extends Partial<Logs> {
  readonly repoDir: string
  readonly openSession: OpenSession
  readonly dispatch: Dispatching
  readonly report: Reporting
  readonly makeDispatchHandler: MakeDispatchHandler
  readonly updating: Updating
  readonly enqueueUpload: (run: () => Promise<void>) => undefined
  readonly onExitWanted: (wanted: ExitWanted) => undefined
  readonly serverUrl?: () => string
  readonly now?: () => number
  readonly isThere?: (path: string) => boolean
  readonly watch?: (path: string, onChange: () => void) => () => undefined
  readonly repeatEvery?: (ms: number, run: () => undefined) => () => undefined
  readonly readWhenStable?: (path: string) => Promise<StableRead | null>
  readonly stillMatches?: (path: string, snapshot: StatSnapshot) => boolean
  readonly writeBack?: (path: string, content: string) => undefined
  readonly buildConfig?: () => WatcherConfig
  readonly resolveToken?: () => string
  readonly sourceRuntime?: () => boolean
  readonly version?: string
}

export async function startWatcher(options: WatcherStartOptions): Promise<WatcherStart> {
  const now = options.now ?? Date.now
  const log = options.log ?? writeInfo
  const logError = options.logError ?? writeError
  const isThere = options.isThere ?? existsSync
  const watch = options.watch ?? watchByPolling
  const repeatEvery = options.repeatEvery ?? repeatByTimer
  const readWhenStable = options.readWhenStable ?? readFileWhenStable
  const stillMatches = options.stillMatches ?? matchesSnapshot
  const writeBack = options.writeBack ?? writeFileAtomicWithRetry
  const { updating } = options

  const fromSource = (options.sourceRuntime ?? isSourceRuntime)()
  const runningVersion = fromSource
    ? (updating.resolveSourceHeadSha(options.repoDir) ?? "dev")
    : (options.version ?? WATCHER_VERSION)

  log(`Temper SavedVariables Watcher v${runningVersion} starting`)
  if (!fromSource) updating.cleanupOldExe()

  const session = await options.openSession()
  const answer = await session.auth.getUser()
  const user = answer.data.user
  if (answer.error != null || user == null) {
    logError(`No valid session (${answer.error?.message ?? "no user"}).`)
    return { kind: "exit", code: 1, reason: "no-valid-session" }
  }
  const serverUrl = (options.serverUrl ?? serverUrlFromEnv)()
  log(`Session validated (${user.id})`)

  const wtToken = (options.resolveToken ?? resolveWatcherToken)()

  const attempt = (): UpdateAttempt => ({
    serverUrl,
    runningVersion,
    repoDir: options.repoDir,
    fromSource,
    updating,
    log,
    logError,
  })

  const first = await tryUpdate(attempt())
  if (first.kind === "exit") return first
  let lastUpdateCheckMs = now()

  let config: WatcherConfig
  try {
    config = (options.buildConfig ?? buildConfigFromDisk)()
  } catch (err) {
    logError(`Config error: ${messageOf(err)}`)
    return { kind: "exit", code: 1, reason: "config-error" }
  }

  log(`SavedVariables: ${config.savedVarsDir}`)
  log(`AddOns: ${config.addonsDir}`)

  const maybeCheckUpdate = async (): Promise<void> => {
    const at = now()
    if (at - lastUpdateCheckMs < UPDATE_CHECK_MIN_INTERVAL_MS) return
    lastUpdateCheckMs = at
    const outcome = await tryUpdate(attempt())
    if (outcome.kind === "exit") options.onExitWanted(outcome)
  }

  const state = initialWatcherState()
  const stops: (() => undefined)[] = []
  const watching: string[] = []

  for (const fileType of FILE_TYPES) {
    const path = sourcePathFor(fileType, config)
    const fileName = basename(path)
    if (!isThere(path)) {
      log(`Warning: ${fileName} not found at ${path}, skipping`)
      continue
    }
    const onChange = options.makeDispatchHandler({
      name: watchedLabel(fileName),
      fileType,
      sourcePathOf: () => path,
      fileState: state[fileType],
      serverUrl,
      token: wtToken,
      configPaths: config,
      enqueue: options.enqueueUpload,
      checkForUpdate: maybeCheckUpdate,
      dispatch: options.dispatch,
      report: options.report,
    })
    stops.push(watch(path, onChange))
    watching.push(path)
    log(`Watching: ${fileName}`)
  }

  if (watching.length === 0) {
    logError("No files found to watch. Asking to exit.")
    return { kind: "exit", code: 1, reason: "nothing-to-watch" }
  }

  if (isThere(config.inventoryPath)) {
    await syncInventoryAtStart({
      inventoryPath: config.inventoryPath,
      inventoryConfigPath: config.inventoryConfigPath,
      wtToken,
      serverUrl,
      fileState: state.inventory,
      dispatch: options.dispatch,
      readWhenStable,
      stillMatches,
      writeBack,
      log,
      logError,
    })
  }

  const stopHourly = repeatEvery(HOURLY_UPDATE_CHECK_MS, () => {
    lastUpdateCheckMs = now()
    void tryUpdate(attempt())
      .then((outcome) => {
        if (outcome.kind === "exit") options.onExitWanted(outcome)
        return undefined
      })
      .catch((err: unknown) => {
        logError(`Hourly update check failed: ${messageOf(err)}`)
        return undefined
      })
    return undefined
  })

  log(`Watching ${watching.length} file(s)`)

  return {
    kind: "watching",
    watching,
    stop: () => {
      log("Shutting down")
      stopHourly()
      for (const stopWatching of stops) stopWatching()
      return undefined
    },
  }
}
