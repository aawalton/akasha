import type { Given } from "./page-query-bind.ts"
import type { Value } from "./page-write-values.ts"

export interface Said {
  readonly body: unknown
  readonly status: number
}

export function said(body: unknown, status: number): Said {
  return { body, status }
}

export function givenIn(params: URLSearchParams): Given {
  const given: Record<string, string | readonly string[]> = {}
  for (const name of new Set(params.keys())) {
    const all = params.getAll(name)
    given[name] = all.length === 1 ? (all[0] as string) : all
  }
  return given
}

export function namedSafely(raw: string): string | null {
  let name: string
  try {
    name = decodeURIComponent(raw)
  } catch {
    return null
  }
  const segments = name.split("/")
  const unsafe = segments.some(
    (one) => one === "" || one === "." || one === ".." || one.includes("\\")
  )
  return unsafe ? null : name
}

export function isValue(one: unknown): one is Value {
  if (typeof one === "string" || typeof one === "number" || typeof one === "boolean") return true
  return Array.isArray(one) && one.every((each) => typeof each === "string")
}

export function asRecord(body: unknown): Record<string, unknown> | null {
  return typeof body === "object" && body !== null && !Array.isArray(body)
    ? (body as Record<string, unknown>)
    : null
}
