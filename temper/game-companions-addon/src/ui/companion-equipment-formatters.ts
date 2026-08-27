import { ARMOR_WEIGHT_NAMES, QUALITY_COLORS, TRAIT_NAMES, WEAPON_TYPE_NAMES } from "./display-names"
export function FormatArmorSlot(slot: number): string {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
  if (itemLink === "") return "Empty"

  const weight = GetItemArmorType(BAG_COMPANION_WORN, slot)
  const trait = GetItemTrait(BAG_COMPANION_WORN, slot)

  const parts: string[] = []
  const weightName = ARMOR_WEIGHT_NAMES[weight]
  if (weightName !== undefined && weight !== ARMORTYPE_NONE) parts.push(weightName)
  const traitName = TRAIT_NAMES[trait]
  if (traitName !== undefined && trait !== ITEM_TRAIT_TYPE_NONE) parts.push(traitName)

  return parts.length > 0 ? table.concat(parts, ", ") : "Unknown"
}

export function FormatJewelrySlot(slot: number): string {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
  if (itemLink === "") return "Empty"

  const trait = GetItemTrait(BAG_COMPANION_WORN, slot)

  const traitName = TRAIT_NAMES[trait]
  if (traitName !== undefined && trait !== ITEM_TRAIT_TYPE_NONE) return traitName

  return "No Trait"
}

export function FormatWeaponSlot(slot: number): string {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
  if (itemLink === "") return "Empty"

  const weaponType = GetItemWeaponType(BAG_COMPANION_WORN, slot)
  const trait = GetItemTrait(BAG_COMPANION_WORN, slot)

  const parts: string[] = []
  const typeName = WEAPON_TYPE_NAMES[weaponType]
  if (typeName !== undefined && weaponType !== WEAPONTYPE_NONE) parts.push(typeName)
  const traitName = TRAIT_NAMES[trait]
  if (traitName !== undefined && trait !== ITEM_TRAIT_TYPE_NONE) parts.push(traitName)

  return parts.length > 0 ? table.concat(parts, ", ") : "Unknown"
}

export function GetQualityColorForSlot(slot: number): [number, number, number] {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
  if (itemLink === "") return [0.5, 0.5, 0.5]

  const quality = GetItemDisplayQuality(BAG_COMPANION_WORN, slot)
  return QUALITY_COLORS[quality] ?? [1, 1, 1]
}
