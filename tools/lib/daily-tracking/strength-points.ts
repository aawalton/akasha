import { loadDayVolumeWith } from "@collections/exercises/tracking/day-volume"
import { askExercisePages } from "./exercise-pages.ts"
import { type WriteOutcome, writeStrengthVolume } from "./write-daily-points.ts"

export async function rollupStrengthForDay(
  dayStr: string
): Promise<{ strengthVolume: number; outcome: WriteOutcome }> {
  const strengthVolume = await loadDayVolumeWith(askExercisePages, dayStr)
  const outcome = await writeStrengthVolume(dayStr, strengthVolume)
  return { strengthVolume, outcome }
}
