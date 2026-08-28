import { existsSync, readFileSync } from "node:fs"
import { afterAll, afterEach, beforeEach, describe, expect, test } from "bun:test"
import { domainEdges } from "../audits/domain-edges.ts"
import { type RepoView, listDocuments } from "../lib/check.ts"
import { refusalText } from "../../refusal/refusal.ts"
import type { Stated } from "../../page/index/identity/identity.ts"
import { anchorIndex } from "./index-anchor.ts"
import { fixture, type Fixture } from "./fixture.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const claiming = (id: string, slug: string): string =>
  [
    "---",
    `id: ${id}`,
    "page-type-slug: page-type",
    "extends-slug: page",
    `files: akasha:**/*.${slug}.md`,
    `slug: ${slug}`,
    "domain-parent-slug: global",
    "---",
    "",
  ].join("\n")

const PAGE_TYPES: readonly string[] = ["persona", "domain", "exercise"]

const anchor = anchorIndex("domain-edges")
afterAll(() => anchor.discard())

const indexRow = (slug: string): Stated => ({
  repo: "akasha",
  key: `pages/page-type/${slug}.page-type.md`,
  stem: slug,
  type: "page-type",
  id: null,
  slug,
  seq: null,
  extension: null,
  ending: null,
  heading: null,
})

let at: Fixture

beforeEach(() => {
  anchor.keep(PAGE_TYPES.map(indexRow))
  at = fixture()
  at.document(
    "pages/persona/aine.persona.md",
    "slug: aine\ndomain-parent-slug: persona\nchampioned-domain-slug: global"
  )
  at.put(
    "pages/page-type/persona.page-type.md",
    claiming("019ffe77-4933-7000-a73e-4c889acee68f", "persona")
  )
  at.put(
    "pages/page-type/domain.page-type.md",
    claiming("019ffe30-e158-7000-8ab9-73591dbe0225", "domain")
  )
  at.document(
    "pages/domain/global.domain.md",
    "slug: global\ndomain-parent-slug: global\npersona-champion-slug: aine"
  )
  at.document("pages/domain/coding.domain.md", "slug: code\ndomain-parent-slug: global")
})
afterEach(() => at.dispose())

function repo(): RepoView {
  return {
    roots: rootsNamed({ akasha: at.root }),
    name: "akasha",
    documents: listDocuments(at.root),
    read: (relPath) => readFileSync(`${at.root}/${relPath}`, "utf8"),
    exists: existsSync,
  }
}

const says = (slug: string, values: Readonly<Record<string, string>>): string =>
  refusalText(slug, values, at.root)

function domain(slug: string, parents: readonly string[]): void {
  const named = parents.length === 1 ? ` ${parents[0]}` : parents.map((p) => `\n  - ${p}`).join("")
  at.document(`pages/domain/${slug}.domain.md`, `slug: ${slug}\ndomain-parent-slug:${named}`)
}

describe("a domain with one parent", () => {
  test("needs no ownership edge, that parent being the only one to descend", () => {
    domain("kid", ["global"])
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("pass")
  })
})

describe("the persona a domain names as its owner", () => {
  test("is refused where no document declares that slug", () => {
    at.document(
      "pages/domain/orphan.domain.md",
      "slug: orphan\ndomain-parent-slug: global\npersona-champion-slug: nobody"
    )
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("persona-champion-unresolved", {
        path: "pages/domain/orphan.domain.md",
        persona: "nobody",
      })
    )
  })

  test("is refused where the slug resolves to something that is not a persona", () => {
    at.document(
      "pages/domain/odd.domain.md",
      "slug: odd\ndomain-parent-slug: global\npersona-champion-slug: code"
    )
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("persona-champion-not-a-persona", {
        path: "pages/domain/odd.domain.md",
        persona: "code",
        at: "pages/domain/coding.domain.md",
        kind: "a domain document",
      })
    )
  })

  test("is refused where two domains name her, one domain being all she champions", () => {
    at.document(
      "pages/domain/first.domain.md",
      "slug: first\ndomain-parent-slug: global\npersona-champion-slug: aine"
    )
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("persona-champion-claimed-twice", {
        persona: "aine",
        count: "2",
        claimants: "pages/domain/first.domain.md, pages/domain/global.domain.md",
      })
    )
  })
})

describe("the descent from a domain", () => {
  test("reaching a named persona is what makes coverage total, and is counted", () => {
    domain("kid", ["global"])
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("pass")
    expect(outcome.detail).toContain(
      "1 persona(s) champion a domain of which 1 are named back, and 0 domain(s) reach none"
    )
  })

  test("running off the end is refused, the domain answering to nobody", () => {
    at.document("pages/domain/adrift.domain.md", "slug: adrift\ndomain-parent-slug: adrift")
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("domain-unchampioned", { path: "pages/domain/adrift.domain.md" })
    )
  })
})

describe("a page whose page type is not a domain", () => {
  test("is left out of the descent, only a domain answering to a persona", () => {
    at.put(
      "pages/page-type/exercise.page-type.md",
      [
        "---",
        "id: 019ebc75-6f5a-78c2-80a1-cd1a8ea22b0c",
        "extends-slug: page",
        "files: akasha:pages/exercise/**/*.md",
        "slug: exercise",
        "domain-parent-slug: global",
        "---",
        "",
      ].join("\n")
    )
    at.document("pages/exercise/ab-roller.exercise.md", "page-type-slug: exercise\nslug: ab-roller")
    const outcome = domainEdges(repo())
    expect(outcome.messages).not.toContain(
      says("domain-unchampioned", { path: "pages/exercise/ab-roller.exercise.md" })
    )
    expect(outcome.verdict).toBe("pass")
  })
})

describe("the two ends of one ownership statement", () => {
  test("refuse a persona holding a slug no document declares", () => {
    at.document(
      "pages/persona/vex.persona.md",
      "slug: vex\ndomain-parent-slug: persona\nchampioned-domain-slug: nowhere"
    )
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("championed-domain-unresolved", {
        path: "pages/persona/vex.persona.md",
        slug: "nowhere",
      })
    )
  })

  test("refuse a persona holding a domain that names nobody back", () => {
    at.document(
      "pages/persona/vex.persona.md",
      "slug: vex\ndomain-parent-slug: persona\nchampioned-domain-slug: code"
    )
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("championed-domain-unnamed-back", {
        path: "pages/persona/vex.persona.md",
        her: "vex",
        holds: "code",
        at: "pages/domain/coding.domain.md",
      })
    )
  })

  test("refuse a persona holding a domain that names somebody else", () => {
    at.document(
      "pages/persona/vex.persona.md",
      "slug: vex\ndomain-parent-slug: persona\nchampioned-domain-slug: global"
    )
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("championed-domain-claimed-by-another", {
        path: "pages/persona/vex.persona.md",
        her: "vex",
        holds: "global",
        at: "pages/domain/global.domain.md",
        persona: "aine",
      })
    )
  })

  test("refuse a domain naming a persona who holds nothing, which her end cannot see", () => {
    at.document("pages/persona/vex.persona.md", "slug: vex\ndomain-parent-slug: persona")
    at.document(
      "pages/domain/spare.domain.md",
      "slug: spare\ndomain-parent-slug: global\npersona-champion-slug: vex"
    )
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("persona-champion-unreciprocated", {
        path: "pages/domain/spare.domain.md",
        slug: "spare",
        persona: "vex",
        at: "pages/persona/vex.persona.md",
      })
    )
  })

  test("refuse a domain naming a persona who holds a different one", () => {
    at.document(
      "pages/persona/vex.persona.md",
      "slug: vex\ndomain-parent-slug: persona\nchampioned-domain-slug: code"
    )
    at.document(
      "pages/domain/spare.domain.md",
      "slug: spare\ndomain-parent-slug: global\npersona-champion-slug: vex"
    )
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("persona-champion-names-another", {
        path: "pages/domain/spare.domain.md",
        slug: "spare",
        persona: "vex",
        at: "pages/persona/vex.persona.md",
        holds: "code",
      })
    )
  })

  test("pass a persona championing nothing whom no domain names, authorship being absent rather than owed", () => {
    at.document("pages/persona/claude.persona.md", "slug: claude\ndomain-parent-slug: persona")
    const outcome = domainEdges(repo())
    expect(outcome.verdict).toBe("pass")
    expect(outcome.detail).toContain("1 persona(s) champion a domain of which 1 are named back")
  })
})
