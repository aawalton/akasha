import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { MetricEffect } from "../effect/effect.module.code.ts"

export function updateEffectValue<T extends MetricEffect>(
  effect: T,
  transformer: (value: number) => number
): T {
  if (
    effect.effectType === "integer" ||
    effect.effectType === "fractional-change" ||
    effect.effectType === "number"
  ) {
    return {
      ...effect,
      effectValue: transformer(effect.effectValue),
    }
  }

  if (
    effect.effectType === "number-per-seconds" ||
    effect.effectType === "number-for-seconds" ||
    effect.effectType === "fractional-change-for-seconds"
  ) {
    return {
      ...effect,
      effectValue: {
        ...effect.effectValue,
        value: transformer(effect.effectValue.value),
      },
    }
  }

  if (effect.effectType === "conditional-chance") {
    return {
      ...effect,
      effectValue: {
        ...effect.effectValue,
        value: transformer(effect.effectValue.value),
      },
    }
  }

  assertNever(effect)
}
