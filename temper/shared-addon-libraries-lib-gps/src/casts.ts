import type { CompatLib, GlobalFnTable, GlobalObjectTable, Lib, SetMapResultFn } from "./types"

export function asGlobalFnTable(value: unknown): GlobalFnTable {
  return value as GlobalFnTable
}

export function asGlobalObjectTable(value: unknown): GlobalObjectTable {
  return value as GlobalObjectTable
}

export function asSetMapResultFn(value: unknown): SetMapResultFn {
  return value as SetMapResultFn
}

export function asLib(value: unknown): Lib {
  return value as Lib
}

export function asCompatLib(value: unknown): CompatLib {
  return value as CompatLib
}
