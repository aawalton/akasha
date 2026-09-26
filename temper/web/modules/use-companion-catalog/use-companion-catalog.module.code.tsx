"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperCompanionActivationBuff } from "akasha/temper/catalog/companion/activation-buff/temper-companion-activation-buff.page-type.ts"
import { temperCompanionArmorSlot } from "akasha/temper/catalog/companion/armor-slot/temper-companion-armor-slot.page-type.ts"
import { temperCompanionBaseRole } from "akasha/temper/catalog/companion/base-role/temper-companion-base-role.page-type.ts"
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
import { useMemo } from "react"

const EVERY = 500

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
  const weaponSlots = usePages({ pageTypeSlug: temperCompanionWeaponSlot.slug, limit: EVERY })
  const skillSlots = usePages({ pageTypeSlug: temperCompanionSkillSlot.slug, limit: EVERY })
  const read = [
    armorSlots,
    jewelrySlots,
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
      [temperCompanionWeaponSlot.slug, weaponSlots.rows],
      [temperCompanionSkillSlot.slug, skillSlots.rows],
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
    weaponSlots.rows,
    skillSlots.rows,
  ])
  if (failed !== null) throw failed
  return catalog
}
