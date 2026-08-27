import { describe, expect, test } from "bun:test"
import { renderPopulationBound } from "./population-bound"

describe("renderPopulationBound", () => {
  test("a population that assembled empty is worded, never counted", () => {
    for (const unit of ["addons", "files", "bundles"]) {
      const bound = renderPopulationBound(0, 0, unit)
      expect(bound).toContain("EMPTY POPULATION")
      expect(bound).not.toContain("over 0 of 0")
    }
  })

  test("a complete run states its size and claims no shortfall", () => {
    for (const n of [1, 49, 233]) {
      expect(renderPopulationBound(n, n, "files")).toBe(`[over ${n} of ${n} files]`)
    }
  })

  test("a short run states the remainder it could not reach", () => {
    for (const [examined, declared] of [
      [0, 3],
      [47, 49],
      [232, 233],
    ] as const) {
      expect(renderPopulationBound(examined, declared, "files")).toBe(
        `[over ${examined} of ${declared} files — ${declared - examined} could not be examined]`
      )
    }
  })
})
