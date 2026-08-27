
import { describe, expect, it } from "bun:test"
import { LOGICAL_MODELS, parseModel, toWireId } from "../lib/model-vocab.ts"

describe("toWireId, on the assertions carried from the standing suites", () => {
  it("maps each logical to its base wire id", () => {
    expect(toWireId("fable")).toBe("claude-fable-5")
    expect(toWireId("opus")).toBe("claude-opus-5")
    expect(toWireId("sonnet")).toBe("claude-sonnet-5")
    expect(toWireId("haiku")).toBe("claude-haiku-4-5")
  })

  it("a retired stored wire id re-derives to the current one", () => {
    const stored = parseModel("claude-opus-4-8")
    expect(stored).not.toBeNull()
    if (stored === null) return
    expect(toWireId(stored.logical)).toBe("claude-opus-5")
  })

  it("every logical model's wire id is `claude-<logical>-…`", () => {
    for (const logical of LOGICAL_MODELS) {
      expect(toWireId(logical).startsWith(`claude-${logical}-`)).toBe(true)
    }
  })

  it("a base wire id round-trips to its logical tier", () => {
    for (const logical of LOGICAL_MODELS) {
      expect(parseModel(toWireId(logical))).toEqual({ logical, extended: false })
    }
  })
})
