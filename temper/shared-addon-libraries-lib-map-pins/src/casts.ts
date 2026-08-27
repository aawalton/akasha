import type { GamepadFilterInfo, LmpHookPin, LmpMapPinClass, LmpPinManager } from "./types"

export type GlobalTable = Record<string, unknown>

export type PinTypeId = number | undefined
export type LmpMapPin = LmpMapPinClass
export type HookPin = LmpHookPin
export type ColorTuple = [number, number, number, number]
export type TableKey = AnyNotNil
export type FilterPanel = ResolvedFilterPanel
export type GrayscaleFn = (this: void, pin: unknown) => unknown
export type FilterTooltipFn = (this: void) => string
export type OptionalObject = object | undefined

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asPinTypeId(value: unknown): PinTypeId {
  return value as PinTypeId
}

export function asLmpPinManager(value: unknown): LmpPinManager {
  return value as LmpPinManager
}

export function asLmpMapPin(value: unknown): LmpMapPin {
  return value as LmpMapPin
}

export function asHookPin(value: unknown): HookPin {
  return value as HookPin
}

export function asColorTuple(value: unknown): ColorTuple {
  return value as ColorTuple
}

export function asString(value: unknown): string {
  return value as string
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

export function asTableKey(value: unknown): TableKey {
  return value as TableKey
}

export function asControl(value: unknown): Control {
  return value as Control
}

export function asFilterPanel(value: unknown): FilterPanel {
  return value as FilterPanel
}

export function asGamepadFilterInfo(value: unknown): GamepadFilterInfo {
  return value as GamepadFilterInfo
}

export function asGrayscaleFn(value: unknown): GrayscaleFn {
  return value as GrayscaleFn
}

export function asFilterTooltipFn(value: unknown): FilterTooltipFn {
  return value as FilterTooltipFn
}

export function asOptionalObject(value: unknown): OptionalObject {
  return value as OptionalObject
}
