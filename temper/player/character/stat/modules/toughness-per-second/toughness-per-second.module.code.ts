import { convertRatingToChance } from "akasha/temper/player/character/formula-framework/modules/rating-chance/rating-chance.module.code.ts"
import { resistancePhysical } from "akasha/temper/player/character/stat/temper-metric/pages/resistance-physical/resistance-physical.temper-metric.ts"
import { resistanceSpell } from "akasha/temper/player/character/stat/temper-metric/pages/resistance-spell/resistance-spell.temper-metric.ts"

export type Toughness = {
  readonly healthMaximum: number
  readonly armorShare: number
  readonly damageTaken: number
}

export function armorShareOf(physical: number, spell: number): number {
  const physicalShare = convertRatingToChance(
    physical,
    resistancePhysical.divisor,
    resistancePhysical.cap
  )
  const spellShare = convertRatingToChance(spell, resistanceSpell.divisor, resistanceSpell.cap)
  return (physicalShare + spellShare) / 2
}

export function damageLeft(toughness: Toughness): number {
  return (1 - toughness.armorShare) * (1 + toughness.damageTaken)
}

export type ToughnessTick = { readonly healing: number; readonly shield: number }

export function killingHit(toughness: Toughness, tick: ToughnessTick): number {
  return (toughness.healthMaximum + tick.shield + tick.healing) / damageLeft(toughness)
}

export function toughnessPerSecond(toughness: Toughness, ticks: readonly ToughnessTick[]): number {
  if (ticks.length === 0) return 0
  return ticks.reduce((sum, tick) => sum + killingHit(toughness, tick), 0) / ticks.length
}
