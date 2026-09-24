import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import {
  type EquipmentQualityId,
  resolveQuality,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlotItem,
} from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import {
  createSetSource,
  type SetSource,
} from "akasha/temper/player/character/characters-equipment/modules/set-source/set-source.module.code.ts"
import { valuesOf } from "akasha/temper/player/character/formula-framework/modules/record-parts/record-parts.module.code.ts"
import type { PipelineStage } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

function getSetInfo(
  item: ArmorSlotItem | JewelrySlotItem | WeaponSlotItem
): { setId: Slug; quality: EquipmentQualityId } | null {
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

  const setData = new Map<Slug, EquipmentQualityId[]>()

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
