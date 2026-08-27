import { asLib } from "./casts"
import { CALLBACK, LIB_IDENTIFIER, MAP_PING_STATE } from "./constants"
import type { InternalState, Lib } from "./types"

function createLogger(this: void): DebugLogger {
  if (LibDebugLogger === undefined) {
    error(`${LIB_IDENTIFIER} requires LibDebugLogger`)
  }
  return LibDebugLogger(LIB_IDENTIFIER)
}

let nextNamespaceId = 1

function registerForEvent<T extends unknown[] = unknown[]>(
  this: void,
  event: number,
  callback: (eventCode: number, ...args: T) => void
): string {
  const namespace = LIB_IDENTIFIER + tostring(nextNamespaceId)
  EVENT_MANAGER.RegisterForEvent<T>(namespace, event, callback)
  nextNamespaceId = nextNamespaceId + 1
  return namespace
}

function unregisterForEvent(this: void, namespace: string, event: number): boolean {
  return EVENT_MANAGER.UnregisterForEvent(namespace, event)
}

function registerForUpdate(this: void, interval: number, callback: (this: void) => void): string {
  const namespace = LIB_IDENTIFIER + tostring(nextNamespaceId)
  EVENT_MANAGER.RegisterForUpdate(namespace, interval, callback)
  nextNamespaceId = nextNamespaceId + 1
  return namespace
}

function unregisterForUpdate(this: void, namespace: string): boolean {
  return EVENT_MANAGER.UnregisterForUpdate(namespace)
}

export const internal: InternalState = {
  callbackObject: ZO_CallbackObject.New(),
  callback: CALLBACK,
  MapPingState: MAP_PING_STATE,
  logger: createLogger(),
  RegisterForEvent: registerForEvent,
  UnregisterForEvent: unregisterForEvent,
  RegisterForUpdate: registerForUpdate,
  UnregisterForUpdate: unregisterForUpdate,
  FireCallbacks(this: InternalState, eventName: string, ...args: unknown[]): undefined {
    this.callbackObject.FireCallbacks(eventName, ...args)
  },
  RegisterCallback(
    this: InternalState,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    this.callbackObject.RegisterCallback(eventName, callback)
  },
  UnregisterCallback(
    this: InternalState,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    this.callbackObject.UnregisterCallback(eventName, callback)
  },
}

export const lib: Lib = asLib({
  internal,
  MapPingState: MAP_PING_STATE,
  callback: CALLBACK,
})
