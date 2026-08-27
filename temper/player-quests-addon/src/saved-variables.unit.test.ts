import { describe, expect, it } from "bun:test"
import { computeCarriedToggles } from "./saved-variables"

function rawSv(accountWide: Record<string, unknown>, account = "@alan"): unknown {
  return { Default: { [account]: { $AccountWide: accountWide } } }
}

describe("computeCarriedToggles", () => {
  it("returns nothing for a non-object / absent old SV (fresh install)", () => {
    expect(computeCarriedToggles(undefined)).toEqual({})
    expect(computeCarriedToggles("nope")).toEqual({})
    expect(computeCarriedToggles({})).toEqual({})
    expect(computeCarriedToggles({ Default: {} })).toEqual({})
  })

  it("carries an explicit auto-quest opt-out (autoQuest === false)", () => {
    expect(computeCarriedToggles(rawSv({ autoQuest: false }))).toEqual({ autoQuest: false })
  })

  it("does NOT carry an absent or true autoQuest (on in both addons)", () => {
    expect(computeCarriedToggles(rawSv({}))).toEqual({})
    expect(computeCarriedToggles(rawSv({ autoQuest: true }))).toEqual({})
  })

  it("carries an explicit autoQuestDebug === true", () => {
    expect(computeCarriedToggles(rawSv({ autoQuestDebug: true }))).toEqual({
      autoQuestDebug: true,
    })
  })

  it("does NOT carry autoQuestDebug when absent or false", () => {
    expect(computeCarriedToggles(rawSv({ autoQuestDebug: false }))).toEqual({})
  })

  it("carries both toggles together", () => {
    expect(computeCarriedToggles(rawSv({ autoQuest: false, autoQuestDebug: true }))).toEqual({
      autoQuest: false,
      autoQuestDebug: true,
    })
  })

  it("does not carry the transient trace buffer (only toggle state)", () => {
    const carried = computeCarriedToggles(rawSv({ autoQuest: false, autoQuestDebugTrace: [1, 2] }))
    expect(carried).toEqual({ autoQuest: false })
    expect("autoQuestDebugTrace" in carried).toBe(false)
  })

  it("carries an opt-out found on any account (account-wide feature)", () => {
    const raw = {
      Default: {
        "@a": { $AccountWide: { autoQuest: true } },
        "@b": { $AccountWide: { autoQuest: false } },
      },
    }
    expect(computeCarriedToggles(raw)).toEqual({ autoQuest: false })
  })
})
