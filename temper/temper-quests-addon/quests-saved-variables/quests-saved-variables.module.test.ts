import { describe, expect, test } from "bun:test"
import { computeCarriedToggles } from "./quests-saved-variables.module.code.ts"

describe("quests-saved-variables", () => {
  test("nothing is carried over from a table that is not there", () => {
    expect(computeCarriedToggles(undefined)).toEqual({})
  })

  test("nothing is carried over from a table holding no default", () => {
    expect(computeCarriedToggles({ other: 1 })).toEqual({})
  })

  test("a setting left at its default is not carried over", () => {
    const old = {
      Default: { "@player": { $AccountWide: { autoQuest: true, autoQuestDebug: false } } },
    }
    expect(computeCarriedToggles(old)).toEqual({})
  })

  test("a setting turned away from its default is carried over", () => {
    const old = {
      Default: { "@player": { $AccountWide: { autoQuest: false, autoQuestDebug: true } } },
    }
    expect(computeCarriedToggles(old)).toEqual({ autoQuest: false, autoQuestDebug: true })
  })

  test("a setting turned away under any account on the file is carried over", () => {
    const old = {
      Default: {
        "@first": { $AccountWide: { autoQuest: true } },
        "@second": { $AccountWide: { autoQuest: false } },
      },
    }
    expect(computeCarriedToggles(old)).toEqual({ autoQuest: false })
  })

  test("an account entry holding no account-wide table is passed over", () => {
    const old = { Default: { "@player": { other: 1 } } }
    expect(computeCarriedToggles(old)).toEqual({})
  })
})
