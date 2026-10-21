import { isMetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"

export type PowerAtOnset = { readonly weapon: number; readonly spell: number }

type OnsetScaled = {
  readonly name: string
  readonly percentPerPower: number
  readonly capPercent: number
}

const ONSET_SCALED: Readonly<Record<string, OnsetScaled>> = {
  "merciless-charge": { name: "Merciless Charge", percentPerPower: 0.0018, capPercent: 12 },
}

function percentOf(rule: OnsetScaled, onset: PowerAtOnset): number {
  const power = Math.max(onset.weapon, onset.spell)
  return Math.min(rule.capPercent, Math.floor(power * rule.percentPerPower))
}

export function onsetPercentByName(
  name: string,
  onset: PowerAtOnset | undefined
): number | undefined {
  const rule = Object.values(ONSET_SCALED).find((one) => one.name === name)
  if (rule === undefined || onset === undefined) return undefined
  return percentOf(rule, onset)
}

export function atOnset(buff: EffectSource, onset: PowerAtOnset | undefined): EffectSource | null {
  const rule = ONSET_SCALED[buff.id]
  if (rule === undefined) return buff
  if (onset === undefined) return null
  const share = percentOf(rule, onset) / 100
  const effects = buff.effects.map((effect) =>
    isMetricEffect(effect) && effect.effectType === "fractional-change"
      ? { ...effect, effectValue: share }
      : effect
  )
  return { ...buff, effects } as EffectSource
}
