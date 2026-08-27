import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { deriver } from "../lib/page-derive.ts"
import { type Values } from "../lib/page-file-values"
import { answer, NOW } from "../lib/page-query.ts"
import type { Roots } from "../../page/page"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (extendsSlug: string): string => page([`extends-slug: ${extendsSlug}`])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/person.page-type.md": kind("none"),
  "pages/page-type/team.page-type.md": kind("none"),
  "pages/page-type/squad.page-type.md": kind("team"),
  "pages/page-type/job.page-type.md": kind("none"),
  "pages/page-type/site.page-type.md": kind("none"),
  "pages/page-type/grade.page-type.md": kind("none"),
  "pages/page-type/gauge.page-type.md": kind("none"),

  "pages/page-property-definition/team-lead.page-property-definition.md": property("team", "lead", ["type: relation-slug", "target-slug: person"]),
  "pages/page-property-definition/team-above.page-property-definition.md": property("team", "above-slugs", [
    "type: list(relation-slug, max 5)",
    "target-slug: team",
  ]),
  "pages/page-property-definition/team-owner.page-property-definition.md": property("team", "owner", [
    "type: relation-slug",
    "target-slug: person",
    "computed: true",
    "from:\n  - lead\n  - above-slugs.owner",
  ]),
  "pages/page-property-definition/team-jobs.page-property-definition.md": property("team", "jobs", [
    "type: list(relation-slug)",
    "target-slug: job",
    "computed: true",
    "back-from: job-team",
  ]),
  "pages/page-property-definition/person-leads.page-property-definition.md": property("person", "leads", [
    "type: list(relation-slug)",
    "target-slug: team",
    "computed: true",
    "back-from: team-lead",
  ]),
  "pages/page-property-definition/person-nowhere.page-property-definition.md": property("person", "nowhere", [
    "type: list(relation-slug)",
    "target-slug: team",
    "computed: true",
    "back-from: no-such-property",
  ]),
  "pages/page-property-definition/person-both.page-property-definition.md": property("person", "both", [
    "type: list(relation-slug)",
    "target-slug: team",
    "computed: true",
    "from:\n  - slug",
    "back-from: team-lead",
  ]),
  "pages/page-property-definition/job-grade.page-property-definition.md": property("job", "grade", [
    "type: relation-slug",
    "target-slug: grade",
    "slug-property: grade-slug",
  ]),
  "pages/page-property-definition/job-tone.page-property-definition.md": property("job", "tone", [
    "type: text",
    "computed: true",
    "from:\n  - grade.tone",
  ]),
  "pages/page-property-definition/job-team.page-property-definition.md": property("job", "team-slug", ["type: relation-slug", "target-slug: team"]),
  "pages/page-property-definition/job-title.page-property-definition.md": property("job", "title", ["type: text"]),
  "pages/page-property-definition/job-owner.page-property-definition.md": property("job", "owner", [
    "type: relation-slug",
    "target-slug: person",
    "computed: true",
    "from:\n  - team-slug.owner",
  ]),
  "pages/page-property-definition/job-misread.page-property-definition.md": property("job", "misread", [
    "type: relation-slug",
    "target-slug: person",
    "computed: true",
    "from:\n  - no-such-key",
  ]),
  "pages/page-property-definition/job-loose.page-property-definition.md": property("job", "loose", [
    "type: relation-slug",
    "target-slug: person",
    "computed: true",
    "from:\n  - title.owner",
  ]),

  "pages/page-property-definition/gauge-used.page-property-definition.md": property("gauge", "used", ["type: number"]),
  "pages/page-property-definition/gauge-budget.page-property-definition.md": property("gauge", "budget", ["type: number"]),
  "pages/page-property-definition/gauge-opened.page-property-definition.md": property("gauge", "opened", ["type: instant"]),
  "pages/page-property-definition/gauge-charged.page-property-definition.md": property("gauge", "charged", [
    "type: formula",
    "expression: (used > 0) && used || budget",
    "returnType: number",
  ]),
  "pages/page-property-definition/gauge-seen.page-property-definition.md": property("gauge", "seen", [
    "type: formula",
    "expression: opened",
    "returnType: instant",
  ]),
  "pages/page-property-definition/gauge-unstated.page-property-definition.md": property("gauge", "unstated", [
    "type: formula",
    "expression: budget",
  ]),
  "pages/page-property-definition/gauge-day-rate.page-property-definition.md": property("gauge", "day-rate", ["type: number"]),
  "pages/page-property-definition/gauge-bare.page-property-definition.md": property("gauge", "bare", [
    "type: formula",
    "expression: day-rate * 2",
    "returnType: number",
  ]),
  "pages/page-property-definition/gauge-spelled.page-property-definition.md": property("gauge", "spelled", [
    "type: formula",
    "expression: prop(day-rate) * 2",
    "returnType: number",
  ]),

  "pages/person/ada.person.md": page(["slug: ada"]),
  "pages/person/grace.person.md": page(["slug: grace"]),

  "pages/team/roots.team.md": page(["lead: ada"]),
  "pages/team/twig.team.md": page(["title: reaches nothing"]),
  "pages/team/branch.team.md": page(["above-slugs:\n  - twig\n  - roots"]),
  "pages/team/loop-a.team.md": page(["above-slugs: loop-b"]),
  "pages/team/loop-b.team.md": page(["above-slugs: loop-a"]),
  "pages/squad/alpha.squad.md": page(["lead: grace"]),

  "pages/job/one.job.md": page(["title: through a written key", "team-slug: roots"]),
  "pages/job/two.job.md": page(["title: through a list", "team-slug: branch"]),
  "pages/job/three.job.md": page(["title: through a subtype", "team-slug: alpha"]),
  "pages/job/four.job.md": page(["title: around a cycle", "team-slug: loop-a"]),
  "pages/job/five.job.md": page(["title: at nothing", "team-slug: absent"]),
  "pages/job/six.job.md": page(["title: through a slug property", "grade: high"]),

  "pages/grade/grade-high.grade.md": page(["grade-slug: high", "tone: warm"]),
  "pages/grade/high.grade.md": page(["grade-slug: taken-by-nobody", "tone: reached by the page's own slug"]),

  "pages/site/here.site.md": page(["slug: here"]),
  "pages/site/bodied.site.md": `${page(["slug: bodied"])}\n# Definition\n\n- **Bodied** — a page holding something under its frontmatter.\n`,

  "pages/page-type/scroll.page-type.md": kind("none"),
  "pages/page-property-definition/scroll-words.page-property-definition.md": property("scroll", "words", ["type: text", "attachment: md"]),
  "pages/page-property-definition/scroll-keeper.page-property-definition.md": property("scroll", "keeper", ["type: text"]),
  "pages/scroll/one.scroll.md": page(["slug: one", "keeper: ada"]),
  "pages/scroll/one.scroll.words.attachment.md": "the words the page does not carry\n",

  "pages/gauge/first.gauge.md": page(["used: 4", "budget: 10", "opened: 5 Jan 2026", "day-rate: 4"]),
  "pages/gauge/second.gauge.md": page(["used: 0", "budget: 20", "opened: 10 Feb 2027"]),
  "pages/gauge/third.gauge.md": page(["used: 3", "budget: 30", "opened: 9 Mar 2026"]),
}

const root = mkdtempSync(join("/var/tmp", "page-derive-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

// NAMED ONLY WHERE CLONED: every root named here is scanned, so a repo pointed at a path that is
// not there raises ENOENT rather than reading as a repository holding nothing.
const ROOTS: Roots = {
  akasha: root,
}

const held = (pageType: string, key: string): ReadonlyMap<string, unknown> =>
  new Map(
    deriver(ROOTS)
      .rows(pageType)!
      .map((row) => [row.at.replace(/^.*\//, "").replace(`.${pageType}.md`, ""), row.values[key]])
  )

const owners = (): ReadonlyMap<string, unknown> => held("job", "owner")

describe("a computed property resolved from its `from:` paths", () => {
  it("walks a relation to the page its `target-slug` names and reads the key there", () => {
    expect(owners().get("one")).toBe("ada")
  })

  it("takes the first path that reaches a value, and a list's first entry that reaches one", () => {
    expect(owners().get("two")).toBe("ada")
  })

  it("reaches a page of a type that extends the one the relation targets", () => {
    expect(owners().get("three")).toBe("grace")
  })

  it("answers nothing around a cycle rather than throwing", () => {
    expect(owners().get("four")).toBeNull()
  })

  it("answers nothing where a relation names no page", () => {
    expect(owners().get("five")).toBeNull()
  })

  it("leaves a page of a type declaring nothing derived exactly as its file states it", () => {
    const one = deriver(ROOTS).rows("site")!.find((row) => row.at.endsWith("here.site.md"))
    expect(one?.values).toEqual({ slug: "here" })
  })

  it("indexes the pages a relation targets by the `slug-property` it names", () => {
    expect(held("job", "tone").get("six")).toBe("warm")
  })

  it("says nothing about a page type whose pages are not files", () => {
    expect(deriver(ROOTS).rows("nowhere")).toBeNull()
  })
})

describe("what the walk reports as a fault", () => {
  it("names a path key no property declares", () => {
    const found = deriver(ROOTS)
    found.rows("job")
    expect(found.faults()).toContain("`no-such-key` is declared by no property on `job`")
  })

  it("names a path walked past a key that is no relation", () => {
    const found = deriver(ROOTS)
    found.rows("job")
    expect(found.faults()).toContain("`title` on `job` names no `target-slug`, so a path cannot be walked past it")
  })

  it("reports nothing for a path that simply reaches no value", () => {
    const found = deriver(ROOTS)
    found.rows("team")
    expect(found.faults()).toEqual([])
  })

  it("refuses an expression naming a key nothing declares, rather than reading it as absent", () => {
    const found = deriver(ROOTS)
    found.rows("gauge")
    expect(found.faults()).toContain(
      "`gauge-bare` states an `expression` this evaluator refuses: `day` is declared by no property on `gauge`"
    )
  })

  it("leaves a hyphenated key written bare with no value, where spelled out it answers", () => {
    expect(held("gauge", "bare").get("first")).toBeNull()
    expect(held("gauge", "spelled").get("first")).toBe("8")
  })
})

describe("a computed property resolved from the property naming it back", () => {
  it("answers every page whose named property names this one", () => {
    expect(held("team", "jobs").get("roots")).toEqual(["one"])
  })

  it("answers nothing where no page names it", () => {
    expect(held("team", "jobs").get("twig")).toBeNull()
  })

  it("is carried by a page whose type extends the one declaring it", () => {
    expect(held("squad", "jobs").get("alpha")).toEqual(["three"])
  })

  it("gathers from every page type extending the one the naming property is declared on", () => {
    expect(held("person", "leads").get("grace")).toEqual(["alpha"])
  })
})

describe("what a walk back reports as a fault", () => {
  it("names a `back-from` no property declares", () => {
    const found = deriver(ROOTS)
    found.rows("person")
    expect(found.faults()).toContain(
      "`back-from` on `person-nowhere` names `no-such-property`, which no property declares"
    )
  })

  it("names a property stating both, rather than reading one and dropping the other", () => {
    const found = deriver(ROOTS)
    found.rows("person")
    expect(found.faults()).toContain(
      "`person-both` states both `from` and `back-from`, and a property states one or the other"
    )
  })

  it("answers nothing for the property stating both", () => {
    expect(held("person", "both").get("ada")).toBeNull()
  })
})

describe("a resolved value read through every operator", () => {
  it("narrows a `where`", () => {
    expect(answer(ROOTS, { pageType: "job", where: [{ key: "owner", is: "ada" }] })?.n).toBe(2)
  })

  it("groups a `count-by`", () => {
    expect(answer(ROOTS, { pageType: "job", countBy: ["owner"] })?.groups).toEqual([
      { by: { owner: null }, n: 3 },
      { by: { owner: "ada" }, n: 2 },
      { by: { owner: "grace" }, n: 1 },
    ])
  })

  it("orders a `sort-by`", () => {
    const sorted = answer(ROOTS, { pageType: "job", sortBy: "owner", descending: true, limit: 1 })
    expect(sorted?.rows[0]?.values.owner).toBe("grace")
  })

  it("is carried back by `keys`", () => {
    const carried = answer(ROOTS, { pageType: "job", where: [{ key: "title", is: "through a subtype" }], keys: ["owner"] })
    expect(carried?.rows).toEqual([{ at: "akasha:pages/job/three.job.md", values: { owner: "grace" } }])
  })
})

describe("a large property, which is loaded only where it is asked for by name", () => {
  it("is carried where `keys` names it", () => {
    const got = answer(ROOTS, { pageType: "scroll", keys: ["words"] })
    expect(got?.rows[0]?.values.words).toBe("the words the page does not carry\n")
    expect(got?.omitted).toEqual([])
  })

  it("is left behind where the query names no `keys`, and the answer says which", () => {
    const got = answer(ROOTS, { pageType: "scroll" })
    expect(got?.rows[0]?.values.words).toBeUndefined()
    expect(got?.omitted).toEqual(["words"])
  })

  it("names only the large keys, never a value the answer did carry", () => {
    const got = answer(ROOTS, { pageType: "scroll" })
    expect(got?.rows[0]?.values.keeper).toBe("ada")
    expect(got?.omitted).not.toContain("keeper")
  })
})

describe("the type a property declared as a formula answers to", () => {
  it("is the return type the formula states, rather than the word `formula`", () => {
    expect(deriver(ROOTS).typeOf("gauge", "charged")).toBe("number")
  })

  it("is nothing where the formula states no return type, rather than a guess at one", () => {
    expect(deriver(ROOTS).typeOf("gauge", "unstated")).toBeNull()
  })

  it("is the stated type itself where the property is no formula", () => {
    expect(deriver(ROOTS).typeOf("gauge", "used")).toBe("number")
  })
})

describe("a formula read through every operator that turns on its type", () => {
  it("means a formula returning a number over the pages carrying it", () => {
    const got = answer(ROOTS, { pageType: "gauge", function: "mean", target: "charged" })
    expect(got!.value).toBe(9)
    expect(got!.over).toBe(3)
  })

  it("reads a `where` bound on a formula returning an instant as a moment", () => {
    const at = Date.parse("2026-06-01T00:00:00Z")
    const got = answer(ROOTS, { pageType: "gauge", where: [{ key: "seen", atOrAfter: NOW }] }, at)
    expect(got!.n).toBe(1)
  })

  it("orders a `sort-by` on a formula returning an instant by moment", () => {
    const sorted = answer(ROOTS, { pageType: "gauge", sortBy: "seen", descending: true, limit: 1 })
    expect(sorted!.rows[0]?.values.seen).toBe("10 Feb 2027")
  })
})

const site = (named: string, carries?: { readonly body: boolean }): Values =>
  deriver(ROOTS, carries).rows("site")!.find((row) => row.at.endsWith(`/${named}.site.md`))!.values

describe("a page's body", () => {
  it("is carried where it is asked for, a body being a property like any other", () => {
    expect(site("bodied", { body: true }).body).toContain("something under its frontmatter")
  })

  it("is left where it is not, so no answer carries every document it could have", () => {
    expect(site("bodied").body).toBeUndefined()
  })

  it("is nothing where the file holds only frontmatter, rather than an empty string", () => {
    expect(site("here", { body: true }).body).toBeNull()
  })

  it("reaches a query naming it among its keys, which is how a product asks for one", () => {
    const found = answer(ROOTS, { pageType: "site", keys: ["body"] })!
    const one = found.rows.find((row) => row.at.endsWith("/bodied.site.md"))!
    expect(one.values.body).toContain("something under its frontmatter")
  })

  it("is absent from a query not naming it, however the pages were read", () => {
    const found = answer(ROOTS, { pageType: "site", keys: ["slug"] })!
    expect(found.rows.every((row) => row.values.body === undefined)).toBe(true)
  })
})
