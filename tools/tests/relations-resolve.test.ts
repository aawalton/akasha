import { existsSync, readFileSync } from "node:fs"
import { afterAll, afterEach, beforeEach, describe, expect, test } from "bun:test"
import { relationsResolve } from "../gates/relations-resolve.ts"
import type { Subject } from "../lib/gate.ts"
import type { Stated } from "../../page/index/identity/identity.ts"
import { anchorIndex } from "./index-anchor.ts"
import { fixture, type Fixture, documentBody } from "./fixture.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const PAGE_TYPES: readonly string[] = ["page", "team", "person", "lead"]

const anchor = anchorIndex("relations-resolve")
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

function pageType(slug: string, above: string): string {
  return `page-type-slug: page-type\nslug: ${slug}\nextends-slug: ${above}`
}

function property(slug: string, on: string, key: string, type: string, target: string): string {
  return `page-type-slug: page-property-definition\nslug: ${slug}\ndefined-on-slug: ${on}\nkey: ${key}\ntype: ${type}\ntarget-slug: ${target}`
}

function address(slug: string, on: string, key: string, target: string | null): string {
  const bound = target === null ? "" : `\ntarget-slug: ${target}`
  return `page-type-slug: page-property-definition\nslug: ${slug}\ndefined-on-slug: ${on}\nkey: ${key}\ntype: relation-address${bound}`
}

beforeEach(() => {
  anchor.keep(PAGE_TYPES.map(indexRow))
  at = fixture()
  at.document("pages/page-type/page.page-type.md", pageType("page", "none"))
  at.document("pages/page-type/team.page-type.md", pageType("team", "page"))
  at.document("pages/page-type/person.page-type.md", pageType("person", "page"))
  at.document("pages/page-type/lead.page-type.md", pageType("lead", "person"))
  at.document("pages/page-property-definition/person-team.page-property-definition.md", property("person-team", "person", "team-slug", "relation-slug", "team"))
  at.document("pages/page-property-definition/team-head.page-property-definition.md", property("team-head", "team", "head-slug", "relation-slug", "person"))
  at.document("pages/page-property-definition/team-parent.page-property-definition.md", property("team-parent", "team", "parent-seq", "relation-seq", "team"))
  at.document("pages/page-property-definition/person-home.page-property-definition.md", address("person-home", "person", "home-address", null))
  at.document("pages/page-property-definition/person-post.page-property-definition.md", address("person-post", "person", "post-address", "team"))
  at.document("pages/team/red.team.md", "page-type-slug: team\nslug: red\nseq: 7")
  at.document("pages/lead/cara.lead.md", "page-type-slug: lead\nslug: cara")
})
afterEach(() => at.dispose())

function subject(relPath: string, body: string, alsoPending: Record<string, string> = {}): Subject {
  const bodies = new Map<string, string>([[relPath, body], ...Object.entries(alsoPending)])
  const relative = (absolutePath: string): string => absolutePath.slice(at.root.length + 1)
  return {
    relPath,
    body,
    roots: rootsNamed({ akasha: at.root }),
    agent: "agent-one",
    mechanical: false,
    exists: (absolutePath) => bodies.has(relative(absolutePath)) || existsSync(absolutePath),
    read: (absolutePath) =>
      bodies.get(relative(absolutePath)) ?? (existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : null),
    pending: new Set(bodies.keys()),
  }
}

function person(frontmatter: string): string {
  return documentBody(`page-type-slug: person\n${frontmatter}`)
}

describe("a relation naming a page that stands", () => {
  test("resolves against the slug that page states", () => {
    expect(relationsResolve(subject("pages/person/ana.person.md", person("slug: ana\nteam-slug: red"))).verdict).toBe("pass")
  })

  test("resolves against a page of a type beneath the target", () => {
    const body = documentBody("page-type-slug: team\nslug: blue\nhead-slug: cara")
    expect(relationsResolve(subject("pages/team/blue.team.md", body)).verdict).toBe("pass")
  })

  test("resolves a seq relation against the seq that page states", () => {
    const body = documentBody("page-type-slug: team\nslug: blue\nparent-seq: 7")
    expect(relationsResolve(subject("pages/team/blue.team.md", body)).verdict).toBe("pass")
  })
})

describe("a relation naming a page that stands nowhere", () => {
  test("is refused, and the key and the target are named", () => {
    const outcome = relationsResolve(subject("pages/person/ana.person.md", person("slug: ana\nteam-slug: gone")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages.join("\n")).toContain("`team-slug` names `gone`")
    expect(outcome.messages.join("\n")).toContain("`team`")
  })

  test("is refused where the page it names stands under some other target", () => {
    const outcome = relationsResolve(subject("pages/person/ana.person.md", person("slug: ana\nteam-slug: cara")))
    expect(outcome.verdict).toBe("fail")
  })

  test("is refused where a seq relation names a seq nothing carries", () => {
    const body = documentBody("page-type-slug: team\nslug: blue\nparent-seq: 9")
    expect(relationsResolve(subject("pages/team/blue.team.md", body)).verdict).toBe("fail")
  })
})

describe("two documents landing in one call", () => {
  test("resolve against each other, though neither is on the disk yet", () => {
    const also = { "pages/team/green.team.md": documentBody("page-type-slug: team\nslug: green") }
    expect(relationsResolve(subject("pages/person/ana.person.md", person("slug: ana\nteam-slug: green"), also)).verdict).toBe(
      "pass"
    )
  })

  test("and the same write alone is refused, so the pass is the sibling's doing", () => {
    expect(relationsResolve(subject("pages/person/ana.person.md", person("slug: ana\nteam-slug: green"))).verdict).toBe("fail")
  })
})

describe("a file naming no relation", () => {
  test("stating none of the keys is not applicable rather than passing", () => {
    expect(relationsResolve(subject("pages/person/ana.person.md", person("slug: ana"))).verdict).toBe("not-applicable")
  })

  test("a source file carries no frontmatter and is not applicable", () => {
    expect(relationsResolve(subject("tools/thing.ts", "export const thing = 1\n")).verdict).toBe("not-applicable")
  })

  test("under quarantine it is not applicable, whatever it names", () => {
    expect(relationsResolve(subject("dirty/pages/person/ana.person.md", person("slug: ana\nteam-slug: gone"))).verdict).toBe(
      "not-applicable"
    )
  })
})

describe("a page whose frontmatter is reached but does not read", () => {
  const broken = documentBody("page-type-slug: person\nslug: ana\nteam-slug: red\nthis line is neither a key nor a list item")

  test("is refused rather than passed over as naming nothing", () => {
    const outcome = relationsResolve(subject("pages/person/ana.person.md", broken))
    expect(outcome.verdict).toBe("fail")
  })

  test("says what stopped it, so the refusal names itself", () => {
    const outcome = relationsResolve(subject("pages/person/ana.person.md", broken))
    expect(outcome.messages.join("\n")).toContain("not a key, a list item, or part of one")
  })
})

describe("a relation whose target on disk does not read", () => {
  beforeEach(() => {
    at.put("pages/team/gold.team.md", documentBody("page-type-slug: team\nslug: gold\nthis line is neither a key nor a list item"))
  })

  test("is refused, and the page that could not be read is named", () => {
    const outcome = relationsResolve(subject("pages/person/ana.person.md", person("slug: ana\nteam-slug: gold")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages.join("\n")).toContain("pages/team/gold.team.md")
  })

  test("is not reported as a target that stands nowhere, which is what it is not", () => {
    const outcome = relationsResolve(subject("pages/person/ana.person.md", person("slug: ana\nteam-slug: gold")))
    expect(outcome.messages.join("\n")).toContain("could not be read")
  })
})

describe("a relation address, which carries its page type in the value", () => {
  test("resolves where a page of the type it names carries the slug it names", () => {
    const body = person("slug: ana\nhome-address: team/red")
    expect(relationsResolve(subject("pages/person/ana.person.md", body)).verdict).toBe("pass")
  })

  test("reaches a page type no target names, nothing on the definition bounding it", () => {
    const body = person("slug: ana\nhome-address: lead/cara")
    expect(relationsResolve(subject("pages/person/ana.person.md", body)).verdict).toBe("pass")
  })

  test("is refused where that slug stands under some other page type", () => {
    const body = person("slug: ana\nhome-address: person/red")
    expect(relationsResolve(subject("pages/person/ana.person.md", body)).verdict).toBe("fail")
  })

  test("is refused where the value is a bare slug, which names no page type", () => {
    const body = person("slug: ana\nhome-address: red")
    expect(relationsResolve(subject("pages/person/ana.person.md", body)).verdict).toBe("fail")
  })
})

describe("a relation address a target bounds", () => {
  test("resolves where the value names a page type standing under that target", () => {
    const body = person("slug: ana\npost-address: team/red")
    expect(relationsResolve(subject("pages/person/ana.person.md", body)).verdict).toBe("pass")
  })

  test("is refused where the value names a page type outside it", () => {
    const body = person("slug: ana\npost-address: lead/cara")
    expect(relationsResolve(subject("pages/person/ana.person.md", body)).verdict).toBe("fail")
  })

  test("is refused where the value is the bare slug the target alone would have found", () => {
    const body = person("slug: ana\npost-address: red")
    expect(relationsResolve(subject("pages/person/ana.person.md", body)).verdict).toBe("fail")
  })
})

describe("a property document that does not read", () => {
  test("refuses every page judged against it, rather than dropping the relation", () => {
    at.put("pages/page-property-definition/person-team.page-property-definition.md", documentBody("page-type-slug: page-property-definition\nslug: person-team\nthis line is neither a key nor a list item"))
    const outcome = relationsResolve(subject("pages/person/ana.person.md", person("slug: ana\nteam-slug: red")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages.join("\n")).toContain("pages/page-property-definition/person-team.page-property-definition.md")
  })
})
