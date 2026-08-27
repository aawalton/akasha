
import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolveRoots } from "../../../repo/roots/roots"
import { meaning } from "./meaning.ts"
import { parse } from "../../../page/document/parse.ts"
import { print } from "./print.ts"
import type { Document, FrontmatterValue, Scalar } from "../../../page/document/types.ts"

const ROOT = resolveRoots().akasha
const INITIATIVE = "pages/page-body-shape/initiative.page-body-shape.md"

const source = (relPath: string): string => readFileSync(`${ROOT}/${relPath}`, "utf8")
const read = (relPath: string): Document => parse(source(relPath), relPath)

function scalars(value: FrontmatterValue): Scalar[] {
  if (value.kind === "scalar") return [value.value]
  if (value.kind === "list") return value.items.flatMap(scalars)
  return value.entries.flatMap((entry) => [entry.key, ...scalars(entry.value)])
}

const texts = (value: FrontmatterValue): string[] => scalars(value).map((one) => one.text)

const under = (value: FrontmatterValue | undefined, name: string): FrontmatterValue | undefined =>
  value?.kind === "map" ? value.entries.find((entry) => entry.key.text === name)?.value : undefined

const block = (...lines: string[]): Document =>
  parse(["---", ...lines, "---", "", "# H", "", "body", ""].join("\n"), "t.md")

const first = (...lines: string[]): FrontmatterValue | undefined => block(...lines).frontmatter[0]?.value

describe("a map written straight under a key", () => {
  const document = read(INITIATIVE)
  const key = (name: string): FrontmatterValue | undefined =>
    document.frontmatter.find((one) => one.name === name)?.value

  test("the whole block is accounted for, so the reader hands nothing back", () => {
    expect(document.unreadable).toEqual([])
    expect(document.frontmatter.map((one) => one.name)).toEqual(expect.arrayContaining(["blocks", "slots"]))
  })

  test("indented `key:` children are its entries, nesting as deep as they are written", () => {
    expect(key("blocks")?.kind).toBe("map")
    expect(under(key("blocks"), "intent")?.kind).toBe("map")
    const repeat = under(under(key("blocks"), "intent"), "repeat")
    expect(repeat?.kind).toBe("scalar")
    expect(repeat?.kind === "scalar" && repeat.value.text).toMatch(/^\d+-\d+$/)
  })

  test("a list written under a map entry is still read as a list", () => {
    const values = under(under(first("slots:", "  complete:", "    values:", "      - x", "      - \" \""), "complete"), "values")
    expect(values?.kind).toBe("list")
    expect(texts(values!)).toEqual(["x", " "])
  })

  test("a scalar and a map entry standing beside each other are each read as themselves", () => {
    const beside = block("extends-slug: none", "slots:", "  complete:", "    max: sm")
    const named = (name: string): FrontmatterValue | undefined =>
      beside.frontmatter.find((one) => one.name === name)?.value
    expect(named("extends-slug")?.kind).toBe("scalar")
    expect(named("slots")?.kind).toBe("map")
    expect(texts(named("slots")!)).toEqual(["complete", "max", "sm"])
  })

  test("every scalar reached through a map cuts its own text out of the place it names", () => {
    const text = source(INITIATIVE)
    const lines = text.split("\n")
    const found = document.frontmatter.flatMap((one) => scalars(one.value))
    const off: string[] = []
    for (const one of found) {
      const cut = text.slice(one.span.start.offset, one.span.end.offset)
      if (cut !== one.text && cut.slice(1, -1) !== one.text) off.push(`${cut} reads as ${JSON.stringify(one.text)}`)
      if ((lines[one.span.start.line - 1] ?? "").slice(one.span.start.column - 1, one.span.end.column - 1) !== cut)
        off.push(`${JSON.stringify(cut)} is not where its line and column put it`)
    }
    expect(off).toEqual([])
    expect(found.length).toBeGreaterThan(0)
  })

  test("printing a map and reading it back keeps everything but the positions", () => {
    expect(JSON.stringify(meaning(parse(print(document), INITIATIVE)))).toBe(JSON.stringify(meaning(document)))
  })
})

describe("what the reader hands back rather than swallowing", () => {
  const handedBack = (...lines: string[]): number[] => block(...lines).unreadable.map((span) => span.start.line)

  test("a flow mapping under a key is a line the reader cannot account for", () => {
    expect(handedBack("flow:", "  { a: b }")).toEqual([3])
  })

  test("a flow sequence under a key is one too", () => {
    expect(handedBack("flow:", "  [a, b]")).toEqual([3])
  })

  test("a block scalar's continuation is read, at the top level and under a map alike", () => {
    expect(handedBack("note: |", "  one", "  two")).toEqual([])
    expect(handedBack("blocks:", "  note: >", "    one")).toEqual([])
  })

  test("children written half as items and half as keys keep the shape the first of them opens", () => {
    expect(first("mixed:", "  - a", "  key: b")?.kind).toBe("list")
    expect(handedBack("mixed:", "  - a", "  key: b")).toEqual([4])
    expect(first("mixed:", "  key: b", "  - a")?.kind).toBe("map")
    expect(handedBack("mixed:", "  key: b", "  - a")).toEqual([4])
  })

  test("what stands under a line in the other shape goes back with it, rather than being read on", () => {
    expect(handedBack("mixed:", "  key: b", "  - a", "    - deep")).toEqual([4, 5])
  })

  test("an anchor is the characters an anchor is written with, and never an anchor", () => {
    const value = first("a: &x 1")
    expect(value?.kind === "scalar" && value.value.text).toBe("&x 1")
  })
})
