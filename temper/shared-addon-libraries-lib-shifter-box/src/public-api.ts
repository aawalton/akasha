import "./list-class"
import "./list-methods-entries"
import "./list-methods-rows"
import "./list-methods-drag"
import "./shifterbox-class"
import "./lib-api"

import { asGlobalTable } from "./casts"
import { LIB_IDENTIFIER } from "./constants"
import { checkIfDraggedAndDisableUpdateHandler } from "./drag-helpers"
import { CM, EM, lib, validationTypeToFunc } from "./state"
import type { Lib } from "./types"
import {
  assertBoolean,
  assertFunction,
  assertPositiveNumber,
  assertSound,
  assertString,
  assertStringValueKey,
  assertTable,
  errorText,
} from "./validation"

declare global {
  var LibShifterBox: Lib
}

const EVENT_ADD_ON_LOADED_NAMESPACE = `${LIB_IDENTIFIER}_EVENT_ADD_ON_LOADED`

const glob = asGlobalTable(globalThis)
assert(glob[LIB_IDENTIFIER] === undefined, errorText(GetString(LIBSHIFTERBOX_ALLREADY_LOADED)))[0]
globalThis.LibShifterBox = lib

function onAddOnLoaded(this: void, _eventCode: number, ...args: unknown[]): undefined {
  const addonName = args[0]
  if (addonName !== LIB_IDENTIFIER) return
  EM.UnregisterForEvent(EVENT_ADD_ON_LOADED_NAMESPACE, EVENT_ADD_ON_LOADED)

  validationTypeToFunc.set("boolean", assertBoolean)
  validationTypeToFunc.set("stringValueKey", assertStringValueKey)
  validationTypeToFunc.set("string", assertString)
  validationTypeToFunc.set("positiveNumber", assertPositiveNumber)
  validationTypeToFunc.set("function", assertFunction)
  validationTypeToFunc.set("sound", assertSound)
  validationTypeToFunc.set("table", assertTable)

  if (LibAddonMenu2 !== undefined) {
    CM.RegisterCallback("LAM-PanelClosed", checkIfDraggedAndDisableUpdateHandler)
  }
}

EM.RegisterForEvent(EVENT_ADD_ON_LOADED_NAMESPACE, EVENT_ADD_ON_LOADED, onAddOnLoaded)
