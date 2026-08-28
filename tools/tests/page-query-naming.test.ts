import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pagesNaming } from "../lib/page-query-naming.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (slug: string, place: string): string =>
  page([`page-type-slug: page-type`, `slug: ${slug}`, "extends-slug: none", `files: akasha:${place}`])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/team.page-type.md": kind("team", "pages/team/**/*.md"),
  "pages/page-type/job.page-type.md": kind("job", "pages/job/**/*.md"),
  "pages/page-type/note.page-type.md": kind("note", "pages/note/**/*.md"),

  "pages/page-property-definition/job-team.page-property-definition.md": property("job", "team-slug", ["type: relation-address", "target-slug: team"]),
  "pages/page-property-definition/job-mates.page-property-definition.md": property("job", "mate-slugs", [
    "type: list(relation-address)",
    "target-slug: team",
  ]),
  "pages/page-property-definition/job-title.page-property-definition.md": property("job", "title", ["type: text"]),
  "pages/page-property-definition/note-team.page-property-definition.md": property("note", "team-slug", ["type: relation-slug", "target-slug: team"]),
  "pages/page-property-definition/team-title.page-property-definition.md": property("team", "title", ["type: text"]),
  "pages/page-property-definition/team-id.page-property-definition.md": property("team", "id", ["type: text"]),

  "pages/team/roots.md": page(["slug: roots", "id: 019f0000-0000-7000-8000-000000000001", "title: The Roots"]),
  "pages/team/twig.md": page(["slug: twig", "id: 019f0000-0000-7000-8000-000000000002", "title: The Twig"]),

  "pages/job/one.md": page(["slug: one", "team-slug: team/roots"]),
  "pages/job/two.md": page(["slug: two", "team-slug: roots"]),
  "pages/job/three.md": page(["slug: three", "team-slug: team/twig"]),
  "pages/job/four.md": page(["slug: four", "mate-slugs:\n  - team/twig\n  - team/roots"]),
  "pages/note/first.md": page(["slug: first", "team-slug: roots"]),
}

const root = mkdtempSync(join("/var/tmp", "page-query-naming-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const ROOTS: Roots = { akasha: root }

const named = (
  key: string,
  name: string,
  holders: readonly string[] | null = null,
  limit: number | null = null
): readonly string[] =>
  pagesNaming(ROOTS, key, name, holders, limit)
    .flatMap((one) => one.rows.map((row) => `${one.pageType}/${row.values.slug as string}`))
    .sort()

describe("the pages naming one page through a relation", () => {
  it("finds a page whose value is the bare slug and one whose value is the address", () => {
    expect(named("team-slug", "roots")).toEqual(["job/one", "job/two", "note/first"])
  })

  it("finds the same pages when asked by the address rather than the slug", () => {
    expect(named("team-slug", "team/roots")).toEqual(["job/one", "job/two", "note/first"])
  })

  it("resolves an id to the page it names, and finds what names that page by slug", () => {
    expect(named("team-slug", "019f0000-0000-7000-8000-000000000001")).toEqual([
      "job/one",
      "job/two",
      "note/first",
    ])
  })

  it("resolves a title to the page it names", () => {
    expect(named("team-slug", "The Twig")).toEqual(["job/three"])
  })

  it("matches inside a list where the relation holds many", () => {
    expect(named("mate-slugs", "twig")).toEqual(["job/four"])
  })

  it("reads a key spelled in camelCase as the kebab-case key the page declares", () => {
    expect(named("teamSlug", "twig")).toEqual(["job/three"])
  })

  it("keeps only the page types it was given, where it was given any", () => {
    expect(named("team-slug", "roots", ["note"])).toEqual(["note/first"])
  })

  it("stops at the limit it was given", () => {
    expect(named("team-slug", "roots", null, 1)).toHaveLength(1)
  })

  it("finds nothing for a key no page type declares as a relation", () => {
    expect(named("title", "The Twig")).toEqual([])
  })
})
