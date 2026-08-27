import { describe, expect, test } from "bun:test"
import { diskFileTree } from "../../page/file-tree.ts"
import { compiledPageTypeFor } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { hold, type Shape } from "../../page/shape/shape.ts"
import { shapeFor } from "../../page/shape/chain.ts"
import { pageTypeAt } from "../../page/page-types.ts"
import { textAt } from "../../page/text/text.ts"
import { resolveRoots } from "../../repo/roots/roots"
import { definitionOf, requiredReadingManifestOf } from "../lib/required-reading-manifest.ts"

const roots = resolveRoots()
const tree = diskFileTree(roots)

function shapeAt(at: string): Shape {
  const type = pageTypeAt(at, textAt(roots.akasha, at)!)
  if (type === null) throw new Error(`${at} declares no page type this reads`)
  return shapeFor(type, tree)
}

function termDomain(slug: string, term: string, definition: string, design: string | null = null): string {
  const body = [
    "---",
    "page-type-slug: domain",
    `slug: ${slug}`,
    "domain-parent-slug: page-type/domain",
    "---",
    "",
    "# Definition",
    "",
    `- **${term}** — ${definition}`,
  ]
  if (design !== null) body.push("", "# Design", "", design)
  return `${body.join("\n")}\n`
}

function domain(manifest: string | null): string {
  const front = [
    "---",
    "page-type-slug: domain",
    "slug: subject",
    "domain-parent-slug: domain/agent-harness",
  ]
  if (manifest !== null) front.push(manifest)
  front.push("---")
  return `${[...front, "", "# Definition", "", "- **Subject** — the domain under test."].join("\n")}\n`
}

const BOTH = "  - domain/alpha\n  - domain/beta"

const AT = "pages/domain/subject.domain.md"

const DOMAIN_AT = "pages/page-type/domain.page-type.md"

function keysOf(body: string): readonly string[] {
  const type = pageTypeAt(DOMAIN_AT, textAt(roots.akasha, DOMAIN_AT)!)
  if (type === null) throw new Error(`${DOMAIN_AT} declares no page type this reads`)
  const held = compiledPageTypeFor(type, tree)
  const { properties } = held
  if (properties === null) throw new Error(`\`${type.slug}\` declares no property set to judge against`)
  const verdict = judgeFrontmatter(body, type.slug, properties, null, held)
  return verdict.why === null ? verdict.refusals : [verdict.why]
}

const shapeHolds = (body: string): boolean => hold(shapeAt("pages/page-type/domain.page-type.md"), AT, body).ok

describe("what the `domain` page type admits under `required-reading-slugs:`", () => {
  test("a flat list of addresses holds", () => {
    expect(keysOf(domain(`required-reading-slugs:\n${BOTH}`))).toEqual([])
  })

  test("refuses a 21st entry, a set past that being skimmed rather than read", () => {
    const twenty = Array.from({ length: 20 }, (_, at) => `  - domain/term-${at}`).join("\n")
    expect(keysOf(domain(`required-reading-slugs:\n${twenty}`))).toEqual([])
    const refusals = keysOf(domain(`required-reading-slugs:\n${twenty}\n  - domain/term-20`))
    expect(refusals).toHaveLength(1)
    expect(refusals.join("\n")).toContain("a list of 21")
  })

  test("refuses a nested entry, terms having no altitude to nest by", () => {
    expect(keysOf(domain("required-reading-slugs:\n  - alpha:\n      - beta"))).toHaveLength(1)
  })

  test("admits no `# Required reading` section, no document carrying one", () => {
    const body = `${domain(`required-reading-slugs:\n${BOTH}`).trimEnd()}\n\n# Required reading\n\n- **Alpha** — a term written out again.\n`
    expect(shapeHolds(body)).toBe(false)
  })
})

describe("what the manifest reports", () => {
  test("declared and empty is not the same as undeclared", () => {
    expect(requiredReadingManifestOf(domain(null)).declared).toBe(false)
    expect(requiredReadingManifestOf(domain("required-reading-slugs:")).declared).toBe(true)
  })

  test("reports a nested entry rather than taking it, for the documents no page type claims", () => {
    const manifest = requiredReadingManifestOf(domain("required-reading-slugs:\n  - alpha:\n      - beta"))
    expect(manifest.slugs).toEqual([])
    expect(manifest.violations.length).toBe(1)
  })

  test("takes the term and the sentence out of the source's own `# Definition`", () => {
    expect(definitionOf(termDomain("alpha", "Alpha", "an instrument."))).toEqual({
      term: "Alpha",
      definition: "an instrument.",
    })
  })
})
