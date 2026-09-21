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
  { craftType: 4, label: "Alchemy" },
  { craftType: 1, label: "Blacksmithing" },
  { craftType: 2, label: "Clothier" },
  { craftType: 3, label: "Enchanting" },
  { craftType: 7, label: "Jewelry Crafting" },
  { craftType: 5, label: "Provisioning" },
  { craftType: 6, label: "Woodworking" },
]

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
