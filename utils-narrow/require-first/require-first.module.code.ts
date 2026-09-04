import { NarrowError } from "../narrow-error/narrow-error.module.code.ts"

export function requireFirst<T>(array: readonly T[], label?: string): T {
  if (array.length < 1) {
    throw new NarrowError(
      `requireFirst: expected at least 1 element${label !== undefined ? ` in ${label}` : ""}, got 0`
    )
  }
  for (const value of array) return value
  throw new NarrowError(`requireFirst: unreachable${label !== undefined ? ` in ${label}` : ""}`)
}
