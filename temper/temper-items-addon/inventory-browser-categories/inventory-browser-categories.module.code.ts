import type { BrowserRow } from "../inventory-browser-types/inventory-browser-types.module.code.ts"

function isWeaponRow(row: BrowserRow): boolean {
  const weaponType = row.weaponType
  return (
    weaponType === WEAPONTYPE_AXE ||
    weaponType === WEAPONTYPE_HAMMER ||
    weaponType === WEAPONTYPE_SWORD ||
    weaponType === WEAPONTYPE_DAGGER ||
    weaponType === WEAPONTYPE_TWO_HANDED_AXE ||
    weaponType === WEAPONTYPE_TWO_HANDED_HAMMER ||
    weaponType === WEAPONTYPE_TWO_HANDED_SWORD ||
    weaponType === WEAPONTYPE_BOW ||
    weaponType === WEAPONTYPE_FIRE_STAFF ||
    weaponType === WEAPONTYPE_FROST_STAFF ||
    weaponType === WEAPONTYPE_LIGHTNING_STAFF ||
    weaponType === WEAPONTYPE_HEALING_STAFF
  )
}

function isWearableRow(row: BrowserRow): boolean {
  const equipType = row.equipType
  return (
    equipType === EQUIP_TYPE_CHEST ||
    equipType === EQUIP_TYPE_FEET ||
    equipType === EQUIP_TYPE_HAND ||
    equipType === EQUIP_TYPE_HEAD ||
    equipType === EQUIP_TYPE_LEGS ||
    equipType === EQUIP_TYPE_SHOULDERS ||
    equipType === EQUIP_TYPE_WAIST
  )
}

function isJewelryRow(row: BrowserRow): boolean {
  return (
    row.armorType === ARMORTYPE_NONE &&
    (row.equipType === EQUIP_TYPE_NECK || row.equipType === EQUIP_TYPE_RING)
  )
}

export function matchCategory(
  row: BrowserRow,
  category: string,
  subfilterTypes: readonly number[]
): boolean {
  if (category === "All") return true
  if (category === "Stolen") return row.stolen

  const isCompanionItem = row.isCompanionItem
  const invalidFilterType = subfilterTypes.length === 0
  const hasSingleFilterMatch = subfilterTypes.length >= 1
  const hasDualFilterMatch = subfilterTypes.length >= 2
  const hasValidFurnishingFilterType = subfilterTypes.length >= 3

  if (category === "Weapons") {
    if (invalidFilterType && !isCompanionItem && isWeaponRow(row)) return true
    if (hasSingleFilterMatch) {
      for (let i = 0; i < subfilterTypes.length; i = i + 1) {
        if (row.weaponType === subfilterTypes[i] && !isCompanionItem) return true
      }
    }
    return false
  }

  if (category === "Armor") {
    if (invalidFilterType && !isCompanionItem) {
      const hasShield = row.weaponType === WEAPONTYPE_SHIELD
      const hasDisguise = row.specializedItemType === SPECIALIZED_ITEMTYPE_DISGUISE
      const hasCostume = row.specializedItemType === SPECIALIZED_ITEMTYPE_COSTUME
      if (hasShield || hasDisguise || isWearableRow(row) || hasCostume) return true
    }
    if (hasDualFilterMatch && row.armorType === subfilterTypes[0]) {
      for (let i = 1; i < subfilterTypes.length; i = i + 1) {
        if (row.equipType === subfilterTypes[i] && !isCompanionItem) return true
      }
    }
    return false
  }

  if (category === "Jewelry") {
    if (invalidFilterType && !isCompanionItem && isJewelryRow(row)) return true
    if (hasSingleFilterMatch) {
      for (let i = 0; i < subfilterTypes.length; i = i + 1) {
        if (row.equipType === subfilterTypes[i] && !isCompanionItem) return true
      }
    }
    return false
  }

  if (category === "Companion") {
    if (!isCompanionItem) return false
    if (invalidFilterType) return true
    if (hasDualFilterMatch) {
      if (subfilterTypes[0] === ITEMTYPE_ARMOR) {
        for (let i = 1; i < subfilterTypes.length; i = i + 1) {
          if (row.equipType === subfilterTypes[i]) return true
        }
      } else if (subfilterTypes[0] === ITEMTYPE_WEAPON) {
        for (let i = 1; i < subfilterTypes.length; i = i + 1) {
          if (row.weaponType === subfilterTypes[i]) return true
        }
      }
    }
    return false
  }

  if (category === "Furnishing") {
    if (invalidFilterType && row.isFurnishing) return true
    if (
      hasValidFurnishingFilterType &&
      row.itemType === subfilterTypes[0] &&
      row.furnitureCategoryId === subfilterTypes[1]
    ) {
      for (let i = 2; i < subfilterTypes.length; i = i + 1) {
        if (row.furnitureSubcategoryId === subfilterTypes[i]) return true
      }
    }
    return false
  }

  if (category === "Consumable" || category === "Materials" || category === "Misc") {
    if (hasSingleFilterMatch) {
      for (let i = 0; i < subfilterTypes.length; i = i + 1) {
        if (row.itemType === subfilterTypes[i]) return true
      }
    }
    return false
  }

  if (category === "Appearance" || category === "MiscSubfilter") {
    if (hasSingleFilterMatch) {
      for (let i = 0; i < subfilterTypes.length; i = i + 1) {
        if (row.specializedItemType === subfilterTypes[i]) return true
      }
    }
    return false
  }

  if (category === "Specialized") {
    if (hasDualFilterMatch && row.itemType === subfilterTypes[0]) {
      for (let i = 1; i < subfilterTypes.length; i = i + 1) {
        if (row.specializedItemType === subfilterTypes[i]) return true
      }
    }
    return false
  }

  if (category === "Junk") {
    if (hasSingleFilterMatch && row.itemType === subfilterTypes[0]) return true
    return false
  }

  return false
}
