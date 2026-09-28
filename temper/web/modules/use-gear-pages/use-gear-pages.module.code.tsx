"use client"

import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.ts"
import { temperArmorEnchant } from "akasha/temper/catalog/gear/temper-armor-enchant/temper-armor-enchant.page-type.ts"
import { temperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.ts"
import { temperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.ts"
import { temperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import { temperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.ts"
import { temperEsoPlayerEquipmentConstant } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/temper-eso-player-equipment-constant.page-type.ts"
import { temperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.ts"
import { temperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.ts"
import { temperJewelrySlot } from "akasha/temper/catalog/gear/temper-jewelry-slot/temper-jewelry-slot.page-type.ts"
import { temperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.ts"
import { temperJewelryType } from "akasha/temper/catalog/gear/temper-jewelry-type/temper-jewelry-type.page-type.ts"
import { temperLevelBand } from "akasha/temper/catalog/gear/temper-level-band/temper-level-band.page-type.ts"
import { temperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.ts"
import { temperSetBonusStep } from "akasha/temper/catalog/gear/temper-set-bonus-step/temper-set-bonus-step.page-type.ts"
import { temperSetRule } from "akasha/temper/catalog/gear/temper-set-rule/temper-set-rule.page-type.ts"
import { temperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.ts"
import { temperWeaponSlot } from "akasha/temper/catalog/gear/temper-weapon-slot/temper-weapon-slot.page-type.ts"
import { temperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.ts"
import { temperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.ts"
import { temperWeaponBar } from "akasha/temper/player/character/temper-weapon-bar/temper-weapon-bar.page-type.ts"
import { useMemo } from "react"

const EVERY = 5000

interface GearPages {
  readonly loading: boolean
  readonly failed: Error | null
  readonly rows: ReadonlyMap<string, Iterable<Value>>
}

export function useGearPages(): GearPages {
  const qualities = usePages({ pageTypeSlug: temperQuality.slug, limit: EVERY })
  const armorSlots = usePages({ pageTypeSlug: temperArmorSlot.slug, limit: EVERY })
  const armorTypes = usePages({ pageTypeSlug: temperArmorType.slug, limit: EVERY })
  const jewelrySlots = usePages({ pageTypeSlug: temperJewelrySlot.slug, limit: EVERY })
  const jewelryTypes = usePages({ pageTypeSlug: temperJewelryType.slug, limit: EVERY })
  const equipTypes = usePages({ pageTypeSlug: temperEquipType.slug, limit: EVERY })
  const levelBands = usePages({ pageTypeSlug: temperLevelBand.slug, limit: EVERY })
  const setBonusSteps = usePages({ pageTypeSlug: temperSetBonusStep.slug, limit: EVERY })
  const constants = usePages({ pageTypeSlug: temperEsoPlayerEquipmentConstant.slug, limit: EVERY })
  const weaponBars = usePages({ pageTypeSlug: temperWeaponBar.slug, limit: EVERY })
  const setRules = usePages({ pageTypeSlug: temperSetRule.slug, limit: EVERY })
  const weaponSlots = usePages({ pageTypeSlug: temperWeaponSlot.slug, limit: EVERY })
  const armorWeights = usePages({ pageTypeSlug: temperArmorWeight.slug, limit: EVERY })
  const grades = usePages({ pageTypeSlug: temperGearGrade.slug, limit: EVERY })
  const weaponTypes = usePages({ pageTypeSlug: temperWeaponType.slug, limit: EVERY })
  const armorTraits = usePages({ pageTypeSlug: temperArmorTrait.slug, limit: EVERY })
  const weaponTraits = usePages({ pageTypeSlug: temperWeaponTrait.slug, limit: EVERY })
  const jewelryTraits = usePages({ pageTypeSlug: temperJewelryTrait.slug, limit: EVERY })
  const traitNumbers = usePages({ pageTypeSlug: temperEsoTraitMap.slug, limit: EVERY })
  const armorEnchants = usePages({ pageTypeSlug: temperArmorEnchant.slug, limit: EVERY })
  const weaponEnchants = usePages({ pageTypeSlug: temperWeaponEnchant.slug, limit: EVERY })
  const jewelryEnchants = usePages({ pageTypeSlug: temperJewelryEnchant.slug, limit: EVERY })
  const read = [
    qualities,
    armorSlots,
    armorTypes,
    jewelrySlots,
    jewelryTypes,
    equipTypes,
    levelBands,
    setBonusSteps,
    constants,
    weaponBars,
    setRules,
    weaponSlots,
    armorWeights,
    grades,
    weaponTypes,
    armorTraits,
    weaponTraits,
    jewelryTraits,
    traitNumbers,
    armorEnchants,
    weaponEnchants,
    jewelryEnchants,
  ]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const rows = useMemo(
    () =>
      new Map<string, Iterable<Value>>([
        [temperQuality.slug, qualities.rows],
        [temperArmorSlot.slug, armorSlots.rows],
        [temperArmorType.slug, armorTypes.rows],
        [temperJewelrySlot.slug, jewelrySlots.rows],
        [temperJewelryType.slug, jewelryTypes.rows],
        [temperEquipType.slug, equipTypes.rows],
        [temperLevelBand.slug, levelBands.rows],
        [temperSetBonusStep.slug, setBonusSteps.rows],
        [temperEsoPlayerEquipmentConstant.slug, constants.rows],
        [temperWeaponBar.slug, weaponBars.rows],
        [temperSetRule.slug, setRules.rows],
        [temperWeaponSlot.slug, weaponSlots.rows],
        [temperArmorWeight.slug, armorWeights.rows],
        [temperGearGrade.slug, grades.rows],
        [temperWeaponType.slug, weaponTypes.rows],
        [temperArmorTrait.slug, armorTraits.rows],
        [temperWeaponTrait.slug, weaponTraits.rows],
        [temperJewelryTrait.slug, jewelryTraits.rows],
        [temperEsoTraitMap.slug, traitNumbers.rows],
        [temperArmorEnchant.slug, armorEnchants.rows],
        [temperWeaponEnchant.slug, weaponEnchants.rows],
        [temperJewelryEnchant.slug, jewelryEnchants.rows],
      ]),
    [
      qualities.rows,
      armorSlots.rows,
      armorTypes.rows,
      jewelrySlots.rows,
      jewelryTypes.rows,
      equipTypes.rows,
      levelBands.rows,
      setBonusSteps.rows,
      constants.rows,
      weaponBars.rows,
      setRules.rows,
      weaponSlots.rows,
      armorWeights.rows,
      grades.rows,
      weaponTypes.rows,
      armorTraits.rows,
      weaponTraits.rows,
      jewelryTraits.rows,
      traitNumbers.rows,
      armorEnchants.rows,
      weaponEnchants.rows,
      jewelryEnchants.rows,
    ]
  )
  return { loading, failed, rows }
}
