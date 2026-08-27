import { loadDaySleepMinutes } from "./sleep-minutes.ts"
import { type WriteOutcome, writeSleepPoints } from "./write-daily-points.ts"

export async function rollupSleepForDay(
  dayStr: string
): Promise<{ sleepPoints: number; outcome: WriteOutcome }> {
  const sleepPoints = await loadDaySleepMinutes(dayStr)
  const outcome = await writeSleepPoints(dayStr, sleepPoints)
  return { sleepPoints, outcome }
}
