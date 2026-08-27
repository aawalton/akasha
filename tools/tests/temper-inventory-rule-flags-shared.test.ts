import { describe, expect, it } from "bun:test"
import { InputError } from "@shared/errors-core/exit"
import { parseDestinationChainJson } from "../lib/temper-inventory/rule-flags-shared.ts"

describe("parseDestinationChainJson", () => {
  it("returns undefined for an absent flag", () => {
    expect(parseDestinationChainJson(undefined)).toBeUndefined()
  })

  it("parses a by-priority→bank cascade with a gated first tier", () => {
    const raw = JSON.stringify([
      {
        destination: "character:by-priority",
        targetQuantity: 10,
        charEligibility: {
          requiredSkillLines: {
            skillLineIds: ["world-legerdemain", "guild-thieves-guild"],
            mode: "any-not-maxed",
          },
        },
      },
      { destination: "bank" },
    ])
    const chain = parseDestinationChainJson(raw)
    expect(chain).toEqual([
      {
        destination: "character:by-priority",
        targetQuantity: 10,
        charEligibility: {
          requiredSkillLines: {
            skillLineIds: ["world-legerdemain", "guild-thieves-guild"],
            mode: "any-not-maxed",
          },
        },
      },
      { destination: "bank" },
    ])
  })

  it("throws InputError on non-JSON input", () => {
    expect(() => parseDestinationChainJson("not json")).toThrow(InputError)
  })

  it("rejects a mistyped tier key via .strict()", () => {
    const raw = JSON.stringify([{ destination: "bank", targetQuanti: 10 }])
    expect(() => parseDestinationChainJson(raw)).toThrow(InputError)
  })

  it("rejects a mistyped charEligibility axis via .strict()", () => {
    const raw = JSON.stringify([
      { destination: "character:by-priority", charEligibility: { requiredSkillLine: {} } },
    ])
    expect(() => parseDestinationChainJson(raw)).toThrow(InputError)
  })

  it("rejects an empty-string tier destination", () => {
    const raw = JSON.stringify([{ destination: "" }])
    expect(() => parseDestinationChainJson(raw)).toThrow(InputError)
  })
})
