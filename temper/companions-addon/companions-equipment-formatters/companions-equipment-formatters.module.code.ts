import "akasha/temper/temper-eso-types/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import {
  ARMOR_WEIGHT_NAMES,
  QUALITY_COLORS,
  TRAIT_NAMES,
  WEAPON_TYPE_NAMES,
} from "../companions-display-names/companions-display-names.module.code.ts"
export function formatArmorSlot(slot: number): string {
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

export function formatJewelrySlot(slot: number): string {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
  if (itemLink === "") return "Empty"

  const trait = GetItemTrait(BAG_COMPANION_WORN, slot)

  const traitName = TRAIT_NAMES[trait]
  if (traitName !== undefined && trait !== ITEM_TRAIT_TYPE_NONE) return traitName

  return "No Trait"
}

export function formatWeaponSlot(slot: number): string {
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

export function getQualityColorForSlot(slot: number): [number, number, number] {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
  if (itemLink === "") return [0.5, 0.5, 0.5]

  const quality = GetItemDisplayQuality(BAG_COMPANION_WORN, slot)
  return QUALITY_COLORS[quality] ?? [1, 1, 1]
}
