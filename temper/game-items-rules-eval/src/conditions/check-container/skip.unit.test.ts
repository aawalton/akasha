import { describe, expect, test } from "bun:test"
import { checkContainer } from "../check-container"
import { baseFacts, noConditionsRule, stubEnv } from "./fixtures"

describe("checkContainer — skip", () => {
  test("rule declares neither canOpen nor canGiveMaxRewards → skip", () => {
    const result = checkContainer(noConditionsRule, baseFacts, { env: stubEnv })
    expect(result.kind).toBe("skip")
  })
})
