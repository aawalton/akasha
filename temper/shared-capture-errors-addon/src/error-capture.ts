import type { CaptureWriter } from "@temper/shared-capture-core/define-capture-writer"
import type { ErrorEntry, ErrorsPayload } from "@akasha/temper-capture-errors/errors-payload"
import { ADDON_NAME, CALLSTACK_MAX_LEN, MAX_ENTRIES } from "./constants"

let savedVariablesAccessor: CaptureWriter<ErrorsPayload>["getSavedVariables"] | undefined

export function setSavedVariablesAccessor(
  accessor: CaptureWriter<ErrorsPayload>["getSavedVariables"]
): undefined {
  savedVariablesAccessor = accessor
}

function getSavedVariables(this: void): ErrorsPayload {
  if (savedVariablesAccessor === undefined) {
    throw new Error("TemperErrors saved-variables accessor not set — init has not run.")
  }
  return savedVariablesAccessor()
}

const PRE_INIT_LUA_ERROR_NS = `${ADDON_NAME}_PreInitLuaError`
const PRE_INIT_LOW_MEMORY_NS = `${ADDON_NAME}_PreInitLowMemory`
const LIVE_LUA_ERROR_NS = `${ADDON_NAME}_LuaError`
const LIVE_LOW_MEMORY_NS = `${ADDON_NAME}_LowMemory`

interface BufferedRaw {
  eventCode: number
  errorString: unknown
  errorCode?: number
}

let tempDb: BufferedRaw[] = []

function parseStringMatchAsString(matched: unknown): string | null {
  return typeof matched === "string" ? matched : null
}

export function sanitizeTraceback(traceback: string): string {
  const [stripped] = string.gsub(traceback, "%s*<Locals>.-</Locals>", "")
  if (stripped.length <= CALLSTACK_MAX_LEN) {
    return stripped
  }
  return `${stripped.slice(0, CALLSTACK_MAX_LEN)}…`
}

export function splitTraceback(errorString: string): { message: string; traceback: string } {
  const [messagePart, tracebackBody] = string.match(errorString, "(.+)\nstack traceback:(.+)")
  const message = parseStringMatchAsString(messagePart)
  const traceback = parseStringMatchAsString(tracebackBody)
  if (message !== null && traceback !== null) {
    return { message, traceback: sanitizeTraceback(`stack traceback:${traceback}`) }
  }
  return { message: errorString, traceback: sanitizeTraceback(errorString) }
}

function addonFrameFolders(traceback: string): string[] {
  const folders: string[] = []
  for (const [folder] of string.gmatch(traceback, "user:/AddOns/([^/]+)/")) {
    const parsed = parseStringMatchAsString(folder)
    if (parsed !== null) {
      folders[folders.length] = parsed
    }
  }
  return folders
}

function attributedAddonFolder(traceback: string): string | undefined {
  const folders = addonFrameFolders(traceback)
  if (folders.length === 0) {
    return undefined
  }
  const registry = TemperBuildIds
  if (registry !== undefined) {
    for (const folder of folders) {
      if (typeof registry[folder] === "string") {
        return folder
      }
    }
  }
  return folders[0]
}

function attributedBuildId(folder: string | undefined): string | undefined {
  if (folder === undefined) {
    return undefined
  }
  const registry = TemperBuildIds
  if (registry === undefined) {
    return undefined
  }
  const sha = registry[folder]
  return typeof sha === "string" ? sha : undefined
}

function snapshotBuildIds(): Record<string, string> | undefined {
  const registry = TemperBuildIds
  if (registry === undefined) {
    return undefined
  }
  const snapshot: Record<string, string> = {}
  for (const folder in registry) {
    const sha = registry[folder]
    if (typeof sha === "string") {
      snapshot[folder] = sha
    }
  }
  return snapshot
}

function hasVisibleContent(s: string): boolean {
  const [visible] = string.match(s, "%S")
  return parseStringMatchAsString(visible) !== null
}

function handlerSideStack(): string {
  if (typeof debug === "object" && typeof debug.traceback === "function") {
    return `\nhandler-side stack (not the error origin):\n${debug.traceback()}`
  }
  return ""
}

export function classifyError(
  errorString: unknown,
  eventCode: number,
  errorCode: number | undefined
): { message: string; traceback: string } {
  if (typeof errorString === "string" && hasVisibleContent(errorString)) {
    return splitTraceback(errorString)
  }
  const ctx = `eventCode=${eventCode} errorCode=${errorCode ?? "nil"}`
  const sentinel =
    typeof errorString === "string"
      ? `<empty or whitespace lua error> ${ctx}`
      : `<non-string lua error type=${typeof errorString} value=${tostring(errorString)}> ${ctx}`
  return {
    message: sanitizeTraceback(`${sentinel}${handlerSideStack()}`),
    traceback: sanitizeTraceback(`<no-lua-traceback> ${ctx}`),
  }
}

function ensureEntries(sv: ErrorsPayload): ErrorEntry[] {
  const current = sv.entries
  if (current !== undefined) {
    return current
  }
  const created: ErrorEntry[] = []
  sv.entries = created
  return created
}

export function captureError(
  this: void,
  eventCode: number,
  errorString: unknown,
  errorCode?: number
): undefined {
  const entries = ensureEntries(getSavedVariables())
  const { message, traceback } = classifyError(errorString, eventCode, errorCode)
  const now = GetTimeStamp()
  const attributed = attributedAddonFolder(traceback)
  const buildId = attributedBuildId(attributed)
  const buildIds = snapshotBuildIds()

  for (const existing of entries) {
    if (existing.traceback === traceback) {
      existing.count = existing.count + 1
      existing.lastSeenAt = now
      if (attributed !== undefined) {
        existing.attributedAddon = attributed
      }
      if (buildId !== undefined) {
        existing.attributedBuildId = buildId
      }
      if (buildIds !== undefined) {
        existing.buildIds = buildIds
      }
      return
    }
  }

  if (entries.length >= MAX_ENTRIES) {
    let oldestIdx = 0
    let oldestAt = entries[0]?.lastSeenAt ?? now
    for (let i = 1; i < entries.length; i++) {
      const entry = entries[i]
      if (entry !== undefined && entry.lastSeenAt < oldestAt) {
        oldestAt = entry.lastSeenAt
        oldestIdx = i
      }
    }
    entries.splice(oldestIdx, 1)
  }

  const entry: ErrorEntry = {
    traceback,
    message,
    count: 1,
    firstSeenAt: now,
    lastSeenAt: now,
    account: GetDisplayName(),
    character: GetUnitName("player"),
    world: GetWorldName(),
    esoVersion: GetESOVersionString(),
    apiVersion: GetAPIVersion(),
    eventCode,
  }
  if (errorCode !== undefined) {
    entry.errorCode = errorCode
  }
  if (attributed !== undefined) {
    entry.attributedAddon = attributed
  }
  if (buildId !== undefined) {
    entry.attributedBuildId = buildId
  }
  if (buildIds !== undefined) {
    entry.buildIds = buildIds
  }
  entries[entries.length] = entry
}

export function registerPreInitHooks(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    PRE_INIT_LUA_ERROR_NS,
    EVENT_LUA_ERROR,
    function (this: void, eventCode: number, errorString: string, errorCode: number): undefined {
      tempDb[tempDb.length] = { eventCode, errorString, errorCode }
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    PRE_INIT_LOW_MEMORY_NS,
    EVENT_LUA_LOW_MEMORY,
    function (this: void, eventCode: number, errorString: string, errorCode: number): undefined {
      tempDb[tempDb.length] = { eventCode, errorString, errorCode }
    }
  )
}

export function unregisterPreInitHooks(): undefined {
  EVENT_MANAGER.UnregisterForEvent(PRE_INIT_LUA_ERROR_NS, EVENT_LUA_ERROR)
  EVENT_MANAGER.UnregisterForEvent(PRE_INIT_LOW_MEMORY_NS, EVENT_LUA_LOW_MEMORY)
}

export function flushTempDb(): undefined {
  for (const buffered of tempDb) {
    const [_ok] = pcall(captureError, buffered.eventCode, buffered.errorString, buffered.errorCode)
  }
  tempDb = []
}

export function registerErrorHooks(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    LIVE_LUA_ERROR_NS,
    EVENT_LUA_ERROR,
    function (this: void, eventCode: number, errorString: string, errorCode: number): undefined {
      const [_ok] = pcall(captureError, eventCode, errorString, errorCode)
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    LIVE_LOW_MEMORY_NS,
    EVENT_LUA_LOW_MEMORY,
    function (this: void, eventCode: number, errorString: string, errorCode: number): undefined {
      const [_ok] = pcall(captureError, eventCode, errorString, errorCode)
    }
  )
}
