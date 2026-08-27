
import { describe, expect, it } from "bun:test"
import { type StandingSubagent, decideSubagentGuard } from "../lib/subagent-guard.ts"

const ONE: readonly StandingSubagent[] = [{ name: "thea--a1", dispatchedAs: "Explore" }]

const TWO: readonly StandingSubagent[] = [
  { name: "thea--a1", dispatchedAs: "Explore" },
  { name: "thea--a2", dispatchedAs: "general-purpose" },
]

const against = (over: Partial<Parameters<typeof decideSubagentGuard>[0]>) =>
  decideSubagentGuard({
    standing: TWO,
    targetLive: true,
    force: false,
    seatName: "thea",
    act: "Stopping",
    ...over,
  })

describe("decideSubagentGuard — work standing on a live seat is what refuses", () => {
  it("subagents working and no force refuses", () => {
    const d = against({})
    expect(d.kind).toBe("reject")
    if (d.kind !== "reject") throw new Error("expected reject")
    expect(d.basis).toBe("subagents-working")
  })

  it("force admits the very case that would otherwise refuse", () => {
    expect(against({ force: true }).kind).toBe("allow")
  })

  it("nothing standing admits", () => {
    expect(against({ standing: [] }).kind).toBe("allow")
  })

  it("a target already stopped admits whatever pages stand, they being dead with it", () => {
    expect(against({ targetLive: false }).kind).toBe("allow")
    expect(against({ targetLive: false, standing: ONE }).kind).toBe("allow")
  })
})

describe("the refusal says what stands and how to get past it", () => {
  it("names the seat, the count and every kind dispatched", () => {
    const d = against({})
    if (d.kind !== "reject") throw new Error("expected reject")
    expect(d.reason).toContain("thea")
    expect(d.reason).toContain("2 subagents")
    expect(d.reason).toContain("Explore")
    expect(d.reason).toContain("general-purpose")
  })

  it("names --force as the way through", () => {
    const d = against({})
    if (d.kind !== "reject") throw new Error("expected reject")
    expect(d.reason).toContain("--force")
  })

  it("carries the act it was asked about, so stop and restart do not read alike", () => {
    const stopping = against({})
    const restarting = against({ act: "Restarting" })
    if (stopping.kind !== "reject" || restarting.kind !== "reject") {
      throw new Error("expected reject")
    }
    expect(stopping.reason).toContain("Stopping")
    expect(restarting.reason).toContain("Restarting")
  })

  it("counts one subagent in the singular", () => {
    const d = against({ standing: ONE })
    if (d.kind !== "reject") throw new Error("expected reject")
    expect(d.reason).toContain("1 subagent working")
    expect(d.reason).not.toContain("subagents")
  })

  it("names a repeated kind once rather than per subagent", () => {
    const d = against({
      standing: [
        { name: "thea--a1", dispatchedAs: "Explore" },
        { name: "thea--a2", dispatchedAs: "Explore" },
      ],
    })
    if (d.kind !== "reject") throw new Error("expected reject")
    expect(d.reason).toContain("(Explore)")
  })
})
