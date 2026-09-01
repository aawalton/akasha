import { createDataFile } from "@akasha/utils-narrow/create-data-file"

interface GoalTemplate {
  name: string
  priority: number
}

export const GOAL_NONE_ID = "none"

export const inventoryRuleGoals = createDataFile<GoalTemplate>()({
  none: { id: "none", name: "No Goal", priority: Infinity },
  equip: { id: "equip", name: "Equip", priority: 1 },
  unlock: { id: "unlock", name: "Unlock", priority: 2 },
  progress: { id: "progress", name: "Progress", priority: 3 },
  use: { id: "use", name: "Use", priority: 4 },
  task: { id: "task", name: "Task", priority: 5 },
  hoard: { id: "hoard", name: "Hoard", priority: 6 },
  sell: { id: "sell", name: "Sell", priority: 7 },
  destroy: { id: "destroy", name: "Destroy", priority: 8 },
})

export function goalIdToValue(id: string): string | null {
  return id === GOAL_NONE_ID ? null : id
}

export function goalValueToId(goal: string | null | undefined): string {
  return goal ?? GOAL_NONE_ID
}
