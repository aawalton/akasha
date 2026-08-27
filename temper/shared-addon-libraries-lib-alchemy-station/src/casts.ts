import type { Lib } from "./types"

export function asLib(value: unknown): Lib {
  return value as Lib
}
