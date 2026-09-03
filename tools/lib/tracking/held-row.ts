import { addressOf } from "@akasha/markdown-pages/page-address"
import { askComposed } from "../page-query-client.ts"

const PAGE_TYPE_PAGE_TYPE = "page-type"

import { dataError } from "../exit.ts"
import { kebabizeKey } from "./keys.ts"

const MAX_PROPERTIES = 200

const NEVER_WRITTEN: ReadonlySet<string> = new Set([
  "seq",
  "daily-tracking-slug",
  "page-type-id",
  "page-type-slug",
  "user-id",
  "created-at",
  "updated-at",
  "deleted-at",
  "unique-key",
  "parent-key",
  "slug",
  "icon",
])

const answered = new Map<string, ReadonlySet<string>>()

export function forgetWorkedOutKeys(): void {
  answered.clear()
}

export async function workedOutKeysOf(pageType: string): Promise<ReadonlySet<string>> {
  const held = answered.get(pageType)
  if (held !== undefined) return held
  const asked = await askComposed({
    "page-type": "page-property-definition",
    where: {
      "defined-on-slug": { is: addressOf(PAGE_TYPE_PAGE_TYPE, pageType) },
      expression: { empty: false },
    },
    keys: ["key"],
    limit: MAX_PROPERTIES,
  })
  if (!asked.ok) {
    throw dataError(`reading which ${pageType} properties are worked out: ${asked.why}`)
  }
  const keys = new Set<string>()
  for (const row of asked.rows) {
    const key = row.values.key
    if (typeof key === "string" && key !== "") keys.add(key)
  }
  answered.set(pageType, keys)
  return keys
}

export async function heldRow(
  pageType: string,
  values: Readonly<Record<string, unknown>>
): Promise<Record<string, unknown>> {
  const workedOut = await workedOutKeysOf(pageType)
  const row: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined) continue
    const named = kebabizeKey(key)
    if (NEVER_WRITTEN.has(named) || workedOut.has(named)) continue
    row[named] = value
  }
  return row
}
