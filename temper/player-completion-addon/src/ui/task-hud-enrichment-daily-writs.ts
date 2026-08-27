import { getSavedVariables, type TaskData } from "../saved-variables"
import {
  getEsoDateString,
  reconcileDailyWritStates,
  scanDailyWritJournal,
} from "../tracking/daily-writs"
import {
  DAILY_WRIT_CRAFT_TYPES,
  type DailyWritProfessionState,
  resolveDailyWritProfessionState,
} from "../tracking/daily-writs-state"

export function isDailyWritsTask(task: TaskData): boolean {
  return task.completionCardId === "daily-writs"
}

export interface DailyWritRow {
  readonly label: string
  readonly state: DailyWritProfessionState
}

export function getDailyWritsEnrichmentRows(): readonly DailyWritRow[] {
  const sv = getSavedVariables()
  const charEntry = sv.characters[GetCurrentCharacterId()]
  const today = getEsoDateString(GetTimeStamp())
  const scan =
    charEntry !== undefined ? reconcileDailyWritStates(charEntry) : scanDailyWritJournal()
  const states = charEntry?.dailyWritStates
  return DAILY_WRIT_CRAFT_TYPES.map(
    (c): DailyWritRow => ({
      label: c.label,
      state: resolveDailyWritProfessionState(c.craftType, states, today, scan),
    })
  )
}
