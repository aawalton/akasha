import { describe, expect, test } from "bun:test"
import { checkContainer } from "../check-container"
import {
  baseFacts,
  canOpenRule,
  containerFacts,
  ctxWith,
  nonContainerFacts,
  stubEnv,
} from "./fixtures"

describe("checkContainer — canOpen", () => {
  test("not a container → fail", () => {
    const result = checkContainer(canOpenRule, nonContainerFacts, { env: stubEnv })
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") {
      expect(result.conditionKind).toBe("canOpen")
    }
  })

  test("pre-capture isContainer undefined → indeterminate(missingSignal=isContainer)", () => {
    const result = checkContainer(canOpenRule, baseFacts, { env: stubEnv })
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canOpen")
      expect(result.missingSignal).toBe("isContainer")
    }
  })

  test("container with no cooldown group → pass", () => {
    const result = checkContainer(
      canOpenRule,
      containerFacts,
      ctxWith({ getCooldownGroup: () => null })
    )
    expect(result.kind).toBe("pass")
  })

  test("container with active cooldown → fail", () => {
    const result = checkContainer(
      canOpenRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "rftw-1",
        isCooldownExpired: () => false,
      })
    )
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") {
      expect(result.conditionKind).toBe("canOpen")
    }
  })

  test("container with expired cooldown → pass", () => {
    const result = checkContainer(
      canOpenRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "rftw-1",
        isCooldownExpired: () => true,
      })
    )
    expect(result.kind).toBe("pass")
  })

  test("getCooldownGroup unknown → indeterminate(missingSignal=cooldownGroup)", () => {
    const result = checkContainer(canOpenRule, containerFacts, {
      env: stubEnv,
    })
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canOpen")
      expect(result.missingSignal).toBe("cooldownGroup")
    }
  })

  test("isCooldownExpired unknown → indeterminate(missingSignal=cooldownExpired)", () => {
    const result = checkContainer(
      canOpenRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => "rftw-1",
      })
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canOpen")
      expect(result.missingSignal).toBe("cooldownExpired")
    }
  })
})
