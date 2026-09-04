export type CooldownGroupKey =
  | "rftw"
  | "cyrodiil-towns"
  | "imperial-city"
  | "mages-guild"
  | "fighters-guild"
  | "undaunted"

export const COOLDOWN_GROUP_KEYS: readonly CooldownGroupKey[] = [
  "rftw",
  "cyrodiil-towns",
  "imperial-city",
  "mages-guild",
  "fighters-guild",
  "undaunted",
] as const

export interface CooldownGroup {
  readonly patterns: readonly string[]
  readonly key: CooldownGroupKey
  readonly durationSeconds: number
}

export const RFTW_GROUP: CooldownGroup = {
  patterns: ["Rewards for the Worthy"],
  key: "rftw",
  durationSeconds: 72000,
}

export const COOLDOWN_GROUPS: readonly CooldownGroup[] = [
  RFTW_GROUP,
  {
    patterns: ["Reward Container"],
    key: "cyrodiil-towns",
    durationSeconds: 72000,
  },
  {
    patterns: ["Imperial City Coffer"],
    key: "imperial-city",
    durationSeconds: 72000,
  },
  {
    patterns: ["Mages Guild Merits"],
    key: "mages-guild",
    durationSeconds: 72000,
  },
  {
    patterns: ["Fighters Guild Merits"],
    key: "fighters-guild",
    durationSeconds: 72000,
  },
  {
    patterns: ["Undaunted Merits"],
    key: "undaunted",
    durationSeconds: 72000,
  },
]

export const DLC_DAILY_PATTERNS: readonly string[] = [
  "Reward Coffer",
  "Recompense",
  "Merit Coffer",
  "Reward Chest",
  "Dragonguard Supply Cache",
]

export const DLC_DAILY_KEYS = {
  "delve": "dlc-dailies-delve",
  "group-boss": "dlc-dailies-group-boss",
  "world-event": "dlc-dailies-world-event",
} as const satisfies Record<string, string>

export const DLC_DAILY_DURATION = 72000

export interface CooldownItemInput {
  itemName: string
}

export function matchesCooldownGroup(item: CooldownItemInput, group: CooldownGroup): boolean {
  const name = item.itemName
  if (name === "") return false
  for (const pattern of group.patterns) {
    if (name.includes(pattern)) return true
  }
  return false
}

export function findCooldownGroup(item: CooldownItemInput): CooldownGroup | undefined {
  for (const group of COOLDOWN_GROUPS) {
    if (matchesCooldownGroup(item, group)) return group
  }
  return undefined
}

export function isRftwContainer(item: CooldownItemInput): boolean {
  return matchesCooldownGroup(item, RFTW_GROUP)
}

export function isDlcDailyContainerByName(item: CooldownItemInput): boolean {
  const name = item.itemName
  if (name === "") return false
  for (const pattern of DLC_DAILY_PATTERNS) {
    if (name.includes(pattern)) return true
  }
  return false
}
