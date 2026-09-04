import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { requireAt } from "@akasha/utils-narrow/require-at"
import { ARMOR_SLOTS, JEWELRY_SLOTS } from "../companions-codec/companions-codec.module.code.ts"
import { decodeCompanionBuild } from "../companions-decoder/companions-decoder.module.code.ts"
import {
  findBestArmorMatch,
  findBestJewelryMatch,
  findBestWeaponForRole,
  getWeaponRoleFromBuild,
  scanCompanionInventory,
  WEAPON_ROLE_TYPES,
} from "../companions-inventory-matcher/companions-inventory-matcher.module.code.ts"
import {
  getArmorTraitFromIndex,
  getArmorTypeFromIndex,
  getJewelryTraitFromIndex,
  getQualityFromIndex,
  getWeaponTraitFromIndex,
} from "../companions-reverse-mappings/companions-reverse-mappings.module.code.ts"

export interface SlotUpgrade {
  bagSlot: number
  equipSlot: number
}

export interface UpgradeScanResult {
  armorUpgrades: (SlotUpgrade | undefined)[]
  jewelryUpgrades: (SlotUpgrade | undefined)[]
  weaponUpgrades: (SlotUpgrade | undefined)[]
  totalUpgradeCount: number
}

export function scanForUpgrades(companionId: number, hash: string): UpgradeScanResult | undefined {
  if (!HasActiveCompanion()) return undefined
  if (GetActiveCompanionDefId() !== companionId) return undefined

  const build = decodeCompanionBuild(hash)
  if (build === undefined) return undefined

  const inventory = scanCompanionInventory()
  const usedBagSlots = new LuaSet<number>()
  let totalUpgradeCount = 0

  const armorUpgrades: (SlotUpgrade | undefined)[] = []
  for (let i = 0; i < ARMOR_SLOTS.length; i++) {
    const slot = build.armor[i]
    if (slot === undefined || slot.isEmpty) {
      armorUpgrades.push(undefined)
      continue
    }

    const equipSlot = requireAt(ARMOR_SLOTS, i, "ARMOR_SLOTS")
    const targetArmorType = getArmorTypeFromIndex(slot.weightIndex)
    const targetTrait = getArmorTraitFromIndex(slot.traitIndex)
    const targetQuality = getQualityFromIndex(slot.qualityIndex)

    const item = findBestArmorMatch(
      inventory,
      usedBagSlots,
      equipSlot,
      targetArmorType,
      targetTrait,
      targetQuality
    )
    if (item !== undefined) {
      usedBagSlots.add(item.bagSlot)
      armorUpgrades.push({ bagSlot: item.bagSlot, equipSlot })
      totalUpgradeCount++
    } else {
      armorUpgrades.push(undefined)
    }
  }

  const jewelryUpgrades: (SlotUpgrade | undefined)[] = []
  for (let i = 0; i < JEWELRY_SLOTS.length; i++) {
    const slot = build.jewelry[i]
    if (slot === undefined || slot.isEmpty) {
      jewelryUpgrades.push(undefined)
      continue
    }

    const equipSlot = requireAt(JEWELRY_SLOTS, i, "JEWELRY_SLOTS")
    const targetTrait = getJewelryTraitFromIndex(slot.traitIndex)
    const targetQuality = getQualityFromIndex(slot.qualityIndex)

    const item = findBestJewelryMatch(
      inventory,
      usedBagSlots,
      equipSlot,
      targetTrait,
      targetQuality
    )
    if (item !== undefined) {
      usedBagSlots.add(item.bagSlot)
      jewelryUpgrades.push({ bagSlot: item.bagSlot, equipSlot })
      totalUpgradeCount++
    } else {
      jewelryUpgrades.push(undefined)
    }
  }

  const weaponUpgrades: (SlotUpgrade | undefined)[] = []
  const weaponRole = getWeaponRoleFromBuild(build)
  if (weaponRole !== "none") {
    const roleTypes = WEAPON_ROLE_TYPES[weaponRole]

    const mainSlot = build.weapons[0]
    if (mainSlot !== undefined && !mainSlot.isEmpty) {
      const targetTrait = getWeaponTraitFromIndex(mainSlot.traitIndex)
      const targetQuality = getQualityFromIndex(mainSlot.qualityIndex)
      const result = findBestWeaponForRole(
        inventory,
        usedBagSlots,
        EQUIP_SLOT_MAIN_HAND,
        roleTypes.mainHand,
        targetTrait,
        targetQuality
      )
      if (result !== undefined) {
        usedBagSlots.add(result.bagSlot)
        weaponUpgrades.push({ bagSlot: result.bagSlot, equipSlot: EQUIP_SLOT_MAIN_HAND })
        totalUpgradeCount++
      } else {
        weaponUpgrades.push(undefined)
      }
    } else {
      weaponUpgrades.push(undefined)
    }

    if (roleTypes.offHand.length > 0) {
      const offSlot = build.weapons[1]
      if (offSlot !== undefined && !offSlot.isEmpty) {
        const targetTrait = getWeaponTraitFromIndex(offSlot.traitIndex)
        const targetQuality = getQualityFromIndex(offSlot.qualityIndex)
        const result = findBestWeaponForRole(
          inventory,
          usedBagSlots,
          EQUIP_SLOT_OFF_HAND,
          roleTypes.offHand,
          targetTrait,
          targetQuality
        )
        if (result !== undefined) {
          usedBagSlots.add(result.bagSlot)
          weaponUpgrades.push({ bagSlot: result.bagSlot, equipSlot: EQUIP_SLOT_OFF_HAND })
          totalUpgradeCount++
        } else {
          weaponUpgrades.push(undefined)
        }
      } else {
        weaponUpgrades.push(undefined)
      }
    } else {
      weaponUpgrades.push(undefined)
    }
  } else {
    weaponUpgrades.push(undefined)
    weaponUpgrades.push(undefined)
  }

  if (totalUpgradeCount === 0) return undefined

  return { armorUpgrades, jewelryUpgrades, weaponUpgrades, totalUpgradeCount }
}
