import type { MetricEffect } from "../../formula-framework/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "../../formula-framework/effect-source/effect-source.module.code.ts"
import { createSourceFile } from "../../formula-framework/source-file/source-file.module.code.ts"

interface AttributeTemplate extends EffectSourceInterface {
  categoryId: "attributes"
  name: string
  metricId: "health-maximum" | "magicka-maximum" | "stamina-maximum"
  effectValuePerPoint: number
}

interface AttributeSource extends EffectSourceInterface {
  categoryId: "attributes"
  name: string
  count: number
  effects: readonly MetricEffect[]
}

const ATTRIBUTES = {
  health: {
    id: "health" as const,
    name: "Health",
    categoryId: "attributes" as const,
    metricId: "health-maximum" as const,
    effectValuePerPoint: 122,
    effects: [],
  },
  magicka: {
    id: "magicka" as const,
    name: "Maximum Magicka",
    categoryId: "attributes" as const,
    metricId: "magicka-maximum" as const,
    effectValuePerPoint: 111,
    effects: [],
  },
  stamina: {
    id: "stamina" as const,
    name: "Maximum Stamina",
    categoryId: "attributes" as const,
    metricId: "stamina-maximum" as const,
    effectValuePerPoint: 111,
    effects: [],
  },
} satisfies Record<string, AttributeTemplate>

const attributes = createSourceFile<AttributeTemplate>()(ATTRIBUTES)

export function createAttributeSource(
  attributeId: (typeof attributes.ids)[number],
  count: number
): AttributeSource {
  const base = attributes.data[attributeId]
  return {
    id: base.id,
    name: base.name,
    categoryId: base.categoryId,
    count,
    effects: [
      {
        metricId: base.metricId,
        effectType: "integer",
        effectValue: base.effectValuePerPoint,
      },
    ],
  }
}
