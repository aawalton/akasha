"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperCompanionActivationBuff } from "akasha/temper/catalog/companion/activation-buff/temper-companion-activation-buff.page-type.ts"
import { temperCompanionArmorSlot } from "akasha/temper/catalog/companion/armor-slot/temper-companion-armor-slot.page-type.ts"
import { temperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.ts"
import { temperCompanionBaseRole } from "akasha/temper/catalog/companion/base-role/temper-companion-base-role.page-type.ts"
import { temperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.ts"
import { temperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.ts"
import {
  type CompanionCatalog,
  holdCompanionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { companionCatalogFrom } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-reading/companion-catalog-reading.module.code.ts"
import { temperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.ts"
import { temperCompanionJewelrySlot } from "akasha/temper/catalog/companion/jewelry-slot/temper-companion-jewelry-slot.page-type.ts"
import { temperCompanionPassiveMetric } from "akasha/temper/catalog/companion/passive-metric/temper-companion-passive-metric.page-type.ts"
import { temperCompanionRole } from "akasha/temper/catalog/companion/role/temper-companion-role.page-type.ts"
import { temperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"
import { temperCompanionSkillSlot } from "akasha/temper/catalog/companion/skill-slot/temper-companion-skill-slot.page-type.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import { temperEsoCompanionEquipmentConstant } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/temper-eso-companion-equipment-constant.page-type.ts"
import { temperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"
import { temperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.ts"
import { temperCompanionWeaponSlot } from "akasha/temper/catalog/companion/weapon-slot/temper-companion-weapon-slot.page-type.ts"
import { temperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.ts"
import { temperEffectCategory } from "akasha/temper/catalog/effect/category/temper-effect-category.page-type.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import { temperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.ts"
import { temperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.ts"
import { temperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.ts"
import { temperSpecialEffectType } from "akasha/temper/catalog/effect/temper-special-effect-type/temper-special-effect-type.page-type.ts"
import { temperStatusEffectType } from "akasha/temper/catalog/effect/temper-status-effect-type/temper-status-effect-type.page-type.ts"
import { temperTargetArmor } from "akasha/temper/catalog/effect/temper-target-armor/temper-target-armor.page-type.ts"
import { temperTargetScope } from "akasha/temper/catalog/effect/temper-target-scope/temper-target-scope.page-type.ts"
import { temperTargetType } from "akasha/temper/catalog/effect/temper-target-type/temper-target-type.page-type.ts"
import { temperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"
import { temperRotationBreakdownRow } from "akasha/temper/player/progress/temper-rotation-breakdown-row/temper-rotation-breakdown-row.page-type.ts"
import { createContext, useContext, useMemo } from "react"

const EVERY = 500

export const companionCatalogContext = createContext<CompanionCatalog | null>(null)

export function useHeldCompanionCatalog(): CompanionCatalog | null {
  return useContext(companionCatalogContext)
}

export function useCompanionCatalog(): CompanionCatalog | null {
  const companions = usePages({ pageTypeSlug: temperEsoCompanion.slug, limit: EVERY })
  const skills = usePages({ pageTypeSlug: temperCompanionSkill.slug, limit: EVERY })
  const lines = usePages({ pageTypeSlug: temperCompanionSkillLine.slug, limit: EVERY })
  const traits = usePages({ pageTypeSlug: temperCompanionTrait.slug, limit: EVERY })
  const grades = usePages({ pageTypeSlug: temperCompanionTraitGrade.slug, limit: EVERY })
  const roles = usePages({ pageTypeSlug: temperCompanionRole.slug, limit: EVERY })
  const baseRoles = usePages({ pageTypeSlug: temperCompanionBaseRole.slug, limit: EVERY })
  const qualities = usePages({ pageTypeSlug: temperCompanionEquipmentQuality.slug, limit: EVERY })
  const weaponRoles = usePages({ pageTypeSlug: temperCompanionWeaponRole.slug, limit: EVERY })
  const weaponTypes = usePages({ pageTypeSlug: temperCompanionWeaponType.slug, limit: EVERY })
  const constants = usePages({
    pageTypeSlug: temperEsoCompanionEquipmentConstant.slug,
    limit: EVERY,
  })
  const buffs = usePages({ pageTypeSlug: temperCompanionActivationBuff.slug, limit: EVERY })
  const metrics = usePages({ pageTypeSlug: temperCompanionPassiveMetric.slug, limit: EVERY })
  const armorSlots = usePages({ pageTypeSlug: temperCompanionArmorSlot.slug, limit: EVERY })
  const jewelrySlots = usePages({ pageTypeSlug: temperCompanionJewelrySlot.slug, limit: EVERY })
  const equipTypes = usePages({ pageTypeSlug: temperEquipType.slug, limit: EVERY })
  const weaponSlots = usePages({ pageTypeSlug: temperCompanionWeaponSlot.slug, limit: EVERY })
  const skillSlots = usePages({ pageTypeSlug: temperCompanionSkillSlot.slug, limit: EVERY })
  const armorWeights = usePages({ pageTypeSlug: temperCompanionArmorWeight.slug, limit: EVERY })
  const baseStats = usePages({ pageTypeSlug: temperCompanionBaseStat.slug, limit: EVERY })
  const mechanics = usePages({ pageTypeSlug: temperCompanionCombatMechanic.slug, limit: EVERY })
  const majorBuffs = usePages({ pageTypeSlug: temperBuffMajor.slug, limit: EVERY })
  const minorBuffs = usePages({ pageTypeSlug: temperBuffMinor.slug, limit: EVERY })
  const otherBuffs = usePages({ pageTypeSlug: temperBuffOther.slug, limit: EVERY })
  const majorDebuffs = usePages({ pageTypeSlug: temperDebuffMajor.slug, limit: EVERY })
  const minorDebuffs = usePages({ pageTypeSlug: temperDebuffMinor.slug, limit: EVERY })
  const otherDebuffs = usePages({ pageTypeSlug: temperDebuffOther.slug, limit: EVERY })
  const breakdownRows = usePages({ pageTypeSlug: temperRotationBreakdownRow.slug, limit: EVERY })
  const targetArmors = usePages({ pageTypeSlug: temperTargetArmor.slug, limit: EVERY })
  const effectCategories = usePages({ pageTypeSlug: temperEffectCategory.slug, limit: EVERY })
  const metricNodes = usePages({ pageTypeSlug: temperMetricTree.slug, limit: EVERY })
  const statusEffects = usePages({ pageTypeSlug: temperStatusEffectType.slug, limit: EVERY })
  const specialEffects = usePages({ pageTypeSlug: temperSpecialEffectType.slug, limit: EVERY })
  const targetScopes = usePages({ pageTypeSlug: temperTargetScope.slug, limit: EVERY })
  const targetTypes = usePages({ pageTypeSlug: temperTargetType.slug, limit: EVERY })
  const read = [
    targetTypes,
    targetScopes,
    specialEffects,
    statusEffects,
    metricNodes,
    effectCategories,
    targetArmors,
    breakdownRows,
    majorBuffs,
    minorBuffs,
    otherBuffs,
    majorDebuffs,
    minorDebuffs,
    otherDebuffs,
    mechanics,
    baseStats,
    armorWeights,
    armorSlots,
    jewelrySlots,
    equipTypes,
    weaponSlots,
    skillSlots,
    companions,
    skills,
    lines,
    traits,
    grades,
    roles,
    baseRoles,
    qualities,
    weaponRoles,
    weaponTypes,
    constants,
    buffs,
    metrics,
  ]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const catalog = useMemo(() => {
    if (loading) return null
    const byType = new Map<string, readonly Record<string, unknown>[]>([
      [temperEsoCompanion.slug, companions.rows],
      [temperCompanionSkill.slug, skills.rows],
      [temperCompanionSkillLine.slug, lines.rows],
      [temperCompanionTrait.slug, traits.rows],
      [temperCompanionTraitGrade.slug, grades.rows],
      [temperCompanionRole.slug, roles.rows],
      [temperCompanionBaseRole.slug, baseRoles.rows],
      [temperCompanionEquipmentQuality.slug, qualities.rows],
      [temperCompanionWeaponRole.slug, weaponRoles.rows],
      [temperCompanionWeaponType.slug, weaponTypes.rows],
      [temperEsoCompanionEquipmentConstant.slug, constants.rows],
      [temperCompanionActivationBuff.slug, buffs.rows],
      [temperCompanionPassiveMetric.slug, metrics.rows],
      [temperCompanionArmorSlot.slug, armorSlots.rows],
      [temperCompanionJewelrySlot.slug, jewelrySlots.rows],
      [temperEquipType.slug, equipTypes.rows],
      [temperCompanionWeaponSlot.slug, weaponSlots.rows],
      [temperCompanionSkillSlot.slug, skillSlots.rows],
      [temperCompanionArmorWeight.slug, armorWeights.rows],
      [temperCompanionBaseStat.slug, baseStats.rows],
      [temperCompanionCombatMechanic.slug, mechanics.rows],
      [temperBuffMajor.slug, majorBuffs.rows],
      [temperBuffMinor.slug, minorBuffs.rows],
      [temperBuffOther.slug, otherBuffs.rows],
      [temperDebuffMajor.slug, majorDebuffs.rows],
      [temperDebuffMinor.slug, minorDebuffs.rows],
      [temperDebuffOther.slug, otherDebuffs.rows],
      [temperRotationBreakdownRow.slug, breakdownRows.rows],
      [temperTargetArmor.slug, targetArmors.rows],
      [temperEffectCategory.slug, effectCategories.rows],
      [temperMetricTree.slug, metricNodes.rows],
      [temperStatusEffectType.slug, statusEffects.rows],
      [temperSpecialEffectType.slug, specialEffects.rows],
      [temperTargetScope.slug, targetScopes.rows],
      [temperTargetType.slug, targetTypes.rows],
    ])
    return holdCompanionCatalog(companionCatalogFrom((slug) => byType.get(slug) ?? []))
  }, [
    loading,
    companions.rows,
    skills.rows,
    lines.rows,
    traits.rows,
    grades.rows,
    roles.rows,
    baseRoles.rows,
    qualities.rows,
    weaponRoles.rows,
    weaponTypes.rows,
    constants.rows,
    buffs.rows,
    metrics.rows,
    armorSlots.rows,
    jewelrySlots.rows,
    equipTypes.rows,
    weaponSlots.rows,
    skillSlots.rows,
    armorWeights.rows,
    baseStats.rows,
    mechanics.rows,
    majorBuffs.rows,
    minorBuffs.rows,
    otherBuffs.rows,
    majorDebuffs.rows,
    minorDebuffs.rows,
    otherDebuffs.rows,
    breakdownRows.rows,
    targetArmors.rows,
    effectCategories.rows,
    metricNodes.rows,
    statusEffects.rows,
    specialEffects.rows,
    targetScopes.rows,
    targetTypes.rows,
  ])
  if (failed !== null) throw failed
  return catalog
}
