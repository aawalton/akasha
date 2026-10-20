import { convertRatingToChance } from "akasha/temper/player/character/formula-framework/modules/rating-chance/rating-chance.module.code.ts"
import { resistancePhysical } from "akasha/temper/player/character/stat/temper-metric/pages/resistance-physical/resistance-physical.temper-metric.ts"
import { resistanceSpell } from "akasha/temper/player/character/stat/temper-metric/pages/resistance-spell/resistance-spell.temper-metric.ts"

export type Toughness = {
  readonly healthMaximum: number
  readonly physicalShare: number
  readonly spellShare: number
  readonly damageTakenMartial: number
  readonly damageTakenMagical: number
}

export function physicalShareOf(resistance: number): number {
  return convertRatingToChance(resistance, resistancePhysical.divisor, resistancePhysical.cap)
}

export function spellShareOf(resistance: number): number {
  return convertRatingToChance(resistance, resistanceSpell.divisor, resistanceSpell.cap)
}

export function meanArmorShare(toughness: Toughness): number {
  return (toughness.physicalShare + toughness.spellShare) / 2
}

export function meanDamageTaken(toughness: Toughness): number {
  return (toughness.damageTakenMartial + toughness.damageTakenMagical) / 2
}

export function martialDamageLeft(toughness: Toughness): number {
  return (1 - toughness.physicalShare) * (1 + toughness.damageTakenMartial)
}

export function magicalDamageLeft(toughness: Toughness): number {
  return (1 - toughness.spellShare) * (1 + toughness.damageTakenMagical)
}

export function damageLeft(toughness: Toughness): number {
  return (martialDamageLeft(toughness) + magicalDamageLeft(toughness)) / 2
}

type ToughnessTick = { readonly healing: number; readonly shield: number }

export function killingHit(toughness: Toughness, tick: ToughnessTick): number {
  return (toughness.healthMaximum + tick.shield + tick.healing) / damageLeft(toughness)
}

export function toughnessPerSecond(toughness: Toughness, ticks: readonly ToughnessTick[]): number {
  if (ticks.length === 0) return 0
  return ticks.reduce((sum, tick) => sum + killingHit(toughness, tick), 0) / ticks.length
}
