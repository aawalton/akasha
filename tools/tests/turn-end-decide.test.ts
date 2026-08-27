import { describe, expect, test } from "bun:test"
import { modeClaimOf } from "../lib/turn-end-decide.ts"
import { PARSED, answered, decide, inputs, leftRead, settled, standing } from "./turn-end-case.ts"

describe("modeClaimOf", () => {
  test("states the two recorded modes and calls everything else unknown", () => {
    expect(modeClaimOf("interactive")).toBe("interactive")
    expect(modeClaimOf("headless")).toBe("headless")
    expect(modeClaimOf(null)).toBe("unknown")
    expect(modeClaimOf("")).toBe("unknown")
    expect(modeClaimOf("Headless")).toBe("unknown")
  })
})

describe("the arms above the on-call fork", () => {
  test("allows a turn end with no seat behind it", () => {
    expect(settled(decide(inputs({ agentId: null })))).toEqual({
      reason: "no-agent-id",
      decision: "allow",
      mode: "headless",
      stops: 0,
    })
    expect(settled(decide(inputs({ agentId: "" }))).reason).toBe("no-agent-id")
  })

  test("allows an unreadable payload and a continuation in every mode", () => {
    for (const mode of ["interactive", "headless", null]) {
      expect(settled(decide(inputs({ mode, payload: { kind: "unparseable" } }))).reason).toBe(
        "unparseable-payload"
      )
      const looping = { ...PARSED, stopHookActive: true }
      expect(settled(decide(inputs({ mode, payload: looping }))).reason).toBe("continuation")
    }
  })

  test("states the mode the seat recorded, on an arm that read no mode to reach", () => {
    const unreadable = { kind: "unparseable" } as const
    expect(settled(decide(inputs({ mode: "interactive", payload: unreadable }))).mode).toBe("interactive")
    expect(settled(decide(inputs({ mode: "headless", payload: unreadable }))).mode).toBe("headless")
    expect(settled(decide(inputs({ mode: null, payload: unreadable }))).mode).toBe("unknown")
  })

  test("takes the unreadable payload before the continuation it could not have read", () => {
    expect(settled(decide(inputs({ payload: { kind: "unparseable" } }))).reason).toBe("unparseable-payload")
  })

  test("sends every mode to the state reads, the rules turning on what they say", () => {
    for (const mode of ["interactive", "headless", null, ""]) {
      expect(decide(inputs({ mode })).kind).toBe("needs-read")
    }
  })

  test("asks for a judge only once both reads are in and the seat is on call", () => {
    const read = { outbound: leftRead(), inbound: answered("no-binding") }
    expect(decide(inputs({ onCall: true, ...read })).kind).toBe("needs-judge")
    expect(decide(inputs({ dispatched: standing(1), ...read })).kind).toBe("settled")
  })
})
