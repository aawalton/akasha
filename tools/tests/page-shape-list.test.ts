import { describe, expect, test } from "bun:test"
import * as tokens from "../../page/document/tokens.ts"
import type { Mark, Verdict } from "../../page/document/types.ts"
import type { Cardinality, Ceiling, ListPart, PartDef, SectionPart, TemplateSlot, ValueType } from "../../page/document/shape-types.ts"
import { hold, shapeOf } from "../../page/shape/shape.ts"
import { blockKey } from "../../page/shape/level.ts"
import { LADDER } from "../../page/document/template.ts"
import { SEQUENCE_CONTRACT } from "./page-shape-contracts.ts"

const AT = "pages/page-type/fixture.page-type.md"

const RANKS = [...LADDER.keys()]

function sectionOf(part: PartDef | undefined): SectionPart {
  if (part === undefined || part.part !== "section") throw new Error("no section stands where one was required")
  return part
}

function listOf(part: PartDef | undefined): ListPart {
  if (part === undefined || part.part !== "block" || part.block !== "list")
    throw new Error("no list block stands where one was required")
  return part
}

function holeOf(slot: TemplateSlot | undefined): Extract<TemplateSlot, { slot: "hole" }> {
  if (slot === undefined || slot.slot !== "hole") throw new Error("no hole stands where one was required")
  return slot
}

function textCeiling(value: ValueType): Ceiling {
  if (value.type !== "text") throw new Error("the value is not text, so it names no ceiling")
  return value.maxChars
}

function rank(ceiling: Ceiling): string {
  const found = [...LADDER].find(([, step]) => step === ceiling)
  if (found === undefined) throw new Error(`${ceiling} is no step on the ladder`)
  return found[0]
}

function count(card: Cardinality): string {
  return `${card.least}-${card.max}`
}

const WRAP: Readonly<Record<Mark, string>> = { strong: "**", em: "*", code: "`" }

const wrap = (mark: Mark | null): string => (mark === null ? "" : WRAP[mark])

type Fixture = {
  readonly heading: string
  readonly declared: readonly string[]
  readonly slots: Readonly<Record<string, string>>
  readonly lines: readonly string[]
}

function typeText(one: Fixture): string {
  const declared = one.declared.length === 0 ? [] : ["blocks:", `  ${blockKey(one.heading)}:`, ...one.declared.map((line) => `    ${line}`)]
  const slots = Object.entries(one.slots).flatMap(([name, max]) => [`  ${name}:`, `    max: ${max}`])
  return [
    "---",
    ...declared,
    ...(slots.length === 0 ? [] : ["slots:", ...slots]),
    "---",
    "",
    `# ${one.heading}`,
    "",
    ...one.lines,
    "",
  ].join("\n")
}

function compiled(one: Fixture): SectionPart {
  const { compiled: schema, why } = shapeOf("fixture", AT, typeText(one))
  expect(why).toBeNull()
  const sections = schema!.sections
  expect(sections).toHaveLength(1)
  return sectionOf(sections[0])
}

function refused(one: Fixture): string {
  const { compiled: schema, why } = shapeOf("fixture", AT, typeText(one))
  expect(schema).toBeNull()
  expect(why).not.toBeNull()
  return why!
}

const stages = listOf(sectionOf(SEQUENCE_CONTRACT).contains[0])
const stageRule = stages.item[0]!
const stageHole = holeOf(stageRule.template?.[0])
const childBound = stages.children
const childRule = childBound === null ? undefined : stages.child[0]
const CHILD_HOLE = "action"

function contractType(): string {
  if (childBound === null || childRule === undefined) throw new Error("the contract states no child rule")
  const heading = sectionOf(SEQUENCE_CONTRACT).heading
  if (heading.match !== "literal") throw new Error("the contract's heading is not literal")
  const mark = wrap(stageHole.mark)
  return typeText({
    heading: heading.text,
    declared: [
      `count: ${count(sectionOf(SEQUENCE_CONTRACT).cardinality)}`,
      `repeat: ${count(stages.items)}`,
      `children: ${count(childBound)}`,
    ],
    slots: {
      [stageHole.name]: rank(textCeiling(stageHole.value)),
      [CHILD_HOLE]: rank(typeof childRule.maxChars === "number" ? childRule.maxChars : (0 as Ceiling)),
    },
    lines: [`${stages.ordered ? "1." : "-"} ${mark}{${stageHole.name}}${mark}`, `   - {${CHILD_HOLE}}`],
  })
}

function stageFixture(marker: string): Fixture {
  return {
    heading: "Sequence",
    declared: ["repeat: 1-12", "children: 1-15"],
    slots: { stage: "sm", action: "lg" },
    lines: [`${marker} **{stage}**`, "   - {action}"],
  }
}

describe("the `# Sequence` a page type declares in data", () => {
  test("the shape compiled from the spelled-out body is the `sequence` part the frozen contract carries", () => {
    const { compiled: schema, why } = shapeOf("fixture", AT, contractType())
    expect(why).toBeNull()
    expect(schema!.sections).toEqual([SEQUENCE_CONTRACT])
  })
})

describe("what a list block's markdown carries", () => {
  test("the marker carries `ordered` and settles nothing else about the shape", () => {
    const numbered = listOf(compiled(stageFixture("1.")).contains[0])
    const bulleted = listOf(compiled(stageFixture("-")).contains[0])
    expect(numbered.ordered).toBe(true)
    expect(bulleted.ordered).toBe(false)
    expect({ ...numbered, ordered: null }).toEqual({ ...bulleted, ordered: null })
  })

  test("an item that is one marked hole keeps its template and takes that hole's ceiling", () => {
    for (const name of RANKS) {
      const ceiling = LADDER.get(name)!
      const part = listOf(
        compiled({ ...stageFixture("1."), slots: { stage: name, action: "lg" } }).contains[0]
      )
      expect(part.item).toEqual([
        {
          maxChars: ceiling,
          marks: null,
          lead: null,
          template: [{ slot: "hole", name: "stage", value: { type: "text", maxChars: ceiling }, mark: "strong", optional: false }],
        },
      ])
    }
  })

  test("a bullet that is one unmarked hole is free text bounded at that hole's ceiling", () => {
    for (const name of RANKS) {
      const part = listOf(compiled({ ...stageFixture("1."), slots: { stage: "sm", action: name } }).contains[0])
      expect(part.children).not.toBeNull()
      expect(part.children === null ? [] : part.child).toEqual([
        { maxChars: LADDER.get(name)!, marks: null, lead: null, template: null },
      ])
    }
  })

  test("a line carrying more than its hole is bounded by its slots rather than by a ceiling", () => {
    const part = listOf(
      compiled({
        heading: "Sequence",
        declared: ["repeat: 1-12"],
        slots: { stage: "sm", note: "md" },
        lines: ["1. **{stage}** — {note}"],
      }).contains[0]
    )
    expect(part.item[0]!.maxChars).toBe("slots")
    expect(part.item[0]!.template).toHaveLength(3)
  })

  test("an item with no bullet beneath it admits no nested item at all", () => {
    const part = listOf(
      compiled({ heading: "Sequence", declared: ["repeat: 1-12"], slots: { stage: "sm" }, lines: ["1. **{stage}**"] })
        .contains[0]
    )
    expect(part.children).toBeNull()
  })
})

describe("the counts a list block's frontmatter carries", () => {
  const COUNTS: readonly (readonly [string, Cardinality])[] = [
    ["1-12", { least: 1, max: 12 }],
    ["0-4", { least: 0, max: 4 }],
    ["3", { least: 3, max: 3 }],
  ]

  const FLOORED = COUNTS.filter(([, count]) => count.least > 0)
  const UNFLOORED = COUNTS.filter(([, count]) => count.least === 0)

  test("`repeat` bounds the items and `children` bounds the bullets beneath each one", () => {
    for (const [repeat, items] of FLOORED)
      for (const [children, nested] of COUNTS) {
        const part = listOf(compiled({ ...stageFixture("1."), declared: [`repeat: ${repeat}`, `children: ${children}`] }).contains[0])
        expect(part.items).toEqual(items)
        expect(part.children).toEqual(nested)
        expect(part.cardinality).toEqual(tokens.once)
      }
  })

  test("a `repeat` floored at zero moves the floor onto the list, each list that stands holding items", () => {
    for (const [repeat, count] of UNFLOORED) {
      const part = listOf(
        compiled({ ...stageFixture("1."), declared: [`repeat: ${repeat}`, "children: 1-15"] }).contains[0]
      )
      expect(part.cardinality).toEqual(tokens.optional)
      expect(part.items).toEqual({ least: 1, max: count.max })
    }
  })

  test("a type saying nothing about `repeat` still requires the list and bounds its items by nothing", () => {
    const part = listOf(compiled({ ...stageFixture("1."), declared: [] }).contains[0])
    expect(part.cardinality).toEqual(tokens.once)
    expect(part.items).toEqual({ least: 0, max: Number.POSITIVE_INFINITY })
  })

  test("`count: 0-1` makes the section optional and leaves the list standing once", () => {
    const section = compiled({ ...stageFixture("1."), declared: ["count: 0-1", "repeat: 1-12", "children: 1-15"] })
    expect(section.cardinality).toEqual(tokens.optional)
    expect(listOf(section.contains[0]).cardinality).toEqual(tokens.once)
  })

  test("a section saying nothing about `count` stands once, and `count: 1` says the same", () => {
    for (const declared of [["repeat: 1-12"], ["count: 1", "repeat: 1-12"]])
      expect(compiled({ ...stageFixture("1."), declared }).cardinality).toEqual(tokens.once)
    expect(
      compiled({ heading: "Intent", declared: [], slots: { statement: "sm" }, lines: ["**{statement}**"] }).cardinality
    ).toEqual(tokens.once)
  })
})

describe("a page type stating a shape this cannot read", () => {
  const CASES: readonly (readonly [string, Fixture, string])[] = [
    ["a second list item", { ...stageFixture("1."), lines: ["1. **{stage}**", "2. **{stage}**"] }, "2 list items"],
    ["a second bullet", { ...stageFixture("1."), lines: ["1. **{stage}**", "   - {action}", "   - {action}"] }, "2 bullets"],
    ["a `children` running backwards", { ...stageFixture("1."), declared: ["children: 5-2"] }, "runs backwards"],
    ["a `children` that is no count", { ...stageFixture("1."), declared: ["children: some"] }, "children: some"],
    ["a bullet holding an undeclared hole", { ...stageFixture("1."), slots: { stage: "sm" } }, "action"],
    ["a fence beneath the heading", { heading: "Sequence", declared: [], slots: {}, lines: ["```", "text", "```"] }, "neither a paragraph nor a list"],
    ["a paragraph beside a list", { ...stageFixture("1."), lines: ["Prose.", "", "1. **{stage}**"] }, "2 blocks"],
  ]

  for (const [name, one, says] of CASES)
    test(`${name} is reported with the reason rather than thrown`, () => {
      expect(refused(one)).toContain(says)
    })
})

const ALONE = ["# Sequence"] as const
const WRITTEN = ["# Sequence", "", "1. **A stage**", "   - An action"] as const
const UNMARKED = ["# Sequence", "", "1. A stage", "   - An action"] as const

function judged(one: Fixture, lines: readonly string[]): Verdict {
  return hold(shapeOf("fixture", AT, typeText(one)), "fixture/page.md", ["---", "---", "", ...lines, ""].join("\n"))
}

function refusalsOf(verdict: Verdict): readonly string[] {
  return verdict.ok
    ? []
    : verdict.refusals.map((one) => `${one.part} — expected ${one.expected}, measured ${one.measured}`)
}

describe("a heading standing over no list at all", () => {
  const floored = { ...stageFixture("1."), declared: ["repeat: 1-12", "children: 1-15"] }
  const unfloored = { ...stageFixture("1."), declared: ["repeat: 0-12", "children: 1-15"] }

  test("a list floored at one is refused where the heading stands alone", () => {
    expect(refusalsOf(judged(floored, ALONE))).toEqual(["a list — expected one, measured none"])
  })

  test("a list floored at zero admits the same heading standing alone", () => {
    expect(refusalsOf(judged(unfloored, ALONE))).toEqual([])
  })

  test("a list floored at zero holds the list that does stand to the shape its item states", () => {
    expect(refusalsOf(judged(unfloored, WRITTEN))).toEqual([])
    expect(refusalsOf(judged(unfloored, UNMARKED))).not.toEqual([])
  })

  test("what the floor moves is the list alone, the item shape and the bullets standing as they did", () => {
    const one = listOf(compiled(floored).contains[0])
    const zero = listOf(compiled(unfloored).contains[0])
    expect({ ...zero, cardinality: null }).toEqual({ ...one, cardinality: null })
  })
})

