import { existsSync } from "node:fs"
import { type DispatchOptions, dispatch, type FileType } from "./dispatch"
import { log, logError } from "./logger"
import { reportRunOutcome } from "./report-run-outcome"
import { writeFileAtomicWithRetry } from "./retry"
import { describeOperations } from "./run-outcome"
import { preDispatchOperations } from "./run-outcome-observe"
import { hashContent, shouldSkipSelfWrite } from "./self-write-guard"
import { looksStructurallyComplete, matchesSnapshot, readFileWhenStable } from "./stable-read"
import type { FileState } from "./state"

export const DEBOUNCE_MS = 3000

export interface DispatchHandlerArgs {
  name: string
  fileType: FileType
  getPath: () => string
  fileState: FileState
  serverUrl: string
  wtToken: string
  inventoryConfigPath: string
  charactersConfigPath: string
  companionsConfigPath: string
  enqueueUpload: (fn: () => Promise<void>) => undefined
  maybeCheckUpdate: (serverUrl: string) => Promise<void>
}

export function makeDispatchHandler(args: DispatchHandlerArgs): () => void {
  const {
    name,
    fileType,
    getPath,
    fileState,
    serverUrl,
    wtToken,
    inventoryConfigPath,
    charactersConfigPath,
    companionsConfigPath,
    enqueueUpload,
    maybeCheckUpdate,
  } = args

  return () => {
    if (fileState.running) {
      log(`${name} import already in progress, skipping`)
      return
    }

    const now = Date.now()
    if (now - fileState.lastRunTime < DEBOUNCE_MS) return

    fileState.running = true
    fileState.lastRunTime = now

    const run = async () => {
      try {
        await maybeCheckUpdate(serverUrl)

        const filePath = getPath()
        const sideFilePath =
          fileType === "inventory"
            ? inventoryConfigPath
            : fileType === "characters"
              ? charactersConfigPath
              : fileType === "companions"
                ? companionsConfigPath
                : undefined

        const stable = await readFileWhenStable(filePath)
        if (stable === null) {
          const absent = !existsSync(filePath)
          log(
            `${name} skipped — ${absent ? "file not found" : "file never stabilized"}: ${filePath}`
          )
          await reportRunOutcome(
            preDispatchOperations({
              fileType,
              sourcePath: filePath,
              configPath: sideFilePath,
              state: absent ? "file_not_found" : "skipped",
              ...(absent ? {} : { detail: "file never stabilized" }),
            })
          )
          return
        }
        const { content, snapshot } = stable

        if (shouldSkipSelfWrite(hashContent(content), fileState.lastWriteBackContentHash)) {
          return
        }

        if (!looksStructurallyComplete(content)) {
          log(`${name} skipped — content looks truncated (no closing brace)`)
          await reportRunOutcome(
            preDispatchOperations({
              fileType,
              sourcePath: filePath,
              configPath: sideFilePath,
              state: "parse_failed",
              detail: "content looks truncated (no closing brace)",
            })
          )
          return
        }

        log(`${name} changed, uploading...`)

        const dispatchOptions: DispatchOptions = {
          ...(sideFilePath === undefined
            ? {}
            : fileType === "inventory"
              ? { inventoryConfigPath }
              : fileType === "characters"
                ? { charactersConfigPath }
                : { companionsConfigPath }),
          sourcePath: filePath,
          sourceMtimeMs: snapshot.mtimeMs,
        }
        const result = await dispatch(fileType, content, wtToken, serverUrl, dispatchOptions)

        const summary = describeOperations(result.operations)
        if (!result.ok) {
          logError(`${name}: ${summary}${result.error === undefined ? "" : ` — ${result.error}`}`)
          return
        }

        log(`${name} upload complete — ${summary}`)

        if (result.inventoryConfigSideFileHash != null) {
          fileState.lastInventoryConfigWriteBackHash = result.inventoryConfigSideFileHash
        }
        if (result.charactersConfigSideFileHash != null) {
          fileState.lastCharactersConfigWriteBackHash = result.charactersConfigSideFileHash
        }
        if (result.companionsConfigSideFileHash != null) {
          fileState.lastCompanionsConfigWriteBackHash = result.companionsConfigSideFileHash
        }

        if (result.writeBack != null) {
          if (!matchesSnapshot(filePath, snapshot)) {
            log(`${name} write-back skipped — file changed since the stable read`)
            return
          }
          writeFileAtomicWithRetry(filePath, result.writeBack)
          fileState.lastWriteBackContentHash = hashContent(result.writeBack)
          log(`${name} file updated with server write-back`)
        }
      } catch (err) {
        logError(`${name} error: ${err instanceof Error ? err.message : err}`)
      } finally {
        fileState.running = false
      }
    }

    enqueueUpload(run)
  }
}
