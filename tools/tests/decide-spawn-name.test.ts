
import { describe, expect, it } from "bun:test"
import { decideSpawnName, type SeatNameComposition } from "../lib/decide-spawn-name.ts"

function decide(composed: SeatNameComposition = { kind: "none" }) {
  return decideSpawnName({ composed })
}

function spelled(name: string): SeatNameComposition {
  return { kind: "composed", name }
}

describe("the composition is the only thing that names a seat", () => {
  it("takes the composed spelling, there being nothing else it could take", () => {
    expect(decide(spelled("agent-harness-worker"))).toEqual({
      kind: "composed",
      name: "agent-harness-worker",
    })
  })
})

describe("a seat whose attributes spell nothing", () => {
  it("is refused, no name being available to fall back to", () => {
    expect(decide().kind).toBe("reject")
  })
})

describe("a composition that failed", () => {
  const failed: SeatNameComposition = {
    kind: "failed",
    reason: "the seat-name composer exited 3 — it said: seat store lock held by pid 4211",
  }

  it("is refused rather than reported as nothing to name", () => {
    expect(decide(failed).kind).toBe("reject")
  })

  it("carries the composer's own reason through, so the fault reaches whoever ran the spawn", () => {
    const decision = decide(failed)
    if (decision.kind !== "reject") throw new Error("unreachable")
    expect(decision.reason).toContain("seat store lock held by pid 4211")
    expect(decision.reason).not.toContain("spell no name")
  })
})
