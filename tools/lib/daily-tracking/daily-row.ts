import type { Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"

export const DAILY_TRACKING_PAGE_TYPE_SLUG = "daily-tracking"

export function dailyPageAsking(dayStr: string): Query {
  return {
    pageTypeSlug: DAILY_TRACKING_PAGE_TYPE_SLUG,
    where: { date: { is: dayStr } },
    keys: ["id"],
    limit: 1,
  }
}

/**
 * The id of the page holding a day's readings.
 *
 * A day this finds is answered. A day it does not find used to be created here, and cannot be: a
 * write names a path and the whole body standing at it, and nothing renders a `daily-tracking`
 * body out of the keys a page carries. So a missing day is refused rather than reported as made,
 * because everything downstream would go on to write a day's points onto a page that is not there.
 */
export async function ensureDailyPage(dayStr: string): Promise<string> {
  const asked = await askingFor(dailyPageAsking(dayStr))
  if ("refused" in asked) {
    throw new Error(`the \`${DAILY_TRACKING_PAGE_TYPE_SLUG}\` page for ${dayStr} went unread: ${asked.refused}`)
  }
  const id = asked.rows[0]?.id
  if (typeof id === "string") return id
  throw new Error(
    `no \`${DAILY_TRACKING_PAGE_TYPE_SLUG}\` page stands for ${dayStr}, and one cannot be made: a ` +
      "write names a path and a whole body, and nothing renders that body out of the keys a page " +
      "carries — the day's readings have nowhere to land"
  )
}
