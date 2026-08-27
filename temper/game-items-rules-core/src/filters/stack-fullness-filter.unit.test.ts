import { describe, expect, test } from "bun:test"
import { STACK_FULLNESS_OPTIONS, stackFullnessFilter } from "./stack-fullness-filter"

describe("stackFullnessFilter", () => {
  test("id and registry-facing metadata", () => {
    expect(stackFullnessFilter.id).toBe("stack-fullness")
    expect(stackFullnessFilter.mutuallyExclusive).toEqual([])
    expect(stackFullnessFilter.isEligible("container-stackable", {})).toBe(true)
  })

  test("options cover full and partial", () => {
    expect(STACK_FULLNESS_OPTIONS.map((o) => o.value)).toEqual(["full", "partial"])
  })

  test("isPresent reflects the conditions value", () => {
    expect(stackFullnessFilter.isPresent(undefined)).toBe(false)
    expect(stackFullnessFilter.isPresent({})).toBe(false)
    expect(stackFullnessFilter.isPresent({ stackFullness: "full" })).toBe(true)
    expect(stackFullnessFilter.isPresent({ stackFullness: "partial" })).toBe(true)
  })

  test("fingerprint stringifies the value", () => {
    expect(stackFullnessFilter.fingerprint({})).toBeUndefined()
    expect(stackFullnessFilter.fingerprint({ stackFullness: "full" })).toBe("full")
  })

  test("applyDefault seeds full", () => {
    expect(stackFullnessFilter.applyDefault()).toEqual({ stackFullness: "full" })
  })

  test("clear removes the key", () => {
    expect(stackFullnessFilter.clear()).toEqual({ stackFullness: undefined })
  })

  test("transferToCategory carries the value forward", () => {
    expect(stackFullnessFilter.transferToCategory({ stackFullness: "full" }, "a", "b", {})).toEqual(
      {
        stackFullness: "full",
      }
    )
    expect(stackFullnessFilter.transferToCategory({}, "a", "b", {})).toEqual({})
  })
})
