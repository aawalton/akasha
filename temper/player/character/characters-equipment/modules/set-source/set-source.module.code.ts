import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import {
  type EquipmentQualityId,
  equipmentQualities,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { pieceWorthLevel } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import {
  type SetCatalog,
  setsAll,
} from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import { isMetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"

interface SetSourceTemplate extends EffectSourceInterface<"sets", Effect> {
  categoryId: "sets"
  name: string
  setName: string
  setId: string
  pieceCount: number
  bonusCount: number
}

function generateSetSources(
  catalog: SetCatalog,
  pieceMost: number
): Record<string, SetSourceTemplate> {
  const sources: Record<string, SetSourceTemplate> = {}

  for (const set of catalog.list) {
    for (let pieceCount = 1; pieceCount <= pieceMost; pieceCount++) {
      const activeBonuses = set.bonuses.filter((bonus) => bonus.count <= pieceCount)

      const effects: Effect[] = activeBonuses.flatMap((bonus) => bonus.effects)

      const id = `set-${set.id}-${pieceCount}` as const

      sources[id] = {
        id,
        categoryId: "sets" as const,
        name: `${set.name} (${pieceCount} pieces)`,
        setName: set.name,
        setId: set.id,
        pieceCount,
        bonusCount: activeBonuses.length,
        effects,
      }
    }
  }

  return sources
}

type WorkedOut = {
  readonly catalog: SetCatalog
  readonly pieceMost: number
  readonly sources: Readonly<Record<string, SetSourceTemplate>>
}

let workedOut: WorkedOut | null = null

let pieceMostHeld: number | null = null

let slopeHeld: number | null = null

export function holdSetRules(pages: Iterable<Readonly<Record<string, unknown>>>): undefined {
  for (const row of pages) {
    if (typeof row.setPieceMost === "number") pieceMostHeld = row.setPieceMost
    if (typeof row.setBonusSlope === "number") slopeHeld = row.setBonusSlope
  }
  return undefined
}

function setSources(): Readonly<Record<string, SetSourceTemplate>> {
  const catalog = setsAll()
  const pieceMost = pieceMostHeld
  if (pieceMost === null) throw new Error("the set rule pages are held with the gear, unread")
  if (workedOut?.catalog !== catalog || workedOut.pieceMost !== pieceMost) {
    workedOut = { catalog, pieceMost, sources: generateSetSources(catalog, pieceMost) }
  }
  return workedOut.sources
}

export type SetSource = SetSourceTemplate & { id: SetSourceId }

export type SetSourceId = string

export function isSetSourceId(value: string): value is SetSourceId {
  return setSources()[value] !== undefined
}

export interface SetItemWorn {
  readonly quality: EquipmentQualityId
  readonly level: ItemLevel | undefined
}

type Anchor = readonly [worthLevel: number, share: number]

function qualityAnchors(): readonly Anchor[] {
  const qualities = equipmentQualities()
  const anchors: Anchor[] = []
  for (const id of qualities.ids) {
    const quality = qualities.data[id]
    if (!quality.graded) continue
    anchors.push([pieceWorthLevel(id as EquipmentQualityId, undefined), quality.setBonusScale])
  }
  return anchors.sort(([one], [two]) => one - two)
}

function shareAt(worthLevel: number): number {
  if (slopeHeld === null) throw new Error("the set rule pages are held with the gear, unread")
  let below: Anchor | undefined
  for (const anchor of qualityAnchors()) {
    const [at, share] = anchor
    if (worthLevel <= at) {
      if (below === undefined) return share - slopeHeld * (at - worthLevel)
      const [from, fromShare] = below
      return fromShare + ((share - fromShare) * (worthLevel - from)) / (at - from)
    }
    below = anchor
  }
  return below === undefined ? 1 : below[1]
}

function setBonusShare(items: readonly SetItemWorn[]): number {
  const total = items.reduce((sum, item) => sum + pieceWorthLevel(item.quality, item.level), 0)
  return shareAt(Math.floor(total / items.length))
}

function scaleSetBonusEffect(effect: Effect, multiplier: number): Effect {
  if (isMetricEffect(effect) && effect.effectType === "integer" && multiplier < 1.0) {
    return {
      ...effect,
      effectValue: Math.floor(effect.effectValue * multiplier),
    }
  }
  return effect
}

export function createSetSource(
  setId: Slug,
  pieceCount: number,
  items?: readonly SetItemWorn[]
): SetSource | null {
  const id = `set-${setId}-${pieceCount}`

  const baseSource = setSources()[id]
  if (baseSource === undefined) {
    return null
  }

  if (items === undefined || items.length === 0) {
    return baseSource
  }

  const multiplier = setBonusShare(items)

  if (multiplier >= 1.0) {
    return baseSource
  }

  const scaledEffects = baseSource.effects.map((effect) => scaleSetBonusEffect(effect, multiplier))

  return {
    ...baseSource,
    effects: scaledEffects,
  }
}
