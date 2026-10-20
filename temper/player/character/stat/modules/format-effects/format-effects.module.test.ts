import { expect, test } from "bun:test"
import { formatEffects } from "akasha/temper/player/character/stat/modules/format-effects/format-effects.module.code.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"

holdMetricCatalogFromCheckout()

test("an effect per ten Ultimate says its value per 10 Ultimate after the stat", () => {
  expect(
    formatEffects([
      { metricId: "health-recovery", effectType: "integer-per-ten-ultimate", effectValue: 30 },
    ])
  ).toEqual(["30 Health Recovery per 10 Ultimate"])
})

test("an armor piece scaling effect is said by nothing here rather than thrown on as a metric effect", () => {
  expect(
    formatEffects([
      {
        metricId: "max-health",
        effectType: "armor-piece-scaling",
        armorWeight: "heavy",
        valuePerPiece: 100,
        valueType: "integer",
      },
      { metricId: "health-recovery", effectType: "integer", effectValue: 30 },
    ])
  ).toEqual(["30 Health Recovery"])
})

test("an unknown effect is said as its page's description, noted as updating", () => {
  expect(
    formatEffects([
      {
        effectType: "unknown-effect",
        statedType: "per-fortnight",
        description: "Gain 1 Health Recovery per fortnight",
        raw: {},
      },
    ])
  ).toEqual(["Gain 1 Health Recovery per fortnight (updating)"])
})

test("an unknown effect whose page states no description is said by the type it states", () => {
  expect(
    formatEffects([
      { effectType: "unknown-effect", statedType: "per-fortnight", description: null, raw: {} },
    ])
  ).toEqual(["per-fortnight (updating)"])
})

test("a flat effect says its value before the stat", () => {
  expect(
    formatEffects([{ metricId: "health-recovery", effectType: "integer", effectValue: 30 }])
  ).toEqual(["30 Health Recovery"])
})
