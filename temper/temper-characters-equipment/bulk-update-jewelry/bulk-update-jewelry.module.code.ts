import type { JewelryTraitId } from "@akasha/temper-equipment/jewelry-traits"
import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { jewelrySlots } from "@akasha/temper-equipment-kinds/jewelry-slots"
import type { JewelryEnchantId } from "../jewelry-enchants/jewelry-enchants.module.code.ts"
import type { Loadout } from "../loadout-types/loadout-types.module.code.ts"
import { isSetValidForSlot } from "../set-pattern-matcher/set-pattern-matcher.module.code.ts"

export function bulkUpdateJewelryTrait(
  equipment: Loadout,
  oldValue: JewelryTraitId,
  newValue: JewelryTraitId
): Partial<Loadout> {
  const newJewelry = { ...equipment.jewelry }
  for (const slotConfig of jewelrySlots.list) {
    const item = newJewelry[slotConfig.id]
    if (item.itemType === "jewelry") {
      const currentTrait = item.data.trait
      if (currentTrait === oldValue) {
        newJewelry[slotConfig.id] = {
          itemType: "jewelry",
          data: { ...item.data, trait: newValue },
        }
      }
    }
  }
  return { jewelry: newJewelry }
}

export function bulkUpdateJewelryEnchant(
  equipment: Loadout,
  oldValue: JewelryEnchantId,
  newValue: JewelryEnchantId
): Partial<Loadout> {
  const newJewelry = { ...equipment.jewelry }
  for (const slotConfig of jewelrySlots.list) {
    const item = newJewelry[slotConfig.id]
    if (item.itemType === "jewelry") {
      const currentEnchant = item.data.enchantment
      if (currentEnchant === oldValue) {
        newJewelry[slotConfig.id] = {
          itemType: "jewelry",
          data: { ...item.data, enchantment: newValue },
        }
      }
    }
  }
  return { jewelry: newJewelry }
}

export function bulkUpdateJewelrySet(
  equipment: Loadout,
  oldValue: SetId,
  newValue: SetId,
  availableSets: readonly SetTemplate[]
): Partial<Loadout> {
  const newJewelry = { ...equipment.jewelry }
  const newSet = newValue !== "no-set" ? availableSets.find((s) => s.id === newValue) : null

  for (const slotConfig of jewelrySlots.list) {
    const item = newJewelry[slotConfig.id]
    if (item.itemType === "jewelry") {
      const currentSet = item.data.set ?? "no-set"
      if (currentSet === oldValue) {
        if (!newSet || isSetValidForSlot(newSet, slotConfig.id, slotConfig.typeId, null)) {
          newJewelry[slotConfig.id] = {
            itemType: "jewelry",
            data: { ...item.data, set: newValue },
          }
        }
      }
    }
  }
  return { jewelry: newJewelry }
}

export function bulkUpdateJewelryQuality(
  equipment: Loadout,
  oldValue: EquipmentQualityOptionId,
  newValue: EquipmentQualityOptionId
): Partial<Loadout> {
  const newJewelry = { ...equipment.jewelry }
  for (const slotConfig of jewelrySlots.list) {
    const item = newJewelry[slotConfig.id]
    if (item.itemType === "jewelry") {
      const currentQuality = item.data.quality ?? "no-quality"
      if (currentQuality === "mythic" && oldValue !== "mythic") continue
      if (currentQuality === oldValue) {
        newJewelry[slotConfig.id] = {
          itemType: "jewelry",
          data: { ...item.data, quality: newValue },
        }
      }
    }
  }
  return { jewelry: newJewelry }
}
