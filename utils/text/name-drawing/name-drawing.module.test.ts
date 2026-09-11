import { describe, expect, test } from "bun:test"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

describe("names drawn for a line a caller reads", () => {
  test("each name is drawn in backticks and parted by a comma", () => {
    expect(namesDrawn(["install", "start"])).toBe("`install`, `start`")
  })

  test("the names are drawn in the order the caller handed them over", () => {
    expect(namesDrawn(["stop", "start"])).toBe("`stop`, `start`")
  })

  test("one name is drawn with no comma", () => {
    expect(namesDrawn(["generate"])).toBe("`generate`")
  })

  test("no name at all is drawn as an empty line", () => {
    expect(namesDrawn([])).toBe("")
  })

  test("a set is drawn in the order that set holds", () => {
    expect(namesDrawn(new Set(["--all", "--dry-run"]))).toBe("`--all`, `--dry-run`")
  })

  test("the names are parted by what the caller hands over", () => {
    expect(namesDrawn(["module", "domain"], " or ")).toBe("`module` or `domain`")
  })
})
