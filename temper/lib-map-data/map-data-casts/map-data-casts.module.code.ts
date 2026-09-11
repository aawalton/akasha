import type {
  GlobalObjectTable,
  Internal,
  Lib,
} from "akasha/temper/lib-map-data/map-data-types/map-data-types.module.code.ts"

export function asLib(value: unknown): Lib {
  return value as Lib
}

export function asInternal(value: unknown): Internal {
  return value as Internal
}

export function asGlobalObjectTable(value: unknown): GlobalObjectTable {
  return value as GlobalObjectTable
}
