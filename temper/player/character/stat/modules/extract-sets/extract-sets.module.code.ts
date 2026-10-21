import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import { resolveQuality } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlotItem,
} from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import {
  createSetSource,
  type SetItemWorn,
  type SetSource,
} from "akasha/temper/player/character/characters-equipment/modules/set-source/set-source.module.code.ts"
import { weaponTypes } from "akasha/temper/player/character/characters-equipment/modules/weapon-types-data/weapon-types-data.module.code.ts"
import { valuesOf } from "akasha/temper/player/character/formula-framework/modules/record-parts/record-parts.module.code.ts"
import type {
  PipelineStage,
  TranslationContext,
} from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

type EquipmentSlotItem = ArmorSlotItem | JewelrySlotItem | WeaponSlotItem

function piecesOf(item: EquipmentSlotItem): number {
  if (item.itemType !== "weapon" || item.data.type === "no-type") return 1
  return weaponTypes.data[item.data.type].isTwoHanded ? 2 : 1
}

function getSetInfo(item: EquipmentSlotItem): { setId: Slug; worn: SetItemWorn } | null {
  if (item.itemType === "empty" || item.data.set === "no-set") {
    return null
  }

  const quality = resolveQuality(item.data.quality)

  return { setId: item.data.set, worn: { quality, level: item.data.level, pieces: piecesOf(item) } }
}

export interface SetWorn {
  pieceCount: number
  readonly items: SetItemWorn[]
}

export function setPiecesWorn(
  build: CharacterState,
  context: TranslationContext
): ReadonlyMap<Slug, SetWorn> {
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

  const setData = new Map<Slug, SetWorn>()

  for (const item of items) {
    const info = getSetInfo(item)
    if (info) {
      const existing = setData.get(info.setId)
      if (existing) {
        existing.pieceCount += piecesOf(item)
        existing.items.push(info.worn)
      } else {
        setData.set(info.setId, { pieceCount: piecesOf(item), items: [info.worn] })
      }
    }
  }

  return setData
}

const SETS_DISABLING_OTHERS: ReadonlySet<Slug> = new Set(["torc-of-the-last-ayleid-king"])

export const extractSets: PipelineStage = (build, context) => {
  const sources: SetSource[] = []
  const sets = setPiecesWorn(build, context)
  const disabling = [...sets.keys()].find((setId) => SETS_DISABLING_OTHERS.has(setId))
  for (const [setId, worn] of sets) {
    if (disabling !== undefined && setId !== disabling) continue
    const setSource = createSetSource(setId, worn.pieceCount, worn.items)
    if (setSource) {
      sources.push(setSource)
    }
  }

  return sources
}
