import { askComposed, pageLanding } from "../page-query-client.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import { resolveOrCreateDaily } from "../tracking/resolve.ts"
import { wakeDayOf } from "../wake-day.ts"
import { CLEARED_ATTR, COUNT_ATTR, INBOX_KEYS, type InboxKey } from "./keys.ts"

const DAILY_TRACKING_PAGE_TYPE_SLUG = "daily-tracking"
const EMAIL_ENTRY_PAGE_TYPE_SLUG = "email-entry"
const LOWEST_INBOX_COUNT = "lowest-inbox-count"
const INBOX_WRITER = "inbox-tracking"

export type PersistOutcome = "created" | "patched"

type Standing = Readonly<Record<string, unknown>> | undefined

function truthy(value: unknown): boolean {
  return value === true || value === 1 || value === "true"
}

function buildAttrs(
  counts: Partial<Record<InboxKey, number>>,
  row: Standing
): Record<string, number | boolean> {
  const attrs: Record<string, number | boolean> = {}
  for (const key of INBOX_KEYS) {
    const count = counts[key]
    const countAttr = COUNT_ATTR[key]
    const clearedAttr = CLEARED_ATTR[key]
    if (count === undefined || countAttr === undefined || clearedAttr === undefined) continue
    attrs[countAttr] = count
    attrs[clearedAttr] = truthy(row?.[clearedAttr]) || count === 0
  }
  return attrs
}

function numberOf(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return null
}

export function keptLow(standing: unknown, count: number): number | null {
  const held = numberOf(standing)
  return held === null || count < held ? count : null
}

async function standingRow(pageTypeSlug: string, day: string): Promise<Standing> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: { date: { is: day } },
    limit: 1,
  })
  if (!asked.ok) throw new Error(`reading ${pageTypeSlug} for ${day}: ${asked.why}`)
  return asked.rows[0]?.values
}

async function land(
  pageTypeSlug: string,
  day: string,
  values: Readonly<Record<string, unknown>>
): Promise<void> {
  const landed = await pageLanding("patch", pageTypeSlug, day, values, INBOX_WRITER)
  if (!landed.ok) throw new Error(`writing ${pageTypeSlug} for ${day}: ${landed.why}`)
}

export async function persistEmailEntry(count: number, now: Date): Promise<PersistOutcome> {
  const day = wakeDayOf(resolveRoots(), now)
  const row = await standingRow(EMAIL_ENTRY_PAGE_TYPE_SLUG, day)
  if (row === undefined) {
    await land(EMAIL_ENTRY_PAGE_TYPE_SLUG, day, {
      id: Bun.randomUUIDv7(),
      title: `Email ${day}`,
      slug: day,
      date: day,
      [LOWEST_INBOX_COUNT]: count,
    })
    return "created"
  }
  const lower = keptLow(row[LOWEST_INBOX_COUNT], count)
  if (lower !== null) {
    await land(EMAIL_ENTRY_PAGE_TYPE_SLUG, day, { [LOWEST_INBOX_COUNT]: lower })
  }
  return "patched"
}

export async function persistInboxCounts(
  counts: Partial<Record<InboxKey, number>>,
  day: string,
  now: Date
): Promise<PersistOutcome> {
  const email = counts.email
  if (email !== undefined) await persistEmailEntry(email, now)

  const row = await standingRow(DAILY_TRACKING_PAGE_TYPE_SLUG, day)
  const attrs = buildAttrs(counts, row)
  const { created } = await resolveOrCreateDaily(null, day)
  await land(DAILY_TRACKING_PAGE_TYPE_SLUG, day, attrs)
  return created ? "created" : "patched"
}
