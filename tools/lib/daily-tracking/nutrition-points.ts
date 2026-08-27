import { loadDayPlantGrams } from "./nutrition-grams.ts"
import { type WriteOutcome, writeNutritionPoints } from "./write-daily-points.ts"

export async function rollupNutritionForDay(
  dayStr: string
): Promise<{ nutritionPoints: number; outcome: WriteOutcome }> {
  const nutritionPoints = await loadDayPlantGrams(dayStr)
  const outcome = await writeNutritionPoints(dayStr, nutritionPoints)
  return { nutritionPoints, outcome }
}
