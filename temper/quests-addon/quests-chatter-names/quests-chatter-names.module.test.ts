import { describe, expect, test } from "bun:test"
import { buildEsoNameMap, nameFromMap } from "./quests-chatter-names.module.code.ts"

describe("quests-chatter-names", () => {
  test("each named global is read into a map from value to name", () => {
    const map = buildEsoNameMap({ CHATTER_GOODBYE: 3, CHATTER_START_TALK: 1 }, [
      "CHATTER_GOODBYE",
      "CHATTER_START_TALK",
    ])
    expect(map).toEqual({ 1: "CHATTER_START_TALK", 3: "CHATTER_GOODBYE" })
  })

  test("a name the globals do not carry is left out of the map", () => {
    expect(buildEsoNameMap({ CHATTER_GOODBYE: 3 }, ["CHATTER_GOODBYE", "CHATTER_ABSENT"])).toEqual({
      3: "CHATTER_GOODBYE",
    })
  })

  test("a global whose value is no number is left out of the map", () => {
    expect(buildEsoNameMap({ A: 1, B: "two", C: true }, ["A", "B", "C"])).toEqual({ 1: "A" })
  })

  test("only the names handed in are read from the globals", () => {
    expect(buildEsoNameMap({ A: 1, UNASKED: 2 }, ["A"])).toEqual({ 1: "A" })
  })

  test("independent name lists build independent maps", () => {
    const globals = { A: 1, B: 2 }
    expect(buildEsoNameMap(globals, ["A"])).toEqual({ 1: "A" })
    expect(buildEsoNameMap(globals, ["B"])).toEqual({ 2: "B" })
  })

  test("a mapped code reads back as the name the game gives it", () => {
    expect(nameFromMap({ 3: "CHATTER_GOODBYE" }, 3)).toBe("CHATTER_GOODBYE")
  })

  test("a code the game names nothing for reads back as the code itself", () => {
    expect(nameFromMap({ 3: "CHATTER_GOODBYE" }, 9)).toBe("UNKNOWN_9")
  })
})
