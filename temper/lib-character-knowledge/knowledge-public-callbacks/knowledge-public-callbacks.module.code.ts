import { asCallback } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"

INTERNAL.callbacks = {
  [PUBLIC.EVENT_INITIALIZED]: {},
  [PUBLIC.EVENT_UPDATE_REFRESH]: {},
}

PUBLIC.RegisterForCallback = function (this: void, name, eventCode, callback): boolean {
  if (
    type(name) === "string" &&
    type(eventCode) === "number" &&
    type(callback) === "function" &&
    INTERNAL.callbacks[eventCode] !== undefined
  ) {
    INTERNAL.callbacks[eventCode][name] = callback
    return true
  }
  return false
}

PUBLIC.UnregisterForCallback = function (this: void, name, eventCode): boolean {
  if (
    type(name) === "string" &&
    type(eventCode) === "number" &&
    INTERNAL.callbacks[eventCode] !== undefined
  ) {
    INTERNAL.callbacks[eventCode][name] = asCallback(undefined)
    return true
  }
  return false
}

INTERNAL.FireCallbacks = function (this: void, eventCode, ...args): undefined {
  for (const [, callback] of pairs(INTERNAL.callbacks[eventCode])) {
    asCallback(callback)(eventCode, ...args)
  }
}
