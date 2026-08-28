import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { deriver } from "../lib/page-derive.ts"
import { answer } from "../lib/page-query.ts"
import { whole } from "../lib/page-query-whole.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (extendsSlug: string): string => page([`extends-slug: ${extendsSlug}`])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const jsonl = (rows: readonly Record<string, unknown>[]): string =>
  `${rows.map((one) => JSON.stringify(one)).join("\n")}\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/spell.page-type.md": kind("none"),
  "pages/page-type/rite.page-type.md": kind("spell"),
  "pages/page-type/sighting.page-type.md": kind("none"),
  "pages/page-type/reader.page-type.md": kind("none"),

  "pages/page-property-definition/spell-title.page-property-definition.md": property("spell", "title", ["type: text"]),
  "pages/page-property-definition/spell-sightings.page-property-definition.md": property("spell", "sightings", [
    "type: pages",
    "target-slug: sighting",
    "rows: jsonl",
  ]),
  "pages/page-property-definition/sighting-chapter.page-property-definition.md": property("sighting", "chapter", ["type: text"]),
  "pages/page-property-definition/sighting-paragraph.page-property-definition.md": property("sighting", "paragraph", ["type: number"]),
  "pages/page-property-definition/sighting-reader.page-property-definition.md": property("sighting", "reader-slug", [
    "type: relation-slug",
    "target-slug: reader",
  ]),
  "pages/page-property-definition/reader-title.page-property-definition.md": property("reader", "title", ["type: text"]),

  "pages/spell/mend.spell.md": page(["slug: mend", "title: Mend"]),
  "pages/spell/ward.spell.md": page(["slug: ward", "title: Ward"]),
  "pages/rite/vigil.rite.md": page(["slug: vigil", "title: Vigil"]),

  "pages/reader/ada.reader.md": page(["slug: ada", "title: Ada"]),

  "pages/spell/mend.spell.sightings.jsonl": jsonl([
    { slug: "mend-first", chapter: "one", paragraph: 12, "reader-slug": "ada" },
    { slug: "mend-second", chapter: "two", paragraph: 3 },
  ]),
  "pages/spell/ward.spell.sightings.jsonl": jsonl([{ chapter: "three", paragraph: 40 }]),
  "pages/rite/vigil.rite.sightings.jsonl": jsonl([{ slug: "vigil-only", chapter: "four", paragraph: 7 }]),
}

const root = mkdtempSync(join("/var/tmp", "page-data-rows-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const ROOTS: Roots = { akasha: root }

describe("a page type whose pages stand in a `rows: jsonl` sidecar", () => {
  it("answers its pages, one per line, though no directory of its own stands for them", () => {
    const rows = [...deriver(ROOTS).rows("sighting")!]
    expect(rows).toHaveLength(4)
  })

  it("answers every one of them again on a second walk, the sidecars being read afresh each time", () => {
    const rows = deriver(ROOTS).rows("sighting")!
    const first = [...rows].map((row) => row.at)
    const second = [...rows].map((row) => row.at)
    expect(first).toHaveLength(4)
    expect(second).toEqual(first)
  })

  it("names each page by the slug the line states, and by its parent and line where none is stated", () => {
    const rows = [...deriver(ROOTS).rows("sighting")!]
    expect(rows.map((row) => row.values.chapter)).toEqual(["one", "two", "three", "four"])
    expect(rows[2]?.at).toBe("akasha:pages/spell/ward.spell.sightings.jsonl#0")
  })

  it("carries the page holding it under a key named for that page type", () => {
    const rows = [...deriver(ROOTS).rows("sighting")!]
    expect(rows.map((row) => row.values["spell-slug"])).toEqual(["mend", "mend", "ward", "vigil"])
  })

  it("gathers the sidecars of a page type extending the one the property is declared on", () => {
    const rows = [...deriver(ROOTS).rows("sighting")!]
    expect(rows.at(-1)?.at).toBe("akasha:pages/rite/vigil.rite.sightings.jsonl#0")
  })

  it("reports the property holding it, so a reader knows where its pages stand", () => {
    const backed = deriver(ROOTS).backed()
    expect(backed.find((one) => one.slug === "sighting")).toEqual({
      slug: "sighting",
      repo: null,
      glob: null,
      heldBy: ["spell.sightings"],
      namedFor: null,
    })
  })
})

describe("a query over pages held in a sidecar", () => {
  it("filters, sorts and limits them as it does pages filed one per file", () => {
    const got = answer(ROOTS, {
      pageType: "sighting",
      where: [{ key: "chapter", notIn: ["four"] }],
      sortBy: "paragraph",
      descending: true,
      limit: 2,
      keys: ["chapter", "paragraph"],
    })
    expect(got?.n).toBe(3)
    expect(got?.rows.map((row) => row.values.chapter)).toEqual(["three", "one"])
  })

  it("counts them by a property, which is what a nav page asks for", () => {
    const got = answer(ROOTS, { pageType: "sighting", countBy: ["spell-slug"] })
    expect(got?.groups).toEqual([
      { by: { "spell-slug": "mend" }, n: 2 },
      { by: { "spell-slug": "ward" }, n: 1 },
      { by: { "spell-slug": "vigil" }, n: 1 },
    ])
  })

  it("reduces a number over them", () => {
    const got = answer(ROOTS, { pageType: "sighting", function: "sum", target: "paragraph" })
    expect(got).toMatchObject({ n: 4, value: 62, over: 4 })
  })
})

describe("the page holding a sidecar", () => {
  it("answers the property as the pages it holds, where the query asks for that key", () => {
    const got = answer(ROOTS, { pageType: "spell", keys: ["slug", "sightings"], sortBy: "slug" })
    expect(got?.rows[0]?.values.sightings).toEqual(["mend-first", "mend-second"])
  })

  it("leaves the sidecar unread where no query asks for the key", () => {
    const got = answer(ROOTS, { pageType: "spell", keys: ["slug"], sortBy: "slug" })
    expect(got?.rows[0]?.values.sightings).toBeUndefined()
  })
})

describe("one whole page", () => {
  it("answers a page held in a sidecar with each relation replaced by what it names", () => {
    const got = whole(ROOTS, "sighting", "mend-first")
    expect(got?.at).toBe("akasha:pages/spell/mend.spell.sightings.jsonl#0")
    expect(got?.relations["reader-slug"]).toEqual([
      { pageType: "reader", name: "ada", title: "Ada", at: "akasha:pages/reader/ada.reader.md" },
    ])
  })

  it("says a relation names nothing rather than dropping it", () => {
    const got = whole(ROOTS, "spell", "mend")
    expect(got?.relations["sightings"]).toEqual([
      { pageType: "sighting", name: "mend-first", title: null, at: "akasha:pages/spell/mend.spell.sightings.jsonl#0" },
      { pageType: "sighting", name: "mend-second", title: null, at: "akasha:pages/spell/mend.spell.sightings.jsonl#1" },
    ])
  })
})
