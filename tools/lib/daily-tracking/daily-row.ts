import { askComposed, patchPage, WRITER } from "./tracking-modules.ts"

export const DAILY_TRACKING_PAGE_TYPE_SLUG = "daily-tracking"

export async function ensureDailyPage(dayStr: string): Promise<string> {
  const asked = await askComposed({
    "page-type": DAILY_TRACKING_PAGE_TYPE_SLUG,
    where: { date: { is: dayStr } },
    keys: ["id"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`ensureDailyPage: ${asked.why}`)
  const existingRow = asked.answer.rows[0]
  const existingId = existingRow === undefined ? undefined : existingRow.values.id
  if (typeof existingId === "string") return existingId

  const id = Bun.randomUUIDv7()
  const landed = await patchPage(
    DAILY_TRACKING_PAGE_TYPE_SLUG,
    dayStr,
    { id, title: `@date:${dayStr}`, date: dayStr },
    WRITER
  )
  if (!landed.ok) throw new Error(`ensureDailyPage: ${landed.why}`)
  return id
}
