import { describe, expect, it } from "bun:test"
import {
  characterPassesRequiredCurseState,
  requiredCurseStateFilter,
} from "./required-curse-state-filter"

function makeResolver(data: Record<string, "vampire" | "werewolf" | undefined>) {
  return (charId: string) => data[charId]
}

describe("characterPassesRequiredCurseState", () => {
  const resolve = makeResolver({
    alice: "vampire",
    bob: "werewolf",
    carol: undefined,
  })

  it("passes when the candidate's curse state matches the required state (vampire)", () => {
    expect(characterPassesRequiredCurseState("alice", { state: "vampire" }, resolve)).toBe(true)
  })

  it("fails when the candidate has a different curse state (werewolf vs vampire)", () => {
    expect(characterPassesRequiredCurseState("bob", { state: "vampire" }, resolve)).toBe(false)
  })

  it("fails fail-closed when the candidate has no curse state (undefined vs vampire)", () => {
    expect(characterPassesRequiredCurseState("carol", { state: "vampire" }, resolve)).toBe(false)
  })

  it("fails when the candidate is vampire but werewolf is required", () => {
    expect(characterPassesRequiredCurseState("alice", { state: "werewolf" }, resolve)).toBe(false)
  })

  it("passes when the candidate's curse state matches the required state (werewolf)", () => {
    expect(characterPassesRequiredCurseState("bob", { state: "werewolf" }, resolve)).toBe(true)
  })

  it("fails fail-closed for an unknown character (resolver returns undefined)", () => {
    expect(characterPassesRequiredCurseState("dan", { state: "vampire" }, resolve)).toBe(false)
  })
})

describe("requiredCurseStateFilter (rule-level)", () => {
  it("isPresent when state is set", () => {
    expect(
      requiredCurseStateFilter.isPresent({
        requiredCurseState: { state: "vampire" },
      })
    ).toBe(true)
    expect(requiredCurseStateFilter.isPresent({})).toBe(false)
    expect(requiredCurseStateFilter.isPresent(undefined)).toBe(false)
  })

  it("fingerprint includes the required state for stable comparison", () => {
    expect(
      requiredCurseStateFilter.fingerprint({
        requiredCurseState: { state: "vampire" },
      })
    ).toBe("vampire")
    expect(
      requiredCurseStateFilter.fingerprint({
        requiredCurseState: { state: "werewolf" },
      })
    ).toBe("werewolf")
  })

  it("scopes to the `stock` action via isEligibleForAction", () => {
    expect(requiredCurseStateFilter.isEligibleForAction?.("stock")).toBe(true)
    expect(requiredCurseStateFilter.isEligibleForAction?.("sell")).toBe(false)
  })

  it("clear and transferToCategory mirror set-sources-style filters", () => {
    expect(requiredCurseStateFilter.clear()).toEqual({ requiredCurseState: undefined })
    expect(
      requiredCurseStateFilter.transferToCategory(
        { requiredCurseState: { state: "vampire" } },
        "any",
        "any-other",
        {}
      )
    ).toEqual({
      requiredCurseState: { state: "vampire" },
    })
  })
})
