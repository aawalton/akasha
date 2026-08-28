import { describe, expect, test } from "bun:test"
import { SIZE_MD } from "../../page/document/tokens.ts"
import type { Verdict } from "../../page/document/types.ts"
import type { ListPart, PartDef, SectionPart } from "../../page/document/shape-types.ts"
import { hold, shapeOf } from "../../page/shape/shape.ts"
import { GLOSS_ITEM_PAIR } from "./page-shape-contracts.ts"

const AT = "pages/page-type/list-fixture.page-type.md"

function sectionOf(part: PartDef | undefined): SectionPart {
  if (part === undefined || part.part !== "section") throw new Error("no section stands where one was required")
  return part
}

function listOf(part: PartDef | undefined): ListPart {
  if (part === undefined || part.part !== "block" || part.block !== "list")
    throw new Error("no list block stands where one was required")
  return part
}

const glossType = (slot: readonly string[]): string =>
  [
    "---",
    "blocks:",
    "  list:",
    "    repeat: 1-1000",
    "slots:",
    "  handle:",
    "    max: xs",
    "  body:",
    "    max: sm",
    ...slot,
    "---",
    "",
    "# List",
    "",
    "- **{handle}** — {body}",
    "- {gloss}",
    "",
  ].join("\n")

const GLOSS = ["  gloss:", "    max: md", "    without: strong"]

const listing = (items: readonly string[]): string => ["---", "---", "", "# List", "", ...items, ""].join("\n")

const HANDLED = ["- **shebang** — the kernel reads it to pick the interpreter."]
const GLOSSED = ["- The kernel reads it to pick the interpreter.", "- The compiler suppresses the error."]
const MIXED = ["- **shebang** — the kernel reads it.", "- The compiler suppresses the error."]

const itemsOf = (type: string): ListPart => {
  const shape = shapeOf("list", AT, type)
  expect(shape.why).toBeNull()
  return listOf(sectionOf(shape.compiled!.sections[0]).contains[0])
}

function judged(type: string, items: readonly string[]): Verdict {
  const shape = shapeOf("list", AT, type)
  expect(shape.why).toBeNull()
  return hold(shape, "pages/domain/lists/one.md", listing(items))
}

describe("a list whose items may take either of two shapes", () => {
  test("each item written under the heading states one shape an item may take", () => {
    const part = itemsOf(glossType(GLOSS))
    expect(part.item).toHaveLength(2)
    expect(part.item[1]).toEqual({ maxChars: SIZE_MD, marks: { without: "strong" }, lead: null, template: null })
  })

  test("the pair it compiles to is the pair the frozen `list` contract states", () => {
    expect(itemsOf(glossType(GLOSS)).item).toEqual(GLOSS_ITEM_PAIR)
  })

  test("a list of either shape holds, and one mixing them is refused", () => {
    expect(judged(glossType(GLOSS), HANDLED).ok).toBe(true)
    expect(judged(glossType(GLOSS), GLOSSED).ok).toBe(true)
    expect(judged(glossType(GLOSS), MIXED).ok).toBe(false)
  })

  test("the bar on the mark is what keeps the two apart, a mixed list passing without it", () => {
    expect(judged(glossType(["  gloss:", "    max: md"]), MIXED).ok).toBe(true)
    expect(judged(glossType(GLOSS), MIXED).ok).toBe(false)
  })

  const beside = (slot: readonly string[], lines: readonly string[]): string =>
    ["---", "slots:", ...slot, "---", "", "# List", "", ...lines, ""].join("\n")

  const REFUSED: readonly (readonly [string, string, string])[] = [
    [
      "a bar on a hole standing beside other text",
      beside(["  handle:", "    max: xs", "    without: strong", "  body:", "    max: sm"], ["- **{handle}** — {body}"]),
      "stands beside other text on it",
    ],
    [
      "a bar naming no mark at all",
      glossType(["  gloss:", "    max: md", "    without: bold"]),
      "`slots.gloss.without: bold` names no mark",
    ],
    [
      "a bar on a hole the template writes marked",
      beside(["  gloss:", "    max: md", "    without: strong"], ["- **{gloss}**"]),
      "is written marked in the template",
    ],
    [
      "a bar on a hole bounded by a closed set rather than a ceiling",
      glossType(["  gloss:", "    values:", "      - one", "    without: strong"]),
      "bounds no text with `max:`",
    ],
    [
      "two items stating one shape between them",
      beside(["  gloss:", "    max: md"], ["- {gloss}", "- {gloss}"]),
      "2 list items of one shape",
    ],
    [
      "a bullet under one shape an item may take and not the other",
      [
        "---",
        "blocks:",
        "  list:",
        "    children: 1-4",
        "slots:",
        "  handle:",
        "    max: xs",
        "  body:",
        "    max: sm",
        "  gloss:",
        "    max: md",
        "    without: strong",
        "---",
        "",
        "# List",
        "",
        "- **{handle}** — {body}",
        "  - {body}",
        "- {gloss}",
        "",
      ].join("\n"),
      "either every shape an item may take carries one or none of them does",
    ],
  ]

  for (const [name, type, says] of REFUSED)
    test(`${name} compiles to no shape, and the refusal says which`, () => {
      const shape = shapeOf("list", AT, type)
      expect(shape.compiled).toBeNull()
      expect(shape.why).toContain(says)
    })
})
