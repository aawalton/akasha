import { describe, expect, test } from "bun:test"
import { decideBlockedPrincipal } from "../lib/decide-blocked-principal.ts"

describe("who is shown to be waiting on a seat", () => {
  test("nobody is, whatever the seat is named — no work is tracked as a project, and nothing else binds a seat to a waiting party", () => {
    expect(decideBlockedPrincipal({ agentName: "athena-developer" }).kind).toBe("unresolved")
  })

  test("the reason names the seat asked about, so a caller can put the answer somewhere a reader will see", () => {
    const answer = decideBlockedPrincipal({ agentName: "athena-developer" })
    expect(answer.reason).toContain("athena-developer")
  })

  test("an unnamed seat is answered rather than refused, the caller having nothing else to print", () => {
    const answer = decideBlockedPrincipal({ agentName: null })
    expect(answer.kind).toBe("unresolved")
    expect(answer.reason).toContain("(unnamed)")
  })
})
