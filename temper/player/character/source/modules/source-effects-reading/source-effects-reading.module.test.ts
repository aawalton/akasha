import { expect, test } from "bun:test"
import {
  entryEffectsOf,
  sourceEffectsOf,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

test("a page's effect of a type the union has is read as that effect", () => {
  expect(
    sourceEffectsOf(
      {
        effects: [{ metric: "health-recovery", effectType: "integer-per-ten-ultimate", value: 30 }],
      },
      "strategic-reserve"
    )
  ).toEqual([
    { metricId: "health-recovery", effectType: "integer-per-ten-ultimate", effectValue: 30 },
  ])
})

test("a page's effect of a type the union lacks is refused where it is read", () => {
  expect(() =>
    sourceEffectsOf(
      { effects: [{ metric: "health-recovery", effectType: "per-fortnight", value: 1 }] },
      "strategic-reserve"
    )
  ).toThrow("strategic-reserve states an effect on `health-recovery` of type `per-fortnight`")
})

test("an effect entry of a type the union lacks is refused where it is read", () => {
  const nodes = new Map([["metric-health-maximum", "health-maximum"]])
  expect(() =>
    entryEffectsOf(
      {
        effects: [{ metricId: "metric-health-maximum", type: "per-fortnight", value: 1 }],
      },
      nodes,
      "escalating-fete"
    )
  ).toThrow("escalating-fete states an effect on `health-maximum` of type `per-fortnight`")
})
