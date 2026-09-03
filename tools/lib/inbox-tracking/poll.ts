import { makeGmailClient } from "@akasha/google-email/client"
import { INBOX_LABEL, listMessages } from "@akasha/google-email/messages"
import { askComposed } from "../page-query-client.ts"
import type { InboxKey } from "./keys.ts"

const EMAIL_MAX = 100
const TO_DO_PAGE_TYPE_SLUG = "to-do"
const TEMPER_TASK_PAGE_TYPE_SLUG = "temper-task"
const MAX_DUE = 1000

export type PollLogger = (level: "INFO" | "ERROR", message: string) => void

function errMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

async function pollEmail(): Promise<number> {
  const client = await makeGmailClient()
  const messages = await listMessages(client, {
    labelIds: [INBOX_LABEL],
    max: EMAIL_MAX,
  })
  return messages.length
}

export function dayAfter(dayStr: string): string {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) return dayStr
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return dayStr
  const next = new Date(Date.UTC(y, m - 1, d + 1))
  const pad = (n: number): string => (n < 10 ? `0${n}` : String(n))
  return `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}`
}

export function dueWhere(dayStr: string): Readonly<Record<string, unknown>> {
  return { "due-date": { before: dayAfter(dayStr) }, "completed-at": { empty: true } }
}

async function pollDue(dayStr: string, pageTypeSlug: string): Promise<number> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: dueWhere(dayStr),
    keys: ["slug"],
    limit: MAX_DUE,
  })
  if (!asked.ok) throw new Error(`counting what is due on ${pageTypeSlug}: ${asked.why}`)
  return asked.n
}

export async function pollInboxCounts(
  dayStr: string,
  log: PollLogger
): Promise<Partial<Record<InboxKey, number>>> {
  const sources: ReadonlyArray<readonly [InboxKey, () => Promise<number>]> = [
    ["email", () => pollEmail()],
    ["tasks", () => pollDue(dayStr, TO_DO_PAGE_TYPE_SLUG)],
    ["temperTasks", () => pollDue(dayStr, TEMPER_TASK_PAGE_TYPE_SLUG)],
    ["texts", () => fetchUnreadCount()],
  ]

  const polled = await Promise.all(
    sources.map(async ([key, run]): Promise<readonly [InboxKey, number | undefined]> => {
      try {
        return [key, await run()] as const
      } catch (err) {
        log("ERROR", `inbox source '${key}' failed (omitted): ${errMessage(err)}`)
        return [key, undefined] as const
      }
    })
  )

  const counts: Partial<Record<InboxKey, number>> = {}
  for (const [key, count] of polled) {
    if (count !== undefined) counts[key] = count
  }
  return counts
}
