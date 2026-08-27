#!/usr/bin/env bun

import { existsSync, unwatchFile, watchFile } from "node:fs"
import { z } from "zod"
import { authenticate } from "./auth"
import { buildConfig } from "./config"
import { dispatch, type FileType } from "./dispatch"
import { makeDispatchHandler } from "./dispatch-handler"
import { log, logError } from "./logger"
import { writeFileAtomicWithRetry } from "./retry"
import { isSourceRuntime } from "./runtime"
import { hashContent } from "./self-write-guard"
import { looksStructurallyComplete, matchesSnapshot, readFileWhenStable } from "./stable-read"
import { initialWatcherState } from "./state"
import { initSupabaseClient } from "./supabase-client"
import {
  checkForUpdate,
  cleanupOldExe,
  performSourceUpdate,
  performUpdate,
  resolveSourceHeadSha,
  SOURCE_UPDATE_EXIT_CODE,
} from "./updater"
import { WATCHER_VERSION } from "./version"
import { resolveWatcherToken } from "./watcher-token"

const POLL_INTERVAL_MS = 2000
const UPDATE_CHECK_MIN_INTERVAL_MS = 60000
const HOURLY_UPDATE_CHECK_MS = 60 * 60_000

let uploadQueue: Promise<void> = Promise.resolve()

function enqueueUpload(fn: () => Promise<void>): undefined {
  uploadQueue = uploadQueue.then(fn, fn)
}

const state = initialWatcherState()

let lastUpdateCheckMs = 0

const REPO_DIR = import.meta.dir

let runningVersion = WATCHER_VERSION

async function tryUpdate(serverUrl: string): Promise<void> {
  const update = await checkForUpdate(serverUrl, runningVersion)
  if (update.kind === "check-failed") {
    logError(`Update check failed (${update.reason}): ${update.detail}`)
    return
  }
  if (update.kind === "up-to-date") return

  try {
    if (isSourceRuntime()) {
      const result = performSourceUpdate(REPO_DIR, update.version)
      if (result.advanced) {
        log(
          `Source update ${runningVersion.slice(0, 8)} → ${update.version.slice(0, 8)}; exiting for systemd respawn.`
        )
        process.exit(SOURCE_UPDATE_EXIT_CODE)
      }
      log(`Source update to ${update.version.slice(0, 8)} not applied (${result.reason}).`)
      return
    }

    log(`Update available: ${update.version}. Downloading...`)
    await performUpdate(serverUrl)
  } catch (err) {
    logError(`Update apply failed: ${err instanceof Error ? err.message : err}`)
  }
}

async function maybeCheckUpdate(serverUrl: string): Promise<void> {
  const now = Date.now()
  if (now - lastUpdateCheckMs < UPDATE_CHECK_MIN_INTERVAL_MS) return
  lastUpdateCheckMs = now
  await tryUpdate(serverUrl)
}

async function main(): Promise<void> {
  if (isSourceRuntime()) {
    runningVersion = resolveSourceHeadSha(REPO_DIR) ?? "dev"
  }
  log(`Temper SavedVariables Watcher v${runningVersion} starting`)

  if (!isSourceRuntime()) cleanupOldExe()

  const supabase = await initSupabaseClient()
  let userResult = await supabase.auth.getUser()
  let serverUrl: string
  let userId: string
  if (userResult.error || !userResult.data.user) {
    log(`No valid session (${userResult.error?.message ?? "no user"}). Starting authentication...`)
    const result = await authenticate()
    serverUrl = result.serverUrl
    const { error: setErr } = await supabase.auth.setSession({
      access_token: result.session.access_token,
      refresh_token: result.session.refresh_token,
    })
    if (setErr) {
      logError(`setSession failed: ${setErr.message}`)
      process.exit(1)
    }
    userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      logError(`Authentication failed: ${userResult.error?.message ?? "no user"}`)
      process.exit(1)
    }
    userId = userResult.data.user.id
    log("Authentication successful!")
  } else {
    serverUrl = z.string().default("https://tempereso.com").parse(process.env.TEMPER_SERVER_URL)
    userId = userResult.data.user.id
    log(`Session validated (${userResult.data.user.email ?? userId})`)
  }

  const wtToken = resolveWatcherToken()

  await tryUpdate(serverUrl)
  lastUpdateCheckMs = Date.now()

  let esoConfig: ReturnType<typeof buildConfig>
  try {
    esoConfig = buildConfig()
  } catch (err) {
    logError(`Config error: ${err instanceof Error ? err.message : err}`)
    process.exit(1)
  }

  log(`SavedVariables: ${esoConfig.savedVarsDir}`)
  log(`AddOns: ${esoConfig.addonsDir}`)

  const watchers: string[] = []

  const registerWatcher = (filePath: string, name: string, handler: () => void): undefined => {
    if (!existsSync(filePath)) {
      log(`Warning: ${name} not found at ${filePath}, skipping`)
      return
    }
    watchFile(filePath, { interval: POLL_INTERVAL_MS }, handler)
    watchers.push(filePath)
    log(`Watching: ${name}`)
  }

  const handlerFor = (name: string, fileType: FileType, getPath: () => string): (() => void) =>
    makeDispatchHandler({
      name,
      fileType,
      getPath,
      fileState: state[fileType],
      serverUrl,
      wtToken,
      inventoryConfigPath: esoConfig.inventoryConfigPath,
      charactersConfigPath: esoConfig.charactersConfigPath,
      companionsConfigPath: esoConfig.companionsConfigPath,
      enqueueUpload,
      maybeCheckUpdate,
    })

  registerWatcher(
    esoConfig.temperCharactersPath,
    "TemperCharacters.lua",
    handlerFor("Characters", "characters", () => esoConfig.temperCharactersPath)
  )

  registerWatcher(
    esoConfig.temperCompanionsPath,
    "TemperCompanions.lua",
    handlerFor("Companions", "companions", () => esoConfig.temperCompanionsPath)
  )

  registerWatcher(
    esoConfig.temperCatalogPath,
    "TemperCatalog.lua",
    handlerFor("Catalog", "catalog", () => esoConfig.temperCatalogPath)
  )

  registerWatcher(
    esoConfig.inventoryPath,
    "TemperInventory.lua",
    handlerFor("Inventory", "inventory", () => esoConfig.inventoryPath)
  )

  registerWatcher(
    esoConfig.dataMiningPath,
    "TemperDataMining.lua",
    handlerFor("DataMining", "data-mining", () => esoConfig.dataMiningPath)
  )

  registerWatcher(
    esoConfig.temperErrorsPath,
    "TemperErrors.lua",
    handlerFor("Errors", "errors", () => esoConfig.temperErrorsPath)
  )

  registerWatcher(
    esoConfig.temperSalesPath,
    "TemperSales.lua",
    handlerFor("Sales", "sales", () => esoConfig.temperSalesPath)
  )

  if (watchers.length === 0) {
    logError("No files found to watch. Exiting.")
    process.exit(1)
  }

  if (existsSync(esoConfig.inventoryPath)) {
    try {
      log("Syncing inventory settings...")
      const stable = await readFileWhenStable(esoConfig.inventoryPath)
      if (stable === null) {
        log("Inventory sync skipped — file missing or never stabilized")
      } else if (!looksStructurallyComplete(stable.content)) {
        log("Inventory sync skipped — content looks truncated (no closing brace)")
      } else {
        const result = await dispatch("inventory", stable.content, wtToken, serverUrl, {
          inventoryConfigPath: esoConfig.inventoryConfigPath,
        })
        if (result.ok && result.inventoryConfigSideFileHash != null) {
          state.inventory.lastInventoryConfigWriteBackHash = result.inventoryConfigSideFileHash
        }
        if (result.ok && result.writeBack != null) {
          if (matchesSnapshot(esoConfig.inventoryPath, stable.snapshot)) {
            writeFileAtomicWithRetry(esoConfig.inventoryPath, result.writeBack)
            state.inventory.lastWriteBackContentHash = hashContent(result.writeBack)
            log("Inventory settings synced")
          } else {
            log("Inventory sync write-back skipped — file changed since the stable read")
          }
        } else if (result.ok) {
          log("Inventory settings up to date")
        } else {
          logError(`Inventory sync failed: ${result.error}`)
        }
      }
    } catch (err) {
      logError(`Startup sync error: ${err instanceof Error ? err.message : err}`)
    }
  }

  const updateInterval = setInterval(() => {
    lastUpdateCheckMs = Date.now()
    tryUpdate(serverUrl).catch((err) => {
      logError(`Hourly update check failed: ${err instanceof Error ? err.message : err}`)
    })
  }, HOURLY_UPDATE_CHECK_MS)

  log(`Watching ${watchers.length} file(s)`)

  const cleanup = () => {
    log("Shutting down")
    clearInterval(updateInterval)
    for (const path of watchers) {
      unwatchFile(path)
    }
    process.exit(0)
  }

  process.on("SIGINT", cleanup)
  process.on("SIGTERM", cleanup)
}

function reportFatal(kind: string, err: unknown): undefined {
  const detail = err instanceof Error ? `${err.message}\n${err.stack ?? "(no stack)"}` : String(err)
  logError(`FATAL ${kind} — watcher exiting: ${detail}`)
  process.exit(1)
}

process.on("uncaughtException", (err) => reportFatal("uncaught exception", err))
process.on("unhandledRejection", (reason) => reportFatal("unhandled rejection", reason))

main().catch((err) => {
  logError(`Fatal error: ${err instanceof Error ? err.message : err}`)
  process.exit(1)
})
