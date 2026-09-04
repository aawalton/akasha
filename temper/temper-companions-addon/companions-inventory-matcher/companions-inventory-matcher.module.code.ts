import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/tstl-language-extensions"
import type { CompanionBuildData } from "../companions-codec/companions-codec.module.code.ts"

export interface InventoryItem {
  bagSlot: number
  equipType: number
  armorType: number
  weaponType: number
  traitType: number
  quality: number
}

export function scanCompanionInventory(): InventoryItem[] {
  const items: InventoryItem[] = []
  const bagSize = GetBagSize(BAG_BACKPACK)

  for (let slot = 0; slot < bagSize; slot++) {
    const itemLink = GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_DEFAULT)
    if (itemLink === "") continue

    if (GetItemActorCategory(BAG_BACKPACK, slot) !== GAMEPLAY_ACTOR_CATEGORY_COMPANION) continue

    items.push({
      bagSlot: slot,
      equipType: GetItemEquipType(BAG_BACKPACK, slot),
      armorType: GetItemArmorType(BAG_BACKPACK, slot),
      weaponType: GetItemWeaponType(BAG_BACKPACK, slot),
      traitType: GetItemTrait(BAG_BACKPACK, slot),
      quality: GetItemDisplayQuality(BAG_BACKPACK, slot),
    })
  }

  return items
}

export function getEquipTypesForSlot(equipSlot: number): number[] {
  if (equipSlot === EQUIP_SLOT_HEAD) return [EQUIP_TYPE_HEAD]
  if (equipSlot === EQUIP_SLOT_SHOULDERS) return [EQUIP_TYPE_SHOULDERS]
  if (equipSlot === EQUIP_SLOT_CHEST) return [EQUIP_TYPE_CHEST]
  if (equipSlot === EQUIP_SLOT_HAND) return [EQUIP_TYPE_HAND]
  if (equipSlot === EQUIP_SLOT_WAIST) return [EQUIP_TYPE_WAIST]
  if (equipSlot === EQUIP_SLOT_LEGS) return [EQUIP_TYPE_LEGS]
  if (equipSlot === EQUIP_SLOT_FEET) return [EQUIP_TYPE_FEET]
  if (equipSlot === EQUIP_SLOT_NECK) return [EQUIP_TYPE_NECK]
  if (equipSlot === EQUIP_SLOT_RING1 || equipSlot === EQUIP_SLOT_RING2) return [EQUIP_TYPE_RING]
  if (equipSlot === EQUIP_SLOT_MAIN_HAND)
    return [EQUIP_TYPE_MAIN_HAND, EQUIP_TYPE_TWO_HAND, EQUIP_TYPE_ONE_HAND]
  if (equipSlot === EQUIP_SLOT_OFF_HAND) return [EQUIP_TYPE_OFF_HAND, EQUIP_TYPE_ONE_HAND]
  return []
}

export function scoreArmorItem(
  armorType: number,
  traitType: number,
  quality: number,
  targetArmorType: number,
  targetTrait: number,
  targetQuality: number
): number {
  let score = 0
  if (armorType === targetArmorType) score += 4
  if (traitType === targetTrait) score += 2
  if (quality >= targetQuality) score += 1
  return score
}

export function findBestArmorMatch(
  inventory: InventoryItem[],
  usedSlots: LuaSet<number>,
  equipSlot: number,
  targetArmorType: number,
  targetTrait: number,
  targetQuality: number
): InventoryItem | undefined {
  const validEquipTypes = getEquipTypesForSlot(equipSlot)

  let bestItem: InventoryItem | undefined
  let bestScore = -1
  const equippedLink = GetItemLink(BAG_COMPANION_WORN, equipSlot, LINK_STYLE_DEFAULT)
  if (equippedLink !== "") {
    bestScore = scoreArmorItem(
      GetItemArmorType(BAG_COMPANION_WORN, equipSlot),
      GetItemTrait(BAG_COMPANION_WORN, equipSlot),
      GetItemDisplayQuality(BAG_COMPANION_WORN, equipSlot),
      targetArmorType,
      targetTrait,
      targetQuality
    )
  }

  for (const item of inventory) {
    if (usedSlots.has(item.bagSlot)) continue

    let fitsSlot = false
    for (const et of validEquipTypes) {
      if (item.equipType === et) {
        fitsSlot = true
        break
      }
    }
    if (!fitsSlot) continue

    const score = scoreArmorItem(
      item.armorType,
      item.traitType,
      item.quality,
      targetArmorType,
      targetTrait,
      targetQuality
    )

    if (score > bestScore) {
      bestScore = score
      bestItem = item
    }
  }

  return bestItem
}

export function scoreJewelryItem(
  traitType: number,
  quality: number,
  targetTrait: number,
  targetQuality: number
): number {
  let score = 0
  if (traitType === targetTrait) score += 2
  if (quality >= targetQuality) score += 1
  return score
}

export function findBestJewelryMatch(
  inventory: InventoryItem[],
  usedSlots: LuaSet<number>,
  equipSlot: number,
  targetTrait: number,
  targetQuality: number
): InventoryItem | undefined {
  const validEquipTypes = getEquipTypesForSlot(equipSlot)

  let bestItem: InventoryItem | undefined
  let bestScore = -1
  const equippedLink = GetItemLink(BAG_COMPANION_WORN, equipSlot, LINK_STYLE_DEFAULT)
  if (equippedLink !== "") {
    bestScore = scoreJewelryItem(
      GetItemTrait(BAG_COMPANION_WORN, equipSlot),
      GetItemDisplayQuality(BAG_COMPANION_WORN, equipSlot),
      targetTrait,
      targetQuality
    )
  }

  for (const item of inventory) {
    if (usedSlots.has(item.bagSlot)) continue

    let fitsSlot = false
    for (const et of validEquipTypes) {
      if (item.equipType === et) {
        fitsSlot = true
        break
      }
    }
    if (!fitsSlot) continue

    const score = scoreJewelryItem(item.traitType, item.quality, targetTrait, targetQuality)

    if (score > bestScore) {
      bestScore = score
      bestItem = item
    }
  }

  return bestItem
}

export type WeaponRole =
  | "dual-wield"
  | "one-hand-and-shield"
  | "two-handed"
  | "bow"
  | "inferno-staff"
  | "ice-staff"
  | "lightning-staff"
  | "restoration-staff"
  | "none"

export const WEAPON_ROLE_TYPES: Record<
  Exclude<WeaponRole, "none">,
  { mainHand: number[]; offHand: number[] }
> = {
  "dual-wield": {
    mainHand: [WEAPONTYPE_SWORD, WEAPONTYPE_AXE, WEAPONTYPE_HAMMER, WEAPONTYPE_DAGGER],
    offHand: [WEAPONTYPE_SWORD, WEAPONTYPE_AXE, WEAPONTYPE_HAMMER, WEAPONTYPE_DAGGER],
  },
  "one-hand-and-shield": {
    mainHand: [WEAPONTYPE_SWORD, WEAPONTYPE_AXE, WEAPONTYPE_HAMMER, WEAPONTYPE_DAGGER],
    offHand: [WEAPONTYPE_SHIELD],
  },
  "two-handed": {
    mainHand: [
      WEAPONTYPE_TWO_HANDED_SWORD,
      WEAPONTYPE_TWO_HANDED_AXE,
      WEAPONTYPE_TWO_HANDED_HAMMER,
    ],
    offHand: [],
  },
  bow: {
    mainHand: [WEAPONTYPE_BOW],
    offHand: [],
  },
  "inferno-staff": {
    mainHand: [WEAPONTYPE_FIRE_STAFF],
    offHand: [],
  },
  "ice-staff": {
    mainHand: [WEAPONTYPE_FROST_STAFF],
    offHand: [],
  },
  "lightning-staff": {
    mainHand: [WEAPONTYPE_LIGHTNING_STAFF],
    offHand: [],
  },
  "restoration-staff": {
    mainHand: [WEAPONTYPE_HEALING_STAFF],
    offHand: [],
  },
}

export function getWeaponRoleFromBuild(build: CompanionBuildData): WeaponRole {
  const mainSlot = build.weapons[0]
  const offSlot = build.weapons[1]
  const mainType = mainSlot !== undefined && !mainSlot.isEmpty ? mainSlot.typeIndex : 0
  const offType = offSlot !== undefined && !offSlot.isEmpty ? offSlot.typeIndex : 0

  if (mainType >= 1 && mainType <= 4 && offType >= 1 && offType <= 4) return "dual-wield"
  if (mainType >= 1 && mainType <= 4 && offType === 13) return "one-hand-and-shield"
  if (mainType >= 5 && mainType <= 7) return "two-handed"
  if (mainType === 8) return "bow"
  if (mainType === 9) return "inferno-staff"
  if (mainType === 10) return "ice-staff"
  if (mainType === 11) return "lightning-staff"
  if (mainType === 12) return "restoration-staff"

  return "none"
}

export function isValidRoleWeapon(weaponType: number, validTypes: number[]): boolean {
  for (const vt of validTypes) {
    if (weaponType === vt) return true
  }
  return false
}

export function findBestWeaponForRole(
  inventory: InventoryItem[],
  usedSlots: LuaSet<number>,
  equipSlot: number,
  validWeaponTypes: number[],
  targetTrait: number,
  targetQuality: number
): InventoryItem | undefined {
  const validEquipTypes = getEquipTypesForSlot(equipSlot)

  let bestItem: InventoryItem | undefined
  let bestScore = -1
  const equippedLink = GetItemLink(BAG_COMPANION_WORN, equipSlot, LINK_STYLE_DEFAULT)
  if (equippedLink !== "") {
    const equippedWeaponType = GetItemWeaponType(BAG_COMPANION_WORN, equipSlot)
    if (isValidRoleWeapon(equippedWeaponType, validWeaponTypes)) {
      let score = 0
      if (GetItemTrait(BAG_COMPANION_WORN, equipSlot) === targetTrait) score += 2
      if (GetItemDisplayQuality(BAG_COMPANION_WORN, equipSlot) >= targetQuality) score += 1
      bestScore = score
    }
  }

  for (const item of inventory) {
    if (usedSlots.has(item.bagSlot)) continue

    let fitsSlot = false
    for (const et of validEquipTypes) {
      if (item.equipType === et) {
        fitsSlot = true
        break
      }
    }
    if (!fitsSlot) continue

    if (!isValidRoleWeapon(item.weaponType, validWeaponTypes)) continue

    let score = 0
    if (item.traitType === targetTrait) score += 2
    if (item.quality >= targetQuality) score += 1

    if (score > bestScore) {
      bestScore = score
      bestItem = item
    }
  }

  return bestItem
}
