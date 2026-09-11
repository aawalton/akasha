import type {
  CompatLib,
  CoordFn,
  EsoVoidFn,
  GlobalObjectTable,
  SuccessFn,
} from "akasha/temper/lib-map-ping/map-ping-types/map-ping-types.module.code.ts"

export function asEsoVoidFn(value: unknown): EsoVoidFn {
  return value as EsoVoidFn
}

export function asGlobalObjectTable(value: unknown): GlobalObjectTable {
  return value as GlobalObjectTable
}

export function asCoordFn(value: unknown): CoordFn {
  return value as CoordFn
}

export function asSuccessFn(value: unknown): SuccessFn {
  return value as SuccessFn
}

export function asCompatLib(value: unknown): CompatLib {
  return value as CompatLib
}
