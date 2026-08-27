import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { relationsResolve } from "../audits/relations-resolve.ts"
import type { RepoView } from "../lib/check.ts"

let root = ""

function put(rel: string, frontmatter: string): void {
  const file = `${root}/${rel}`
  mkdirSync(file.slice(0, file.lastIndexOf("/")), { recursive: true })
  writeFileSync(file, `---\n${frontmatter}\n---\n\n# Definition\n\n- **One** — a thing.\n`)
}

function view(): RepoView {
  return {
    roots: { instructions: root } as unknown as RepoView["roots"],
    name: "instructions",
    documents: [],
    read: () => "",
    exists: () => false,
  }
}

beforeAll(() => {
  root = mkdtempSync("/var/tmp/relations-audit-")
  put("pages/page-type/page.page-type.md", "page-type-slug: page-type\nslug: page\nextends-slug: none\nfiles: none")
  put(
    "pages/page-type/team.md",
    "page-type-slug: page-type\nslug: team\nextends-slug: page\nfiles: instructions:pages/team/**/*.md"
  )
  put(
    "pages/page-type/person.page-type.md",
    "page-type-slug: page-type\nslug: person\nextends-slug: page\nfiles: instructions:pages/person/**/*.md"
  )
  put(
    "pages/page-property-definition/person-team.page-property-definition.md",
    "page-type-slug: page-property-definition\nslug: person-team\ndefined-on-slug: person\nkey: team-slug\ntype: relation-slug\ntarget-slug: team"
  )
  put("pages/team/red.md", "page-type-slug: team\nslug: red")
  put("pages/person/ana.md", "page-type-slug: person\nslug: ana\nteam-slug: red")
})

afterAll(() => rmSync(root, { recursive: true, force: true }))

describe("the relations audit over a whole repository", () => {
  test("passes where every relation names a page that stands, over a population it counted", () => {
    const outcome = relationsResolve(view())
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBeGreaterThan(0)
    expect(outcome.messages).toEqual([])
  })

  test("refuses the planted case, naming the key and the value that reaches nothing", () => {
    put("pages/person/ana.md", "page-type-slug: person\nslug: ana\nteam-slug: gone")
    const outcome = relationsResolve(view())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages.join("\n")).toContain("`team-slug` names `gone`")
    expect(outcome.messages.join("\n")).toContain("pages/person/ana.md")
  })

  test("passes again once the planted case is put back, so the refusal was the fault not the walk", () => {
    put("pages/person/ana.md", "page-type-slug: person\nslug: ana\nteam-slug: red")
    expect(relationsResolve(view()).verdict).toBe("pass")
  })
})
