import { asCallback } from "../casts"
import { Internal, Public } from "../internal/state"

Internal.callbacks = {
  [Public.EVENT_INITIALIZED]: {},
  [Public.EVENT_UPDATE_REFRESH]: {},
}

Public.RegisterForCallback = function (this: void, name, eventCode, callback): boolean {
  if (
    type(name) === "string" &&
    type(eventCode) === "number" &&
    type(callback) === "function" &&
    Internal.callbacks[eventCode] !== undefined
  ) {
    Internal.callbacks[eventCode][name] = callback
    return true
  }
  return false
}

Public.UnregisterForCallback = function (this: void, name, eventCode): boolean {
  if (
    type(name) === "string" &&
    type(eventCode) === "number" &&
    Internal.callbacks[eventCode] !== undefined
  ) {
    Internal.callbacks[eventCode][name] = asCallback(undefined)
    return true
  }
  return false
}

Internal.FireCallbacks = function (this: void, eventCode, ...args): undefined {
  for (const [_name, callback] of pairs(Internal.callbacks[eventCode])) {
    asCallback(callback)(eventCode, ...args)
  }
}
