import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import type { Effect, MetricEffect } from "@akasha/temper-formula-framework/effect"
import type { WeaponEnchantmentId } from "../enchants/weapon-enchants-data"
import { getWeaponEnchantmentEffects } from "../enchants/weapon-enchants-data"
import type { PoisonId, WeaponItem } from "../item-composites"
import { type EquipmentQualityId, resolveQuality } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { WeaponTraitId } from "../traits/weapon-traits-data"
import { getNirnhonedWeaponBonus, getWeaponTraitEffects } from "../traits/weapon-traits-data"
import { getWeaponPower, type WeaponTypeId } from "./weapon-types-data"

function calculateNirnhonedValue(
  basePower: number,
  quality: EquipmentQualityId = "legendary"
): number {
  const nirnhonedBonus = getNirnhonedWeaponBonus(quality)
  return basePower + Math.floor(basePower * nirnhonedBonus)
}

function getWeaponPowerEffects(weapon: WeaponItem): readonly MetricEffect[] {
  if (weapon.type === "no-type") {
    return []
  }

  const quality = resolveQuality(weapon.quality)

  const basePower = getWeaponPower(weapon.type, quality, weapon.level)

  let totalPower = basePower

  if (weapon.trait === "nirnhoned") {
    totalPower = calculateNirnhonedValue(basePower, quality)
  }

  return [{ metricId: "power" as const, effectType: "integer" as const, effectValue: totalPower }]
}

interface WeaponItemSource extends EffectSourceInterface<"weapons", Effect> {
  categoryId: "weapons"
  type: WeaponTypeId | null
  trait: WeaponTraitId | null
  enchantment: WeaponEnchantmentId | null
  poison: PoisonId
}

export function createWeaponSource(weapon: WeaponItem): WeaponItemSource {
  const effects: MetricEffect[] = []

  effects.push(...getWeaponPowerEffects(weapon))

  effects.push(...getWeaponTraitEffects(weapon))

  effects.push(...getWeaponEnchantmentEffects(weapon))

  return {
    id: `weapon-${weapon.type}` as const,
    categoryId: "weapons",
    type: weapon.type,
    trait: weapon.trait,
    enchantment: weapon.enchantment,
    poison: weapon.poison,
    effects,
  }
}
