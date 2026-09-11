import { NarrowError } from "akasha/utils/narrow/narrow-error/narrow-error.module.code.ts"

export function requireDefined<T>(value: T | undefined, label?: string): T {
  if (value === undefined) {
    throw new NarrowError(
      `requireDefined: value is undefined${label !== undefined ? ` in ${label}` : ""}`
    )
  }
  return value
}
