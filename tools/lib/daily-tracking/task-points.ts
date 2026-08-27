import { loadDayHealthTaskPoints } from "./task-completions.ts"
import { type WriteOutcome, writeTaskPoints } from "./write-daily-points.ts"

export async function rollupHealthTaskPointsForDay(
  dayStr: string
): Promise<{ taskPoints: number; outcome: WriteOutcome }> {
  const taskPoints = await loadDayHealthTaskPoints(dayStr)
  const outcome = await writeTaskPoints(dayStr, taskPoints)
  return { taskPoints, outcome }
}
