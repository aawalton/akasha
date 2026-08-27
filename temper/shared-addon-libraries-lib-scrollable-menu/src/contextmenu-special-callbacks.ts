import { asContextMenuClass, asLsmCastContextMenuCallbackEntryUndefined } from "./casts-1a"
import { asLsmCastRecordNumberUnknown, asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknown2, asLsmCastRecordStringUnknownUndefined } from "./casts-2b"
import { asLsmCastUnknown, asObject } from "./casts-4"
import { lib } from "./lib-state"

const tos = tostring
const classes = asLsmCastRecordStringUnknown(lib.classes)
const contextMenuClass = asContextMenuClass(classes.contextMenuClass)

contextMenuClass.RegisterSpecialCallback = function (
  this: ContextMenuObject,
  uniqueAddonName?: string,
  callbackName?: string,
  specialCallbackData?: Record<string, unknown>
): boolean {
  if (
    uniqueAddonName === undefined ||
    uniqueAddonName === "" ||
    callbackName === undefined ||
    callbackName === ""
  ) {
    return false
  }
  if (specialCallbackData === undefined || type(specialCallbackData[callbackName]) !== "function") {
    return false
  }

  const contextMenuCallbacksRegistered = asLsmCastUnknown(lib.contextMenuCallbacksRegistered)
  const counterAddons = contextMenuCallbacksRegistered.length + 1
  contextMenuCallbacksRegistered[counterAddons - 1] = {}
  asLsmCastRecordStringUnknown(contextMenuCallbacksRegistered[counterAddons - 1])[uniqueAddonName] =
    {}
  asLsmCastRecordStringUnknown(
    asLsmCastRecordStringUnknown(contextMenuCallbacksRegistered[counterAddons - 1])[uniqueAddonName]
  )[callbackName] = {
    callback: specialCallbackData[callbackName],
    specialData: specialCallbackData,
  }
  return true
}

contextMenuClass.UnregisterSpecialCallback = function (
  this: ContextMenuObject,
  uniqueAddonName?: string,
  callbackName?: string
): boolean | undefined {
  if (uniqueAddonName === undefined || uniqueAddonName === "") {
    return false
  }

  const toDeleteIndices: Record<number, boolean> = {}
  const contextMenuCallbacksRegistered = asLsmCastRecordStringUnknown2(
    lib.contextMenuCallbacksRegistered
  )
  for (const [idx, registeredAddons] of ipairs(contextMenuCallbacksRegistered)) {
    for (const [loopedUniqueAddonName, registeredCallbacksRaw] of pairs(registeredAddons)) {
      let registeredCallbacks = asLsmCastRecordStringUnknownUndefined(registeredCallbacksRaw)
      if (loopedUniqueAddonName === uniqueAddonName) {
        if (callbackName === undefined) {
          registeredCallbacks = undefined
          toDeleteIndices[idx] = true
        } else {
          if (asLsmCastRecordStringUnknown(registeredCallbacks)[callbackName] !== undefined) {
            asLsmCastRecordStringUnknown(registeredCallbacks)[callbackName] = undefined
            if (NonContiguousCount(asObject(registeredCallbacks)) === 0) {
              registeredCallbacks = undefined
              toDeleteIndices[idx] = true
            }
          }
        }
      }
    }
  }

  if (NonContiguousCount(toDeleteIndices) > 0) {
    for (const [idx] of pairs(toDeleteIndices)) {
      asLsmCastRecordNumberUnknown(lib.contextMenuCallbacksRegistered)[idx] = undefined
    }
  }
  return undefined
}

contextMenuClass.RunSpecialCallback = function (
  this: ContextMenuObject,
  callbackName?: string
): unknown {
  const contextMenuCallbacksRegistered = asLsmCastRecordStringUnknown2(
    lib.contextMenuCallbacksRegistered
  )
  if (
    callbackName === undefined ||
    callbackName === "" ||
    contextMenuCallbacksRegistered.length === 0
  ) {
    return undefined
  }

  let retVar: unknown = false
  const openingControl = this.openingControl
  for (const [, registeredAddons] of ipairs(contextMenuCallbacksRegistered)) {
    for (const [_uniqueAddonName, registeredCallbacks] of pairs(registeredAddons)) {
      const callbackEntry = asLsmCastContextMenuCallbackEntryUndefined(
        asLsmCastRecordStringUnknown(registeredCallbacks)[callbackName]
      )
      if (callbackEntry !== undefined && callbackEntry.callback !== undefined) {
        const l_retVar = callbackEntry.callback(this, openingControl, callbackEntry.specialData)
        if (!retVar) {
          retVar = l_retVar
        }
      }
    }
  }
  return retVar
}
