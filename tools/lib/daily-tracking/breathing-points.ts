import { loadDayBreathingSets } from "./breathing-sets.ts"
import { type WriteOutcome, writeBreathingPoints } from "./write-daily-points.ts"

const POINTS_PER_BREATHING_SET = 5

export async function rollupBreathingForDay(
  dayStr: string
): Promise<{ breathingPoints: number; outcome: WriteOutcome }> {
  const breathingSets = await loadDayBreathingSets(dayStr)
  const breathingPoints = breathingSets * POINTS_PER_BREATHING_SET
  const outcome = await writeBreathingPoints(dayStr, breathingPoints)
  return { breathingPoints, outcome }
}
