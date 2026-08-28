import { askComposed, type Landed, rowLanding } from "../page-query-client.ts"
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

export async function feedFor(personSlug: string): Promise<string | null> {
  const asked = await askComposed({
    "page-type": NOTIFICATION_FEED_PAGE_TYPE_SLUG,
    where: { "person-slug": { is: personSlug } },
    keys: ["person-slug"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`feedFor(\`${personSlug}\`) went unasked: ${asked.why}`)
  return textIn(asked.rows[0]?.values ?? {}, "person-slug")
}

export async function writeNotification(
  personSlug: string,
  input: NotifyInput,
  writer: string,
  sentAt: string = new Date().toISOString(),
  id: string = crypto.randomUUID()
): Promise<Landed> {
  const feed = await feedFor(personSlug)
  if (feed === null) {
    throw new Error(
      `writeNotification: no notification feed names the person \`${personSlug}\`, so this push reaches nobody`
    )
  }
  return rowLanding(
    "write-row",
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
  for (const row of asked.rows) {
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
  return textIn(asked.rows[0]?.values ?? {}, "sent-at")
}

export async function countOpenQuestions(): Promise<number> {
  const asked = await askComposed({
    "page-type": QUESTION_PAGE_TYPE_SLUG,
    where: { status: { is: OPEN_QUESTION_STATUS } },
    keys: ["id"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`countOpenQuestions: ${asked.why}`)
  return asked.n
}
