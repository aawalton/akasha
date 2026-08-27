import {
  asCallbackObject,
  asGlobalTable,
  asLibHistoireGlobal,
  asLibHistoireInternal,
  asLogger,
} from "./casts"
import {
  CALLBACK,
  LIB_IDENTIFIER,
  REQUEST_MODE_AUTO,
  REQUEST_MODE_OFF,
  REQUEST_MODE_ON,
  STOP_REASON_ITERATION_COMPLETED,
  STOP_REASON_LAST_CACHED_EVENT_REACHED,
  STOP_REASON_MANAGED_RANGE_LOST,
  STOP_REASON_MANUAL_STOP,
  ZOOM_MODE_AUTO,
  ZOOM_MODE_FULL_RANGE,
  ZOOM_MODE_MISSING_RANGE,
} from "./constants"

const g = asGlobalTable(globalThis)

if (g[LIB_IDENTIFIER] != null) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

const callbackObject = asCallbackObject(ZO_CallbackObject.New())
const logger = asLogger(LibDebugLogger(LIB_IDENTIFIER))

let nextNamespaceId = 1

type EventManagerEventCallback = (this: void, eventCode: number, ...args: never[]) => void
function asEventManagerEventCallback(value: (...args: never[]) => void): EventManagerEventCallback {
  return value as EventManagerEventCallback
}

function RegisterForEvent(this: void, event: number, callback: (...args: never[]) => void): string {
  const namespace = LIB_IDENTIFIER + tostring(nextNamespaceId)
  EVENT_MANAGER.RegisterForEvent(namespace, event, asEventManagerEventCallback(callback))
  nextNamespaceId = nextNamespaceId + 1
  return namespace
}

function UnregisterForEvent(this: void, namespace: string, event: number): boolean {
  return EVENT_MANAGER.UnregisterForEvent(namespace, event)
}

function RegisterForUpdate(
  this: void,
  interval: number,
  callback: (...args: never[]) => void
): string {
  const namespace = LIB_IDENTIFIER + tostring(nextNamespaceId)
  EVENT_MANAGER.RegisterForUpdate(namespace, interval, callback)
  nextNamespaceId = nextNamespaceId + 1
  return namespace
}

function UnregisterForUpdate(this: void, namespace: string): boolean {
  return EVENT_MANAGER.UnregisterForUpdate(namespace)
}

export const internal = asLibHistoireInternal({
  callbackObject,
  callback: CALLBACK,
  class: {},
  logger,
  RegisterForEvent,
  UnregisterForEvent,
  RegisterForUpdate,
  UnregisterForUpdate,
  UI_LOAD_TIME: GetTimeStamp(),
  WORLD_NAME: GetWorldName(),
  REQUEST_MODE_AUTO,
  REQUEST_MODE_OFF,
  REQUEST_MODE_ON,
  ZOOM_MODE_AUTO,
  ZOOM_MODE_FULL_RANGE,
  ZOOM_MODE_MISSING_RANGE,
  STOP_REASON_MANUAL_STOP,
  STOP_REASON_LAST_CACHED_EVENT_REACHED,
  STOP_REASON_ITERATION_COMPLETED,
  STOP_REASON_MANAGED_RANGE_LOST,
})

export const lib = asLibHistoireGlobal({ internal })
g[LIB_IDENTIFIER] = lib

internal.FireCallbacks = function (this, ...args: unknown[]): undefined {
  callbackObject.FireCallbacks(...args)
}
internal.RegisterCallback = function (this, ...args: unknown[]): undefined {
  callbackObject.RegisterCallback(...args)
}
internal.UnregisterCallback = function (this, ...args: unknown[]): undefined {
  callbackObject.UnregisterCallback(...args)
}
