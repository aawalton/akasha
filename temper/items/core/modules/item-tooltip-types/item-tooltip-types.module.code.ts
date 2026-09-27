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
  enchantHeader?: string
  enchantDescription?: string
  own?: OwnItemValues
}

export type OwnItemValues = Partial<
  Pick<
    MinedItemData,
    | "requiredLevel"
    | "requiredCp"
    | "merchantValue"
    | "weaponPower"
    | "armorRating"
    | "traitType"
    | "traitDescription"
    | "hasOnUseAbility"
    | "abilityHeader"
    | "abilityDescription"
    | "abilityCooldown"
    | "setBonuses"
  >
>

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
  merchantValue: number
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

function withOwnEnchant(
  reference: MinedItemData | null,
  instance: ItemTooltipInstance
): MinedItemData | null {
  const { enchantHeader, enchantDescription } = instance
  if (reference === null || enchantHeader === undefined || enchantDescription === undefined) {
    return reference
  }
  return { ...reference, enchantHeader, enchantDescription }
}

function withOwnValues(
  reference: MinedItemData | null,
  own: OwnItemValues | undefined
): MinedItemData | null {
  if (reference === null || own === undefined) return reference
  return { ...reference, ...own }
}

export function resolveItemTooltipData(
  reference: MinedItemData | null,
  instance: ItemTooltipInstance
): ItemTooltipData {
  return {
    referenceData: withOwnValues(withOwnEnchant(reference, instance), instance.own),
    quality: instance.quality,
    level: instance.level,
    bound: instance.bound,
    stolen: instance.stolen,
    stackCount: instance.stackCount,
    charges: instance.charges,
  }
}
