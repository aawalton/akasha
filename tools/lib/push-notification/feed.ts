// One person's notification feed, read from and written to akasha.
//
// This reached the OLD markdown registry until now, through `askComposed` and `rowLanding` against
// page types `notification` and `notification-feed`. Neither ever crossed a network — the
// `http://pages.invalid/` Request in `page-query-client.ts` is a body carrier — so what was wrong
// here was the REGISTRY it resolved through, not the way it reached. The swap is registry for
// registry: `valuesOfType` finds the feed page, `entriesAt` reads its rows and `queueAt` appends one.
//
// A ROW IS KEYED BY PROPERTYSLUG. The property pages are slugged `notification-body`,
// `notification-sent-at` and so on, and `notifications.page-property-entry.ts` lists them that way,
// because a page type names a property page by its slug. Every one of the 2,334 rows standing in the
// sidecar is keyed `body`, `sent-at` and the rest, which is those pages' `propertySlug`. Writing the
// slug spelling into this file would make a live 1.1 MB sidecar go mixed and no check would catch it.
import { valuesOfType } from "@akasha/indexes"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { ENTRY_CEILING } from "@akasha/pages-system/entry-ceiling"
import { entriesAt } from "@akasha/pages-system/page-entries"
import { queueAt } from "@akasha/pages-system/page-entry-queue"

export const NOTIFICATION_FEED_PAGE_TYPE_SLUG = "notification-feed"

// The property a feed's notifications are held in, and what they are held as. These are
// PROPERTYSLUGS, which is what a row is keyed by. The property PAGES are slugged
// `notification-body`, `notification-kind` and so on, and a row never carries those spellings.
const NOTIFICATIONS = "notifications"

const HELD = "jsonl"

const NOTIFICATIONS_AT_ONCE = 50

export interface NotifyInput {
  readonly title: string
  readonly body?: string
  readonly link?: string
  readonly kind?: string
  readonly source?: string
}

export interface Notification {
  readonly id: string
  readonly title: string
  readonly body: string
  readonly link: string | null
  readonly kind: string | null
  readonly sentAt: string
}

export type Landed =
  | { readonly ok: true; readonly at: string }
  | { readonly ok: false; readonly why: string }

function textIn(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

function rowsFor(page: string): readonly Readonly<Record<string, unknown>>[] {
  const read = entriesAt(akashaRoot(), page, NOTIFICATIONS, HELD)
  if ("refused" in read) throw new Error(`the feed at \`${page}\` went unread: ${read.refused}`)
  return read.entries as readonly Readonly<Record<string, unknown>>[]
}

/**
 * The akasha page file holding one person's feed, or null where that person has none.
 *
 * This answers a PAGE PATH rather than the person's slug, which is what its predecessor answered.
 * The path is what `queueAt` and `entriesAt` take, and a feed is reached by its file in akasha
 * rather than by a name the old registry resolved.
 */
export function feedPageFor(personSlug: string): string | null {
  for (const found of valuesOfType(akashaRoot(), NOTIFICATION_FEED_PAGE_TYPE_SLUG)) {
    if (found.value.personSlug === personSlug) return found.path
  }
  return null
}

export async function writeNotification(
  personSlug: string,
  input: NotifyInput,
  _writer: string,
  sentAt: string = new Date().toISOString(),
  id: string = crypto.randomUUID()
): Promise<Landed> {
  const page = feedPageFor(personSlug)
  // This throws rather than answering `{ ok: false }`, as its predecessor did. `tools/lib/notify.ts`
  // awaits this and never looks at the result, so a person with no feed would go silent instead of
  // loud if this were softened into a returned refusal.
  if (page === null) {
    throw new Error(
      `writeNotification: no notification feed names the person \`${personSlug}\`, so this push reaches nobody`
    )
  }
  // The key order below is the key order every row already in the sidecar carries, and `lineFor`
  // is a bare `JSON.stringify`, so a row written here is shaped exactly like a row written before
  // the repoint. `seq` is deliberately absent: nothing declares it and nothing has written it since
  // line 2309.
  const made = queueAt(akashaRoot(), page, NOTIFICATIONS, HELD, ENTRY_CEILING)
  if ("refused" in made) return { ok: false, why: made.refused }
  made.queue.write({
    id,
    title: input.title,
    body: input.body ?? null,
    link: input.link ?? null,
    kind: input.kind ?? null,
    source: input.source ?? null,
    "sent-at": sentAt,
    "read-at": null,
  })
  await made.queue.flushed()
  const refused = made.queue.refused()
  if (refused !== null) return { ok: false, why: refused }
  return { ok: true, at: made.queue.at() }
}

/**
 * Every notification row standing in every feed.
 *
 * Its predecessor asked the old registry for page type `notification`, which spanned all feeds
 * rather than one person's, so this spans them too. One feed stands today; reading only that one
 * would narrow what these two functions mean without saying so.
 */
function everyRow(): readonly Readonly<Record<string, unknown>>[] {
  const found: Readonly<Record<string, unknown>>[] = []
  for (const one of valuesOfType(akashaRoot(), NOTIFICATION_FEED_PAGE_TYPE_SLUG)) {
    found.push(...rowsFor(one.path))
  }
  return found
}

export async function readNotificationsAfter(sentAfter: string): Promise<readonly Notification[]> {
  const kept = everyRow().filter((row) => {
    const at = row["sent-at"]
    return typeof at === "string" && at >= sentAfter
  })
  const sorted = [...kept].sort((one, two) =>
    String(one["sent-at"]).localeCompare(String(two["sent-at"]))
  )
  const read: Notification[] = []
  for (const row of sorted.slice(0, NOTIFICATIONS_AT_ONCE)) {
    const id = textIn(row, "id")
    const sentAt = textIn(row, "sent-at")
    if (id === null || sentAt === null) continue
    read.push({
      id,
      title: textIn(row, "title") ?? "",
      body: textIn(row, "body") ?? "",
      link: textIn(row, "link"),
      kind: textIn(row, "kind"),
      sentAt,
    })
  }
  return read
}

export interface Sourced {
  readonly source: string | null
  readonly sentAt: string
}

/**
 * The newest notifications carrying one kind, newest first.
 *
 * This answers what `surplus-fall` used to ask the old registry for directly: rows of one kind,
 * with their `source` and `sent-at`, newest first. It reads `kind` and `source` by those
 * spellings because those are the property pages' PROPERTYSLUGS and what every row carries; the
 * pages themselves are slugged `notification-kind` and `notification-source`.
 *
 * Like every reader here this throws rather than answering empty where a feed cannot be read. A
 * caller deciding whether a thing was already said must not read "unreadable" as "not said".
 */
export async function newestOfKind(kind: string, atOnce: number): Promise<readonly Sourced[]> {
  const kept = everyRow().filter((row) => row["kind"] === kind)
  const sorted = [...kept].sort((one, two) =>
    String(two["sent-at"]).localeCompare(String(one["sent-at"]))
  )
  const read: Sourced[] = []
  for (const row of sorted.slice(0, atOnce)) {
    const sentAt = textIn(row, "sent-at")
    if (sentAt === null) continue
    read.push({ source: textIn(row, "source"), sentAt })
  }
  return read
}

export async function newestNotificationAt(): Promise<string | null> {
  let newest: string | null = null
  for (const row of everyRow()) {
    const at = row["sent-at"]
    if (typeof at !== "string" || at === "") continue
    if (newest === null || at > newest) newest = at
  }
  return newest
}
