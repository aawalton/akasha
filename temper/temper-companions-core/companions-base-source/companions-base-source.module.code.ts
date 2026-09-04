import type { SourceCategoryId } from "@akasha/temper-formula-framework/source-category"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionEffect } from "../companion-metric-effect/companion-metric-effect.module.code.ts"

interface CompanionBaseTemplate {
  id: string
  categoryId: SourceCategoryId
  effects: readonly CompanionEffect[]
  name: string
}

const COMPANION_BASE = {
  "companion-base-stats": {
    id: "companion-base-stats" as const,
    name: "Companion Base Stats",
    categoryId: "companion-base" as const,
    effects: [
      {
        metricId: "companion-health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 30000,
      },
      {
        metricId: "companion-weapon-damage" as const,
        effectType: "integer" as const,
        effectValue: 2000,
      },
      {
        metricId: "companion-critical-chance" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
      {
        metricId: "companion-critical-damage" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.5,
      },
      {
        metricId: "companion-roll-dodge-cooldown" as const,
        effectType: "integer" as const,
        effectValue: 8,
      },
      {
        metricId: "companion-break-free-cooldown" as const,
        effectType: "integer" as const,
        effectValue: 12,
      },
    ],
  },
} satisfies Record<string, CompanionBaseTemplate>

export const companionBase = createDataFile<CompanionBaseTemplate>()(COMPANION_BASE)
