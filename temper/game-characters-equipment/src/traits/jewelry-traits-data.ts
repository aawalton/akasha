import { assertNever } from "../../../../shared/utils-narrow/src/assert-never"
import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { MetricEffect } from "@temper/shared-formula-framework/effects-types"
import type { JewelryItem } from "../item-composites"
import { type EquipmentQualityId, resolveQuality } from "../quality-data"
import {
  TEMPER_JEWELRY_TRAIT_QUALITY_VALUES,
  TEMPER_JEWELRY_TRAITS_BY_ID,
} from "./generated/temper-jewelry-trait.generated"

export type JewelryTraitQualityValues = Record<EquipmentQualityId, number>

export interface JewelryTraitTemplate {
  id: string
  name: string
  material: string
  effect: string
  effects: readonly MetricEffect[]
  esoTraitConstantName: string
}

export const jewelryTraits = createDataFile<JewelryTraitTemplate>()(TEMPER_JEWELRY_TRAITS_BY_ID)

export type JewelryTraitId = (typeof jewelryTraits.ids)[number]

const NON_BUILD_JEWELRY_TRAITS = new Set(["ornate", "intricate"])
export const jewelryTraitsBuildList = jewelryTraits.list.filter(
  (t) => !NON_BUILD_JEWELRY_TRAITS.has(t.id)
)

export function getInfusedJewelryBonus(quality: EquipmentQualityId = "legendary"): number {
  return TEMPER_JEWELRY_TRAIT_QUALITY_VALUES.infused[quality]
}

function calculateBloodthirstyValue(maxValue: number, targetHealth: number): number {
  const clampedHealth = Math.max(0, Math.min(1, targetHealth))

  if (clampedHealth >= 0.9) {
    return 0
  }

  const scalingFactor = (0.9 - clampedHealth) / 0.9
  return Math.floor(maxValue * scalingFactor)
}

function calculateBloodthirstyEffects(
  targetHealth: number = 1,
  quality: EquipmentQualityId = "legendary"
): readonly MetricEffect[] {
  const maxPower = TEMPER_JEWELRY_TRAIT_QUALITY_VALUES.bloodthirsty[quality]

  return [
    {
      metricId: "power-weapon" as const,
      effectType: "integer" as const,
      effectValue: calculateBloodthirstyValue(maxPower, targetHealth),
    },
    {
      metricId: "power-spell" as const,
      effectType: "integer" as const,
      effectValue: calculateBloodthirstyValue(maxPower, targetHealth),
    },
  ]
}

export function getJewelryTraitEffects(
  jewelry: JewelryItem,
  targetHealth: number = 1
): readonly MetricEffect[] {
  if (jewelry.trait === "no-trait") {
    return []
  }

  const quality = resolveQuality(jewelry.quality)
  const traitConfig = jewelryTraits.data[jewelry.trait]
  if (!traitConfig) return []

  switch (jewelry.trait) {
    case "arcane":
      return [
        {
          metricId: "magicka-maximum" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_TRAIT_QUALITY_VALUES.arcane[quality],
        },
      ]

    case "bloodthirsty":
      return calculateBloodthirstyEffects(targetHealth, quality)

    case "healthy":
      return [
        {
          metricId: "health-maximum" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_TRAIT_QUALITY_VALUES.healthy[quality],
        },
      ]

    case "protective":
      return [
        {
          metricId: "resistance" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_TRAIT_QUALITY_VALUES.protective[quality],
        },
      ]

    case "robust":
      return [
        {
          metricId: "stamina-maximum" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_TRAIT_QUALITY_VALUES.robust[quality],
        },
      ]

    case "swift":
      return [
        {
          metricId: "movement-speed" as const,
          effectType: "fractional-change" as const,
          effectValue: TEMPER_JEWELRY_TRAIT_QUALITY_VALUES.swift[quality],
        },
      ]

    case "triune":
      return [
        {
          metricId: "health-maximum" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_TRAIT_QUALITY_VALUES["triune-health"][quality],
        },
        {
          metricId: "magicka-maximum" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_TRAIT_QUALITY_VALUES["triune-resource"][quality],
        },
        {
          metricId: "stamina-maximum" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_TRAIT_QUALITY_VALUES["triune-resource"][quality],
        },
      ]

    case "harmony":
    case "infused":
    case "ornate":
    case "intricate":
      return traitConfig.effects

    default:
      return assertNever(jewelry.trait)
  }
}
