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

test("a flat effect says its value before the stat", () => {
  expect(
    formatEffects([{ metricId: "health-recovery", effectType: "integer", effectValue: 30 }])
  ).toEqual(["30 Health Recovery"])
})
