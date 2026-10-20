import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import { armorSlots } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-slots/armor-slots.module.code.ts"
import type { EquipmentQualityOptionId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { ArmorTraitId } from "akasha/temper/catalog/gear/equipment/modules/armor-traits/armor-traits.module.code.ts"
import type { StandardArmorWeightId } from "akasha/temper/catalog/gear/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import type { ArmorEnchantId } from "akasha/temper/player/character/characters-equipment/modules/armor-enchants/armor-enchants.module.code.ts"
import type { Loadout } from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import {
  armorWeightFitsSet,
  armorWeightUnderSet,
  isSetValidForArmorSlot,
} from "akasha/temper/player/character/characters-equipment/modules/set-pattern-matcher/set-pattern-matcher.module.code.ts"

function setOfPiece(
  setId: Slug | null | undefined,
  availableSets: readonly SetTemplate[]
): SetTemplate | undefined {
  if (setId == null || setId === "no-set") return undefined
  return availableSets.find((s) => s.id === setId)
}

export function bulkArmorWeightFits(
  equipment: Loadout,
  oldValue: StandardArmorWeightId,
  newValue: StandardArmorWeightId,
  availableSets: readonly SetTemplate[]
): boolean {
  if (newValue === oldValue) return true
  return armorSlots.list.some((slotConfig) => {
    const item = equipment.armor[slotConfig.id]
    if (item.itemType !== "armor" || item.data.weight !== oldValue) return false
    return armorWeightFitsSet(setOfPiece(item.data.set, availableSets), slotConfig.id, newValue)
  })
}

export function bulkUpdateArmorWeight(
  equipment: Loadout,
  oldValue: StandardArmorWeightId | null,
  newValue: StandardArmorWeightId | null,
  availableSets: readonly SetTemplate[]
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  const oldWeightId = oldValue ?? "no-weight"
  const newWeightId = newValue ?? "no-weight"

  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentWeight = item.data.weight
      const set = setOfPiece(item.data.set, availableSets)
      if (currentWeight === oldWeightId && armorWeightFitsSet(set, slotConfig.id, newWeightId)) {
        newArmor[slotConfig.id] = {
          itemType: "armor",
          data: { ...item.data, weight: newWeightId },
        }
      }
    }
  }
  return { armor: newArmor }
}

export function bulkUpdateArmorTrait(
  equipment: Loadout,
  oldValue: ArmorTraitId,
  newValue: ArmorTraitId
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentTrait = item.data.trait
      if (currentTrait === oldValue) {
        newArmor[slotConfig.id] = {
          itemType: "armor",
          data: { ...item.data, trait: newValue },
        }
      }
    }
  }

  const newPrimaryBar = { ...equipment["primary-weapon-bar"] }
  const newBackupBar = { ...equipment["backup-weapon-bar"] }

  if (newPrimaryBar["off-hand"].itemType === "shield") {
    const item = newPrimaryBar["off-hand"]
    const currentTrait = item.data.trait
    if (currentTrait === oldValue) {
      newPrimaryBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, trait: newValue },
      }
    }
  }
  if (newBackupBar["off-hand"].itemType === "shield") {
    const item = newBackupBar["off-hand"]
    const currentTrait = item.data.trait
    if (currentTrait === oldValue) {
      newBackupBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, trait: newValue },
      }
    }
  }

  return { armor: newArmor, "primary-weapon-bar": newPrimaryBar, "backup-weapon-bar": newBackupBar }
}

export function bulkUpdateArmorEnchant(
  equipment: Loadout,
  oldValue: ArmorEnchantId,
  newValue: ArmorEnchantId
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentEnchant = item.data.enchantment
      if (currentEnchant === oldValue) {
        newArmor[slotConfig.id] = {
          itemType: "armor",
          data: { ...item.data, enchantment: newValue },
        }
      }
    }
  }

  const newPrimaryBar = { ...equipment["primary-weapon-bar"] }
  const newBackupBar = { ...equipment["backup-weapon-bar"] }

  if (newPrimaryBar["off-hand"].itemType === "shield") {
    const item = newPrimaryBar["off-hand"]
    const currentEnchant = item.data.enchantment
    if (currentEnchant === oldValue) {
      newPrimaryBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, enchantment: newValue },
      }
    }
  }
  if (newBackupBar["off-hand"].itemType === "shield") {
    const item = newBackupBar["off-hand"]
    const currentEnchant = item.data.enchantment
    if (currentEnchant === oldValue) {
      newBackupBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, enchantment: newValue },
      }
    }
  }

  return { armor: newArmor, "primary-weapon-bar": newPrimaryBar, "backup-weapon-bar": newBackupBar }
}

export function bulkUpdateArmorSet(
  equipment: Loadout,
  oldValue: Slug,
  newValue: Slug,
  availableSets: readonly SetTemplate[]
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  const newSet = newValue !== "no-set" ? availableSets.find((s) => s.id === newValue) : null

  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentSet = item.data.set ?? "no-set"
      if (currentSet === oldValue) {
        if (!newSet) {
          newArmor[slotConfig.id] = { itemType: "armor", data: { ...item.data, set: newValue } }
        } else if (isSetValidForArmorSlot(newSet, slotConfig.id)) {
          const weight = armorWeightUnderSet(newSet, slotConfig.id, item.data.weight ?? "no-weight")
          newArmor[slotConfig.id] = {
            itemType: "armor",
            data: { ...item.data, set: newValue, weight },
          }
        }
      }
    }
  }
  return { armor: newArmor }
}

export function bulkUpdateArmorQuality(
  equipment: Loadout,
  oldValue: EquipmentQualityOptionId,
  newValue: EquipmentQualityOptionId
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentQuality = item.data.quality ?? "no-quality"
      if (currentQuality === "mythic" && oldValue !== "mythic") continue
      if (currentQuality === oldValue) {
        newArmor[slotConfig.id] = {
          itemType: "armor",
          data: { ...item.data, quality: newValue },
        }
      }
    }
  }

  const newPrimaryBar = { ...equipment["primary-weapon-bar"] }
  const newBackupBar = { ...equipment["backup-weapon-bar"] }

  if (newPrimaryBar["off-hand"].itemType === "shield") {
    const item = newPrimaryBar["off-hand"]
    const currentQuality = item.data.quality ?? "no-quality"
    if (!(currentQuality === "mythic" && oldValue !== "mythic") && currentQuality === oldValue) {
      newPrimaryBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, quality: newValue },
      }
    }
  }
  if (newBackupBar["off-hand"].itemType === "shield") {
    const item = newBackupBar["off-hand"]
    const currentQuality = item.data.quality ?? "no-quality"
    if (!(currentQuality === "mythic" && oldValue !== "mythic") && currentQuality === oldValue) {
      newBackupBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, quality: newValue },
      }
    }
  }

  return { armor: newArmor, "primary-weapon-bar": newPrimaryBar, "backup-weapon-bar": newBackupBar }
}
