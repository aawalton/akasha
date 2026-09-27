import { resolveQuality } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { traitEffectsAt } from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"
import { weaponTraitWorth } from "akasha/temper/catalog/gear/equipment/modules/weapon-traits/weapon-traits.module.code.ts"
import type { WeaponItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import { weaponTypes } from "akasha/temper/player/character/characters-equipment/modules/weapon-types-data/weapon-types-data.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

const DOUBLED_TWO_HANDED: ReadonlySet<string> = new Set(["charged", "powered", "precise"])

const DOUBLED_UNROUNDED: ReadonlySet<string> = new Set(["defending", "sharpened"])

function doubled(effects: readonly MetricEffect[], rounded: boolean): readonly MetricEffect[] {
  return effects.map((effect) => {
    if (typeof effect.effectValue !== "number") return effect
    const twice = effect.effectValue * 2
    return { ...effect, effectValue: rounded ? Math.floor(twice) : twice } as MetricEffect
  })
}

function floored(effects: readonly MetricEffect[]): readonly MetricEffect[] {
  return effects.map((effect) =>
    typeof effect.effectValue === "number"
      ? ({ ...effect, effectValue: Math.floor(effect.effectValue) } as MetricEffect)
      : effect
  )
}

function calculateDecisiveEffects(weapon: WeaponItem): readonly MetricEffect[] {
  const is2H = weaponTypes.data[weapon.type].isTwoHanded
  const baseChance = weaponTraitWorth("decisive", resolveQuality(weapon.quality))
  const chanceValue = is2H ? baseChance * 2 : baseChance

  return [
    {
      metricId: "ultimate-generation" as const,
      effectType: "conditional-chance" as const,
      effectValue: {
        chance: chanceValue,
        trigger: "on-ultimate-gain",
        value: 1,
      },
    },
  ]
}

export function getWeaponTraitEffects(weapon: WeaponItem): readonly MetricEffect[] {
  if (weapon.type === "no-type" || weapon.trait === "no-trait") return []
  if (weapon.trait === "decisive") return calculateDecisiveEffects(weapon)

  const is2H = weaponTypes.data[weapon.type].isTwoHanded
  const quality = resolveQuality(weapon.quality)

  if (DOUBLED_UNROUNDED.has(weapon.trait)) {
    const effects = traitEffectsAt("weapon", weapon.trait, quality, true)
    return is2H ? doubled(effects, true) : floored(effects)
  }

  const effects = traitEffectsAt("weapon", weapon.trait, quality)
  return is2H && DOUBLED_TWO_HANDED.has(weapon.trait) ? doubled(effects, false) : effects
}
