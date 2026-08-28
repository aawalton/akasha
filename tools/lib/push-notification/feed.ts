import { type Written, writeRow } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { NOTIFICATION_PAGE_TYPE_SLUG } from "./payload.ts"

export const NOTIFICATION_FEED_PAGE_TYPE_SLUG = "notification-feed"

export const QUESTION_PAGE_TYPE_SLUG = "question"

export const OPEN_QUESTION_STATUS = "open"

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

function textIn(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

/**
 * A QUERY THAT COULD NOT BE ASKED IS NOT A PERSON WITHOUT A FEED. This answered `null` on
 * `!asked.ok`, and `writeNotification` below turns `null` into "no notification feed names the
 * person `alan`, so this push reaches nobody". With the page-query service unreachable, that is
 * what every push to Alan reported — while `pages/notification-feed/alan.notification-feed.md`
 * was on disk the whole time carrying `person-slug: alan`, so the message sent each agent hunting
 * for a page that was never missing.
 *
 * The other three asks in this file — `readNotificationsAfter`, `newestNotificationAt` and
 * `countOpenQuestions` — have always thrown `asked.why` here. This one line was the file
 * disagreeing with itself.
 *
 * `null` now means only what it says: the query ran, and named no feed.
 */
export async function feedFor(personSlug: string): Promise<string | null> {
  const asked = await askComposed({
    "page-type": NOTIFICATION_FEED_PAGE_TYPE_SLUG,
    where: { "person-slug": { is: personSlug } },
    keys: ["person-slug"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`feedFor(\`${personSlug}\`) went unasked: ${asked.why}`)
  return textIn(asked.answer.rows[0]?.values ?? {}, "person-slug")
}

export async function writeNotification(
  personSlug: string,
  input: NotifyInput,
  writer: string,
  sentAt: string = new Date().toISOString(),
  id: string = crypto.randomUUID()
): Promise<Written> {
  const feed = await feedFor(personSlug)
  if (feed === null) {
    throw new Error(
      `writeNotification: no notification feed names the person \`${personSlug}\`, so this push reaches nobody`
    )
  }
  return writeRow(
    NOTIFICATION_PAGE_TYPE_SLUG,
    feed,
    {
      id,
      title: input.title,
      body: input.body ?? null,
      link: input.link ?? null,
      kind: input.kind ?? null,
      source: input.source ?? null,
      "sent-at": sentAt,
      "read-at": null,
    },
    writer
  )
}

export async function readNotificationsAfter(sentAfter: string): Promise<readonly Notification[]> {
  const asked = await askComposed({
    "page-type": NOTIFICATION_PAGE_TYPE_SLUG,
    where: { "sent-at": { "at-or-after": sentAfter } },
    keys: ["id", "title", "body", "link", "kind", "sent-at"],
    "sort-by": "sent-at",
    limit: NOTIFICATIONS_AT_ONCE,
  })
  if (!asked.ok) throw new Error(`readNotificationsAfter: ${asked.why}`)
  const read: Notification[] = []
  for (const row of asked.answer.rows) {
    const id = textIn(row.values, "id")
    const sentAt = textIn(row.values, "sent-at")
    if (id === null || sentAt === null) continue
    read.push({
      id,
      title: textIn(row.values, "title") ?? "",
      body: textIn(row.values, "body") ?? "",
      link: textIn(row.values, "link"),
      kind: textIn(row.values, "kind"),
      sentAt,
    })
  }
  return read
}

export async function newestNotificationAt(): Promise<string | null> {
  const asked = await askComposed({
    "page-type": NOTIFICATION_PAGE_TYPE_SLUG,
    keys: ["sent-at"],
    "sort-by": "sent-at",
    descending: true,
    limit: 1,
  })
  if (!asked.ok) throw new Error(`newestNotificationAt: ${asked.why}`)
  return textIn(asked.answer.rows[0]?.values ?? {}, "sent-at")
}

export async function countOpenQuestions(): Promise<number> {
  const asked = await askComposed({
    "page-type": QUESTION_PAGE_TYPE_SLUG,
    where: { status: { is: OPEN_QUESTION_STATUS } },
    keys: ["id"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`countOpenQuestions: ${asked.why}`)
  return asked.answer.n
}
