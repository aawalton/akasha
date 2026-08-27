import { loadDayVolume } from "@collections/exercises/tracking/day-volume"
import { type WriteOutcome, writeStrengthVolume } from "./write-daily-points.ts"

export async function rollupStrengthForDay(
  dayStr: string
): Promise<{ strengthVolume: number; outcome: WriteOutcome }> {
  const strengthVolume = await loadDayVolume(dayStr)
  const outcome = await writeStrengthVolume(dayStr, strengthVolume)
  return { strengthVolume, outcome }
}
