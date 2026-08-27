import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { surveyFilter } from "./survey-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const survey: ItemFacts = { ...baseFacts, specializedItemType: 101 }
const nonSurvey: ItemFacts = { ...baseFacts, specializedItemType: 100 }
const undefinedType: ItemFacts = { ...baseFacts }

describe("surveyFilter", () => {
  it("include matches a survey and rejects a non-survey", () => {
    expect(surveyFilter.matches(survey, "include")).toBe(true)
    expect(surveyFilter.matches(nonSurvey, "include")).toBe(false)
  })

  it("exclude matches a non-survey and rejects a survey", () => {
    expect(surveyFilter.matches(nonSurvey, "exclude")).toBe(true)
    expect(surveyFilter.matches(survey, "exclude")).toBe(false)
  })

  it("fails closed when the specialized type is undefined (neither toggle matches)", () => {
    expect(surveyFilter.matches(undefinedType, "include")).toBe(false)
    expect(surveyFilter.matches(undefinedType, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(surveyFilter.deserialize(surveyFilter.serialize("include"))).toBe("include")
    expect(surveyFilter.deserialize(surveyFilter.serialize("exclude"))).toBe("exclude")
    expect(surveyFilter.deserialize("nonsense")).toBeUndefined()
    expect(surveyFilter.deserialize(42)).toBeUndefined()
  })
})
