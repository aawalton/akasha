
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { handlerDerives, personaIsHers, principalIsPerson, refuseAnswering } from "../lib/seat-answering.ts"
import { fixture, type Fixture } from "./fixture.ts"
import { seatStore } from "./seat-fixture.ts"

let at: Fixture

beforeAll(() => {
  at = fixture()
  seatStore(at)
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
  at.document(
    "pages/persona/athena.persona.md",
    "slug: athena\ndomain-parent-slug: global\nchampioned-domain-slug: agent-harness\nrole-slug: lead",
    20
  )
  at.document("pages/persona/claude.persona.md", "slug: claude\ndomain-parent-slug: global", 20)
  at.document("pages/person/alan.person.md", "slug: alan\ndomain-parent-slug: global\nidentity-slug: amy", 20)
  at.document("pages/person/jenny.person.md", "slug: jenny\ndomain-parent-slug: global", 20)
})

afterAll(() => {
  at.dispose()
})

const refuse = (persona: string | null, principal: string | null): readonly string[] =>
  refuseAnswering(at.root, { persona, principal })

describe("who counts as a person", () => {
  test("a slug with a document under persons does", () => {
    expect(principalIsPerson(at.root, "alan")).toBe(true)
  })

  test("the fleet does not, so enrolling a person is the only way to add one", () => {
    expect(principalIsPerson(at.root, "agent")).toBe(false)
  })

  test("nothing stated does not", () => {
    expect(principalIsPerson(at.root, null)).toBe(false)
  })
})

describe("whose persona answers for somebody", () => {
  test("one the seat's persona property does not name as its default", () => {
    expect(personaIsHers(at.root, "athena")).toBe(true)
  })

  test("the default does not, which is what makes it the default", () => {
    expect(personaIsHers(at.root, "claude")).toBe(false)
  })
})

describe("a persona and a person as principal go together", () => {
  test("both stated stands", () => {
    expect(refuse("athena", "alan")).toEqual([])
  })

  test("neither stated stands, which is every seat working for the fleet", () => {
    expect(refuse("claude", "agent")).toEqual([])
  })

  test("a persona answering to the fleet is refused", () => {
    expect(refuse("athena", "agent")).toHaveLength(1)
  })

  test("a persona answering to nobody is refused", () => {
    expect(refuse("athena", null)).toHaveLength(1)
  })

  test("a person served by the default persona is refused", () => {
    expect(refuse("claude", "alan")).toHaveLength(1)
  })

  test("a person served by no persona at all is refused", () => {
    expect(refuse(null, "alan")).toHaveLength(1)
  })

  test("the refusal names the persons a seat may answer to, so the caller need not go looking", () => {
    expect(refuse("athena", "agent")[0]).toContain("jenny")
  })
})

describe("what a handler seat derives from the person it serves", () => {
  test("her identity as its persona and that person as its principal", () => {
    expect(handlerDerives(at.root, "handler", "alan")).toEqual({ persona: "amy", principal: "alan" })
  })

  test("nothing where the person names no identity, rather than guessing one", () => {
    expect(handlerDerives(at.root, "handler", "jenny")).toEqual({ persona: null, principal: "jenny" })
  })

  test("nothing for any other role, the domain then being a subject rather than a person", () => {
    expect(handlerDerives(at.root, "lead", "alan")).toEqual({ persona: null, principal: null })
  })

  test("nothing where the domain is no person, a handler stating one as its domain", () => {
    expect(handlerDerives(at.root, "handler", "agent-harness")).toEqual({ persona: null, principal: null })
  })
})
