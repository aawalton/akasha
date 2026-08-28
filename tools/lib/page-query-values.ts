import { type Values } from "./page-file-values.ts"

export function textOf(values: Values, key: string): string | null {
  const value = values[key]
  return typeof value === "string" ? value : null
}

export function listOf(values: Values, key: string): readonly string[] {
  const value = values[key]
  if (typeof value === "string") return [value]
  return Array.isArray(value) ? value : []
}
