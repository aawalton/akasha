
import { describe, expect, test } from "bun:test"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { isDirty, resolveRoots } from "../../../repo/roots/roots"
import { meaning } from "./meaning.ts"
import { parse } from "../../../page/document/parse.ts"
import { print } from "./print.ts"
import type { Document, FrontmatterValue, Inline, Scalar, Section, Span } from "../../../page/document/types.ts"

const ROOT = resolveRoots().instructions

const SUSPENDED: readonly string[] = []

function liveDocuments(at: string = ROOT, prefix = ""): string[] {
  const out: string[] = []
  for (const entry of readdirSync(at).sort()) {
    if (entry === ".git" || entry === "node_modules") continue
    const relPath = prefix === "" ? entry : `${prefix}/${entry}`
    if (SUSPENDED.some((dir) => relPath === dir || relPath.startsWith(`${dir}/`))) continue
    if (isDirty(relPath)) continue
    if (statSync(`${at}/${entry}`).isDirectory()) out.push(...liveDocuments(`${at}/${entry}`, relPath))
    else if (entry.endsWith(".md")) out.push(relPath)
  }
  return out
}

const source = (relPath: string): string => readFileSync(`${ROOT}/${relPath}`, "utf8")
const read = (relPath: string): Document => parse(source(relPath), relPath)
const words = (content: readonly Inline[]): string => content.map((node) => node.text).join("")
const named = (sections: readonly Section[], heading: string): Section | undefined =>
  sections.find((section) => words(section.heading) === heading)

function everySection(section: Section): Section[] {
  return [section, ...section.sections.flatMap(everySection)]
}

function scalars(value: FrontmatterValue): Scalar[] {
  if (value.kind === "scalar") return [value.value]
  if (value.kind === "list") return value.items.flatMap(scalars)
  return value.entries.flatMap((entry) => [entry.key, ...scalars(entry.value)])
}

const texts = (value: FrontmatterValue): string[] => scalars(value).map((scalar) => scalar.text)

describe("the markdown front end, over the documents it parses", () => {
  const files = liveDocuments()

  test("the live documents are what is being read", () => {
    expect(files.length).toBeGreaterThan(100)
    expect(files.every((relPath) => !isDirty(relPath))).toBe(true)
  })

  test("printing a document and parsing it back keeps everything but the positions", () => {
    const lost = files.filter((relPath) => {
      const document = read(relPath)
      const again = parse(print(document), relPath)
      return JSON.stringify(meaning(document)) !== JSON.stringify(meaning(again))
    })
    expect(lost).toEqual([])
  })

  test("printing is settled after one run, so nothing drifts on a second", () => {
    const drifting = files.filter((relPath) => {
      const once = print(read(relPath))
      return print(parse(once, relPath)) !== once
    })
    expect(drifting).toEqual([])
  })

  test("every span agrees with itself and cuts its own text back out", () => {
    const wrong: string[] = []
    for (const relPath of files) {
      const text = source(relPath)
      const starts: number[] = []
      let offset = 0
      for (const line of text.split("\n")) {
        starts.push(offset)
        offset += line.length + 1
      }
      const seen = new Set<unknown>()
      const visit = (node: unknown): void => {
        if (node === null || typeof node !== "object" || seen.has(node)) return
        seen.add(node)
        if (Array.isArray(node)) {
          node.forEach(visit)
          return
        }
        const record = node as { span?: Span; kind?: string; text?: string; marks?: readonly string[] }
        if (record.span !== undefined) {
          for (const at of [record.span.start, record.span.end]) {
            if (starts[at.line - 1] === undefined) wrong.push(`${relPath}: line ${at.line} is past the file`)
            else if (starts[at.line - 1]! + at.column - 1 !== at.offset)
              wrong.push(`${relPath}:${at.line}:${at.column} reports offset ${at.offset}`)
          }
          if (record.span.end.offset < record.span.start.offset) wrong.push(`${relPath}: a span ends before it starts`)
          const cut = text.slice(record.span.start.offset, record.span.end.offset)
          if (record.kind === "text" && !record.marks?.includes("code") && !cut.includes("\n") && cut !== record.text)
            wrong.push(`${relPath}: ${JSON.stringify(cut)} is spanned as ${JSON.stringify(record.text)}`)
        }
        Object.values(record).forEach(visit)
      }
      visit(read(relPath))
    }
    expect(wrong).toEqual([])
  })
})

const foldFixture = [
  "---",
  "slug: sample",
  "---",
  "",
  "# Definition",
  "",
  "- **Sample** \u2014 a body carrying the shape the fold is read against.",
  "",
  "# Principles",
  "",
  "## Retention",
  "",
  "**Write anything from a tool result you will need later into your own output.**",
  "",
  "A tool result can be cleared without notice; your own output stays.",
  "",
  "# Rules",
  "",
  "## Scope",
  "",
  "**Deliver the whole scope; where part is blocked, deliver the rest.**",
  "",
  "Narrowing comes back coherent and finished.",
  "",
  "Hard is not blocked.",
  "",
  "## Verification",
  "",
  "**Report only what you verified.**",
  "",
  "Your unverified claim reads exactly like a verified one.",
  "",
].join("\n")

describe("the section fold", () => {
  const document = parse(foldFixture, "sample.md")
  const rules = named(document.sections, "Rules")

  test("a heading owns every heading below its own level", () => {
    expect(rules?.level).toBe(1)
    const levels = rules?.sections.map((section) => section.level) ?? []
    expect(levels.length).toBeGreaterThan(0)
    expect(levels).toEqual(Array(levels.length).fill(2))
  })

  test("a child section owns its own children rather than handing them up", () => {
    const outer = named(parse("# A\n\n## B\n\n### C\n\n### D\n\n## E\n", "t.md").sections, "A")
    expect(outer?.sections.map((section) => words(section.heading))).toEqual(["B", "E"])
    const inner = named(outer?.sections ?? [], "B")
    expect(inner?.sections.map((section) => section.level)).toEqual([3, 3])
    expect(inner?.sections.map((section) => words(section.heading))).toEqual(["C", "D"])
  })

  test("nothing is flattened into a sibling stream and nothing is dropped", () => {
    const all = document.sections.flatMap(everySection)
    const lines = foldFixture.split("\n")
    for (const level of [1, 2, 3]) {
      const marker = `${"#".repeat(level)} `
      expect(all.filter((section) => section.level === level).length).toBe(
        lines.filter((line) => line.startsWith(marker)).length
      )
    }
    expect(document.sections.every((section) => section.level === 1)).toBe(true)
  })

  test("blocks stand under the heading that owns them", () => {
    const scope = named(rules?.sections ?? [], "Scope")
    const lines = foldFixture.split("\n")
    const from = lines.indexOf("## Scope") + 1
    const to = lines.findIndex((line, at) => at >= from && line.startsWith("#"))
    const written = lines.slice(from, to).filter((line) => line !== "")
    expect(written.length).toBeGreaterThan(0)
    expect(scope?.blocks.map((block) => block.kind)).toEqual(written.map(() => "paragraph"))
    expect(words(scope?.blocks[0]?.kind === "paragraph" ? scope.blocks[0].content : [])).toBe(
      written[0]!.replace(/\*\*/g, "")
    )
  })
})

describe("frontmatter", () => {
  test("a scalar is one value, unquoted", () => {
    const key = read("pages/domain/global.domain.md").frontmatter.find((entry) => entry.name === "slug")
    expect(key?.value.kind).toBe("scalar")
    expect(key?.value.kind === "scalar" && key.value.value.text).toBe("global")
  })

  test("a quote belongs to the source, so the value carries none of it", () => {
    let quoted = 0
    const kept: string[] = []
    for (const relPath of liveDocuments()) {
      const text = source(relPath)
      for (const key of read(relPath).frontmatter) {
        for (const scalar of scalars(key.value)) {
          const written = text.slice(scalar.span.start.offset, scalar.span.end.offset)
          const mark = written[0]
          if (mark !== '"' && mark !== "'") continue
          quoted += 1
          const body = written.slice(1, -1)
          const escaped = mark === '"' ? body.includes("\\") : body.includes("''")
          if (scalar.text === written)
            kept.push(`${relPath}: ${JSON.stringify(written)} keeps its quotes`)
          else if (!escaped && body !== scalar.text)
            kept.push(`${relPath}: ${JSON.stringify(written)} reads as ${JSON.stringify(scalar.text)}`)
        }
      }
    }
    expect(kept).toEqual([])
    expect(quoted).toBeGreaterThan(0)
  })

  test("a list is its scalars", () => {
    const key = read("pages/domain/global.domain.md").frontmatter.find((entry) => entry.name === "sequence-slugs")
    expect(key?.value.kind).toBe("list")
    expect(key?.value.kind === "list" && key.value.items.every((item) => item.kind === "scalar")).toBe(true)
    expect(texts(key!.value).length).toBeGreaterThan(1)
  })

  test("keys stand in the order the document declares them", () => {
    const relPath = "pages/page-type/role.page-type.md"
    const lines = source(relPath).split("\n")
    const declared = lines.slice(1, lines.indexOf("---", 1)).flatMap((line) => {
      const key = /^([A-Za-z0-9_][A-Za-z0-9_.-]*):/.exec(line)
      return key === null ? [] : [key[1]!]
    })
    expect(read(relPath).frontmatter.map((entry) => entry.name)).toEqual(declared)
  })
})

describe("positions", () => {
  const text = foldFixture
  const document = parse(text, "sample.md")

  test("a heading reports the line it was written on", () => {
    const principles = named(document.sections, "Principles")
    expect(principles?.span.start.line).toBe(text.split("\n").indexOf("# Principles") + 1)
    expect(principles?.span.start.column).toBe(1)
    expect(text.slice(principles?.span.start.offset ?? 0).startsWith("# Principles")).toBe(true)
  })

  test("a heading three levels down reports its own line, not its parent's", () => {
    const fixture = "# A\n\nlead\n\n## B\n\nlead\n\n### C\n\nbody\n"
    const deep = named(named(named(parse(fixture, "t.md").sections, "A")?.sections ?? [], "B")?.sections ?? [], "C")
    expect(deep?.span.start.line).toBe(fixture.split("\n").indexOf("### C") + 1)
  })

  test("a section spans through everything it owns", () => {
    const principles = named(document.sections, "Principles")
    const estimate = principles?.sections[principles.sections.length - 1]
    expect(principles?.span.end.offset).toBe(estimate?.span.end.offset)
    expect(principles?.span.end.line).toBeGreaterThan(principles?.span.start.line ?? 0)
  })
})
describe("emphasis, in both of the spellings the pages can write", () => {
  const only = (line: string): readonly Inline[] => {
    const block = parse(`# H\n\n${line}\n`, "t.md").sections[0]?.blocks[0]
    if (block?.kind !== "paragraph") throw new Error(`${line} did not parse as one paragraph`)
    return block.content
  }
  const marked = (line: string): string[] =>
    only(line).map((node) => (node.marks.length === 0 ? node.text : `${node.text}/${node.marks.join("+")}`))
  const reprinted = (line: string): string => print(parse(`# H\n\n${line}\n`, "t.md")).split("\n\n")[1]!.trimEnd()
  const roundTrips = (line: string): boolean => {
    const once = parse(`# H\n\n${line}\n`, "t.md")
    return JSON.stringify(meaning(parse(print(once), "t.md"))) === JSON.stringify(meaning(once))
  }

  test("`__x__` is strong and `_x_` is em, and printing either says so", () => {
    expect(marked("__strong__")).toEqual(["strong/strong"])
    expect(marked("_em_")).toEqual(["em/em"])
    expect(reprinted("__strong__")).toBe("**strong**")
    expect(reprinted("_em_")).toBe("*em*")
  })

  test("an underscore a word already stands against is a character in that word", () => {
    expect(marked("snake_case_name")).toEqual(["snake_case_name"])
    expect(marked("__a__b")).toEqual(["__a__b"])
    expect(marked("a__b__")).toEqual(["a__b__"])
    expect(reprinted("snake_case_name")).toBe("snake_case_name")
  })

  test("a run of three opens both marks, and both close on the run that ends it", () => {
    expect(marked("___x___")).toEqual(["x/strong+em"])
    expect(marked("***x***")).toEqual(["x/strong+em"])
    expect(reprinted("___x___")).toBe("***x***")
  })

  test("an em standing inside a strong is one node carrying both", () => {
    expect(marked("__a _b_ c__")).toEqual(["a /strong", "b/strong+em", " c/strong"])
    expect(reprinted("__a _b_ c__")).toBe("**a *b* c**")
  })

  test("code outranks emphasis, so a span quoting the markup keeps it", () => {
    expect(marked("a `__x__` b")).toEqual(["a ", "__x__/code", " b"])
    expect(marked("__a__ and __b__")).toEqual(["a/strong", " and ", "b/strong"])
  })

  test("every one of them survives being printed and read back", () => {
    const lost = [
      "__strong__",
      "_em_",
      "__a__b",
      "a__b__",
      "___x___",
      "__a _b_ c__",
      "snake_case_name",
      "a `__x__` b",
      "__a__ and __b__",
    ].filter((line) => !roundTrips(line))
    expect(lost).toEqual([])
  })
})
