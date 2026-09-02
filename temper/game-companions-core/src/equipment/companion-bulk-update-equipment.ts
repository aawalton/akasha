import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { companionArmorSlots } from "@akasha/temper-companions-core/companion-armor-slots"
import type { CompanionEquipmentQualityId } from "@akasha/temper-companions-core/companion-equipment-qualities"
import { capQualityForSlot } from "./companion-equipment-quality-rules"
import { companionJewelrySlots } from "@akasha/temper-companions-core/companion-jewelry-slots"
import type { CompanionTraitId } from "@akasha/temper-companions-core/companion-traits"
import { companionWeaponSlots } from "@akasha/temper-companions-core/companion-weapon-slots"
import { companionWeaponTypes } from "@akasha/temper-companions-core/companion-weapon-types"

function isMainHandTwoHanded(equipment: CompanionState["equipment"]): boolean {
  const mainHandSlot = equipment.weapons["main-hand"]
  const mainHandType = mainHandSlot.itemType === "weapon" ? mainHandSlot.data.type : "no-type"
  return mainHandType !== "no-type" && companionWeaponTypes.data[mainHandType].isTwoHanded
}

export function bulkUpdateAllCompanionTraits(
  equipment: CompanionState["equipment"],
  oldValue: CompanionTraitId,
  newValue: CompanionTraitId
): Partial<CompanionState["equipment"]> {
  const twoHanded = isMainHandTwoHanded(equipment)

  const newArmor = { ...equipment.armor }
  for (const slot of companionArmorSlots.list) {
    const item = newArmor[slot.id]
    const effectiveTrait = item.itemType === "armor" ? item.data.trait : "no-trait"
    if (effectiveTrait === oldValue) {
      newArmor[slot.id] = {
        itemType: "armor",
        data: {
          type: slot.id,
          weight: item.itemType === "armor" ? item.data.weight : "no-weight",
          trait: newValue,
          quality: item.itemType === "armor" ? item.data.quality : "no-quality",
        },
      }
    }
  }

  const newJewelry = { ...equipment.jewelry }
  for (const slot of companionJewelrySlots.list) {
    const item = newJewelry[slot.id]
    const effectiveTrait = item.itemType === "jewelry" ? item.data.trait : "no-trait"
    if (effectiveTrait === oldValue) {
      newJewelry[slot.id] = {
        itemType: "jewelry",
        data: {
          type: slot.id,
          trait: newValue,
          quality: item.itemType === "jewelry" ? item.data.quality : "no-quality",
        },
      }
    }
  }

  const newWeapons = { ...equipment.weapons }
  for (const slot of companionWeaponSlots.list) {
    if (slot.id === "off-hand") continue
    const item = newWeapons[slot.id]
    const effectiveTrait = item.itemType === "weapon" ? item.data.trait : "no-trait"
    if (effectiveTrait === oldValue) {
      newWeapons[slot.id] = {
        itemType: "weapon",
        data: {
          slot: slot.id,
          type: item.itemType === "weapon" ? item.data.type : "no-type",
          trait: newValue,
          quality: item.itemType === "weapon" ? item.data.quality : "no-quality",
        },
      }
    }
  }
  if (!twoHanded) {
    const mainHandSlot = newWeapons["main-hand"]
    if (mainHandSlot.itemType === "weapon" && mainHandSlot.data.type !== "no-type") {
      newWeapons["off-hand"] = {
        itemType: "weapon",
        data: { ...mainHandSlot.data, slot: "off-hand" },
      }
    }
  }

  return { armor: newArmor, jewelry: newJewelry, weapons: newWeapons }
}

export function bulkUpdateAllCompanionQualities(
  equipment: CompanionState["equipment"],
  oldValue: CompanionEquipmentQualityId,
  newValue: CompanionEquipmentQualityId
): Partial<CompanionState["equipment"]> {
  const twoHanded = isMainHandTwoHanded(equipment)

  const newArmor = { ...equipment.armor }
  for (const slot of companionArmorSlots.list) {
    const item = newArmor[slot.id]
    const effectiveQuality = item.itemType === "armor" ? item.data.quality : "no-quality"
    const cappedQuality = capQualityForSlot(slot.id, newValue)
    if (effectiveQuality === oldValue) {
      newArmor[slot.id] = {
        itemType: "armor",
        data: {
          type: slot.id,
          weight: item.itemType === "armor" ? item.data.weight : "no-weight",
          trait: item.itemType === "armor" ? item.data.trait : "no-trait",
          quality: cappedQuality,
        },
      }
    }
  }

  const newJewelry = { ...equipment.jewelry }
  for (const slot of companionJewelrySlots.list) {
    const item = newJewelry[slot.id]
    const effectiveQuality = item.itemType === "jewelry" ? item.data.quality : "no-quality"
    const cappedQuality = capQualityForSlot(slot.id, newValue)
    if (effectiveQuality === oldValue) {
      newJewelry[slot.id] = {
        itemType: "jewelry",
        data: {
          type: slot.id,
          trait: item.itemType === "jewelry" ? item.data.trait : "no-trait",
          quality: cappedQuality,
        },
      }
    }
  }

  const newWeapons = { ...equipment.weapons }
  for (const slot of companionWeaponSlots.list) {
    if (slot.id === "off-hand") continue
    const item = newWeapons[slot.id]
    const effectiveQuality = item.itemType === "weapon" ? item.data.quality : "no-quality"
    const cappedQuality = capQualityForSlot(slot.id, newValue)
    if (effectiveQuality === oldValue) {
      newWeapons[slot.id] = {
        itemType: "weapon",
        data: {
          slot: slot.id,
          type: item.itemType === "weapon" ? item.data.type : "no-type",
          trait: item.itemType === "weapon" ? item.data.trait : "no-trait",
          quality: cappedQuality,
        },
      }
    }
  }
  if (!twoHanded) {
    const mainHandSlot = newWeapons["main-hand"]
    if (mainHandSlot.itemType === "weapon" && mainHandSlot.data.type !== "no-type") {
      newWeapons["off-hand"] = {
        itemType: "weapon",
        data: { ...mainHandSlot.data, slot: "off-hand" },
      }
    }
  }

  return { armor: newArmor, jewelry: newJewelry, weapons: newWeapons }
}
