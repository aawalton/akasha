import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { askComposed, pageLanding } from "../page-query-client.ts"
import { wakeDayOf } from "../wake-day.ts"

const EMAIL_ENTRY_PAGE_TYPE_SLUG = "email-entry"

const LOWEST_INBOX_COUNT = "lowest-inbox-count"

export const INBOX_WRITER = "inbox-tracking"

export type PersistOutcome = "created" | "patched"

type Standing = Readonly<Record<string, unknown>> | undefined

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

async function standingRow(day: string): Promise<Standing> {
  const asked = await askComposed({
    "page-type": EMAIL_ENTRY_PAGE_TYPE_SLUG,
    where: { date: { is: day } },
    limit: 1,
  })
  if (!asked.ok) throw new Error(`reading ${EMAIL_ENTRY_PAGE_TYPE_SLUG} for ${day}: ${asked.why}`)
  return asked.rows[0]?.values
}

export function slugFor(day: string): string {
  return `${EMAIL_ENTRY_PAGE_TYPE_SLUG}-${day}`
}

async function land(slug: string, values: Readonly<Record<string, unknown>>): Promise<void> {
  const landed = await pageLanding("patch", EMAIL_ENTRY_PAGE_TYPE_SLUG, slug, values, INBOX_WRITER)
  if (!landed.ok) {
    throw new Error(`writing ${EMAIL_ENTRY_PAGE_TYPE_SLUG} for ${slug}: ${landed.why}`)
  }
}

/**
 * An email entry is a day of its own page type.
 *
 * It is one page per day, like a `daily-tracking` page, but of a page type the daily migration does
 * not name, so it goes on reaching the file layer directly. The entries themselves now stand as
 * TypeScript pages under `akasha/alan/tracking/daily/email-entries/pages`, slugged `email-entry-`
 * before the day, so a write names that slug rather than the bare day. It lives here rather than beside the
 * daily writes so that a reach for one of Alan's tracked days cannot hide next to it — every write
 * in `persist.ts` goes through `day-place.ts`, and this file is the reason that reads as a rule
 * rather than an accident. When email entries migrate too, they want a `day-place` of their own.
 */
export async function persistEmailEntry(count: number, now: Date): Promise<PersistOutcome> {
  const day = wakeDayOf(resolveRoots(), now)
  const slug = slugFor(day)
  const row = await standingRow(day)
  if (row === undefined) {
    await land(slug, {
      id: Bun.randomUUIDv7(),
      title: `Email ${day}`,
      slug,
      date: day,
      [LOWEST_INBOX_COUNT]: count,
    })
    return "created"
  }
  const lower = keptLow(row[LOWEST_INBOX_COUNT], count)
  if (lower !== null) await land(slug, { [LOWEST_INBOX_COUNT]: lower })
  return "patched"
}
