import { describe, expect, test } from "bun:test"
import type { Verdict } from "../../page/document/types.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { hold, shapeOf, type Forebear, type Shape } from "../../page/shape/shape.ts"
import { aboveOf, shapeFor } from "../../page/shape/chain.ts"
import { claimant, PAGE_GLOBS, scanSpanning } from "../../page/page-types.ts"
import { textAt } from "../../page/text/text.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"

const ROOT = `${import.meta.dir}/../..`

const TYPE_AT = "pages/page-type/fixture.page-type.md"
const PAGE_AT = "pages/page-type/one.page-type.md"

const NO_BODY = "---\nid: 019ffc57-8120-7000-9a3d-389f48390043\n---\n"
const DECLARES_SHAPES = `${NO_BODY}\n{template}\n`

function shapeOfType(text: string): Shape {
  const one = shapeOf("fixture", TYPE_AT, text)
  expect(one.why).toBeNull()
  expect(one.compiled).not.toBeNull()
  return one
}

function refusals(shape: Shape, relPath: string, text: string, above?: readonly Forebear[]): readonly string[] {
  const verdict: Verdict = hold(shape, relPath, text, above)
  return verdict.ok
    ? []
    : verdict.refusals.map((one) => `${one.part} — expected ${one.expected}, measured ${one.measured}`)
}

describe("a page type declaring no body", () => {
  test("compiles into a shape stating no section, rather than refusing", () => {
    const one = shapeOf("fixture", TYPE_AT, NO_BODY)
    expect(one.why).toBeNull()
    expect(one.compiled).not.toBeNull()
    expect(one.compiled!.sections).toEqual([])
    expect(one.pagesDeclareShapes).toBe(false)
  })

  test("holds a page that carries no body", () => {
    const page = "---\nid: 019ffd1d-2d5d-7000-8e3e-33c7ff3045ec\ntype: lower-kebab-case\n---\n"
    expect(refusals(shapeOfType(NO_BODY), PAGE_AT, page)).toEqual([])
  })

  for (const [name, body] of [
    ["a section", "\n# Surplus\n\nA line under a heading.\n"],
    ["a paragraph standing under no heading", "\nA line of its own.\n"],
    ["a list standing under no heading", "\n- one\n"],
  ] as const) {
    test(`refuses a page given ${name}`, () => {
      expect(refusals(shapeOfType(NO_BODY), PAGE_AT, `${NO_BODY}${body}`).length).toBeGreaterThan(0)
    })
  }
})

describe("a page type whose body is the lone `{template}` hole", () => {
  test("compiles, and says its pages each declare a shape of their own", () => {
    const one = shapeOf("fixture", TYPE_AT, DECLARES_SHAPES)
    expect(one.why).toBeNull()
    expect(one.compiled).not.toBeNull()
    expect(one.pagesDeclareShapes).toBe(true)
  })

  test("holds a page whose own body compiles into a shape", () => {
    const page = `---\nid: 1\nslots:\n  statement:\n    max: sm\n---\n\n# Intent\n\n**{statement}**\n`
    expect(refusals(shapeOfType(DECLARES_SHAPES), PAGE_AT, page)).toEqual([])
  })

  test("holds a page carrying no body, that page declaring a shape stating no section", () => {
    expect(refusals(shapeOfType(DECLARES_SHAPES), PAGE_AT, NO_BODY)).toEqual([])
  })

  test("refuses a page whose body does not compile, with the inner compile's own reason", () => {
    const page = `${NO_BODY}\n# Intent\n\n**{nowhere}**\n`
    const inner = shapeOf("one", PAGE_AT, page)
    expect(inner.compiled).toBeNull()
    expect(inner.why).not.toBeNull()
    const said = refusals(shapeOfType(DECLARES_SHAPES), PAGE_AT, page)
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("nowhere")
    expect(said[0]).toContain(inner.why!)
  })

  for (const [name, body] of [
    ["a hole naming some other property type", "{slug}"],
    ["the hole with words beside it", "{template} and more"],
    ["the hole under a heading", "# Body\n\n{template}"],
    ["the hole marked bold", "**{template}**"],
    ["the hole written twice", "{template}\n\n{template}"],
    ["the hole inside a list item", "- {template}"],
    ["the hole with a section beside it", "{template}\n\n# Beside\n\nA line."],
    ["the hole with a section under it", "{template}\n\n## Under\n\nA line."],
  ] as const) {
    test(`${name} is not a shape declaration`, () => {
      expect(shapeOf("fixture", TYPE_AT, `${NO_BODY}\n${body}\n`).pagesDeclareShapes).toBe(false)
    })
  }
})

describe("a page type that is a page of its own type", () => {
  const SECONDS = 60
  const TIMED_OUT = 124

  function bounded(lines: readonly string[]): { readonly code: number; readonly out: string; readonly err: string } {
    const ran = Bun.spawnSync({
      cmd: ["timeout", String(SECONDS), "bun", "-e", lines.join("\n")],
      cwd: ROOT,
      stdout: "pipe",
      stderr: "pipe",
    })
    return { code: ran.exitCode ?? -1, out: ran.stdout.toString(), err: ran.stderr.toString() }
  }

  const heldAgainstItself = (at: string, source: string): readonly string[] => [
    `import { hold, shapeOf } from ${JSON.stringify(`${ROOT}/../akasha/page/shape/shape.ts`)}`,
    `const at = ${JSON.stringify(at)}`,
    `const text = ${source}`,
    `const verdict = hold(shapeOf("page-type", at, text), at, text)`,
    `process.stdout.write(verdict.ok ? "held" : "refused")`,
  ]

  test("a fixture standing as a page of itself is judged and returns, inside the bound", () => {
    const ran = bounded(heldAgainstItself(TYPE_AT, JSON.stringify(DECLARES_SHAPES)))
    expect(ran.code).not.toBe(TIMED_OUT)
    expect(ran.code).toBe(0)
    expect(ran.out).toBe("held")
  })

  test("`pages/page-type/page-type.page-type.md` is judged against itself and returns, inside the bound", () => {
    const at = "pages/page-type/page-type.page-type.md"
    const ran = bounded([
      `import { readFileSync } from "node:fs"`,
      ...heldAgainstItself(at, `readFileSync(${JSON.stringify(`${ROOT}/${at}`)}, "utf8")`),
    ])
    expect(ran.code).not.toBe(TIMED_OUT)
    expect(ran.code).toBe(0)
    expect(ran.out).toBe("held")
  })
})

describe("the pages standing in the akasha repo", () => {
  const roots = resolveRoots()
  const tree = diskFileTree(roots)
  const types = registryOf(tree)
  const paths = scanSpanning(roots, PAGE_GLOBS)

  test("there are pages and page types to look at, so a pass below is a reading rather than an empty set", () => {
    expect(paths.length).toBeGreaterThan(0)
    expect(types.length).toBeGreaterThan(0)
  })

  for (const relPath of paths) {
    test(`${relPath} is claimed by one page type, and its body holds to that page type`, () => {
      const type = claimant(relPath, types).type
      expect(type).not.toBeNull()
      const shape = shapeFor(type!, tree)
      expect(shape.why).toBeNull()
      const text = textAt(rootFor(roots, AKASHA), relPath)!
      const { above, why } = aboveOf(relPath, text, tree)
      expect(why).toBeNull()
      expect(refusals(shape, relPath, text, above!)).toEqual([])
    })
  }
})
