import {
  asContextMenuClass,
  asLsmCastContextMenuCallbackEntryUndefined,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastRecordNumberUnknown,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknown2,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastUnknown,
  asObject,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

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
    for (const [, registeredCallbacks] of pairs(registeredAddons)) {
      const callbackEntry = asLsmCastContextMenuCallbackEntryUndefined(
        asLsmCastRecordStringUnknown(registeredCallbacks)[callbackName]
      )
      if (callbackEntry !== undefined && callbackEntry.callback !== undefined) {
        const lRetVar = callbackEntry.callback(this, openingControl, callbackEntry.specialData)
        if (!retVar) {
          retVar = lRetVar
        }
      }
    }
  }
  return retVar
}
