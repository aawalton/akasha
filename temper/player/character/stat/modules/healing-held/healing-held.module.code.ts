import { isMetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"

export type HealingHeld = { readonly amount?: number | undefined }

function isFromHealingDone(effect: unknown): boolean {
  return isMetricEffect(effect) && effect.effectType === "integer-from-healing-done"
}

function withHealingDone(source: EffectSource, amount: number): EffectSource {
  if (!source.effects.some(isFromHealingDone)) return source
  const effects = source.effects.map((effect) =>
    isMetricEffect(effect) && effect.effectType === "integer-from-healing-done"
      ? { ...effect, effectType: "integer" as const, effectValue: amount }
      : effect
  )
  return { ...source, effects } as EffectSource
}

export function withHealingHeld(
  sources: readonly EffectSource[],
  held: HealingHeld
): EffectSource[] {
  if (!sources.some((source) => source.effects.some(isFromHealingDone))) return [...sources]
  const amount = held.amount ?? 0
  return sources.map((source) => withHealingDone(source, amount))
}
