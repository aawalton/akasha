import { describe, expect, test } from "bun:test"

import { ConcatTables } from "./util-tables"

describe("LCCC.ConcatTables (table.insert → push)", () => {
  test("appends every positional element of src onto dest, returning the same dest ref", () => {
    const dest: unknown[] = [1, 2]
    const result = ConcatTables(dest, [3, 4, 5])
    expect(result).toBe(dest)
    expect(dest).toEqual([1, 2, 3, 4, 5])
  })

  test("appending an empty src leaves dest unchanged", () => {
    const dest: unknown[] = ["a"]
    ConcatTables(dest, [])
    expect(dest).toEqual(["a"])
  })

  test("preserves element order and duplicates", () => {
    const dest: unknown[] = []
    ConcatTables(dest, ["x", "x", "y"])
    expect(dest).toEqual(["x", "x", "y"])
  })
})
