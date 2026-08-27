export interface SetBonus {
  numRequired: number
  description: string
  isPerfected: boolean
}

export interface MinedItemEntry {
  name: string
  icon: string
  itemType: number
  specializedItemType: number
  equipType: number
  weaponType: number
  armorType: number
  weaponPower: number
  armorRating: number
  requiredLevel: number
  requiredCP: number
  value: number
  quality: number
  style: number
  filterType: number
  filterTypeSpecific: number
  isUnique: boolean
  isUniqueEquipped: boolean
  enchantHeader: string
  enchantDescription: string
  hasOnUseAbility: boolean
  abilityHeader: string
  abilityDescription: string
  abilityCooldown: number
  traitType: number
  traitDescription: string
  hasSet: boolean
  setId: number
  setName: string
  setMaxEquip: number
  setBonuses: SetBonus[]
  flavorText: string
}

export interface MinedQuestEntry {
  name: string
  questType: number
  repeatableType: number
  zoneId: number
  zoneName: string
}

export interface MiningStats {
  totalProcessed: number
  equipmentFound: number
  startTime: number
}

export interface QuestMiningStats {
  totalMined: number
  startTime: number
  endTime: number
}

export interface DataMiningPayload {
  version?: number
  items?: Record<number, MinedItemEntry>
  nextItemId?: number
  isRunning?: boolean
  consecutiveMisses?: number
  completed?: boolean
  stats?: MiningStats
  quests?: Record<number, MinedQuestEntry>
  questNextId?: number
  questIsRunning?: boolean
  questConsecutiveMisses?: number
  questCompleted?: boolean
  questStats?: QuestMiningStats
  apiVersion?: string
}
