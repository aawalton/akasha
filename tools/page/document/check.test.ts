import { describe, expect, test } from "bun:test"
import { check } from "../../../page/document/check.ts"
import { parse } from "../../../page/document/parse.ts"
import { SIZE_SM, SIZE_XS, once, optional } from "../../../page/document/tokens.ts"
import type { KeyPart, SectionPart, CompiledShape } from "../../../page/document/shape-types.ts"

const ceiling: CompiledShape = {
  domain: "nested-fixture",
  extends: [],
  regions: [],
  frontmatter: [],
  sections: [
    {
      part: "section",
      level: 1,
      heading: { match: "literal", text: "Sequence" },
      maxChars: "contents",
      cardinality: once,
      contains: [
        {
          part: "block",
          block: "list",
          ordered: true,
          cardinality: once,
          items: { least: 1, max: 12 },
          item: [{ maxChars: SIZE_SM, marks: null, lead: null, template: null }],
          children: { least: 1, max: 15 },
          child: [{ maxChars: SIZE_SM, marks: null, lead: null, template: null }],
        },
      ],
    },
  ],
  fragments: {},
}

const withAction = (action: string) => parse(`# Sequence\n\n1. **A stage.**\n   - ${action}\n`, "fixture.md")

describe("a nested item's text", () => {
  test("is admitted at the ceiling", () => {
    expect(check(withAction("x".repeat(SIZE_SM)), ceiling, () => null).ok).toBe(true)
  })

  test("is refused one character above it", () => {
    expect(check(withAction("x".repeat(SIZE_SM + 1)), ceiling, () => null).ok).toBe(false)
  })
})

const prose = { part: "block", block: "paragraph", cardinality: once, content: { maxChars: SIZE_SM, marks: null, lead: null, template: null } } as const

const nesting = (declared: boolean): CompiledShape => ({
  domain: "nesting-fixture",
  extends: [],
  regions: [],
  frontmatter: [],
  sections: [
    {
      part: "section",
      level: 1,
      heading: { match: "literal", text: "Intent" },
      maxChars: "contents",
      cardinality: once,
      contains: declared
        ? [prose, {
            part: "section",
            level: 2,
            heading: { match: "literal", text: "Aside" },
            maxChars: "contents",
            cardinality: once,
            contains: [prose],
          }]
        : [prose],
    },
  ],
  fragments: {},
})

const nested = parse("# Intent\n\nThe state.\n\n## Aside\n\nA note.\n", "fixture.md")

describe("a sub-heading under a section bounded by its contents", () => {
  test("is admitted where the shape declares it", () => {
    expect(check(nested, nesting(true), () => null).ok).toBe(true)
  })

  test("is refused where the shape declares none", () => {
    expect(check(nested, nesting(false), () => null).ok).toBe(false)
  })
})

const here: KeyPart = { part: "key", name: "here", cardinality: optional, value: { type: "slug" } }
const there: KeyPart = { part: "key", name: "there", cardinality: optional, value: { type: "slug" } }

const either: CompiledShape = {
  domain: "choice-fixture",
  extends: [],
  regions: [],
  frontmatter: [here, there],
  sections: [],
  choices: [{ cardinality: { least: 1, max: 2 }, of: [here, there] }],
  fragments: {},
}

describe("a choice over alternatives", () => {
  test("is admitted where one of them stands", () => {
    expect(check(parse("---\nhere: a\n---\n", "fixture.md"), either, () => null).ok).toBe(true)
  })

  test("is refused where neither does", () => {
    expect(check(parse("", "fixture.md"), either, () => null).ok).toBe(false)
  })
})

const bullet: CompiledShape = {
  domain: "slot-fixture",
  extends: [],
  regions: [],
  frontmatter: [],
  sections: [
    {
      part: "section",
      level: 1,
      heading: { match: "literal", text: "Definition" },
      maxChars: "contents",
      cardinality: once,
      contains: [
        {
          part: "block",
          block: "list",
          ordered: false,
          cardinality: once,
          items: once,
          item: [
            {
              maxChars: "slots",
              marks: null,
              lead: null,
              template: [
                { slot: "hole", name: "term", value: { type: "text", maxChars: SIZE_XS }, mark: "strong", optional: false },
                { slot: "literal", text: " — ", optional: false },
                { slot: "hole", name: "body", value: { type: "text", maxChars: SIZE_SM }, mark: null, optional: false },
              ],
            },
          ],
          children: null,
        },
      ],
    },
  ],
  fragments: {},
}

const defined = (term: string) => parse(`# Definition\n\n- **${term}** — a body.\n`, "fixture.md")

describe("a refusal against a slot", () => {
  test("measures the whole slot rather than the text up to its first comma", () => {
    const term = "Wealth and the money in it, at considerably greater length"
    expect(term.length).toBeGreaterThan(SIZE_XS)
    const verdict = check(defined(term), bullet, () => null)
    expect(verdict.ok).toBe(false)
    const refusals = verdict.ok ? [] : verdict.refusals
    expect(refusals.map((r) => r.expected)).toContain(`\`term\` to be text of at most ${SIZE_XS} characters`)
    expect(refusals.map((r) => r.measured)).toContain(`${term.length} characters`)
  })
})

const rank = (text: string): SectionPart => ({
  part: "section",
  level: 1,
  heading: { match: "literal", text },
  maxChars: SIZE_SM,
  cardinality: optional,
  contains: [],
})

const ordering: CompiledShape = {
  domain: "ordering-fixture",
  extends: [],
  regions: [],
  frontmatter: [],
  sections: [rank("Definition"), rank("Rules"), rank("List")],
  fragments: {},
}

const stood = (...names: readonly string[]) =>
  parse(names.map((name) => `# ${name}\n\nwhat it holds.\n`).join("\n"), "fixture.md")

const said = (verdict: ReturnType<typeof check>) =>
  verdict.ok ? [] : verdict.refusals.map((one) => `${one.part} — expected ${one.expected}, measured ${one.measured}`)

describe("the order a shape sets for its sections", () => {
  test("admits a body standing in the order the shape writes them", () => {
    expect(check(stood("Definition", "Rules", "List"), ordering, () => null).ok).toBe(true)
  })

  test("admits a body leaving one out, the rest still in order", () => {
    expect(check(stood("Definition", "List"), ordering, () => null).ok).toBe(true)
  })

  test("refuses a section standing below one the shape puts after it, naming both", () => {
    expect(said(check(stood("Definition", "List", "Rules"), ordering, () => null))).toEqual([
      "`# Rules` — expected above `# List`, measured below it",
    ])
  })
})

const onlyList: SectionPart = {
  part: "section",
  level: 1,
  heading: { match: "literal", text: "Tasks" },
  maxChars: "contents",
  cardinality: once,
  contains: [
    {
      part: "block",
      block: "list",
      ordered: false,
      cardinality: once,
      items: { least: 1, max: 10 },
      item: [{ maxChars: SIZE_SM, marks: null, lead: null, template: null }],
      children: null,
    },
  ],
}

const noBlocks: SectionPart = {
  part: "section",
  level: 1,
  heading: { match: "literal", text: "Tasks" },
  maxChars: SIZE_SM,
  cardinality: once,
  contains: [],
}

const around = (part: SectionPart): CompiledShape => ({
  domain: "block-fixture",
  extends: [],
  regions: [],
  frontmatter: [],
  sections: [part],
  fragments: {},
})

const beside = parse("# Tasks\n\n- one item.\n\nA paragraph beside the list.\n", "fixture.md")

describe("a paragraph beside the blocks a section declares", () => {
  test("is refused where the section declares a list and no prose", () => {
    expect(said(check(beside, around(onlyList), () => null))).toEqual([
      "paragraphs — expected at most 0, measured 1",
    ])
  })

  test("is admitted where the section declares no block at all", () => {
    expect(check(beside, around(noBlocks), () => null).ok).toBe(true)
  })
})

