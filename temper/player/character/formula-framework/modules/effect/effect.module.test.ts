import { expect, test } from "bun:test"
import { isMetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

test("an effect whose type the metric effect union has is a metric effect", () => {
  expect(
    isMetricEffect({
      metricId: "health-recovery",
      effectType: "integer-per-ten-ultimate",
      effectValue: 30,
    })
  ).toBe(true)
})

test("an armor piece scaling effect is no metric effect, though it states a metric and a type", () => {
  expect(
    isMetricEffect({
      metricId: "max-health",
      effectType: "armor-piece-scaling",
      armorWeight: "heavy",
      valuePerPiece: 100,
      valueType: "integer",
    })
  ).toBe(false)
})

test("an effect stating a type no code reads is no metric effect", () => {
  expect(isMetricEffect({ metricId: "max-health", effectType: "per-moon", effectValue: 1 })).toBe(
    false
  )
})
