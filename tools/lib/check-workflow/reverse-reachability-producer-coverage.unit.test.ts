import { describe, expect, test } from "bun:test"
import { STATIC_CHECKS } from "./check-configs.ts"
import { type CheckConfig } from "./check-configs-types"

const MAP_PRODUCER_NAME = "reverse-reachability-graph"

const populationKinds = (config: CheckConfig | undefined): readonly string[] =>
  (config?.dispatchNodeTypes ?? []).map((entry) => (typeof entry === "string" ? entry : entry.kind))

describe("reverse-reachability MAP-producer coverage", () => {
  const producer = STATIC_CHECKS.find((c) => c.name === MAP_PRODUCER_NAME)

  test("the MAP_PATH producer step is registered in STATIC_CHECKS", () => {
    expect(producer).toBeDefined()
  })

  test("the MAP_PATH producer watches sql-file so it is kept for schema/public-only branch commits", () => {
    expect(populationKinds(producer)).toContain("sql-file")
  })
})
