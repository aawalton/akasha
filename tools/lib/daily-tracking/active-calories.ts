import { cardioReading, readSessionPages, wakeWindow } from "./code-bridge.ts"
import type { SessionPage } from "./tracking-types.ts"
import { type WriteOutcome, writeActiveCalories } from "./write-daily-points.ts"

export async function rollupActiveCaloriesForDay(
  dayStr: string,
  sessions?: readonly SessionPage[]
): Promise<{ activeCalories: number | null; outcome: WriteOutcome | "unmeasured" }> {
  const pages = sessions ?? ((await readSessionPages()) as readonly SessionPage[])
  const activeCalories = await cardioReading(dayStr, wakeWindow(pages, dayStr))
  if (activeCalories === null) return { activeCalories: null, outcome: "unmeasured" }
  const outcome = await writeActiveCalories(dayStr, activeCalories)
  return { activeCalories, outcome }
}
