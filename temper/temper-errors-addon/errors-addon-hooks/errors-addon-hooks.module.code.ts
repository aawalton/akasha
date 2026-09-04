import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { ADDON_NAME } from "../errors-addon-limits/errors-addon-limits.module.code.ts"
import { captureError } from "../errors-addon-record/errors-addon-record.module.code.ts"

const PRE_INIT_LUA_ERROR_NS = `${ADDON_NAME}_PreInitLuaError`
const PRE_INIT_LOW_MEMORY_NS = `${ADDON_NAME}_PreInitLowMemory`
const LIVE_LUA_ERROR_NS = `${ADDON_NAME}_LuaError`
const LIVE_LOW_MEMORY_NS = `${ADDON_NAME}_LowMemory`

interface BufferedRaw {
  eventCode: number
  errorString: unknown
  errorCode?: number
}

const BUFFERED: BufferedRaw[] = []

function bufferOne(
  this: void,
  eventCode: number,
  errorString: string,
  errorCode: number
): undefined {
  BUFFERED[BUFFERED.length] = { eventCode, errorString, errorCode }
}

function captureOne(
  this: void,
  eventCode: number,
  errorString: string,
  errorCode: number
): undefined {
  pcall(captureError, eventCode, errorString, errorCode)
}

export function registerPreInitHooks(): undefined {
  EVENT_MANAGER.RegisterForEvent(PRE_INIT_LUA_ERROR_NS, EVENT_LUA_ERROR, bufferOne)
  EVENT_MANAGER.RegisterForEvent(PRE_INIT_LOW_MEMORY_NS, EVENT_LUA_LOW_MEMORY, bufferOne)
}

export function unregisterPreInitHooks(): undefined {
  EVENT_MANAGER.UnregisterForEvent(PRE_INIT_LUA_ERROR_NS, EVENT_LUA_ERROR)
  EVENT_MANAGER.UnregisterForEvent(PRE_INIT_LOW_MEMORY_NS, EVENT_LUA_LOW_MEMORY)
}

export function flushBuffered(): undefined {
  for (const one of BUFFERED) {
    pcall(captureError, one.eventCode, one.errorString, one.errorCode)
  }
  BUFFERED.splice(0, BUFFERED.length)
}

export function registerErrorHooks(): undefined {
  EVENT_MANAGER.RegisterForEvent(LIVE_LUA_ERROR_NS, EVENT_LUA_ERROR, captureOne)
  EVENT_MANAGER.RegisterForEvent(LIVE_LOW_MEMORY_NS, EVENT_LUA_LOW_MEMORY, captureOne)
}
