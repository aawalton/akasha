
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import {
  type NameableSeat,
  type Principal,
  composeSeatName,
  identityHeardFrom,
  personaDefaultsOf,
} from "../lib/compose-seat-name.ts"
import { fixture, type Fixture } from "./fixture.ts"
import { seatStore } from "./seat-fixture.ts"

function plant(at: Fixture): void {
  seatStore(at)
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
  at.document(
    "pages/persona/athena.persona.md",
    "slug: athena\ndomain-parent-slug: global\nchampioned-domain-slug: agent-harness\nrole-slug: lead",
    20
  )
  at.document("pages/persona/claude.persona.md", "slug: claude\ndomain-parent-slug: global", 20)
  at.document("pages/person/alan.person.md", "slug: alan\ndomain-parent-slug: person\nidentity-slug: amy", 20)
  at.document("pages/person/ki.person.md", "slug: ki\ndomain-parent-slug: person\nidentity-slug: amy", 20)
  at.document("pages/person/jenny.person.md", "slug: jenny\ndomain-parent-slug: person", 20)
}

function seat(
  principal: Principal | null,
  stated: Partial<{ persona: string; domain: string; role: string; flex: string }>
): NameableSeat {
  return {
    attributes: {
      persona: stated.persona ?? null,
      domain: stated.domain ?? null,
      role: stated.role ?? null,
    },
    flex: stated.flex ?? null,
    principal,
  }
}

let fixtureAt: Fixture

beforeAll(() => {
  fixtureAt = fixture()
  plant(fixtureAt)
})

afterAll(() => {
  fixtureAt.dispose()
})

function spell(seat: NameableSeat): string | null {
  return composeSeatName(seat, fixtureAt.root)
}

describe("what a persona's document says she holds by default", () => {
  test("both attributes, where she declares both", () => {
    const at = fixture()
    try {
      plant(at)
      expect(personaDefaultsOf(at.root, "athena")).toEqual({ domain: "agent-harness", role: "lead" })
    } finally {
      at.dispose()
    }
  })

  test("neither, where she declares neither — `claude` is the absence of authorship, so a default here would name a working domain for every seat nothing was authored over", () => {
    const at = fixture()
    try {
      plant(at)
      expect(personaDefaultsOf(at.root, "claude")).toEqual({ domain: null, role: null })
    } finally {
      at.dispose()
    }
  })

  test("`null` for a persona nothing declares, which is not the same as one declaring nothing — her document may not have landed", () => {
    const at = fixture()
    try {
      plant(at)
      expect(personaDefaultsOf(at.root, "nobody")).toBeNull()
    } finally {
      at.dispose()
    }
  })
})

describe("who a person hears from", () => {
  test("the identity their own document names, that document being the one place a person says it", () => {
    const at = fixture()
    try {
      plant(at)
      expect(identityHeardFrom(at.root, "alan")).toBe("amy")
      expect(identityHeardFrom(at.root, "ki")).toBe("amy")
    } finally {
      at.dispose()
    }
  })

  test("`null` where the person names none, and `null` again where no document names the person at all — a seat cannot tell the two apart and neither spells an identity", () => {
    const at = fixture()
    try {
      plant(at)
      expect(identityHeardFrom(at.root, "jenny")).toBeNull()
      expect(identityHeardFrom(at.root, "dana")).toBeNull()
    } finally {
      at.dispose()
    }
  })
})

describe("Alan's principal takes the persona's name and nothing else", () => {
  test("her name alone, whatever domain and role stand beside it", () => {
    expect(spell(seat("alan", { persona: "athena", domain: "agent-harness", role: "lead" }))).toBe("athena")
    expect(spell(seat("alan", { persona: "athena", domain: "memory", role: "reviewer" }))).toBe("athena")
  })

  test("nor the flex, so two of her seats at once would spell one name — which is the shape of a persona sitting in at most one seat at a time", () => {
    expect(spell(seat("alan", { persona: "athena", flex: "flex-2" }))).toBe("athena")
  })

  test("the default persona is no address he types, so his seat holding it takes the long form instead", () => {
    expect(spell(seat("alan", { persona: "claude", domain: "code-harness", role: "lead" }))).toBe(
      "code-harness-lead"
    )
  })

  test("a seat of his stating no persona takes that same long form, an unstated attribute being its default rather than absent", () => {
    expect(spell(seat("alan", { domain: "memory", role: "worker" }))).toBe("memory-worker")
  })

  test("and one holding the default beside nothing else spells no name at all", () => {
    expect(spell(seat("alan", { persona: "claude" }))).toBeNull()
  })
})

describe("a handler spells the person it serves, and nothing else", () => {
  test("the person alone, and the role is what makes this form rather than the principal — Alan's own handler would otherwise answer to the same name as every other seat of his", () => {
    expect(spell(seat("alan", { domain: "alan", role: "handler" }))).toBe("alan")
    expect(spell(seat("agent", { domain: "ki", role: "handler" }))).toBe("ki")
  })

  test("a persona stated on the seat is dropped rather than spelled — one persona serves several people, so spelling her would give their handlers one address between them", () => {
    expect(spell(seat("agent", { persona: "thea", domain: "ki", role: "handler" }))).toBe("ki")
    expect(spell(seat("alan", { persona: "athena", domain: "alan", role: "handler" }))).toBe("alan")
  })

  test("any other role of his takes the short form, so what carries the exception is the role and not the person served", () => {
    expect(spell(seat("alan", { persona: "amy", domain: "alan", role: "definer" }))).toBe("amy")
  })

  test("a person whose document names no identity spells the same way, the identity reaching the name on no path at all", () => {
    expect(spell(seat("agent", { domain: "jenny", role: "handler" }))).toBe("jenny")
    expect(spell(seat("agent", { domain: "dana", role: "handler" }))).toBe("dana")
  })

  test("no flex and no assignment reach a handler's name either", () => {
    expect(
      spell(
        seat("agent", {
          persona: "amy",
          domain: "alan",
          role: "handler",
          flex: "flex-2",
        })
      )
    ).toBe("alan")
  })
})

describe("every other seat spells everything it states except its persona", () => {
  test("domain and role, the persona dropped — such a seat is reached by what it is doing rather than by who it is", () => {
    expect(
      spell(seat("agent", { persona: "athena", domain: "agent-harness", role: "lead" }))
    ).toBe("agent-harness-lead")
  })

  test("a dispatch seat carrying no persona spells the same name one carrying a persona does, which is what makes the name say what the seat is doing and nothing about its authorship", () => {
    expect(spell(seat("agent", { domain: "memory", role: "worker" }))).toBe("memory-worker")
  })

  test("an unrecorded principal takes this form and not the short one — the short one is Alan's address for a persona, and answering silence with it would name a seat he never took", () => {
    expect(spell(seat(null, { persona: "athena", domain: "agent-harness", role: "lead" }))).toBe(
      "agent-harness-lead"
    )
  })
})

describe("the flex property", () => {
  test("it spells after the attributes, which is what tells two otherwise identical seats apart", () => {
    expect(spell(seat("agent", { domain: "memory", role: "worker", flex: "flex-2" }))).toBe(
      "memory-worker-flex-2"
    )
  })

  test("a value that is not `flex-` and a number spells no name rather than one that reads as something else, and it refuses even under a form that would have dropped the flex", () => {
    expect(spell(seat("agent", { domain: "memory", role: "worker", flex: "flex" }))).toBeNull()
    expect(spell(seat("agent", { domain: "memory", role: "worker", flex: "flex-01" }))).toBeNull()
    expect(spell(seat("alan", { persona: "athena", flex: "spare" }))).toBeNull()
    expect(spell(seat("alan", { persona: "amy", domain: "alan", role: "handler", flex: "spare" }))).toBeNull()
  })
})

describe("what spells no name at all", () => {
  test("a seat stating nothing nameable spells `null` rather than the empty string, which is a name `ops seat send` could never reach", () => {
    expect(spell(seat(null, {}))).toBeNull()
    expect(spell(seat(null, { persona: "" }))).toBeNull()
  })

})
