
import { describe, expect, test } from "bun:test"
import {
  type DomainOwnerWalk,
  decideDomainLead,
  recipientFromLead,
} from "../lib/decide-domain-lead.ts"

const reached = (persona: string, at: string): DomainOwnerWalk => ({ declared: true, persona, at })

describe("decideDomainLead", () => {
  test("a domain resolves to the persona the descent reached", () => {
    expect(decideDomainLead("agent-harness", reached("athena", "pages/domain/agent-harness.domain.md"))).toEqual({
      kind: "lead",
      handle: "athena",
    })
  })

  test("a slug no document declares is unresolved and names the slug back", () => {
    const decision = decideDomainLead("nonesuch", { declared: false, persona: null, at: null })
    expect(decision.kind).toBe("unresolved")
    if (decision.kind === "unresolved") expect(decision.reason).toContain("nonesuch")
  })

  test("a descent reaching no persona-champion-slug is unresolved rather than an answer naming nobody", () => {
    const decision = decideDomainLead("orphan", { declared: true, persona: null, at: null })
    expect(decision.kind).toBe("unresolved")
  })

  test("a domain of nothing but space is refused before anything is searched for", () => {
    expect(decideDomainLead("", reached("athena", "pages/domain/agent-harness.domain.md")).kind).toBe("unresolved")
  })

  test("surrounding space on the domain does not change what it names", () => {
    expect(decideDomainLead("  infra ", reached("aranya", "pages/domain/infrastructure.domain.md"))).toEqual({
      kind: "lead",
      handle: "aranya",
    })
  })

  test("a persona of nothing but space is unresolved rather than an empty handle", () => {
    expect(decideDomainLead("infra", reached("  ", "pages/domain/infrastructure.domain.md")).kind).toBe("unresolved")
  })
})

describe("recipientFromLead", () => {
  test("a resolved lead is the recipient and nothing is reported", () => {
    expect(recipientFromLead({ kind: "lead", handle: "aranya" }, "dalla")).toEqual({
      handle: "aranya",
      defaultedBecause: null,
    })
  })

  test("an unresolved lead falls to the stated default and REPORTS why, never silently", () => {
    const r = recipientFromLead({ kind: "unresolved", reason: "nobody claims 'infra'" }, "dalla")
    expect(r.handle).toBe("dalla")
    expect(r.defaultedBecause).toContain("nobody claims 'infra'")
    expect(r.defaultedBecause).toContain("dalla")
  })

  test("the default is never an empty recipient — a blank default is itself reported", () => {
    const r = recipientFromLead({ kind: "unresolved", reason: "no rows" }, "  ")
    expect(r.handle).toBe("")
    expect(r.defaultedBecause).not.toBeNull()
  })
})
