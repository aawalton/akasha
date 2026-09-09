import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import { createSourceFile } from "@akasha/temper-formula-framework/source-file"
import { targetArmor } from "../target-armors/target-armors.module.code.ts"

interface TargetTemplate extends EffectSourceInterface {
  categoryId: "target"
  name: string
}

const TARGET_DATA = {
  "target-stats": {
    id: "target-stats" as const,
    name: "Target Stats",
    categoryId: "target" as const,
    effects: [
      {
        metricId: "target-armor" as const,
        effectType: "integer" as const,
        effectValue: targetArmor.data["dungeon"].armor,
      },
      {
        metricId: "target-spell-debuff" as const,
        effectType: "integer" as const,
        effectValue: 0,
      },
      {
        metricId: "target-physical-debuff" as const,
        effectType: "integer" as const,
        effectValue: 0,
      },
      {
        metricId: "target-weapon-power" as const,
        effectType: "integer" as const,
        effectValue: 0,
      },
      {
        metricId: "target-spell-power" as const,
        effectType: "integer" as const,
        effectValue: 0,
      },
      {
        metricId: "target-damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: 0,
      },
      {
        metricId: "target-defense-bonus" as const,
        effectType: "fractional-change" as const,
        effectValue: 0,
      },
      {
        metricId: "target-critical-resistance" as const,
        effectType: "integer" as const,
        effectValue: 0,
      },
      {
        metricId: "target-critical-damage" as const,
        effectType: "fractional-change" as const,
        effectValue: 0,
      },
      {
        metricId: "target-penetration" as const,
        effectType: "integer" as const,
        effectValue: 0,
      },
      {
        metricId: "target-attack-bonus" as const,
        effectType: "fractional-change" as const,
        effectValue: 0,
      },
      {
        metricId: "target-percent-health" as const,
        effectType: "fractional-change" as const,
        effectValue: 1,
      },
      {
        metricId: "target-damage-done" as const,
        effectType: "fractional-change" as const,
        effectValue: 0,
      },
      {
        metricId: "target-healing-received" as const,
        effectType: "fractional-change" as const,
        effectValue: 0,
      },
      {
        metricId: "target-health-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: 0,
      },
      {
        metricId: "target-critical-damage-done" as const,
        effectType: "fractional-change" as const,
        effectValue: 0,
      },
    ],
  },
} satisfies Record<string, TargetTemplate>

const target = createSourceFile<TargetTemplate>()(TARGET_DATA)

type TargetId = (typeof target.ids)[number]

type TargetSource = TargetTemplate & { id: TargetId }

export function createTargetSource(armor: number, health: number): TargetSource {
  const baseTarget = target.data["target-stats"]
  const customizedEffects = baseTarget.effects.map((effect) => {
    if (effect.metricId === "target-armor") {
      return {
        metricId: effect.metricId,
        effectType: effect.effectType,
        effectValue: armor,
      }
    }
    if (effect.metricId === "target-percent-health") {
      return {
        metricId: effect.metricId,
        effectType: effect.effectType,
        effectValue: health,
      }
    }
    return effect
  })

  return {
    ...baseTarget,
    effects: customizedEffects,
  }
}
