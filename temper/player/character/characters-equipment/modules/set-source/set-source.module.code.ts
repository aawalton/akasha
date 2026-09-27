import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import {
  type EquipmentQualityId,
  qualityScale,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
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

function generateSetSources(catalog: SetCatalog): Record<string, SetSourceTemplate> {
  const sources: Record<string, SetSourceTemplate> = {}

  for (const set of catalog.list) {
    for (let pieceCount = 1; pieceCount <= 12; pieceCount++) {
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
  readonly sources: Readonly<Record<string, SetSourceTemplate>>
}

let workedOut: WorkedOut | null = null

function setSources(): Readonly<Record<string, SetSourceTemplate>> {
  const catalog = setsAll()
  if (workedOut?.catalog !== catalog) {
    workedOut = { catalog, sources: generateSetSources(catalog) }
  }
  return workedOut.sources
}

export type SetSource = SetSourceTemplate & { id: SetSourceId }

export type SetSourceId = string

export function isSetSourceId(value: string): value is SetSourceId {
  return setSources()[value] !== undefined
}

function calculateSetBonusMultiplier(pieceQualities: readonly EquipmentQualityId[]): number {
  if (pieceQualities.length === 0) {
    return 1.0
  }

  const totalMultiplier = pieceQualities.reduce(
    (sum, quality) => sum + qualityScale(quality, "setBonusScale"),
    0
  )
  const avgMultiplier = totalMultiplier / pieceQualities.length

  for (const step of steps) if (avgMultiplier >= step) return step
  return avgMultiplier
}

let steps: readonly number[] = []

export function holdSetBonusSteps(pages: Iterable<Readonly<Record<string, unknown>>>): undefined {
  const held: number[] = []
  for (const row of pages) if (typeof row.setBonusScale === "number") held.push(row.setBonusScale)
  steps = held.sort((a, b) => b - a)
  return undefined
}

function scaleSetBonusEffect(effect: Effect, multiplier: number): Effect {
  if (isMetricEffect(effect) && effect.effectType === "integer" && multiplier < 1.0) {
    return {
      ...effect,
      effectValue: Math.round(effect.effectValue * multiplier),
    }
  }
  return effect
}

export function createSetSource(
  setId: Slug,
  pieceCount: number,
  pieceQualities?: readonly EquipmentQualityId[]
): SetSource | null {
  const id = `set-${setId}-${pieceCount}`

  const baseSource = setSources()[id]
  if (baseSource === undefined) {
    return null
  }

  if (!pieceQualities || pieceQualities.every((q) => q === "legendary")) {
    return baseSource
  }

  const multiplier = calculateSetBonusMultiplier(pieceQualities)

  if (multiplier >= 1.0) {
    return baseSource
  }

  const scaledEffects = baseSource.effects.map((effect) => scaleSetBonusEffect(effect, multiplier))

  return {
    ...baseSource,
    effects: scaledEffects,
  }
}
