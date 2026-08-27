import { describe, expect, test } from "bun:test"
import { propertiesFor } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import type { FileTree } from "../../page/file-tree.ts"
import { block, fileTreeOf, FILES, typeNamed, vocabularyIn } from "./page-frontmatter-fixture.ts"

function judging(tree: FileTree, slug: string, stated: readonly string[]) {
  const { properties, why } = propertiesFor(typeNamed(slug, tree), tree)
  expect(why).toBeNull()
  return judgeFrontmatter(block(["domain: a-domain", ...stated]), slug, properties!, vocabularyIn(tree))
}

const stating = (lines: readonly string[]): FileTree =>
  fileTreeOf({ ...FILES, "pages/page-property-definition/leaf-calibration.page-property-definition.md": block(["defined-on-slug: leaf", "key: calibration", ...lines]) })

describe("a value standing with nothing after it", () => {
  test("is refused where the property states no `blank:`, and the refusal says what stood there", () => {
    const verdict = judging(stating(["type: number"]), "leaf", ["calibration:"])
    expect(verdict.why).toBeNull()
    expect(verdict.refusals).toEqual([
      "`calibration:` stands with nothing after it, where `number` states a number",
    ])
  })

  test("holds where the property states `blank: true`", () => {
    expect(judging(stating(["type: number", "blank: true"]), "leaf", ["calibration:"]).refusals).toEqual([])
    expect(judging(stating(["type: number", "blank: true"]), "leaf", ["calibration: -1"]).refusals).toEqual([])
  })

  test("`blank: true` admits nothing else, so the type still refuses every other value", () => {
    const verdict = judging(stating(["type: number", "blank: true"]), "leaf", ["calibration: many"])
    expect(verdict.refusals).toEqual([
      "`calibration: many` is not a number, or nothing at all, which is what `number` states",
    ])
  })

  test("a narrowing beside `blank: true` bounds a value that stands and lets a blank one past", () => {
    const bounded = ["type: text", "blank: true", "values:", "  - live", "  - unopened"]
    expect(judging(stating(bounded), "leaf", ["calibration:"]).refusals).toEqual([])
    expect(judging(stating(bounded), "leaf", ["calibration: live"]).refusals).toEqual([])
    expect(judging(stating(bounded), "leaf", ["calibration: gone"]).refusals.join("\n")).toContain(
      "one of `live`, `unopened`"
    )
  })

  test("presence and emptiness stay separate: a required key stands blank and is not owed", () => {
    const owed = ["type: number", "blank: true", "required: true"]
    expect(judging(stating(owed), "leaf", ["calibration:"]).refusals).toEqual([])
    expect(judging(stating(owed), "leaf", []).refusals.join("\n")).toContain("`calibration` is required on `leaf`")
  })
})
