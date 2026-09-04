import {
  asCallbackObject,
  asGlobalTable,
  asLibHistoireGlobal,
  asLibHistoireInternal,
  asLogger,
} from "../histoire-casts/histoire-casts.module.code.ts"
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
} from "../histoire-constants/histoire-constants.module.code.ts"

const g = asGlobalTable(globalThis)

if (g[LIB_IDENTIFIER] != null) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

const callbackObject = asCallbackObject(ZO_CallbackObject.New())
if (LibDebugLogger === undefined) {
  error(`${LIB_IDENTIFIER} requires LibDebugLogger`)
}
const logger = asLogger(LibDebugLogger(LIB_IDENTIFIER))

const NAMESPACE_COUNTER = { next: 1 }

type EventManagerEventCallback = (this: void, eventCode: number, ...args: never[]) => void
function asEventManagerEventCallback(value: (...args: never[]) => void): EventManagerEventCallback {
  return value as EventManagerEventCallback
}

function registerForEvent(this: void, event: number, callback: (...args: never[]) => void): string {
  const namespace = LIB_IDENTIFIER + tostring(NAMESPACE_COUNTER.next)
  EVENT_MANAGER.RegisterForEvent(namespace, event, asEventManagerEventCallback(callback))
  NAMESPACE_COUNTER.next = NAMESPACE_COUNTER.next + 1
  return namespace
}

function unregisterForEvent(this: void, namespace: string, event: number): boolean {
  return EVENT_MANAGER.UnregisterForEvent(namespace, event)
}

function registerForUpdate(
  this: void,
  interval: number,
  callback: (...args: never[]) => void
): string {
  const namespace = LIB_IDENTIFIER + tostring(NAMESPACE_COUNTER.next)
  EVENT_MANAGER.RegisterForUpdate(namespace, interval, callback)
  NAMESPACE_COUNTER.next = NAMESPACE_COUNTER.next + 1
  return namespace
}

function unregisterForUpdate(this: void, namespace: string): boolean {
  return EVENT_MANAGER.UnregisterForUpdate(namespace)
}

export const internal = asLibHistoireInternal({
  callbackObject,
  callback: CALLBACK,
  class: {},
  logger,
  RegisterForEvent: registerForEvent,
  UnregisterForEvent: unregisterForEvent,
  RegisterForUpdate: registerForUpdate,
  UnregisterForUpdate: unregisterForUpdate,
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
