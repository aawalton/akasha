import { describe, expect, it } from "bun:test"
import { buildEsoNameMap, nameFromMap } from "./chatter-names"

describe("buildEsoNameMap", () => {
  it("reads each named global into a value→name map", () => {
    const globals = {
      CHATTER_START_COMPLETE_QUEST: 30,
      CHATTER_GOODBYE: 5,
      INTERACTION_QUEST: 14,
    }
    const map = buildEsoNameMap(globals, ["CHATTER_START_COMPLETE_QUEST", "CHATTER_GOODBYE"])
    expect(map[30]).toBe("CHATTER_START_COMPLETE_QUEST")
    expect(map[5]).toBe("CHATTER_GOODBYE")
  })

  it("touches only the names it is handed, never the whole table", () => {
    const globals = { CHATTER_GOODBYE: 5, INTERACTION_QUEST: 14 }
    const map = buildEsoNameMap(globals, ["CHATTER_GOODBYE"])
    expect(map[14]).toBeUndefined()
  })

  it("skips a named global whose value is not a number", () => {
    const globals = {
      CHATTER_GOODBYE: 5,
      CHATTER_SOME_FUNCTION: () => 0,
      CHATTER_SOME_TABLE: { a: 1 },
      CHATTER_SOME_STRING: "nope",
    }
    const map = buildEsoNameMap(globals, [
      "CHATTER_GOODBYE",
      "CHATTER_SOME_FUNCTION",
      "CHATTER_SOME_TABLE",
      "CHATTER_SOME_STRING",
    ])
    expect(Object.values(map)).toEqual(["CHATTER_GOODBYE"])
  })

  it("skips a name absent from the globals table", () => {
    const globals = { CHATTER_GOODBYE: 5 }
    const map = buildEsoNameMap(globals, ["CHATTER_GOODBYE", "CHATTER_NOT_PRESENT"])
    expect(Object.values(map)).toEqual(["CHATTER_GOODBYE"])
  })

  it("builds independent maps from independent name lists", () => {
    const globals = { CHATTER_GOODBYE: 5, INTERACTION_QUEST: 14, INTERACTION_CONVERSATION: 13 }
    const interaction = buildEsoNameMap(globals, ["INTERACTION_QUEST", "INTERACTION_CONVERSATION"])
    expect(interaction[14]).toBe("INTERACTION_QUEST")
    expect(interaction[13]).toBe("INTERACTION_CONVERSATION")
    expect(interaction[5]).toBeUndefined()
  })
})

describe("nameFromMap", () => {
  it("returns the mapped constant name when present", () => {
    const map = { 30: "CHATTER_START_COMPLETE_QUEST" }
    expect(nameFromMap(map, 30)).toBe("CHATTER_START_COMPLETE_QUEST")
  })

  it("falls back to UNKNOWN_<value> for an unmapped value", () => {
    expect(nameFromMap({}, 101)).toBe("UNKNOWN_101")
  })
})
