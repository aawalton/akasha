import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { dispatch } from "../watcher-dispatch/watcher-dispatch.module.code.ts"
import {
  type DispatchAnswer,
  type DispatchAsk,
  makeDispatchHandler,
} from "../watcher-dispatch-handling/watcher-dispatch-handling.module.code.ts"
import { log, logError } from "../watcher-logging/watcher-logging.module.code.ts"
import {
  type ExitWanted,
  fatalLine,
  startWatcher,
  type Updating,
  type WatcherStart,
} from "../watcher-main/watcher-main.module.code.ts"
import type { SyncOperation } from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { reportRunOutcome } from "../watcher-run-reporting/watcher-run-reporting.module.code.ts"
import type {
  SignedInAnswer,
  SignedInReader,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import { resolveWatcherToken } from "../watcher-token/watcher-token.module.code.ts"
import { validateWatcherToken } from "../watcher-token-check/watcher-token-check.module.code.ts"
import {
  checkForUpdate,
  cleanupOldExe,
  performSourceUpdate,
  performUpdate,
  resolveSourceHeadSha,
  SOURCE_UPDATE_EXIT_CODE,
} from "../watcher-updating/watcher-updating.module.code.ts"

export const WATCHER_UPDATING: Updating = {
  sourceUpdateExitCode: SOURCE_UPDATE_EXIT_CODE,
  checkForUpdate: (serverUrl, runningVersion) => checkForUpdate(serverUrl, runningVersion),
  performSourceUpdate: (repoDir, targetSha) => performSourceUpdate(repoDir, targetSha),
  performUpdate: (serverUrl) => performUpdate(serverUrl),
  resolveSourceHeadSha: (repoDir) => resolveSourceHeadSha(repoDir),
  cleanupOldExe: () => cleanupOldExe(),
}

export function uploadQueue(): (run: () => Promise<void>) => undefined {
  let tail: Promise<void> = Promise.resolve()
  return (run) => {
    tail = tail.then(run, run)
    return undefined
  }
}

export const NO_ACCOUNT_FOR_TOKEN = "the watcher token matched no enrolment naming an account"

export type WatcherTokenRead = () => string

export type WatcherTokenCheck = (token: unknown) => Promise<{ accountPageId: string } | null>

export async function tokenSessionAnswer(
  readToken: WatcherTokenRead,
  checkToken: WatcherTokenCheck
): Promise<SignedInAnswer> {
  try {
    const validated = await checkToken(readToken())
    if (validated === null) {
      return { data: { user: null }, error: { message: NO_ACCOUNT_FOR_TOKEN } }
    }
    return { data: { user: { id: validated.accountPageId } }, error: null }
  } catch (thrown) {
    const message = thrown instanceof Error ? thrown.message : String(thrown)
    return { data: { user: null }, error: { message } }
  }
}

export async function openTokenSession(
  readToken: WatcherTokenRead = resolveWatcherToken,
  checkToken: WatcherTokenCheck = validateWatcherToken
): Promise<SignedInReader> {
  const answer = await tokenSessionAnswer(readToken, checkToken)
  return { auth: { getUser: () => Promise.resolve(answer) } }
}

export function dispatchingThrough(
  reader: () => SignedInReader
): (ask: DispatchAsk) => Promise<DispatchAnswer> {
  return async (ask) =>
    dispatch(ask.fileType, ask.content, ask.token, ask.serverUrl, {
      reader: reader(),
      sourcePath: ask.sourcePath,
      sourceMtimeMs: ask.sourceMtimeMs,
      inventoryConfigPath: ask.inventoryConfigPath,
      charactersConfigPath: ask.charactersConfigPath,
      companionsConfigPath: ask.companionsConfigPath,
    })
}

export function reportingThrough(
  reader: () => SignedInReader
): (operations: readonly SyncOperation[]) => Promise<void> {
  return (operations) =>
    reportRunOutcome(operations, {
      accountId: async () => (await reader().auth.getUser()).data.user?.id ?? null,
    })
}

export const SESSION_NOT_OPEN = "the watcher session is not open yet"

export interface SessionHold<Client> {
  readonly hold: (opening: () => Promise<Client>) => Promise<Client>
  readonly take: () => Client
}

export function sessionHold<Client>(): SessionHold<Client> {
  let held: Client | null = null
  return {
    hold: async (opening) => {
      held = await opening()
      return held
    },
    take: () => {
      if (held === null) throw new Error(SESSION_NOT_OPEN)
      return held
    },
  }
}

export async function runWorker(exit: (code: number) => never): Promise<WatcherStart> {
  const session = sessionHold<SignedInReader>()

  const started = await startWatcher({
    repoDir: akashaRoot(),
    openSession: () => session.hold(() => openTokenSession()),
    dispatch: dispatchingThrough(session.take),
    report: reportingThrough(session.take),
    makeDispatchHandler,
    updating: WATCHER_UPDATING,
    enqueueUpload: uploadQueue(),
    onExitWanted: (wanted: ExitWanted) => {
      log(`the watcher is ending on ${wanted.code} (${wanted.reason})`)
      exit(wanted.code)
    },
  })

  if (started.kind === "exit") {
    logError(`the watcher did not start (${started.reason})`)
    exit(started.code)
  }
  return started
}

if (import.meta.main) {
  process.on("uncaughtException", (err: unknown) => {
    logError(fatalLine("uncaught exception", err))
    process.exit(1)
  })
  process.on("unhandledRejection", (reason: unknown) => {
    logError(fatalLine("unhandled rejection", reason))
    process.exit(1)
  })

  const started = await runWorker((code) => process.exit(code))

  if (started.kind === "watching") {
    const stop = (): undefined => {
      log("Shutting down")
      started.stop()
      process.exit(0)
    }
    process.on("SIGINT", stop)
    process.on("SIGTERM", stop)
  }
}
