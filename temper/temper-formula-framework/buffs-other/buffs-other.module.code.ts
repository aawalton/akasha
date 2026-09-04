import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

interface BuffOtherEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface BuffOtherTemplate {
  id: string
  name: string
  description: string
  categoryId: "buffs"
  subcategoryId: "other"
  effects: readonly BuffOtherEffect[]
}

export const TEMPER_BUFF_OTHER_DATA = {
  "empower": {
    id: "empower" as const,
    name: "Empower",
    description: "Increases Heavy Attack damage against monsters by 70%",
    categoryId: "buffs" as const,
    subcategoryId: "other" as const,
    effects: [
      {
        metricId: "damage-done-heavy-attack" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.7,
      },
    ],
  },
  "vanish": {
    id: "vanish" as const,
    name: "Vanish",
    description: "Disappear from sight",
    categoryId: "buffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
} satisfies Record<string, BuffOtherTemplate>

export const buffsOther = createDataFile<BuffOrDebuffTemplate>()(TEMPER_BUFF_OTHER_DATA)
