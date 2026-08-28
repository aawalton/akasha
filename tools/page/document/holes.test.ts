import { describe, expect, test } from "bun:test"
import { check } from "../../../page/document/check.ts"
import { HOLES_KEY } from "../../../page/document/holes.ts"
import { parse } from "../../../page/document/parse.ts"
import { SIZE_LG, optional } from "../../../page/document/tokens.ts"
import type { CompiledShape } from "../../../page/document/shape-types.ts"

const compiled = (declares: boolean): CompiledShape => ({
  domain: "hole-fixture",
  extends: [],
  regions: [],
  frontmatter: declares
    ? [
        {
          part: "key",
          name: HOLES_KEY,
          cardinality: optional,
          value: { type: "list", of: { type: "slug" }, cardinality: { least: 1, max: 8 } },
        },
      ]
    : [],
  sections: [
    {
      part: "section",
      level: 1,
      heading: { match: "literal", text: "Refusal" },
      maxChars: SIZE_LG,
      cardinality: optional,
      contains: [
        {
          part: "block",
          block: "paragraph",
          cardinality: { least: 0, max: 3 },
          content: { maxChars: SIZE_LG, marks: null, lead: null, template: null },
        },
        {
          part: "block",
          block: "list",
          ordered: false,
          cardinality: optional,
          items: { least: 1, max: 4 },
          item: [{ maxChars: SIZE_LG, marks: null, lead: null, template: null }],
          children: null,
        },
      ],
    },
  ],
  fragments: {},
})

const declaring = compiled(true)
const silent = compiled(false)

const doc = (front: string, body: string) => parse(`${front}# Refusal\n\n${body}\n`, "fixture.md")
const PATH = `---\n${HOLES_KEY}:\n  - path\n---\n\n`
const ok = (s: CompiledShape, front: string, body: string) => check(doc(front, body), s, () => null).ok

describe("a hole the document declares", () => {
  test("stands where the body marks it", () => {
    expect(ok(declaring, PATH, "You wrote to {path}, which no domain reaches.")).toBe(true)
  })

  test("is refused where the body marks one the document does not declare", () => {
    expect(ok(declaring, PATH, "You wrote to {stem}, which no domain reaches.")).toBe(false)
  })

  test("is refused where the document declares it and no body marks it", () => {
    expect(ok(declaring, PATH, "You wrote somewhere no domain reaches.")).toBe(false)
  })

  test("is read out of a list item as well as a paragraph", () => {
    expect(ok(declaring, PATH, "- You wrote to {path}.")).toBe(true)
  })

  test("is read out of a sub-section, the declaration being the whole document's", () => {
    expect(ok(declaring, PATH, "Something happened.\n\n## Aside\n\nYou wrote to {path}.")).toBe(true)
  })
})

describe("a brace inside a code span", () => {
  test("marks a hole like any other, a declaring document being a template throughout", () => {
    expect(ok(declaring, PATH, "Write the filter as `{path}` and nothing else.")).toBe(true)
  })

  test("is refused where it names no declared hole, the same as anywhere else", () => {
    expect(ok(declaring, PATH, "You wrote to {path}, not `{stem}`.")).toBe(false)
  })
})

describe("a document declaring no holes", () => {
  test("is not scanned, so its braces are its own", () => {
    expect(ok(silent, "", "Spell a seat `{persona}-{domain}` and a quantifier {2}.")).toBe(true)
  })
})
