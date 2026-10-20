import { expect, test } from "bun:test"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { getIntegerEffects } from "akasha/temper/player/character/stat/modules/extractors/extractors.module.code.ts"

test("an unknown effect adds nothing to the stat its page names, beside one that does", () => {
  const sources: EffectSource[] = [
    {
      id: "strategic-reserve",
      categoryId: "champion-points",
      effects: [
        {
          effectType: "unknown-effect",
          statedType: "per-fortnight",
          description: "Gain 30 Health Recovery per fortnight",
          raw: { metric: "health-recovery", effectType: "per-fortnight", value: 30 },
        },
        { metricId: "health-recovery", effectType: "integer", effectValue: 5 },
      ],
    },
  ]
  expect(getIntegerEffects("champion-points", "health-recovery", sources)).toBe(5)
})
