import { dayVolume } from "@akasha/exercise-access/session-volume"
import { type WriteOutcome, writeStrengthVolume } from "./write-daily-points.ts"

export async function rollupStrengthForDay(
  dayStr: string
): Promise<{ strengthVolume: number; outcome: WriteOutcome }> {
  const counted = await dayVolume(dayStr)
  if ("refused" in counted) {
    throw new Error(`the strength volume for ${dayStr} went uncounted: ${counted.refused}`)
  }
  const strengthVolume = counted.volume
  const outcome = await writeStrengthVolume(dayStr, strengthVolume)
  return { strengthVolume, outcome }
}
