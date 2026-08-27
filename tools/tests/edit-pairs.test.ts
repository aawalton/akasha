import { describe, expect, test } from "bun:test"
import { applyPairs, parsePairs } from "../../patches/edit-pairs.ts"

describe("pairs apply to the evolving body, so a later one is judged against what an earlier produced", () => {
  test("pair 2 matches text pair 1 created", () => {
    expect(
      applyPairs("one two", [
        { old: "one", next: "three", all: false },
        { old: "three two", next: "done", all: false },
      ])
    ).toEqual({ body: "done" })
  })
})

describe("a pair must match uniquely, a body that is not what was thought being the case this refuses", () => {
  test("matching nothing refuses, naming which pair", () => {
    expect(applyPairs("one", [{ old: "two", next: "three", all: false }])).toEqual({
      refusal: expect.stringContaining("edit 1 has no match"),
    })
  })

  test("matching twice refuses rather than choosing one", () => {
    expect(applyPairs("a a", [{ old: "a", next: "b", all: false }])).toEqual({
      refusal: expect.stringContaining("matches 2 times"),
    })
  })

  test("replace_all is what widens a pair to every occurrence", () => {
    expect(applyPairs("a a", [{ old: "a", next: "b", all: true }])).toEqual({ body: "b b" })
  })
})

describe("a payload states one pair bare or several under `edits`", () => {
  test("a bare object is one pair", () => {
    expect(parsePairs({ old_string: "a", new_string: "b" }, "where")).toEqual([
      { old: "a", next: "b", all: false },
    ])
  })

  test("an `edits` array is that many pairs, in the order written", () => {
    expect(
      parsePairs(
        { edits: [{ old_string: "a", new_string: "b" }, { old_string: "c", new_string: "d", replace_all: true }] },
        "where"
      )
    ).toEqual([
      { old: "a", next: "b", all: false },
      { old: "c", next: "d", all: true },
    ])
  })
})
