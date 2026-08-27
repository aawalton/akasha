export interface SetBonusEntry {
  numRequired: number
  description: string
  isPerfected: boolean
}

export interface ItemTooltipInstance {
  quality: number
  level: number
  bound: boolean
  stolen: boolean
  stackCount: number
  charges: number
}

export interface MinedItemData {
  itemId: number
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
  requiredCp: number
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
  setBonuses: readonly SetBonusEntry[] | null
  flavorText: string
  minedAt: string
}

export interface MinedItemSearchResult {
  itemId: number
  name: string
  icon: string
  quality: number
  itemType: number
  filterType: number
  setName: string | null
}

export interface ItemTooltipData {
  referenceData: MinedItemData | null
  quality: number
  level: number
  bound: boolean
  stolen: boolean
  stackCount: number
  charges: number
}

export function resolveItemTooltipData(
  reference: MinedItemData | null,
  instance: ItemTooltipInstance
): ItemTooltipData {
  return {
    referenceData: reference,
    quality: instance.quality,
    level: instance.level,
    bound: instance.bound,
    stolen: instance.stolen,
    stackCount: instance.stackCount,
    charges: instance.charges,
  }
}
