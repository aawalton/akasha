import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionEquipmentQualityId } from "../companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import type { CompanionMetricEffect } from "../companion-metric-effect/companion-metric-effect.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"

export interface CompanionTraitTemplate {
  id: string
  name: string
  description: string
  metricId: CompanionMetricId | null
  effectType: ("fractional-change" | "integer") | null
  isReduction: boolean
  qualityValues: Record<EquipmentQualityId, number> | null
}

const COMPANION_TRAIT_DATA = {
  "no-trait": {
    id: "no-trait" as const,
    name: "No Trait",
    description: "",
    metricId: null,
    effectType: null,
    isReduction: false,
    qualityValues: null,
  },
  "aggressive": {
    id: "aggressive" as const,
    name: "Aggressive",
    description: "Increases companion damage done",
    metricId: "companion-damage-done" as const,
    effectType: "fractional-change" as const,
    isReduction: false,
    qualityValues: {
      normal: 0.00425,
      fine: 0.0085,
      superior: 0.01275,
      epic: 0.017,
      legendary: 0.02125,
    },
  },
  "augmented": {
    id: "augmented" as const,
    name: "Augmented",
    description: "Increases duration of all companion buffs and debuffs",
    metricId: "companion-buff-duration" as const,
    effectType: "fractional-change" as const,
    isReduction: false,
    qualityValues: { normal: 0.014, fine: 0.018, superior: 0.022, epic: 0.026, legendary: 0.03 },
  },
  "bolstered": {
    id: "bolstered" as const,
    name: "Bolstered",
    description: "Reduces companion damage taken",
    metricId: "companion-damage-taken" as const,
    effectType: "fractional-change" as const,
    isReduction: true,
    qualityValues: {
      normal: 0.00925,
      fine: 0.012,
      superior: 0.01475,
      epic: 0.0175,
      legendary: 0.02025,
    },
  },
  "focused": {
    id: "focused" as const,
    name: "Focused",
    description: "Increases companion Critical Strike rating",
    metricId: "companion-critical-chance" as const,
    effectType: "integer" as const,
    isReduction: false,
    qualityValues: { normal: 307, fine: 394, superior: 481, epic: 569, legendary: 657 },
  },
  "prolific": {
    id: "prolific" as const,
    name: "Prolific",
    description: "Increases companion Ultimate generation",
    metricId: "companion-ultimate-generation" as const,
    effectType: "fractional-change" as const,
    isReduction: false,
    qualityValues: { normal: 0.07, fine: 0.09, superior: 0.11, epic: 0.13, legendary: 0.15 },
  },
  "quickened": {
    id: "quickened" as const,
    name: "Quickened",
    description: "Reduces companion ability cooldowns",
    metricId: "companion-ability-cooldown" as const,
    effectType: "fractional-change" as const,
    isReduction: true,
    qualityValues: { normal: 0.014, fine: 0.018, superior: 0.022, epic: 0.026, legendary: 0.03 },
  },
  "shattering": {
    id: "shattering" as const,
    name: "Shattering",
    description: "Increases companion Penetration",
    metricId: "companion-penetration" as const,
    effectType: "integer" as const,
    isReduction: false,
    qualityValues: { normal: 700, fine: 900, superior: 1100, epic: 1300, legendary: 1500 },
  },
  "soothing": {
    id: "soothing" as const,
    name: "Soothing",
    description: "Increases companion healing done",
    metricId: "companion-healing-done" as const,
    effectType: "fractional-change" as const,
    isReduction: false,
    qualityValues: { normal: 0.005, fine: 0.009, superior: 0.013, epic: 0.017, legendary: 0.021 },
  },
  "vigorous": {
    id: "vigorous" as const,
    name: "Vigorous",
    description: "Increases companion Maximum Health",
    metricId: "companion-health-maximum" as const,
    effectType: "fractional-change" as const,
    isReduction: false,
    qualityValues: { normal: 0.014, fine: 0.018, superior: 0.022, epic: 0.026, legendary: 0.03 },
  },
} as const satisfies Record<string, CompanionTraitTemplate>

export const companionTraits = createDataFile<CompanionTraitTemplate>()(COMPANION_TRAIT_DATA)

export type CompanionTraitId = (typeof companionTraits.ids)[number]

export function getCompanionTraitMetricEffect(
  traitId: CompanionTraitId,
  quality: CompanionEquipmentQualityId = "legendary",
  isTwoHanded: boolean = false
): CompanionMetricEffect | null {
  if (traitId === "no-trait") return null
  if (quality === "no-quality") return null

  const trait = companionTraits.data[traitId]
  if (trait.metricId == null || trait.effectType == null || trait.qualityValues == null) return null

  const baseValue = trait.qualityValues[quality]
  const value = isTwoHanded ? baseValue * 2 : baseValue
  const effectValue = trait.isReduction ? -value : value

  return {
    metricId: trait.metricId,
    effectType: trait.effectType,
    effectValue,
  }
}
