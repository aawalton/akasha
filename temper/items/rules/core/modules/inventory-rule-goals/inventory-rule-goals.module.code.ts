interface Goal {
  readonly id: string
  readonly priority: number
}

export const GOAL_NONE_ID = "none"

const GOALS = {
  none: { id: "none", priority: Infinity },
  equip: { id: "equip", priority: 1 },
  unlock: { id: "unlock", priority: 2 },
  progress: { id: "progress", priority: 3 },
  use: { id: "use", priority: 4 },
  task: { id: "task", priority: 5 },
  hoard: { id: "hoard", priority: 6 },
  sell: { id: "sell", priority: 7 },
  destroy: { id: "destroy", priority: 8 },
} as const satisfies Record<string, Goal>

function goalsFile<K extends string>(data: Readonly<Record<K, Goal & { readonly id: K }>>) {
  const list = Object.values<Goal & { readonly id: K }>(data)
  return {
    data,
    ids: list.map((goal) => goal.id),
    list,
  } as const
}

export const inventoryRuleGoals = goalsFile(GOALS)

export function goalIdToValue(id: string): string | null {
  return id === GOAL_NONE_ID ? null : id
}

export function goalValueToId(goal: string | null | undefined): string {
  return goal ?? GOAL_NONE_ID
}
