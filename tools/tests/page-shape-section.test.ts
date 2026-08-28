import { describe, expect, test } from "bun:test"
import * as tokens from "../../page/document/tokens.ts"
import type { Ceiling, ContentRule, ListPart, PartDef, ProsePart, CompiledShape, SectionPart } from "../../page/document/shape-types.ts"
import { judge, shapeOf } from "../../page/shape/shape.ts"
import { LADDER } from "../../page/document/template.ts"
import { PRINCIPLE_CONTRACT, PRINCIPLE_FRAGMENT, TASKS_CONTRACT } from "./page-shape-contracts.ts"

const AT = "pages/page-type/fixture.page-type.md"

const RANKS = new Map([...LADDER].map(([name, ceiling]) => [ceiling, name] as const))

function rank(ceiling: Ceiling | "slots" | "contents"): string {
  const name = typeof ceiling === "number" ? RANKS.get(ceiling) : undefined
  if (name === undefined) throw new Error(`${ceiling} is no step on the ladder`)
  return name
}

function sectionOf(part: PartDef | undefined): SectionPart {
  if (part === undefined || part.part !== "section") throw new Error("no section stands where one was required")
  return part
}

function proseOf(part: PartDef | undefined): ProsePart {
  if (part === undefined || part.part !== "block" || part.block !== "paragraph")
    throw new Error("no paragraph stands where one was required")
  return part
}

function listOf(part: PartDef | undefined): ListPart {
  if (part === undefined || part.part !== "block" || part.block !== "list")
    throw new Error("no list stands where one was required")
  return part
}

function count(card: { required: boolean; max: number }): string {
  return `${card.required ? 1 : 0}-${card.max}`
}

const MANY = 12

const contract = PRINCIPLE_CONTRACT

const COUNT = `    count: ${count(contract.cardinality)}`

const contractHeading = contract.heading

const act = proseOf(contract.contains[0])

const description = proseOf(contract.contains[1])

const typed: CompiledShape = {
  domain: "principle-fixture",
  extends: [],
  regions: [],
  frontmatter: [],
  sections: [
    {
      part: "section",
      level: 1,
      heading: { match: "literal", text: "Principles" },
      maxChars: "contents",
      cardinality: tokens.once,
      contains: [{ part: "ref", fragment: "principles" }],
    },
  ],
  fragments: { principles: PRINCIPLE_FRAGMENT },
}

function typeText(
  counted: string = count(contract.cardinality),
  heading: string = rank(contractHeading.match === "any" ? contractHeading.content.maxChars : "contents")
): string {
  return [
    "---",
    "blocks:",
    "  principle:",
    `    count: ${counted}`,
    "slots:",
    "  principle:",
    `    max: ${heading}`,
    "  act:",
    `    max: ${rank(act.content.maxChars)}`,
    "  description:",
    `    max: ${rank(description.content.maxChars)}`,
    "---",
    "",
    "# Principles",
    "",
    "## {principle}",
    "",
    "**{act}**",
    "",
    "{description}",
    "",
  ].join("\n")
}

function compiled(text: string = typeText()): CompiledShape {
  const { compiled: schema, why } = shapeOf("fixture", AT, text)
  expect(why).toBeNull()
  return schema!
}

function refused(text: string): string {
  const { compiled: schema, why } = shapeOf("fixture", AT, text)
  expect(schema).toBeNull()
  expect(why).not.toBeNull()
  return why!
}

const principle = (name: string, statement = "Do the thing.", body = "A warrant. An aid. Another aid."): string =>
  `\n## ${name}\n\n**${statement}**\n\n${body}\n`

const bodyOf = (...principles: readonly string[]): string => `# Principles\n${principles.join("")}`

const HELD = "pages/domain/fixture.md"

describe("a heading that is a hole", () => {
  test("it compiles to the matched heading the typed schema declares, bounded by its own slot", () => {
    const part = sectionOf(sectionOf(compiled().sections[0]).contains[0])
    expect(part.heading).toEqual(contractHeading)
    expect(part.level).toBe(contract.level)
    expect(part.maxChars).toBe(contract.maxChars)
  })

  test("`count` is how many of that section may stand, and every count is read", () => {
    for (const [stated, expected] of [
      ["1-12", { required: true, max: 12 }],
      ["0-4", { required: false, max: 4 }],
      ["3", { required: true, max: 3 }],
    ] as const) {
      const part = sectionOf(sectionOf(compiled(typeText(stated)).sections[0]).contains[0])
      expect(part.cardinality).toEqual(expected)
    }
  })

  test("the count it compiles to is the one the typed schema states", () => {
    const part = sectionOf(sectionOf(compiled().sections[0]).contains[0])
    expect(part.cardinality).toEqual(contract.cardinality)
  })
})

describe("two paragraphs under one heading", () => {
  test("each is its own part, standing once, in the order written", () => {
    const parts = sectionOf(sectionOf(compiled().sections[0]).contains[0]).contains
    expect(parts).toHaveLength(2)
    for (const part of parts) expect(proseOf(part).cardinality).toEqual(tokens.once)
    const named = parts.map((part) => proseOf(part).content.template?.map((slot) => (slot.slot === "hole" ? slot.name : slot.text)))
    expect(named).toEqual([["act"], ["description"]])
  })
})

describe("a body under a hole heading, against the schema the pages are held to", () => {
  const CASES: readonly (readonly [string, string, boolean])[] = [
    ["as many principles as the bound admits", bodyOf(...Array.from({ length: MANY }, (_, i) => principle(`Name ${i}`))), true],
    ["one past the bound", bodyOf(...Array.from({ length: MANY + 1 }, (_, i) => principle(`Name ${i}`))), false],
    ["a heading at its ceiling", bodyOf(principle("N".repeat(50))), true],
    ["a heading past its ceiling", bodyOf(principle("N".repeat(51))), false],
    ["an act with no description under it", "# Principles\n\n## Name\n\n**Do the thing.**\n", false],
    ["a third paragraph", `${bodyOf(principle("Name"))}\nA third one.\n`, false],
    ["an act past its ceiling", bodyOf(principle("Name", "A".repeat(101))), false],
    ["a description past its ceiling", bodyOf(principle("Name", "Do it.", "d".repeat(201))), false],
    ["an act nothing marks", "# Principles\n\n## Name\n\nDo the thing.\n\nA warrant.\n", false],
  ]

  const schema = compiled()

  for (const [name, text, holds] of CASES)
    test(`${name} is ${holds ? "held" : "refused"} by the compiled shape and by the typed schema alike`, () => {
      expect(judge(HELD, text, schema).ok).toBe(holds)
      expect(judge(HELD, text, typed).ok).toBe(holds)
    })
})

const tasks = TASKS_CONTRACT

const taskEntry: ContentRule = listOf(tasks.contains[0]).item[0]!

function holeCeiling(rule: ContentRule, name: string): Ceiling {
  const slot = (rule.template ?? []).find((one) => one.slot === "hole" && one.name === name)
  if (slot === undefined || slot.slot !== "hole" || slot.value.type !== "text")
    throw new Error(`no text hole named ${name} stands in the rule`)
  return slot.value.maxChars
}

const LINK_TYPE = [
  "---",
  "blocks:",
  "  tasks:",
  `    repeat: ${count(listOf(tasks.contains[0]).items)}`,
  "slots:",
  "  task:",
  "    to: path",
  "  guidance:",
  `    max: ${rank(holeCeiling(taskEntry, "guidance"))}`,
  "---",
  "",
  "# Tasks",
  "",
  "- **[{task}]({href})** — {guidance}",
  "",
].join("\n")

describe("a slot inside a link", () => {
  test("it compiles to the whole link as one reference, which is the template the typed schema states", () => {
    const item = listOf(sectionOf(compiled(LINK_TYPE).sections[0]).contains[0]).item[0]!
    expect(item.template).toEqual(taskEntry.template)
  })

  test("an entry that is not a link at all is refused, where before the href compiled to nothing", () => {
    const verdict = judge(HELD, "# Tasks\n\n- **not a link at all** — a task nobody can reach.\n", compiled(LINK_TYPE))
    expect(verdict.ok).toBe(false)
    expect(verdict.ok ? "" : verdict.refusals.map((one) => one.expected).join(" ")).toContain("a link to")
  })

  test("an entry written as a link holds", () => {
    expect(judge(HELD, "# Tasks\n\n- **[review](../tasks/review.md)** — one file, read whole.\n", compiled(LINK_TYPE)).ok).toBe(true)
  })
})

describe("a `repeat` where several paragraph shapes stand", () => {
  const text = typeText().replace(COUNT, `${COUNT}\n    repeat: 1-3`)

  test("it bounds the last shape, which is the only one a greedy match can leave open", () => {
    const parts = sectionOf(sectionOf(compiled(text).sections[0]).contains[0]).contains
    expect(proseOf(parts[0]).cardinality).toEqual(tokens.once)
    expect(proseOf(parts[1]).cardinality).toEqual({ required: true, max: 3 })
  })

  test("one paragraph holds under it, three hold, and a fourth is refused", () => {
    const schema = compiled(text)
    const bodyWith = (body: string): string => bodyOf(principle("Value", "Do the thing.", body))
    expect(judge(HELD, bodyWith("A warrant."), schema).ok).toBe(true)
    expect(judge(HELD, bodyWith("A warrant.\n\nAn aid.\n\nAnother aid."), schema).ok).toBe(true)
    expect(judge(HELD, bodyWith("A.\n\nB.\n\nC.\n\nD."), schema).ok).toBe(false)
  })
})

describe("a page type stating a shape this cannot read", () => {
  const CASES: readonly (readonly [string, string, string])[] = [
    ["two headings keying one entry", `${typeText()}\n# Rules\n\n## {principle}\n\n**{act}**\n\n{description}\n`, "already keys"],
    ["a `count` that is no count", typeText("some"), "count: some"],
    ["a `count` running backwards", typeText("5-2"), "runs backwards"],
    ["a link whose href is written out", LINK_TYPE.replace("({href})", "(./review.md)"), "a link in a template is"],
    ["a link whose label is more than a hole", LINK_TYPE.replace("[{task}]", "[see {task}]"), "a link in a template is"],
    ["a link slot bounded as text", LINK_TYPE.replace("    to: path", "    max: md"), "states `to:`"],
    ["a `to` naming no resolution", LINK_TYPE.replace("    to: path", "    to: id"), "names no way to resolve a link"],
  ]

  for (const [name, text, says] of CASES)
    test(`${name} is reported with the reason rather than thrown`, () => {
      expect(refused(text)).toContain(says)
    })
})
