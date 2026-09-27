import { alchemy } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/alchemy.temper-craft-type.ts"
import { blacksmithing } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/blacksmithing.temper-craft-type.ts"
import { clothing } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/clothing.temper-craft-type.ts"
import { enchanting } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/enchanting.temper-craft-type.ts"
import { jewelryCrafting } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/jewelry-crafting.temper-craft-type.ts"
import { provisioning } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/provisioning.temper-craft-type.ts"
import { woodworking } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/woodworking.temper-craft-type.ts"

export const DAILY_WRIT_COUNT = 7

export type DailyWritProfessionState = "notPickedUp" | "pickedUp" | "crafted" | "completed"

export interface DailyWritStates {
  date: string
  seen: number[]
  completed: number[]
}

export interface DailyWritJournalScan {
  readonly present: readonly number[]
  readonly crafted: readonly number[]
}

export const DAILY_WRIT_CRAFT_TYPES: readonly {
  readonly craftType: number
  readonly label: string
}[] = [
  alchemy,
  blacksmithing,
  clothing,
  enchanting,
  jewelryCrafting,
  provisioning,
  woodworking,
].map((craft) => ({ craftType: craft.esoCraftTypeId, label: craft.title }))

export function nextDailyWritReconcile(
  prev: DailyWritStates | undefined,
  today: string,
  scan: DailyWritJournalScan
): DailyWritStates {
  const next: DailyWritStates =
    prev !== undefined && prev.date === today
      ? { date: today, seen: [...prev.seen], completed: [...prev.completed] }
      : { date: today, seen: [], completed: [] }

  for (const ct of next.seen) {
    if (!scan.present.includes(ct) && !next.completed.includes(ct)) {
      next.completed.push(ct)
    }
  }
  for (const ct of scan.present) {
    if (!next.seen.includes(ct)) next.seen.push(ct)
  }
  return next
}

export function deriveWritCrafted(craftConditionCount: number, craftMetCount: number): boolean {
  return craftConditionCount > 0 && craftMetCount === craftConditionCount
}

export function resolveDailyWritProfessionState(
  craftType: number,
  states: DailyWritStates | undefined,
  today: string,
  scan: DailyWritJournalScan
): DailyWritProfessionState {
  const fresh = states !== undefined && states.date === today ? states : undefined
  if (fresh?.completed.includes(craftType)) return "completed"
  if (scan.crafted.includes(craftType)) return "crafted"
  if (scan.present.includes(craftType)) return "pickedUp"
  return "notPickedUp"
}
