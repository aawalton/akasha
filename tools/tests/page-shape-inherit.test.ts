import { describe, expect, test } from "bun:test"
import type { PartDef } from "../../page/document/shape-types.ts"
import type { FileTree } from "../../page/file-tree.ts"
import { hold, type Shape } from "../../page/shape/shape.ts"
import { shapeFor } from "../../page/shape/chain.ts"
import { pageTypeAt } from "../../page/page-types.ts"
import { textAt } from "../../page/text/text.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
import { DOMAIN_SECTION_HEADINGS, LOOP_CONTRACT, SEQUENCE_CONTRACT } from "./page-shape-contracts.ts"

const roots = resolveRoots()

const DOMAIN_AT = "pages/page-type/domain.page-type.md"
const DOMAIN_SHAPE_AT = "pages/page-body-shape/domain.page-body-shape.md"
const PAGE_AT = "pages/page-type/page.page-type.md"

const DOMAIN_SHAPE = "domain"

const standing: Record<string, string> = {
  [PAGE_AT]: textAt(rootFor(roots, AKASHA), PAGE_AT)!,
  [DOMAIN_AT]: textAt(rootFor(roots, AKASHA), DOMAIN_AT)!,
  [DOMAIN_SHAPE_AT]: textAt(rootFor(roots, AKASHA), DOMAIN_SHAPE_AT)!,
}

function fileTreeOf(files: Record<string, string>): FileTree {
  return {
    paths: (glob) =>
      Object.keys(files)
        .filter((at) => (typeof glob === "string" ? [glob] : glob).some((one) => new Bun.Glob(one).match(at)))
        .sort(),
    open: (at) => files[at] ?? null,
    repoOf: () => "instructions",
  }
}

function compile(files: Record<string, string>, at: string): { sections: readonly PartDef[] | null; why: string | null } {
  const type = pageTypeAt(at, files[at]!)
  if (type === null) throw new Error(`${at} declares no frontmatter this reads`)
  const shape = shapeFor(type, fileTreeOf(files))
  return { sections: shape.compiled === null ? null : shape.compiled.sections, why: shape.why }
}

const heading = (part: PartDef): string =>
  part.part === "section" && part.heading.match === "literal" ? part.heading.text : "{hole}"

const headings = (parts: readonly PartDef[]): readonly string[] => parts.map(heading)

const shapeText = (id: string, extendsSlug: string, body: string, keys = ""): string =>
  `---\nid: ${id}\nextends-slug: ${extendsSlug}\n${keys}---\n${body}`

const typeText = (id: string, bodyShapeSlug: string): string =>
  `---\nid: ${id}\nextends-slug: page\nbody-shape-slug: ${bodyShapeSlug}\n---\n`

const STAGES = `blocks:
  sequence:
    count: 0-1
    repeat: 1-12
    children: 1-15
  loop:
    count: 0-1
    repeat: 1-12
    children: 1-15
slots:
  stage:
    max: sm
  action:
    max: lg
choices:
  stages:
    of:
      - Sequence
      - Loop
    repeat: 1
`

const STAGE_BODY = `
# Sequence

1. **{stage}**
   - {action}

# Loop

1. **{stage}**
   - {action}
`

const typeId = (n: string): string => `019fff00-0000-7000-8000-0000000000${n}`

const shapeId = (n: string): string => `019fff00-0000-7000-9000-0000000000${n}`

function heir(
  name: string,
  n: string,
  above: string,
  body: string,
  keys?: string
): { files: Record<string, string>; at: string } {
  const at = `pages/page-type/${name}.page-type.md`
  return {
    at,
    files: {
      ...standing,
      [at]: typeText(typeId(n), name),
      [`pages/page-body-shape/${name}.page-body-shape.md`]: shapeText(shapeId(n), above, body, keys),
    },
  }
}

const DESIGN = "\n# Design\n\n{design}\n"

const DESIGN_KEYS = "blocks:\n  design:\n    max: lg\nslots:\n  design:\n    max: lg\n"

describe("a body shape extending one that declares sections", () => {
  const { files, at } = heir("stager", "01", DOMAIN_SHAPE, STAGE_BODY, STAGES)

  test("a page holds to the sections the shape's parent declares as well as its own", () => {
    const { sections, why } = compile(files, at)
    expect(why).toBeNull()
    expect(headings(sections!)).toEqual([...DOMAIN_SECTION_HEADINGS, "Sequence", "Loop"])
  })

  test("what it adds is what the frozen contract of the same kind declares", () => {
    const { sections } = compile(files, at)
    const own = sections!.slice(DOMAIN_SECTION_HEADINGS.length)
    expect(own).toEqual([SEQUENCE_CONTRACT, LOOP_CONTRACT])
  })

  test("a shape writing no body of its own is held to its parent's sections alone", () => {
    const bare = heir("bare", "02", DOMAIN_SHAPE, "")
    const { sections, why } = compile(bare.files, bare.at)
    expect(why).toBeNull()
    expect(headings(sections!)).toEqual(DOMAIN_SECTION_HEADINGS)
  })
})

describe("a body shape extending nothing at all", () => {
  test("it inherits nothing and is held to exactly what it writes", () => {
    const one = heir("leaf", "03", "none", DESIGN, DESIGN_KEYS)
    const { sections, why } = compile(one.files, one.at)
    expect(why).toBeNull()
    expect(headings(sections!)).toEqual(["Design"])
  })
})

describe("a chain that states no shape", () => {
  test("a child re-declaring a section its parent declares is refused, naming the file that declares it first", () => {
    const one = heir("clash", "04", DOMAIN_SHAPE, DESIGN, DESIGN_KEYS)
    const { sections, why } = compile(one.files, one.at)
    expect(sections).toBeNull()
    expect(why).toContain("pages/page-body-shape/clash.page-body-shape.md")
    expect(why).toContain(DOMAIN_SHAPE_AT)
    expect(why).toContain("blocks.design")
  })

  test("a cycle is refused rather than walked forever", () => {
    const at = "pages/page-type/one.page-type.md"
    const files = {
      ...standing,
      [at]: typeText(typeId("0a"), "one"),
      "pages/page-body-shape/one.page-body-shape.md": shapeText(shapeId("0a"), "two", ""),
      "pages/page-body-shape/two.page-body-shape.md": shapeText(shapeId("0b"), "one", ""),
    }
    const { sections, why } = compile(files, at)
    expect(sections).toBeNull()
    expect(why).toContain("one")
  })

  test("a `body-shape-slug` naming no body shape here is refused, naming the file that states it", () => {
    const at = "pages/page-type/orphan.page-type.md"
    const missing = "no-such-shape"
    const files = { ...standing, [at]: typeText(typeId("05"), missing) }
    const { sections, why } = compile(files, at)
    expect(sections).toBeNull()
    expect(why).toContain(at)
    expect(why).toContain(missing)
  })

  test("an `extends-slug` naming no body shape here is refused, naming the file that states it", () => {
    const missing = "no-shape-either"
    const one = heir("stray", "06", missing, "")
    const { sections, why } = compile(one.files, one.at)
    expect(sections).toBeNull()
    expect(why).toContain("pages/page-body-shape/stray.page-body-shape.md")
    expect(why).toContain(missing)
  })

  test("a shape above whose own body does not compile is refused, naming that shape", () => {
    const at = "pages/page-type/successor.page-type.md"
    const files = {
      ...standing,
      [at]: typeText(typeId("07"), "successor"),
      "pages/page-body-shape/successor.page-body-shape.md": shapeText(shapeId("07"), "broken", ""),
      "pages/page-body-shape/broken.page-body-shape.md": shapeText(shapeId("06"), "none", "\n# Design\n\n{undeclared}\n"),
    }
    const { sections, why } = compile(files, at)
    expect(sections).toBeNull()
    expect(why).toContain("pages/page-body-shape/broken.page-body-shape.md")
  })
})

describe("the heading a shape cannot yet write", () => {
  test("a heading with nothing beneath it is refused, and no chain above it makes one legal", () => {
    const one = heir("bareheading", "08", DOMAIN_SHAPE, "\n# Invariants\n")
    const { sections, why } = compile(one.files, one.at)
    expect(sections).toBeNull()
    expect(why).toContain("Invariants")
  })
})

const NARROWED = "blocks:\n  design:\n    narrows: domain\n    max: xs\nslots:\n  design:\n    max: lg\n"

const MISNAMED = "blocks:\n  design:\n    narrows: nowhere\n    max: xs\nslots:\n  design:\n    max: lg\n"

const OWN = "blocks:\n  design:\n    narrows: narrower\n    max: xs\nslots:\n  design:\n    max: lg\n"

const bodyOfLength = (chars: number): string =>
  ["---", "---", "", "# Definition", "", "- **A thing** — what it is.", "", "# Design", "", "d".repeat(chars), ""].join("\n")

function narrowing(keys: string): Shape {
  const one = heir("narrower", "09", DOMAIN_SHAPE, DESIGN, keys)
  const type = pageTypeAt(one.at, one.files[one.at]!)!
  return shapeFor(type, fileTreeOf(one.files))
}

describe("a body shape narrowing a section a shape above it declares", () => {
  test("a redeclaration naming what it narrows compiles, and both statements of the section stand", () => {
    const shape = narrowing(NARROWED)
    expect(shape.why).toBeNull()
    expect(headings(shape.compiled!.sections).filter((one) => one === "Design")).toHaveLength(2)
  })

  test("a body the narrowing refuses is refused, though the declaration it narrows admits it", () => {
    const shape = narrowing(NARROWED)
    expect(hold(shape, "nowhere/one.md", bodyOfLength(20)).ok).toBe(true)
    const verdict = hold(shape, "nowhere/one.md", bodyOfLength(200))
    expect(verdict.ok).toBe(false)
    expect(verdict.ok ? "" : verdict.refusals.map((one) => one.expected).join("\n")).toContain("at most 50 characters")
  })

  test("the same body is admitted where the shape above states the section alone", () => {
    const one = heir("wide", "0c", DOMAIN_SHAPE, "")
    const shape = shapeFor(pageTypeAt(one.at, one.files[one.at]!)!, fileTreeOf(one.files))
    expect(shape.why).toBeNull()
    expect(hold(shape, "nowhere/one.md", bodyOfLength(200)).ok).toBe(true)
  })

  test("a narrowing naming a shape that declares nothing here is refused, naming what it stated", () => {
    const shape = narrowing(MISNAMED)
    expect(shape.compiled).toBeNull()
    expect(shape.why).toContain("`blocks.design.narrows: nowhere`")
    expect(shape.why).toContain("blocks.design")
  })

  test("a narrowing naming its own shape is refused, a declaration narrowing nothing but itself", () => {
    const shape = narrowing(OWN)
    expect(shape.compiled).toBeNull()
    expect(shape.why).toContain("`blocks.design.narrows: narrower`")
  })

  test("a `narrows:` that is no shape's slug is refused before anything above is read", () => {
    const shape = narrowing("blocks:\n  design:\n    narrows:\n      - domain\nslots:\n  design:\n    max: lg\n")
    expect(shape.compiled).toBeNull()
    expect(shape.why).toContain("`blocks.design.narrows`")
  })

  test("a silent redeclaration is refused, and the refusal names `narrows:` and the property side", () => {
    const shape = narrowing(DESIGN_KEYS)
    expect(shape.compiled).toBeNull()
    expect(shape.why).toContain("states no `narrows:`")
    expect(shape.why).toContain("blocks.design.narrows:")
    expect(shape.why).toContain("page/property/frontmatter.ts")
  })
})
