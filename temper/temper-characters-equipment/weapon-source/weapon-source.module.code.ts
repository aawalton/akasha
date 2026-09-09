import type { WeaponTraitId } from "akasha/temper/temper-equipment/weapon-traits/weapon-traits.module.code.ts"
import { getNirnhonedWeaponBonus } from "akasha/temper/temper-equipment/weapon-traits/weapon-traits.module.code.ts"
import type { WeaponTypeId } from "akasha/temper/temper-equipment/weapon-type-ids/weapon-type-ids.module.code.ts"
import {
  type EquipmentQualityId,
  resolveQuality,
} from "../../equipment-kinds/equipment-qualities/equipment-qualities.module.code.ts"
import type { Effect, MetricEffect } from "../../formula-framework/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "../../formula-framework/effect-source/effect-source.module.code.ts"
import type { PoisonId, WeaponItem } from "../item-composites/item-composites.module.code.ts"
import type { WeaponEnchantmentId } from "../weapon-enchants/weapon-enchants.module.code.ts"
import { getWeaponEnchantmentEffects } from "../weapon-enchants/weapon-enchants.module.code.ts"
import { getWeaponTraitEffects } from "../weapon-trait-effects/weapon-trait-effects.module.code.ts"
import { getWeaponPower } from "../weapon-types-data/weapon-types-data.module.code.ts"

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
