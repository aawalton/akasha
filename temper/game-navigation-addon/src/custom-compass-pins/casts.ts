import type { CompassLayoutResetFn, CompassLayoutUpdateFn, CompassPinData } from "./types"

export type GlobalTable = Record<string, unknown>

export type PinTypeId = number

export type TableKey = AnyNotNil

export type MaybeUpdateFn = CompassLayoutUpdateFn | undefined

export type MaybeResetFn = CompassLayoutResetFn | undefined

export type OptString = string | undefined

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asPinTypeId(value: unknown): PinTypeId {
  return value as PinTypeId
}

export function asTableKey(value: unknown): TableKey {
  return value as TableKey
}

export function asCompassPinData(value: unknown): CompassPinData {
  return value as CompassPinData
}

export function asMaybeUpdateFn(value: unknown): MaybeUpdateFn {
  return value as MaybeUpdateFn
}

export function asMaybeResetFn(value: unknown): MaybeResetFn {
  return value as MaybeResetFn
}

export function asOptString(value: unknown): OptString {
  return value as OptString
}

export function asCustomCompassPins(value: unknown): CustomCompassPins {
  return value as CustomCompassPins
}
