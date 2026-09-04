import "../shifter-list-class/shifter-list-class.module.code.ts"
import "../shifter-list-methods-entries/shifter-list-methods-entries.module.code.ts"
import "../shifter-list-methods-rows/shifter-list-methods-rows.module.code.ts"
import "../shifter-list-methods-drag/shifter-list-methods-drag.module.code.ts"
import "../shifter-box-class/shifter-box-class.module.code.ts"
import "../shifter-lib-api/shifter-lib-api.module.code.ts"

import { asGlobalTable } from "../shifter-casts/shifter-casts.module.code.ts"
import { LIB_IDENTIFIER } from "../shifter-constants/shifter-constants.module.code.ts"
import { checkIfDraggedAndDisableUpdateHandler } from "../shifter-drag-helpers/shifter-drag-helpers.module.code.ts"
import { CM, EM, lib, validationTypeToFunc } from "../shifter-state/shifter-state.module.code.ts"
import {
  assertBoolean,
  assertFunction,
  assertPositiveNumber,
  assertSound,
  assertString,
  assertStringValueKey,
  assertTable,
  errorText,
} from "../shifter-validation/shifter-validation.module.code.ts"

const EVENT_ADD_ON_LOADED_NAMESPACE = `${LIB_IDENTIFIER}_EVENT_ADD_ON_LOADED`

const glob = asGlobalTable(globalThis)
assert(glob[LIB_IDENTIFIER] === undefined, errorText(GetString(LIBSHIFTERBOX_ALLREADY_LOADED)))[0]
glob[LIB_IDENTIFIER] = lib

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
