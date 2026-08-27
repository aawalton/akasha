import { resolveRoots } from "../../../repo/roots/roots"
import { wakeDayWindow } from "../wake-day.ts"
import { askComposed, numberOf } from "./tracking-modules.ts"
import type { QueryRow } from "./tracking-types.ts"

const FOOD_ENTRY_PAGE_TYPE_SLUG = "food-entry"
const HAPPENED_AT = "happened-at"

export function sumPlantGrams(rows: readonly QueryRow[]): number {
  let total = 0
  for (const row of rows) total += numberOf(row.values["plant-grams"]) ?? 0
  return total
}

export async function loadDayPlantGrams(dayStr: string): Promise<number> {
  const window = wakeDayWindow(resolveRoots(), dayStr)
  const asked = await askComposed({
    "page-type": FOOD_ENTRY_PAGE_TYPE_SLUG,
    where: { [HAPPENED_AT]: { "at-or-after": window.from, before: window.to } },
    keys: ["id", "plant-grams"],
  })
  if (!asked.ok) throw new Error(`loadDayPlantGrams: ${asked.why}`)
  return sumPlantGrams(asked.answer.rows)
}
