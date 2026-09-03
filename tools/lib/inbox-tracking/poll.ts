import { dayAfter } from "@akasha/day/day-string"
import { makeGmailClient } from "@akasha/google-email/client"
import { INBOX_LABEL, listMessages } from "@akasha/google-email/messages"
import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import type { InboxKey } from "./keys.ts"

const EMAIL_MAX = 100
const TO_DO_PAGE_TYPE_SLUG = "to-do"
const TEMPER_TASK_PAGE_TYPE_SLUG = "temper-task"

/**
 * A page states its keys as its own file spells them, so these are humped rather than the kebab
 * slugs the old markdown query took. `to-do` renamed its two on the way into akasha and
 * `temper-task` did not, which is why the two sides of this file do not match each other.
 */
const TO_DO_DUE_DATE = "toDoDueDate"
const TO_DO_COMPLETED_AT = "toDoCompletedAt"
const TEMPER_TASK_DUE_DATE = "dueDate"

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

function checkoutRoot(): string {
  const roots = resolveRoots() as unknown as Readonly<Record<string, string>>
  const root = roots[AKASHA]
  if (root === undefined || root === "") {
    throw new Error("no akasha checkout stands here, so nothing due can be counted")
  }
  return root
}

/**
 * How many pages of a type answer a question, or a throw saying why none could be counted.
 *
 * `asking` refuses rather than answering nothing where it cannot read: a page type the index does
 * not hold and a key the page type does not declare are both refusals, not empty results. That is
 * the whole point of reaching pages this way. A count nothing can be read for has to leave this
 * function as a fault, because `pollInboxCounts` omits a source that throws and names it as failed,
 * whereas a zero would land on Alan's day page as a real reading that his inbox was clear.
 */
function howMany(pageTypeSlug: string, where: Readonly<Record<string, unknown>>): number {
  const asked = asking(checkoutRoot(), { pageTypeSlug, where } as never)
  if ("refused" in asked) {
    throw new Error(`counting what is due on ${pageTypeSlug}: ${asked.refused}`)
  }
  return asked.rows.length
}

/**
 * A to-do is waiting where its day has come and this round of it is unfinished.
 *
 * `toDoCompletedAt` is the round's own finish and is cleared when the recurrence moves the to-do
 * on, so it is the key that says whether the to-do is still owed. `toDoLastCompletedAt` is not:
 * it holds the last finish for good, so testing it would drop every recurring to-do Alan has
 * ever done. Both stand outside the commit, and `asking` reads them from the page's uncommitted
 * file beside it.
 */
async function pollToDosDue(dayStr: string): Promise<number> {
  return howMany(TO_DO_PAGE_TYPE_SLUG, {
    [TO_DO_DUE_DATE]: { before: dayAfter(dayStr) },
    [TO_DO_COMPLETED_AT]: { empty: true },
  })
}

/**
 * A temper task is waiting where its day has come, and nothing further is asked of it.
 *
 * There is deliberately no completion test here. A temper task carries no finish of its own round
 * — only `lastCompletedAt`, which keeps the last finish for good — and its recurrence moves
 * `dueDate` forward when it is done. So the due date alone already says whether the task is owed,
 * and testing `lastCompletedAt` would count 1 where 22 are waiting.
 */
async function pollTemperTasksDue(dayStr: string): Promise<number> {
  return howMany(TEMPER_TASK_PAGE_TYPE_SLUG, {
    [TEMPER_TASK_DUE_DATE]: { before: dayAfter(dayStr) },
  })
}

export async function pollInboxCounts(
  dayStr: string,
  log: PollLogger
): Promise<Partial<Record<InboxKey, number>>> {
  const sources: ReadonlyArray<readonly [InboxKey, () => Promise<number>]> = [
    ["email", () => pollEmail()],
    ["tasks", () => pollToDosDue(dayStr)],
    ["temperTasks", () => pollTemperTasksDue(dayStr)],
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
