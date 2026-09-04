import type { Effect } from "@akasha/temper-formula-framework/effect"
import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import type { VampireStageId } from "../vampire-stages/vampire-stages.module.code.ts"

export interface CurseSource extends EffectSourceInterface {
  categoryId: "curse"
}

const VAMPIRE_STAGE_EFFECTS: Partial<Record<VampireStageId, Effect[]>> = {
  "stage-1": [
    {
      metricId: "health-recovery" as const,
      effectType: "fractional-change" as const,
      effectValue: -0.1,
    },
    {
      metricId: "stamina-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.03,
    },
    {
      metricId: "stamina-non-core-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.03,
    },
    {
      metricId: "magicka-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.03,
    },
  ],
  "stage-2": [
    {
      metricId: "health-recovery" as const,
      effectType: "fractional-change" as const,
      effectValue: -0.3,
    },
    {
      metricId: "stamina-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.05,
    },
    {
      metricId: "stamina-non-core-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.05,
    },
    {
      metricId: "magicka-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.05,
    },
  ],
  "stage-3": [
    {
      metricId: "health-recovery" as const,
      effectType: "fractional-change" as const,
      effectValue: -0.6,
    },
    {
      metricId: "stamina-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.08,
    },
    {
      metricId: "stamina-non-core-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.08,
    },
    {
      metricId: "magicka-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.08,
    },
  ],
  "stage-4": [
    {
      metricId: "health-recovery" as const,
      effectType: "fractional-change" as const,
      effectValue: -1.0,
    },
    {
      metricId: "stamina-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.12,
    },
    {
      metricId: "stamina-non-core-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.12,
    },
    {
      metricId: "magicka-ability-cost" as const,
      effectType: "fractional-change" as const,
      effectValue: 0.12,
    },
  ],
}

export function getCurseSource(stageId: VampireStageId): CurseSource | null {
  const effects = VAMPIRE_STAGE_EFFECTS[stageId]
  if (!effects) return null

  return {
    id: `vampire-${stageId}`,
    categoryId: "curse",
    effects,
  }
}
