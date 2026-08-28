import { describe, expect, test } from "bun:test"
import { check } from "../../page/document/check.ts"
import { plain } from "../../page/document/content.ts"
import { parse } from "../../page/document/parse.ts"
import * as tokens from "../../page/document/tokens.ts"
import type { Section, Verdict } from "../../page/document/types.ts"
import type { BlockPart, ContentRule, PartDef, CompiledShape, SectionPart, TemplateSlot } from "../../page/document/shape-types.ts"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { bodyOf, shapeOf } from "../../page/shape/shape.ts"
import { blockKey } from "../../page/shape/level.ts"
import { LADDER } from "../../page/document/template.ts"
import { textAt } from "../../page/text/text.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

const INITIATIVE_SHAPE = "pages/page-body-shape/initiative.page-body-shape.md"

const roots = resolveRoots()

function shapeText(): string {
  const text = textAt(rootFor(roots, AKASHA), INITIATIVE_SHAPE)
  expect(text).not.toBeNull()
  return text!
}

function compiled(): CompiledShape {
  const { compiled: schema, why } = shapeOf("initiative", INITIATIVE_SHAPE, shapeText())
  expect(why).toBeNull()
  return schema!
}

function declaredMap(key: string): Record<string, Record<string, unknown>> {
  const value = parseFrontmatter(shapeText()).fields.get(key)
  expect(typeof value).toBe("object")
  return value as Record<string, Record<string, unknown>>
}

function templateHeadings(): readonly string[] {
  const walk = (list: readonly Section[]): string[] =>
    list.flatMap((one) => [plain(one.heading), ...walk(one.sections)])
  return walk(parse(shapeText(), INITIATIVE_SHAPE).sections)
}

function everySection(parts: readonly PartDef[]): readonly SectionPart[] {
  return parts.flatMap((one) => (one.part === "section" ? [one, ...everySection(one.contains)] : []))
}

function headingText(section: SectionPart): string {
  expect(section.heading.match).toBe("literal")
  return (section.heading as { match: "literal"; text: string }).text
}

function blocksIn(section: SectionPart): readonly BlockPart[] {
  return section.contains.filter((one): one is BlockPart => one.part === "block")
}

function rulesIn(block: BlockPart): readonly ContentRule[] {
  if (block.block === "paragraph") return [block.content]
  return [...block.item, ...(block.children === null ? [] : block.child)]
}

type Hole = Extract<TemplateSlot, { slot: "hole" }>

function holes(schema: CompiledShape): readonly Hole[] {
  return everySection(schema.sections).flatMap((section) =>
    blocksIn(section).flatMap((block) =>
      rulesIn(block).flatMap((rule) => (rule.template ?? []).filter((one): one is Hole => one.slot === "hole"))
    )
  )
}

function stringField(spec: Record<string, unknown>, key: string): string | null {
  const value = spec[key]
  return typeof value === "string" ? value : null
}

function mutated(from: string, to: string): string {
  const text = shapeText().replace(from, to)
  expect(text).not.toBe(shapeText())
  return text
}

function someRank(): string {
  const named = Object.values(declaredMap("slots")).flatMap((one) => {
    const max = stringField(one, "max")
    return max === null ? [] : [max]
  })
  expect(named.length).toBeGreaterThan(0)
  return named[0]!
}

function someHole(): string {
  const named = holes(compiled()).map((one) => one.name)
  expect(named.length).toBeGreaterThan(0)
  return named[0]!
}

function someRepeat(): string {
  const declared = Object.values(declaredMap("blocks")).flatMap((one) => {
    const repeat = stringField(one, "repeat")
    return repeat === null ? [] : [repeat]
  })
  expect(declared.length).toBeGreaterThan(0)
  return declared[0]!
}

function bounds(repeat: string): readonly [number, number] {
  const [from, to] = repeat.split("-")
  return [Number(from), to === undefined ? Number(from) : Number(to)]
}

function lines(verdict: Verdict): readonly string[] {
  return verdict.ok
    ? []
    : verdict.refusals.map(
        (one) => `line ${one.span.start.line}: ${one.part} — expected ${one.expected}, measured ${one.measured}`
      )
}

function against(schema: CompiledShape, text: string): readonly string[] {
  return lines(check(bodyOf(parse(text, "initiatives/fixture.md")), schema, () => null))
}

const INTENT = "- A line of intent the document states.\n"

const SEQUENCE = "\n# Sequence\n\n1. **A stage**\n   - A detail beneath it.\n"

function body(...parts: readonly string[]): string {
  return `---\ndomain: code-comment\n---\n\n# Intent\n\n${parts.join("")}`
}

const HELD = body(INTENT, INTENT, SEQUENCE)

const BROKEN: readonly { readonly name: string; readonly text: string; readonly at: number; readonly says: string }[] = [
  { name: "a quote over its rank", text: body(`- ${"q".repeat(501)}\n`), at: 7, says: "501" },
  { name: "an intent bullet carrying one of its own", text: body(INTENT, "  - A bullet beneath it.\n"), at: 7, says: "no nested items" },
  { name: "a stage with no bold around it", text: body(INTENT, "\n# Sequence\n\n1. A stage\n   - A detail beneath it.\n"), at: 11, says: "stage" },
  { name: "a detail over its rank", text: body(INTENT, `\n# Sequence\n\n1. **A stage**\n   - ${"d".repeat(501)}\n`), at: 12, says: "501" },
  { name: "twenty-one stages", text: body(INTENT, `\n# Sequence\n\n${Array.from({ length: 21 }, (_, i) => `${i + 1}. **A stage**\n`).join("")}`), at: 11, says: "21" },
  { name: "an undeclared sub-heading", text: body(INTENT, "\n## Sub-heading\n"), at: 9, says: "## Sub-heading" },
  { name: "a second Intent section", text: `${body(INTENT)}\n# Intent\n\n${INTENT}`, at: 1, says: "2" },
]

describe("the shape a body shape states", () => {
  test("every heading its template writes becomes a section keyed by that heading", () => {
    const headings = templateHeadings()
    expect(headings.length).toBeGreaterThan(0)
    expect(everySection(compiled().sections).map(headingText)).toEqual([...headings])
  })

  test("every hole is a slot the shape declares, held to the value that declaration names", () => {
    const declared = declaredMap("slots")
    const found = holes(compiled())
    expect(found.length).toBeGreaterThan(0)
    for (const hole of found) {
      const spec = declared[hole.name]
      expect(spec).toBeDefined()
      const values = spec!["values"]
      if (Array.isArray(values)) {
        expect(hole.value).toEqual({ type: "enum", values: values as string[] })
        continue
      }
      const rank = stringField(spec!, "max")
      expect(rank).not.toBeNull()
      const ceiling = LADDER.get(rank!.toLowerCase())
      expect(ceiling).toBeDefined()
      expect(hole.value).toEqual({ type: "text", maxChars: ceiling! })
    }
  })

  test("the repeat a block declares bounds how many blocks stand and how many items each holds", () => {
    const declared = declaredMap("blocks")
    let measured = 0
    for (const section of everySection(compiled().sections)) {
      const spec = declared[blockKey(headingText(section))]
      const repeat = spec === undefined ? null : stringField(spec, "repeat")
      if (repeat === null) continue
      const [min, max] = bounds(repeat)
      for (const block of blocksIn(section)) {
        if (block.block === "list") expect(block.items).toEqual({ least: Math.max(min, 1), max })
        else expect(block.cardinality).toEqual({ least: min, max })
        measured += 1
      }
    }
    expect(measured).toBeGreaterThan(0)
  })

  test("every size rank is the ceiling tokens.ts exports for it, and nothing else is one", () => {
    const exported = Object.entries(tokens).flatMap(([name, value]) =>
      typeof value === "number" ? [[name, value] as const] : []
    )
    expect(exported.length).toBeGreaterThan(0)
    for (const [name, value] of exported) expect(LADDER.get(name.replace("SIZE_", "").toLowerCase())).toBe(value)
    expect(LADDER.size).toBe(exported.length)
  })

  test("a rank name off the ladder is refused rather than defaulted", () => {
    const { compiled: schema, why } = shapeOf("initiative", INITIATIVE_SHAPE, mutated(`max: ${someRank()}`, "max: enormous"))
    expect(schema).toBeNull()
    expect(why).toContain("enormous")
  })

  test("a rank is read whatever case it is written in", () => {
    const rank = someRank()
    const upper = shapeOf("initiative", INITIATIVE_SHAPE, mutated(`max: ${rank}`, `max: ${rank.toUpperCase()}`))
    expect(upper.why).toBeNull()
    expect(upper.compiled!.sections).toEqual(compiled().sections)
  })

  test("a slot the shape declares nothing for is refused rather than left unbounded", () => {
    const { compiled: schema, why } = shapeOf("initiative", INITIATIVE_SHAPE, mutated(`{${someHole()}}`, "{undeclared}"))
    expect(schema).toBeNull()
    expect(why).toContain("undeclared")
  })

  test("a repeat that is not a count or a range of counts is refused", () => {
    const { compiled: schema, why } = shapeOf("initiative", INITIATIVE_SHAPE, mutated(`repeat: ${someRepeat()}`, "repeat: some"))
    expect(schema).toBeNull()
    expect(why).toContain("repeat")
  })
})

describe("a body held to that shape", () => {
  test("an initiative written as the template says holds", () => {
    expect(against(compiled(), HELD)).toEqual([])
  })

  test("an initiative quoting nothing yet holds, its `# Intent` standing empty", () => {
    expect(against(compiled(), "---\ndomain: code-comment\n---\n\n# Intent\n")).toEqual([])
  })

  test("one intent over the bound is refused at the line it stands on", () => {
    const repeat = stringField(declaredMap("blocks")["intent"] ?? {}, "repeat")
    expect(repeat).not.toBeNull()
    const over = bounds(repeat!)[1] + 1
    const refusals = against(compiled(), body(...Array.from({ length: over }, () => INTENT)))
    expect(refusals.length).toBeGreaterThan(0)
    expect(refusals[0]).toContain("line 7:")
    expect(refusals[0]).toContain("expected")
    expect(refusals[0]).toContain("measured")
    expect(refusals.join("\n")).toContain(String(over))
  })

  for (const one of BROKEN) {
    test(`${one.name} is refused at the line it stands on`, () => {
      const refusals = against(compiled(), one.text)
      expect(refusals.length).toBeGreaterThan(0)
      expect(refusals[0]).toContain(`line ${one.at}:`)
      expect(refusals[0]).toContain("expected")
      expect(refusals[0]).toContain("measured")
      expect(refusals.join("\n")).toContain(one.says)
    })
  }
})
