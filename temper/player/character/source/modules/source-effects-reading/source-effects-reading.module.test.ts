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

test("a page's effect of a type the union lacks is read as an unknown effect carrying the page's description", () => {
  const entry = { metric: "health-recovery", effectType: "per-fortnight", value: 1 }
  expect(
    sourceEffectsOf(
      { description: "Gain 1 Health Recovery per fortnight", effects: [entry] },
      "strategic-reserve"
    )
  ).toEqual([
    {
      effectType: "unknown-effect",
      statedType: "per-fortnight",
      description: "Gain 1 Health Recovery per fortnight",
      raw: entry,
    },
  ])
})

test("an effect entry of a type the union lacks is read as an unknown effect", () => {
  const nodes = new Map([["metric-health-maximum", "health-maximum"]])
  const entry = { metricId: "metric-health-maximum", type: "per-fortnight", value: 1 }
  expect(entryEffectsOf({ effects: [entry] }, nodes, "escalating-fete")).toEqual([
    { effectType: "unknown-effect", statedType: "per-fortnight", description: null, raw: entry },
  ])
})

test("a page's effect stating no effect type is still refused where it is read", () => {
  expect(() =>
    sourceEffectsOf({ effects: [{ metric: "health-recovery", value: 1 }] }, "strategic-reserve")
  ).toThrow("strategic-reserve states an effect on `health-recovery` with no effect type")
})
