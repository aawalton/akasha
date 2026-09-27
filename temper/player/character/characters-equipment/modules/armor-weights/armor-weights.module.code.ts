import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import type { DataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import {
  type ArmorTypeId,
  getArmorMultiplier,
} from "akasha/temper/catalog/gear/equipment/kind/modules/armor-types/armor-types.module.code.ts"
import {
  type EquipmentQualityId,
  qualityScale,
  resolveQuality,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type {
  ArmorWeightId,
  StandardArmorWeightId,
} from "akasha/temper/catalog/gear/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import {
  gearTableOf,
  heldGearTable,
  inGearOrder,
  slugOf,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import type { SkillLineId } from "akasha/temper/catalog/skill/line/modules/skill-line-ids/skill-line-ids.data-table.code.ts"
import {
  calculateNirnhonedValue,
  calculateReinforcedValue,
} from "akasha/temper/player/character/characters-equipment/modules/armor-trait-effects/armor-trait-effects.module.code.ts"
import type {
  ArmorItem,
  ItemLevel,
} from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import {
  type LevelScaling,
  levelScaledWorth,
  levelScalingOf,
} from "akasha/temper/player/character/characters-equipment/modules/level-scaling/level-scaling.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

interface ArmorWeightTemplate {
  readonly id: ArmorWeightId
  readonly name: string
  readonly baseValue: number
  readonly skillLineId: SkillLineId
  readonly isStandard: boolean
  readonly levelScaling: LevelScaling | undefined
}

type StandardArmorWeightTemplate = ArmorWeightTemplate & { readonly id: StandardArmorWeightId }

type Row = Readonly<Record<string, unknown>>

const WEIGHT_PAGES = "temper-armor-weight/"

const everyWeight = heldGearTable<ArmorWeightId, ArmorWeightTemplate>("armor weights")

const standardWeights = heldGearTable<StandardArmorWeightId, StandardArmorWeightTemplate>(
  "armor weights"
)

export const armorWeights: DataFile<ArmorWeightId, ArmorWeightTemplate> = everyWeight.table

export const standardArmorWeights: DataFile<StandardArmorWeightId, StandardArmorWeightTemplate> =
  standardWeights.table

let baseValues: ReadonlyMap<string, number> | null = null

function weightOf(row: Row): ArmorWeightTemplate {
  return {
    id: String(row.slug) as ArmorWeightId,
    name: String(row.title),
    baseValue: Number(row.baseValue),
    skillLineId: slugOf(row.skillLineId) as SkillLineId,
    isStandard: row.isStandard === true,
    levelScaling: levelScalingOf(row.levelSlope, row.levelIntercept),
  }
}

export function holdArmorWeights(pages: Iterable<Row>, grades: Iterable<Row>): undefined {
  const every = inGearOrder(pages, "hashPlace").map(weightOf)
  everyWeight.hold(gearTableOf(every))
  standardWeights.hold(
    gearTableOf(every.filter((one): one is StandardArmorWeightTemplate => one.isStandard))
  )
  const found = new Map<string, number>()
  for (const grade of grades) {
    const thing = String(grade.thing)
    if (!thing.startsWith(WEIGHT_PAGES)) continue
    found.set(`${slugOf(thing)}/${slugOf(grade.quality)}`, Number(grade.value))
  }
  baseValues = found
}

function baseValueOf(weight: ArmorWeightId, quality: EquipmentQualityId): number {
  if (baseValues === null) {
    throw new Error(
      "the armor weights are read with the skill catalogue, and nothing has read them yet"
    )
  }
  return baseValues.get(`${weight}/${quality}`) ?? 0
}

function levelShare(
  weight: ArmorWeightId,
  isStandard: boolean,
  quality: EquipmentQualityId
): number {
  if (isStandard) return qualityScale(quality, "armorLevelScale")
  return baseValueOf(weight, quality) / baseValueOf(weight, "legendary")
}

function getArmorValue(
  type: ArmorTypeId,
  weight: ArmorWeightId,
  quality: EquipmentQualityId = "legendary",
  level?: ItemLevel
): number {
  const made = armorWeights.data[weight]
  const scaling = made.levelScaling
  const baseValue =
    level !== undefined && scaling !== undefined
      ? levelScaledWorth(level, scaling, levelShare(weight, made.isStandard, quality))
      : baseValueOf(weight, quality)

  const multiplier = getArmorMultiplier(type)

  return Math.floor(baseValue * multiplier)
}

export function getArmorEffects(armor: ArmorItem): readonly MetricEffect[] {
  if (armor.weight === "no-weight") {
    return []
  }

  const quality = resolveQuality(armor.quality)

  const armorValue = getArmorValue(armor.type, armor.weight, quality, armor.level)

  let totalArmorValue = armorValue

  switch (armor.trait) {
    case "reinforced":
      totalArmorValue = calculateReinforcedValue(armorValue, quality)
      break
    case "nirnhoned":
      totalArmorValue = calculateNirnhonedValue(armorValue, quality)
      break
    case "no-trait":
    case "divines":
    case "impenetrable":
    case "infused":
    case "invigorating":
    case "sturdy":
    case "training":
    case "well-fitted":
    case "ornate":
    case "intricate":
      break
    default:
      assertNever(armor.trait)
  }

  return [
    {
      metricId: "resistance" as const,
      effectType: "integer" as const,
      effectValue: totalArmorValue,
    },
  ]
}
