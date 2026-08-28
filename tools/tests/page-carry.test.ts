import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { deriver } from "../lib/page-derive.ts"
import { heldOf } from "../lib/page-rows.ts"
import { evaluate } from "../lib/page-expression.ts"
import { valuesIn } from "../lib/page-file-values.ts"
import type { Roots } from "../../page/page"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (): string => page(["extends-slug: none"])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const reads = (of: string): readonly string[] => [
  "type: number",
  `expression: 'case({${of}} != absent -> 100, otherwise -> {other})'`,
]

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/gauge.page-type.md": kind(),

  "pages/page-property-definition/gauge-other.page-property-definition.md": property("gauge", "other", ["type: number"]),
  "pages/page-property-definition/gauge-mapped.page-property-definition.md": property("gauge", "mapped", ["type: map(text)", "default: fell-back"]),
  "pages/page-property-definition/gauge-mapped-bare.page-property-definition.md": property("gauge", "mapped-bare", ["type: map(text)"]),
  "pages/page-property-definition/gauge-listed.page-property-definition.md": property("gauge", "listed", ["type: list(text)"]),
  "pages/page-property-definition/gauge-blank.page-property-definition.md": property("gauge", "blank", ["type: text", "blank: true"]),
  "pages/page-property-definition/gauge-away.page-property-definition.md": property("gauge", "away", ["type: text"]),
  "pages/page-property-definition/gauge-reads-mapped.page-property-definition.md": property("gauge", "reads-mapped", reads("mapped")),
  "pages/page-property-definition/gauge-reads-away.page-property-definition.md": property("gauge", "reads-away", reads("away")),

  "pages/gauge/mapped.gauge.md": page(["other: 7", "mapped:", "  a: one", "  b: two"]),
  "pages/gauge/mapped-bare.gauge.md": page(["other: 7", "mapped-bare:", "  a: one"]),
  "pages/gauge/nested.gauge.md": page(["other: 7", "mapped:", "  a:", "    deep: one"]),
  "pages/gauge/blank.gauge.md": page(["other: 7", "blank:"]),
  "pages/gauge/nothing.gauge.md": page(["other: 7"]),
}

const root = mkdtempSync(join("/var/tmp", "page-carry-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

// NAMED ONLY WHERE CLONED: every root named here is scanned, so a repo pointed at a path that is
// not there raises ENOENT rather than reading as a repository holding nothing.
const ROOTS: Roots = {
  akasha: root,
}

const rowOf = (named: string): Record<string, unknown> => {
  const found = [...deriver(ROOTS).rows("gauge")!].find((row) => row.at.endsWith(`/${named}.gauge.md`))
  return found!.values as Record<string, unknown>
}

// A FAULT ARRIVES ON THE WALK. `rows` answers pages to walk and reads none of them itself, so what
// the deriver has to report stands only once every page has been walked.
const faultsOf = (): readonly string[] => {
  const found = deriver(ROOTS)
  Array.from(found.rows("gauge") ?? [])
  return found.faults()
}

describe("a mapping written in a page's frontmatter", () => {
  it("reaches the row rather than vanishing from it", () => {
    expect(rowOf("mapped")).toHaveProperty("mapped")
    expect(rowOf("mapped").mapped).toBe('{"a":"one","b":"two"}')
  })

  it("carries every depth of it, so nothing below the first level is lost", () => {
    expect(rowOf("nested").mapped).toBe('{"a":{"deep":"one"}}')
  })

  it("is never replaced by the property's own `default:`, which would read as a written value", () => {
    expect(rowOf("mapped").mapped).not.toBe("fell-back")
    expect(rowOf("mapped-bare")["mapped-bare"]).toBe('{"a":"one"}')
  })

  // A MAPPING REACHES NO FORMULA. The formula language holds six types and a mapping is none of
  // them, so a formula naming this key is refused where it is checked rather than handed the JSON
  // text of it, which is what the evaluator this replaced compared against.
  it("is refused by a formula naming it, and the refusal says which property stated it", () => {
    expect(rowOf("mapped")["reads-mapped"]).toBeNull()
    expect(faultsOf().join("\n")).toContain("`gauge-reads-mapped`")
  })

  it("leaves every other key on the same page reading exactly as it did", () => {
    expect(rowOf("mapped").other).toBe("7")
  })
})

describe("one rule for a nested value, whichever file it stands in", () => {
  it("carries a mapping out of frontmatter exactly as a rows file carries the same mapping", () => {
    const written = valuesIn(page(["mapped:", "  a: one"]), false)!.values.mapped
    expect(written).toBe(heldOf({ a: "one" }))
  })

  it("carries a list with a mapping in it item by item, rather than dropping the item", () => {
    const written = valuesIn(page(["listed:", "  - plain", "  - deep: one"]), false)!.values.listed
    expect(written).toEqual(["plain", '{"deep":"one"}'])
  })
})

describe("the two states a written value must stay distinct from", () => {
  it("leaves an absent key absent, so the expression takes its other branch", () => {
    expect(rowOf("nothing")).not.toHaveProperty("away")
    expect(rowOf("nothing")["reads-away"]).toBe("7")
  })

  it("leaves a key written bare reading as the empty list the substrate spells that way", () => {
    expect(rowOf("blank").blank).toEqual([])
  })

  it("reports a fault against neither of them", () => {
    const found = faultsOf().join("\n")
    expect(found).not.toContain("`blank`")
    expect(found).not.toContain("`away`")
  })
})

describe("what the evaluator itself does with an empty list, which absence never reads as", () => {
  it("reads an empty list as truthy, so it is not an absence", () => {
    expect(evaluate("k && 100 || 7", () => [])).toBe("100")
  })

  it("reads an absent key as null, which is falsy", () => {
    expect(evaluate("k && 100 || 7", () => null)).toBe("7")
  })

  it("keeps the two apart under `!`", () => {
    expect(evaluate("!k", () => [])).toBe("false")
    expect(evaluate("!k", () => null)).toBe("true")
  })
})
