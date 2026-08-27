import { describe, expect, test } from "bun:test"
import type { DomainOwnerWalk } from "../lib/decide-domain-lead.ts"
import {
  type DomainOwnerReader,
  resolveBlockedPrincipal,
  resolveDomainLead,
  resolveDomainLeadOrDefault,
} from "../lib/recipient-derivation.ts"

describe("the blocked-principal answer", () => {
  test("every seat is unresolved, nothing binding one to work another party waits on", async () => {
    const answer = await resolveBlockedPrincipal("athena-developer")
    expect(answer.kind).toBe("unresolved")
  })

  test("the reason names the seat asked about rather than answering with nobody", async () => {
    const answer = await resolveBlockedPrincipal("athena-developer")
    expect(answer.reason).toContain("athena-developer")
  })
})

describe("the domain-lead walk", () => {
  const reached = (persona: string | null, at: string | null): DomainOwnerWalk => ({
    declared: true,
    persona,
    at,
  })

  test("the domain asked about is the domain the descent is run from", async () => {
    const asked: string[] = []
    const walk: DomainOwnerReader = (domain) => {
      asked.push(domain)
      return reached("athena", "pages/domain/agent-harness.domain.md")
    }
    expect(await resolveDomainLead("agent-harness", walk)).toEqual({
      kind: "lead",
      handle: "athena",
    })
    expect(asked).toEqual(["agent-harness"])
  })

  test("a slug no document declares is unresolved rather than defaulted here", async () => {
    const answer = await resolveDomainLead("nonesuch", () => ({
      declared: false,
      persona: null,
      at: null,
    }))
    expect(answer.kind).toBe("unresolved")
  })

  test("a descent that throws becomes the unresolved arm rather than an exception", async () => {
    const answer = await resolveDomainLead("agent-harness", () => {
      throw new Error("pages unreadable")
    })
    expect(answer.kind).toBe("unresolved")
    if (answer.kind === "unresolved") expect(answer.reason).toContain("pages unreadable")
  })

  test("the default is composed from whatever the descent answered, failure included", async () => {
    const resolved = await resolveDomainLeadOrDefault("agent-harness", "athena", () =>
      reached("athena", "pages/domain/agent-harness.domain.md")
    )
    expect(resolved).toEqual({ handle: "athena", defaultedBecause: null })

    const fellBack = await resolveDomainLeadOrDefault("agent-harness", "athena", () => {
      throw new Error("pages unreadable")
    })
    expect(fellBack.handle).toBe("athena")
    expect(fellBack.defaultedBecause).not.toBeNull()
  })
})
