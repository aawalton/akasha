import { describe, expect, test } from "bun:test"
import { checkContainer } from "../check-container"
import {
  baseFacts,
  canGiveMaxRewardsRule,
  containerFacts,
  ctxWith,
  nonContainerFacts,
  stubEnv,
} from "./fixtures"

describe("checkContainer — canGiveMaxRewards", () => {
  test("not a container → fail", () => {
    const result = checkContainer(canGiveMaxRewardsRule, nonContainerFacts, { env: stubEnv })
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
    }
  })

  test("pre-capture isContainer undefined → indeterminate(missingSignal=isContainer)", () => {
    const result = checkContainer(canGiveMaxRewardsRule, baseFacts, { env: stubEnv })
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
      expect(result.missingSignal).toBe("isContainer")
    }
  })

  test("off-cooldown with no group → pass", () => {
    const result = checkContainer(
      canGiveMaxRewardsRule,
      containerFacts,
      ctxWith({ getCooldownGroup: () => null })
    )
    expect(result.kind).toBe("pass")
  })

  test("off-cooldown with group, anyKnowsAll && !allKnowAll → fail", () => {
    const result = checkContainer(
      canGiveMaxRewardsRule,
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

  test("off-cooldown with group, anyKnowsAll && allKnowAll → pass", () => {
    const all = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const result = checkContainer(
      canGiveMaxRewardsRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "endless-archive-1",
        isCooldownExpired: () => true,
        getAllCharacters: () => ["char-a", "char-b"],
        getTotalScriptCount: () => 10,
        getKnownScripts: () => all,
      })
    )
    expect(result.kind).toBe("pass")
  })

  test("off-cooldown with group, no scripts known anywhere → pass", () => {
    const result = checkContainer(
      canGiveMaxRewardsRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "endless-archive-1",
        isCooldownExpired: () => true,
        getAllCharacters: () => ["char-a", "char-b"],
        getTotalScriptCount: () => 10,
        getKnownScripts: () => new Set<number>(),
      })
    )
    expect(result.kind).toBe("pass")
  })

  test("on-cooldown → indeterminate (RFTW gap, missingSignal=rftwClassification)", () => {
    const result = checkContainer(
      canGiveMaxRewardsRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "endless-archive-1",
        isCooldownExpired: () => false,
      })
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
      expect(result.missingSignal).toBe("rftwClassification")
    }
  })

  test("getCooldownGroup unknown → indeterminate(missingSignal=cooldownGroup)", () => {
    const result = checkContainer(canGiveMaxRewardsRule, containerFacts, { env: stubEnv })
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
      expect(result.missingSignal).toBe("cooldownGroup")
    }
  })

  test("isCooldownExpired unknown → indeterminate(missingSignal=cooldownExpired)", () => {
    const result = checkContainer(
      canGiveMaxRewardsRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "endless-archive-1",
      })
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
      expect(result.missingSignal).toBe("cooldownExpired")
    }
  })

  test("getAllCharacters unknown (off-cooldown with group) → indeterminate(missingSignal=characters)", () => {
    const result = checkContainer(
      canGiveMaxRewardsRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "endless-archive-1",
        isCooldownExpired: () => true,
      })
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
      expect(result.missingSignal).toBe("characters")
    }
  })

  test("getTotalScriptCount unknown → indeterminate(missingSignal=totalScriptCount)", () => {
    const result = checkContainer(
      canGiveMaxRewardsRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "endless-archive-1",
        isCooldownExpired: () => true,
        getAllCharacters: () => ["char-a"],
      })
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
      expect(result.missingSignal).toBe("totalScriptCount")
    }
  })

  test("getKnownScripts unknown for a char → indeterminate(missingSignal=knownScripts:<id>)", () => {
    const result = checkContainer(
      canGiveMaxRewardsRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "endless-archive-1",
        isCooldownExpired: () => true,
        getAllCharacters: () => ["char-a"],
        getTotalScriptCount: () => 10,
      })
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canGiveMaxRewards")
      expect(result.missingSignal).toBe("knownScripts:char-a")
    }
  })
})
