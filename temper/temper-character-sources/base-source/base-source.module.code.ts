import { CRITICAL_RATING_BASE, POWER_LEVEL_BASE } from "@akasha/temper-formula-framework/base-stat"
import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import { createSourceFile } from "@akasha/temper-formula-framework/source-file"

interface BaseTemplate extends EffectSourceInterface {
  categoryId: "base"
  name: string
}

const BASE = {
  "base-stats": {
    id: "base-stats" as const,
    name: "Base Stats",
    categoryId: "base" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 16000,
      },
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 12000,
      },
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 12000,
      },
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: Math.fround(5.6) * 50 + 29.5,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: Math.fround(9.3) * 50 + 48.5,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: Math.fround(9.3) * 50 + 48.5,
      },
      {
        metricId: "power-weapon" as const,
        effectType: "integer" as const,
        effectValue: POWER_LEVEL_BASE,
      },
      {
        metricId: "power-spell" as const,
        effectType: "integer" as const,
        effectValue: POWER_LEVEL_BASE,
      },
      {
        metricId: "critical-rating" as const,
        effectType: "integer" as const,
        effectValue: CRITICAL_RATING_BASE,
      },
      {
        metricId: "critical-damage" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.5,
      },
      {
        metricId: "healing-critical-bonus" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.5,
      },
      {
        metricId: "resistance-critical" as const,
        effectType: "integer" as const,
        effectValue: 1320,
      },
      {
        metricId: "movement-walk-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.3,
      },
      {
        metricId: "movement-run-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 1,
      },
      {
        metricId: "movement-swim-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.6,
      },
      {
        metricId: "movement-sneak-penalty" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.4,
      },
      {
        metricId: "mounted-walk-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 1.15,
      },
      {
        metricId: "mounted-run-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 1.45,
      },
      {
        metricId: "stealth-detection" as const,
        effectType: "integer" as const,
        effectValue: 6.5,
      },
      {
        metricId: "stamina-block-cost" as const,
        effectType: "integer" as const,
        effectValue: 1750,
      },
      {
        metricId: "stamina-dodge-cost" as const,
        effectType: "integer" as const,
        effectValue: 4040,
      },
      {
        metricId: "stamina-sprint-cost" as const,
        effectType: "integer" as const,
        effectValue: 500,
      },
      {
        metricId: "bash-cost" as const,
        effectType: "integer" as const,
        effectValue: 765,
      },
      {
        metricId: "break-free-cost" as const,
        effectType: "integer" as const,
        effectValue: 5400,
      },
      {
        metricId: "mount-stamina-regen-moving" as const,
        effectType: "integer" as const,
        effectValue: 200,
      },
      {
        metricId: "mount-stamina-regen-combat" as const,
        effectType: "integer" as const,
        effectValue: 100,
      },
    ],
  },
} satisfies Record<string, BaseTemplate>

export const base = createSourceFile<BaseTemplate>()(BASE)
