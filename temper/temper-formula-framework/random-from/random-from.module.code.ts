import { requireFirst } from "@akasha/utils-narrow/require-first"

export function randomFrom<T>(array: readonly T[]): T {
  return requireFirst(array.slice(Math.floor(Math.random() * array.length)), "randomFrom")
}
