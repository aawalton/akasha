import { asNumber, asString, asTableKey } from "../shifter-casts/shifter-casts.module.code.ts"
import {
  LIB_IDENTIFIER,
  SPECIAL_TYPE_TEXTS,
} from "../shifter-constants/shifter-constants.module.code.ts"
import { getValueOrCallback } from "../shifter-helpers/shifter-helpers.module.code.ts"
import { allowedShifterBoxEvents } from "../shifter-state/shifter-state.module.code.ts"
import type { ShifterBoxList } from "../shifter-types/shifter-types.module.code.ts"

export function errorText(textTemplate: string, ...args: unknown[]): string {
  let errorTextStr = `${LIB_IDENTIFIER}_Error: `
  if (args[0] !== undefined) {
    errorTextStr = errorTextStr + string.format(textTemplate, ...args)
  } else {
    errorTextStr = errorTextStr + textTemplate
  }
  return errorTextStr
}

function validateType(
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>,
  typeText: string
): undefined {
  let customValue = customSettingsTbl[parameterName]
  if (customValue !== undefined) {
    customValue = getValueOrCallback(customValue, customSettingsTbl)

    const isSpecialTypeText = SPECIAL_TYPE_TEXTS[typeText] ?? false
    let assertionBool = !isSpecialTypeText && type(customValue) === typeText
    let typeTextLocal = typeText
    if (typeText === "number+") {
      assertionBool = asNumber(customValue) > 0
      typeTextLocal = `${typeText} and positive`
    } else if (typeText === "number-") {
      assertionBool = asNumber(customValue) < 0
      typeTextLocal = `${typeText} and negative`
    } else if (typeText === "stringValue") {
      assertionBool =
        type(customValue) === "string" && (customValue === "value" || customValue === "key")
      typeTextLocal = "either 'value' or 'key'"
    } else if (typeText === "sound") {
      const sounds = SOUNDS
      assertionBool = type(customValue) === "string" && sounds[asString(customValue)] !== undefined
      typeTextLocal = "String and existing in global SOUNDS table"
    }
    assert(
      assertionBool === true,
      errorText(
        `Invalid %s parameter '%s' provided! Must be ${tostring(typeTextLocal)}`,
        parameterName,
        tostring(customValue)
      )
    )[0]
    settingsTbl[parameterName] = customValue
  }
}

export function assertValidShifterBoxEvent(shifterBoxEvent: number): undefined {
  assert(
    allowedShifterBoxEvents.get(shifterBoxEvent) === true,
    errorText(
      "Invalid shifterBoxEvent parameter provided! Must be one of table 'LibShifterBox.allowedEventNames'!"
    )
  )[0]
}

export function assertKeyIsNotInTable(
  key: unknown,
  value: unknown,
  self: ShifterBoxList,
  sideControl: Control
): undefined {
  const masterList = self.masterList
  assert(
    masterList.get(asTableKey(key)) === undefined,
    errorText(
      "Violation of UNIQUE KEY. Cannot insert duplicate key '%s' with value '%s' in control '%s'. The statement has been terminated.",
      tostring(key),
      tostring(value),
      sideControl.GetName()
    )
  )[0]
}

export function assertPositiveNumber(
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>
): undefined {
  validateType(customSettingsTbl, parameterName, settingsTbl, "number+")
}
export function assertBoolean(
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>
): undefined {
  validateType(customSettingsTbl, parameterName, settingsTbl, "boolean")
}
export function assertString(
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>
): undefined {
  validateType(customSettingsTbl, parameterName, settingsTbl, "string")
}
export function assertStringValueKey(
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>
): undefined {
  validateType(customSettingsTbl, parameterName, settingsTbl, "stringValue")
}
export function assertFunction(
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>
): undefined {
  validateType(customSettingsTbl, parameterName, settingsTbl, "function")
}
export function assertSound(
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>
): undefined {
  validateType(customSettingsTbl, parameterName, settingsTbl, "sound")
}
export function assertTable(
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>
): undefined {
  validateType(customSettingsTbl, parameterName, settingsTbl, "table")
}
