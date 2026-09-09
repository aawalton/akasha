import type { DestinationsDefaults } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"

const LMP = LibMapPins

export const DESTINATIONS_PIN_PRIORITY_OFFSET = 1

export function redrawAllPins(pinType: string): undefined {
  LMP.RefreshPins(pinType)
  COMPASS_PINS.RefreshPins(pinType)
}

export function redrawCompassPinsOnly(pinType: string): undefined {
  COMPASS_PINS.RefreshPins(pinType)
}

export function setUnknownDestLayoutKey(key: string, newValue: unknown): undefined {
  LMP.SetLayoutKey(PIN_TYPES.UNKNOWN, key, newValue)
}

export function redrawAllAchievementPins(): undefined {
  for (const pinName of DRTV.AchPins) {
    LMP.RefreshPins(PIN_TYPES[pinName])
    COMPASS_PINS.RefreshPins(PIN_TYPES[pinName])
    LMP.RefreshPins(PIN_TYPES[`${pinName}_DONE`])
    COMPASS_PINS.RefreshPins(PIN_TYPES[`${pinName}_DONE`])
  }
}

export interface PinLayoutSettings {
  type: number
  size: number
  level: number
  maxDistance: number
  tint: number[]
  textcolor: number[]
}

type PinLayoutSettingsTable = Record<string, PinLayoutSettings | undefined>

function asPinLayoutSettingsTable(pins: object): PinLayoutSettingsTable {
  return pins as PinLayoutSettingsTable
}

export function pinLayoutSettings(
  pins: DestinationsDefaults["pins"],
  name: string
): PinLayoutSettings {
  const entry = asPinLayoutSettingsTable(pins)[name]
  if (entry === undefined) {
    throw new Error(`TemperDestinations settings: unknown pin layout key "${name}"`)
  }
  return entry
}

export function compassPinLayout(pinType: string): CompassPinLayout {
  const layout = COMPASS_PINS.pinLayouts[pinType]
  if (layout === undefined) {
    throw new Error(`TemperDestinations settings: no compass layout for pin type "${pinType}"`)
  }
  return layout
}

export function isFilterEnabled(filters: Record<string, boolean>, pinType: string): boolean {
  return filters[pinType] ?? false
}

export function choiceAt(choices: readonly string[], luaIndex: number): string {
  return choices[luaIndex - 1] ?? ""
}

export function texturePathAt(paths: readonly string[], luaIndex: number): string {
  return paths[luaIndex - 1] ?? ""
}

export function unpackRgb(color: readonly number[]): LuaMultiReturn<[number, number, number]> {
  return $multi(color[0] ?? 1, color[1] ?? 1, color[2] ?? 1)
}

export function unpackRgba(
  color: readonly number[]
): LuaMultiReturn<[number, number, number, number | undefined]> {
  return $multi(color[0] ?? 1, color[1] ?? 1, color[2] ?? 1, color[3])
}

export function applyTint(control: TextureControl, tint: readonly number[]): undefined {
  control.SetColor(tint[0] ?? 1, tint[1] ?? 1, tint[2] ?? 1, tint[3])
}

export function colorDefaultRgb(color: readonly number[]): { r: number; g: number; b: number } {
  return { r: color[0] ?? 1, g: color[1] ?? 1, b: color[2] ?? 1 }
}

export function colorDefaultRgba(color: readonly number[]): {
  r: number
  g: number
  b: number
  a: number | undefined
} {
  return { r: color[0] ?? 1, g: color[1] ?? 1, b: color[2] ?? 1, a: color[3] }
}

const colorCodes = DEFAULTS.miscColorCodes

export function accountWideColored(stringKey: string): string {
  return colorCodes.settingsTextAccountWide.Colorize(getSettingsString(stringKey))
}

export function perCharName(stringKey: string): string {
  return accountWideColored(stringKey) + " " + accountWideColored("DEST_SETTINGS_PER_CHAR")
}

export function perCharToggleTooltip(): string {
  return accountWideColored("DEST_SETTINGS_PER_CHAR_TOGGLE_TT")
}

export function tooltipWithPerChar(stringKey: string): string {
  return getSettingsString(stringKey) + " " + perCharToggleTooltip()
}

export function achHeaderName(stringKey: string): string {
  return colorCodes.settingsTextAchHeaders.Colorize(getSettingsString(stringKey))
}

export function reloadWarningColored(stringKey: string): string {
  return colorCodes.settingsTextReloadWarning.Colorize(getSettingsString(stringKey))
}
