import {
  minQuality,
  resolveQuality,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { WeaponEnchantId } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  enchantEffectsAt,
  enchantTable,
} from "akasha/temper/catalog/gear/equipment/modules/enchant-reading/enchant-reading.module.code.ts"
import { getInfusedWeaponBonus } from "akasha/temper/catalog/gear/equipment/modules/weapon-traits/weapon-traits.module.code.ts"
import type { WeaponItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import { weaponTypes } from "akasha/temper/player/character/characters-equipment/modules/weapon-types-data/weapon-types-data.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import { updateEffectValue } from "akasha/temper/player/character/formula-framework/modules/effect-value-update/effect-value-update.module.code.ts"

export type WeaponEnchantmentId = WeaponEnchantId

export const weaponEnchantments = enchantTable<WeaponEnchantmentId>("weapon")

function onTwoHands(effect: MetricEffect): MetricEffect {
  if (effect.effectType !== "integer") return effect
  return { ...effect, effectValue: effect.effectValue * 2 }
}

export function getWeaponEnchantmentEffects(weapon: WeaponItem): readonly MetricEffect[] {
  if (weapon.type === "no-type") return []
  if (!weaponEnchantments.has(weapon.enchantment)) return []

  const itemQuality = resolveQuality(weapon.quality)
  const enchantQuality = minQuality(weapon.enchantmentQuality ?? "legendary", itemQuality)
  const graded = enchantEffectsAt("weapon", weapon.enchantment, enchantQuality)
  const effects = weaponTypes.data[weapon.type].isTwoHanded ? graded.map(onTwoHands) : graded

  if (weapon.trait === "infused") {
    const infusedBonus = getInfusedWeaponBonus(itemQuality)
    return effects.map((effect) =>
      updateEffectValue(effect, (value) => value + Math.floor(value * infusedBonus))
    )
  }

  return effects
}
