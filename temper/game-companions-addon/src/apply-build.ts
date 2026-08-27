import { requireAt } from "@temper/shared-narrow"
import {
  ARMOR_SLOTS,
  type CompanionBuildData,
  JEWELRY_SLOTS,
  SKILL_SLOT_INDICES,
  WEAPON_SLOTS,
} from "./codec/companion-codec"
import { decodeCompanionBuild } from "./codec/companion-decoder"
import {
  findBestArmorMatch,
  findBestJewelryMatch,
  findBestWeaponForRole,
  getWeaponRoleFromBuild,
  scanCompanionInventory,
  WEAPON_ROLE_TYPES,
} from "./inventory-matcher"
import {
  getAbilityIdFromSkillIndex,
  getArmorTraitFromIndex,
  getArmorTypeFromIndex,
  getJewelryTraitFromIndex,
  getQualityFromIndex,
  getWeaponTraitFromIndex,
} from "./mappings/reverse-mappings"
import type { SlotUpgrade, UpgradeScanResult } from "./scan-upgrades"

export let applyGeneration = 0

export function applyBuild(companionId: number, hash: string): undefined {
  if (!HasActiveCompanion()) {
    d("[Temper] No active companion")
    return
  }
  if (GetActiveCompanionDefId() !== companionId) {
    d("[Temper] Active companion does not match selection")
    return
  }
  if (IsUnitInCombat("player")) {
    d("[Temper] Cannot apply build while in combat")
    return
  }

  const build = decodeCompanionBuild(hash)
  if (build === undefined) {
    d("[Temper] Failed to decode build")
    return
  }

  d("[Temper] Applying target build...")

  applyEquipment(build)
  const gen = ++applyGeneration
  zo_callLater(() => {
    if (gen !== applyGeneration) return
    applySkills(build)
    d("[Temper] Target build applied")
    TemperCharacters.TabManager.RefreshActivePanel()
  }, 500)
}

export function clearCompanionBuild(): undefined {
  if (!HasActiveCompanion()) return
  if (IsUnitInCombat("player")) {
    d("[Temper] Cannot clear build while in combat")
    return
  }

  const gen = ++applyGeneration

  const slotsToUnequip: number[] = []
  for (const slot of ARMOR_SLOTS) {
    if (GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT) !== "") {
      slotsToUnequip.push(slot)
    }
  }
  for (const slot of JEWELRY_SLOTS) {
    if (GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT) !== "") {
      slotsToUnequip.push(slot)
    }
  }
  for (const slot of WEAPON_SLOTS) {
    if (GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT) !== "") {
      slotsToUnequip.push(slot)
    }
  }

  const FRAME_DELAY = 200
  for (let i = 0; i < slotsToUnequip.length; i++) {
    const slot = slotsToUnequip[i]
    if (i === 0) {
      RequestUnequipItem(BAG_COMPANION_WORN, slot)
    } else {
      zo_callLater(() => {
        if (gen !== applyGeneration) return
        RequestUnequipItem(BAG_COMPANION_WORN, slot)
      }, i * FRAME_DELAY)
    }
  }

  const skillDelay = slotsToUnequip.length * FRAME_DELAY + 100
  zo_callLater(() => {
    if (gen !== applyGeneration) return
    PrepareSkillPointAllocationRequest(
      SKILL_POINT_ALLOCATION_MODE_PURCHASE_ONLY,
      RESPEC_PAYMENT_TYPE_GOLD
    )
    for (const slotIndex of SKILL_SLOT_INDICES) {
      AddHotbarSlotChangeToAllocationRequest(
        slotIndex,
        HOTBAR_CATEGORY_COMPANION,
        ACTION_TYPE_NOTHING,
        0
      )
    }
    SendSkillPointAllocationRequest()
    d("[Temper] Build cleared")
  }, skillDelay)

  zo_callLater(() => {
    if (gen !== applyGeneration) return
    TemperCharacters.TabManager.RefreshActivePanel()
  }, skillDelay + 500)
}

export function applySkills(build: CompanionBuildData): undefined {
  for (let i = 0; i < SKILL_SLOT_INDICES.length; i++) {
    const skillIndex = build.skills[i]
    if (skillIndex === undefined || skillIndex === 0) continue

    const abilityId = getAbilityIdFromSkillIndex(skillIndex)
    if (abilityId === 0) continue

    PrepareSkillPointAllocationRequest(
      SKILL_POINT_ALLOCATION_MODE_PURCHASE_ONLY,
      RESPEC_PAYMENT_TYPE_GOLD
    )
    AddHotbarSlotChangeToAllocationRequest(
      requireAt(SKILL_SLOT_INDICES, i, "SKILL_SLOT_INDICES"),
      HOTBAR_CATEGORY_COMPANION,
      ACTION_TYPE_ABILITY,
      abilityId
    )
    SendSkillPointAllocationRequest()
  }
}

export function applyEquipment(build: CompanionBuildData): undefined {
  const inventory = scanCompanionInventory()
  d(`[Temper] Found ${inventory.length} companion items in backpack`)
  const usedBagSlots = new LuaSet<number>()

  for (let i = 0; i < ARMOR_SLOTS.length; i++) {
    const slot = build.armor[i]
    if (slot === undefined || slot.isEmpty) continue

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
      d(`[Temper] Equipping armor slot ${equipSlot}: bag slot ${item.bagSlot}`)
      usedBagSlots.add(item.bagSlot)
      RequestEquipItem(BAG_BACKPACK, item.bagSlot, BAG_COMPANION_WORN, equipSlot)
    }
  }

  for (let i = 0; i < JEWELRY_SLOTS.length; i++) {
    const slot = build.jewelry[i]
    if (slot === undefined || slot.isEmpty) continue

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
      d(`[Temper] Equipping jewelry slot ${equipSlot}: bag slot ${item.bagSlot}`)
      usedBagSlots.add(item.bagSlot)
      RequestEquipItem(BAG_BACKPACK, item.bagSlot, BAG_COMPANION_WORN, equipSlot)
    }
  }

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
        d(`[Temper] Equipping weapon slot ${EQUIP_SLOT_MAIN_HAND}: bag slot ${result.bagSlot}`)
        usedBagSlots.add(result.bagSlot)
        RequestEquipItem(BAG_BACKPACK, result.bagSlot, BAG_COMPANION_WORN, EQUIP_SLOT_MAIN_HAND)
      }
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
          d(`[Temper] Equipping weapon slot ${EQUIP_SLOT_OFF_HAND}: bag slot ${result.bagSlot}`)
          usedBagSlots.add(result.bagSlot)
          RequestEquipItem(BAG_BACKPACK, result.bagSlot, BAG_COMPANION_WORN, EQUIP_SLOT_OFF_HAND)
        }
      }
    }
  }
}

export function equipUpgrades(result: UpgradeScanResult): undefined {
  const allUpgrades: SlotUpgrade[] = []
  for (const u of result.armorUpgrades) {
    if (u !== undefined) allUpgrades.push(u)
  }
  for (const u of result.jewelryUpgrades) {
    if (u !== undefined) allUpgrades.push(u)
  }
  for (const u of result.weaponUpgrades) {
    if (u !== undefined) allUpgrades.push(u)
  }

  const gen = ++applyGeneration
  const FRAME_DELAY = 200
  for (let i = 0; i < allUpgrades.length; i++) {
    const upgrade = requireAt(allUpgrades, i, "allUpgrades")
    if (i === 0) {
      RequestEquipItem(BAG_BACKPACK, upgrade.bagSlot, BAG_COMPANION_WORN, upgrade.equipSlot)
    } else {
      zo_callLater(() => {
        if (gen !== applyGeneration) return
        RequestEquipItem(BAG_BACKPACK, upgrade.bagSlot, BAG_COMPANION_WORN, upgrade.equipSlot)
      }, i * FRAME_DELAY)
    }
  }
}
