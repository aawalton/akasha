import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { EquipmentQualityId } from "@temper/game-characters-equipment/quality-data"
import type { CompanionState } from "../companion-types"
import { TEMPER_COMPANION_TRAITS } from "../generated/temper-companion-trait.generated"
import type { CompanionMetricId } from "../stats/companion-metric-ids.generated"
import type { CompanionMetricEffect } from "../stats/metrics/companion-metric-template"
import type { CompanionEquipmentQualityId } from "./companion-equipment-quality-data"
import { companionWeaponTypes } from "../generated/temper-companion-weapon-type.generated"

export interface CompanionTraitTemplate {
  id: string
  name: string
  description: string
  metricId: CompanionMetricId | null
  effectType: ("fractional-change" | "integer") | null
  isReduction: boolean
  qualityValues: Record<EquipmentQualityId, number> | null
}

export const companionTraits = createDataFile<CompanionTraitTemplate>()(TEMPER_COMPANION_TRAITS)

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

export function computeSoothingHealingDone(build: CompanionState): number {
  let total = 0
  const { armor, jewelry, weapons } = build.equipment

  for (const slot of Object.values(armor)) {
    if (slot.itemType === "armor" && slot.data.trait === "soothing") {
      const effect = getCompanionTraitMetricEffect("soothing", slot.data.quality, false)
      if (effect) total += effect.effectValue
    }
  }
  for (const slot of Object.values(jewelry)) {
    if (slot.itemType === "jewelry" && slot.data.trait === "soothing") {
      const effect = getCompanionTraitMetricEffect("soothing", slot.data.quality, false)
      if (effect) total += effect.effectValue
    }
  }
  for (const slot of Object.values(weapons)) {
    if (slot.itemType === "weapon" && slot.data.trait === "soothing") {
      const isTwoHanded = companionWeaponTypes.data[slot.data.type]?.isTwoHanded ?? false
      const effect = getCompanionTraitMetricEffect("soothing", slot.data.quality, isTwoHanded)
      if (effect) total += effect.effectValue
    }
  }

  return total
}
