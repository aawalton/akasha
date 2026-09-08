import { NarrowError } from "../narrow-error/narrow-error.module.code.ts"

export function requireAt<T>(array: readonly T[], index: number, label?: string): T {
  const value = array[index]
  if (value === undefined) {
    throw new NarrowError(
      `requireAt: index ${index} out of range (length ${array.length})${label !== undefined ? ` in ${label}` : ""}`
    )
  }
  return value
}
