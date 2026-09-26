import { expect, test } from "bun:test"
import { metricIdsBody } from "akasha/temper/player/character/stat/temper-metric/modules/metric-ids-keeping/metric-ids-keeping.change-generator.code.ts"

test("the ids are written once each, in the order they sort in", () => {
  expect(metricIdsBody(["power", "armor", "power"], ["companion-armor"])).toBe(
    'export type MetricId =\n  | "armor"\n  | "power"\n\nexport type CompanionMetricId =\n  | "companion-armor"\n'
  )
})

test("no stat page writes a type naming nothing", () => {
  expect(metricIdsBody([], [])).toBe(
    "export type MetricId = never\n\nexport type CompanionMetricId = never\n"
  )
})
