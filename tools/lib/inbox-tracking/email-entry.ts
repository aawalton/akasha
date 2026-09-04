import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { listedAt } from "@akasha/indexes"
import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { refuseALiveTestWrite } from "@akasha/pages-system/live-store-write-guard"
import { bodyOf, importedFrom, unnamedIn } from "@akasha/pages-system/page-body"
import { nameFaultIn } from "@akasha/pages-system/page-export-name"
import { asking } from "@akasha/pages-system-service/asking"
import { wakeDayOf } from "../../../akasha/alan/tracking/daily/day-opening/day-opening.module.code.ts"

const EMAIL_ENTRY_PAGE_TYPE_SLUG = "email-entry"

const PAGE_TYPE = "page-type"

const PAGES_UNDER = "pages"

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

/**
 * The keys an entry's own file writes, in the order the file writes them.
 *
 * `bodyOf` lays a page out in this order and drops what is `undefined`, so this is both the shape
 * and the ordering. A key standing on the page that is not named here would be written away
 * silently, which is the one thing this whole road exists to stop, so `landPage` refuses instead.
 */
const PAGE_KEYS: readonly string[] = [
  "id",
  "pageTypeSlug",
  "slug",
  "title",
  "date",
  LOWEST_INBOX_COUNT,
]

/**
 * Where the one `email-entry` page type stands, as the index has it.
 *
 * The path is asked for rather than written down here, so an entry follows its page type when the
 * migration moves it. Exactly one is required: two page types under one slug is the outcome a
 * quarantined carry script would have produced, and landing entries against either of them would
 * split Alan's mail across two identities. `asking` has already refused for a slug the index does
 * not hold by the time this runs, so a count other than one means two, not none.
 */
function pageTypeAt(root: string): string {
  const listed = listedAt(root, PAGE_TYPE, EMAIL_ENTRY_PAGE_TYPE_SLUG)
  const one = listed[0]
  if (listed.length !== 1 || one === undefined) {
    throw new Error(
      `\`${EMAIL_ENTRY_PAGE_TYPE_SLUG}\` names ${listed.length} page types, not one, so nothing ` +
        `says which of them an entry belongs to: ${listed.map((held) => held.path).join(", ")}`
    )
  }
  return one.path
}

/**
 * Where an entry's own page file stands, or where it would stand were it written.
 *
 * A page already standing is placed by the index rather than by this rule, so a page that has been
 * moved is patched where it is. Only a page that stands nowhere is placed, and it is placed beside
 * its siblings under the page type's own folder.
 */
function pageAt(root: string, slug: string): string {
  const listed = listedAt(root, EMAIL_ENTRY_PAGE_TYPE_SLUG, slug)
  const one = listed[0]
  if (listed.length > 1) {
    throw new Error(
      `\`${slug}\` names ${listed.length} pages, not one: ${listed.map((h) => h.path).join(", ")}`
    )
  }
  if (one !== undefined) return one.path
  return join(dirname(pageTypeAt(root)), PAGES_UNDER, `${slug}.${EMAIL_ENTRY_PAGE_TYPE_SLUG}.ts`)
}

/**
 * An entry landed as the TypeScript page it now is.
 *
 * The old road reached `pageLanding`, which composes markdown frontmatter and places a page by
 * scanning `.md` files. `email-entry` left that store, so the scan placed nothing and the write was
 * refused for a page type the markdown service does not hold — which took the whole tick down on
 * the first day that had no entry standing yet.
 *
 * A mechanical landing writes the file, keeps the index over the paths it touched and commits, all
 * under one hold. Keeping the index is what lets the tick five minutes later read back the entry
 * this one wrote rather than write a second one over it under a fresh identity.
 *
 * `landedMechanically` answers with a report rather than with what it wrote, and a zero code is the
 * landing's own account of itself, so what actually stands on disk is read back and compared.
 */
function landPage(root: string, slug: string, values: Readonly<Record<string, unknown>>): void {
  const fault = nameFaultIn(slug)
  if (fault !== null) throw new Error(`\`${slug}\` is no slug an entry stands under: ${fault}`)
  const dropped = unnamedIn(PAGE_KEYS, values as never)
  if (dropped.length > 0) {
    throw new Error(
      `the \`${EMAIL_ENTRY_PAGE_TYPE_SLUG}\` page \`${slug}\` carries ${dropped.join(", ")}, which ` +
        `this writer does not know how to write down, and writing it without them would take them ` +
        `off the page — name them in \`PAGE_KEYS\` or leave the page alone`
    )
  }
  const at = pageAt(root, slug)
  refuseALiveTestWrite(root, `write ${EMAIL_ENTRY_PAGE_TYPE_SLUG}/${slug}`, "`landPage`")
  const body = bodyOf({
    pageTypeSlug: EMAIL_ENTRY_PAGE_TYPE_SLUG,
    slug,
    importFrom: importedFrom(at, pageTypeAt(root)),
    keys: PAGE_KEYS,
    values: values as never,
  })
  const message =
    `Alan's mail on ${String(values.date)} reached ` +
    `${String(values[LOWEST_INBOX_COUNT])} at its lowest`
  const answer = landedMechanically(
    root,
    INBOX_WRITER,
    [{ path: at, body: encoded(body) }],
    message
  )
  if (answer.code !== 0) {
    throw new Error(
      `writing ${EMAIL_ENTRY_PAGE_TYPE_SLUG} for ${slug} at ${at}: ${answer.refusals.join("; ")}`
    )
  }
  stoodAs(root, at, body, slug)
}

function encoded(body: string): Uint8Array {
  return new TextEncoder().encode(body)
}

/**
 * What the landing says it did, checked against what stands on disk.
 *
 * A landing that reports a zero and writes nothing is the failure this whole repair is about: a
 * clean exit that leaves the tile fed by yesterday's page. Reading the file back is the only
 * account of the write that the write does not author.
 */
function stoodAs(root: string, at: string, body: string, slug: string): void {
  let stood: string
  try {
    stood = readFileSync(join(root, at), "utf8")
  } catch (thrown) {
    throw new Error(
      `the landing of \`${slug}\` reported no fault and ${at} cannot be read back, so nothing says ` +
        `the entry was written: ${thrown instanceof Error ? thrown.message : String(thrown)}`
    )
  }
  if (stood !== body) {
    throw new Error(
      `the landing of \`${slug}\` reported no fault and ${at} does not hold what it was handed, so ` +
        `the entry on disk is not the entry this tick wrote`
    )
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
 *
 * THE DAY WITH NO ENTRY IS THE PATH THAT BREAKS. A day that already has an entry rarely reaches a
 * write at all: the count has to be lower than the one standing before anything lands. So a tick
 * run on a day whose entry stands proves nothing about this road, and the first tick after a day
 * boundary is the one that has to work.
 */
export async function persistEmailEntry(count: number, now: Date): Promise<PersistOutcome> {
  const root = checkoutRoot()
  const day = wakeDayOf(resolveRoots(), now)
  const slug = slugFor(day)
  const row = standingRow(day)
  if (row === undefined) {
    landPage(root, slug, {
      id: Bun.randomUUIDv7(),
      pageTypeSlug: EMAIL_ENTRY_PAGE_TYPE_SLUG,
      slug,
      title: `Email ${day}`,
      date: day,
      [LOWEST_INBOX_COUNT]: count,
    })
    return "created"
  }
  // A page file is written whole rather than merged into, so the standing row is carried over and
  // only the count is replaced. The markdown road patched a single key and left the rest of the
  // frontmatter alone; here, handing over the count by itself would write a page holding nothing
  // else. `landPage` refuses for any key on the row it cannot write down, so a property added to
  // the page type later stops this rather than being quietly dropped from Alan's day.
  const lower = keptLow(row[LOWEST_INBOX_COUNT], count)
  if (lower !== null) landPage(root, slug, { ...row, [LOWEST_INBOX_COUNT]: lower })
  return "patched"
}
