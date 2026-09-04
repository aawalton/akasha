import { NarrowError } from "../narrow-error/narrow-error.module.code.ts"

export function requireGet<K, V>(map: ReadonlyMap<K, V>, key: K, label?: string): V {
  for (const [k, v] of map) {
    if (sameValueZero(k, key)) return v
  }
  throw new NarrowError(
    `requireGet: missing key ${String(key)}${label !== undefined ? ` in ${label}` : ""}`
  )
}

function sameValueZero<T>(a: T, b: T): boolean {
  if (a === b) return true
  return typeof a === "number" && typeof b === "number" && Number.isNaN(a) && Number.isNaN(b)
}
