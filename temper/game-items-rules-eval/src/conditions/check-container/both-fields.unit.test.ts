import { describe, expect, test } from "bun:test"
import { checkContainer } from "../check-container"
import { bothRule, containerFacts, ctxWith, nonContainerFacts, stubEnv } from "./fixtures"

describe("checkContainer — both fields on the same rule", () => {
  test("canOpen fails first → returns canOpen failure (short-circuits canGiveMaxRewards)", () => {
    const result = checkContainer(bothRule, nonContainerFacts, { env: stubEnv })
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") {
      expect(result.conditionKind).toBe("canOpen")
    }
  })

  test("canOpen passes, canGiveMaxRewards fails → returns canGiveMaxRewards failure", () => {
    const result = checkContainer(
      bothRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "endless-archive-1",
        isCooldownExpired: () => true,
        getAllCharacters: () => ["char-a", "char-b"],
        getTotalScriptCount: () => 10,
        getKnownScripts: (charId) => {
          if (charId === "char-a") return new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
          return new Set([1, 2, 3])
        },
      })
    )
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
    }
  })

  test("both pass → pass", () => {
    const all = new Set([1, 2, 3, 4, 5])
    const result = checkContainer(
      bothRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => null,
        getKnownScripts: () => all,
        getTotalScriptCount: () => 5,
        getAllCharacters: () => ["char-a"],
      })
    )
    expect(result.kind).toBe("pass")
  })
})
