import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlotItem,
} from "@temper/game-characters-equipment/loadout/loadout-types"
import {
  type EquipmentQualityId,
  resolveQuality,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import { createSetSource, type SetSource } from "@temper/game-characters-equipment/sets/set-source"
import type { SetsAllId } from "@temper/game-characters-equipment/sets/sets-all-data"
import { valuesOf } from "@akasha/temper-formula-framework/record-parts"
import type { PipelineStage } from "./types"

function getSetInfo(
  item: ArmorSlotItem | JewelrySlotItem | WeaponSlotItem
): { setId: SetsAllId; quality: EquipmentQualityId } | null {
  if (item.itemType === "empty" || item.data.set === "no-set") {
    return null
  }

  const quality = resolveQuality(item.data.quality)

  return { setId: item.data.set, quality }
}

export const extractSets: PipelineStage = (build, context) => {
  type EquipmentSlotItem = ArmorSlotItem | JewelrySlotItem | WeaponSlotItem
  const items: EquipmentSlotItem[] = [
    ...valuesOf(build.equipment.armor),
    ...valuesOf(build.equipment.jewelry),
  ]

  if (context.bar != null) {
    const bar = build.equipment[context.bar]
    items.push(bar["main-hand"], bar["off-hand"])
  } else {
    for (const barKey of ["primary-weapon-bar", "backup-weapon-bar"] as const) {
      const bar = build.equipment[barKey]
      items.push(bar["main-hand"])
      if (bar["off-hand"].itemType === "weapon") {
        items.push(bar["off-hand"])
      }
    }
    const primaryOffHand = build.equipment["primary-weapon-bar"]["off-hand"]
    if (primaryOffHand.itemType === "shield") {
      items.push(primaryOffHand)
    }
  }

  const setData = new Map<SetsAllId, EquipmentQualityId[]>()

  for (const item of items) {
    const info = getSetInfo(item)
    if (info) {
      const existing = setData.get(info.setId)
      if (existing) {
        existing.push(info.quality)
      } else {
        setData.set(info.setId, [info.quality])
      }
    }
  }

  const sources: SetSource[] = []
  for (const [setId, qualities] of setData) {
    const setSource = createSetSource(setId, qualities.length, qualities)
    if (setSource) {
      sources.push(setSource)
    }
  }

  return sources
}
