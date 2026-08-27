import type {
  DecodeInstance,
  GlobalTable,
  LdeValue,
  LdeValueArray,
  LuaArray,
  LuaTable,
  OptionalNumber,
} from "./types"

export type DecoderMethod = (this: void, self: DecodeInstance, controlChar: string) => unknown

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asLuaArray(value: unknown): LuaArray {
  return value as LuaArray
}

export function asLuaTable(value: unknown): LuaTable {
  return value as LuaTable
}

export function asLdeValue(value: unknown): LdeValue {
  return value as LdeValue
}

export function asString(value: unknown): string {
  return value as string
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asOptionalNumber(value: unknown): OptionalNumber {
  return value as OptionalNumber
}

export function asLdeValueArray(value: unknown): LdeValueArray {
  return value as LdeValueArray
}

export function asDecoderMethod(value: unknown): DecoderMethod {
  return value as DecoderMethod
}
