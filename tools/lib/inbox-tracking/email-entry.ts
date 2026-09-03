import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import { pageLanding } from "../page-query-client.ts"
import { wakeDayOf } from "../wake-day.ts"

const EMAIL_ENTRY_PAGE_TYPE_SLUG = "email-entry"

/**
 * A page states its keys as its own file spells them, so this is humped rather than the kebab slug
 * the old markdown query took. The property is filed under `lowest-inbox-count` still, which is why
 * the two spellings sit so close together, but the page file writes `lowestInboxCount` and a page is
 * both asked for and read by what its own file writes.
 */
const LOWEST_INBOX_COUNT = "lowestInboxCount"

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

function checkoutRoot(): string {
  const roots = resolveRoots() as unknown as Readonly<Record<string, string>>
  const root = roots[AKASHA]
  if (root === undefined || root === "") {
    throw new Error("no akasha checkout stands here, so no email entry can be read")
  }
  return root
}

/**
 * The entry standing for a day, or nothing where that day has no entry yet.
 *
 * `asking` refuses rather than answering nothing where it cannot read: a page type the index does
 * not hold and a key the page type does not declare are both refusals, not empty results. A refusal
 * has to leave here as a throw, because nothing found reads as a day with no entry yet, and that
 * sends `persistEmailEntry` to write this one moment's count down as the whole day's lowest over a
 * lower count already standing. A row `asking` answers with is the page's values themselves.
 */
function standingRow(day: string): Standing {
  const asked = asking(checkoutRoot(), {
    pageTypeSlug: EMAIL_ENTRY_PAGE_TYPE_SLUG,
    where: { date: { is: day } },
  } as never)
  if ("refused" in asked) {
    throw new Error(`reading ${EMAIL_ENTRY_PAGE_TYPE_SLUG} for ${day}: ${asked.refused}`)
  }
  return asked.rows[0]
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
  const row = standingRow(day)
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
