import { describe, expect, test } from "bun:test"
import type { TurnEndInputs } from "../lib/turn-end-plan.ts"
import { NOTHING_SAID } from "../lib/turn-end-refusals.ts"
import {
  PARSED,
  TRANSCRIPT,
  answered,
  decide,
  inputs,
  judged,
  leftRead,
  messageOf,
  settled,
  standing,
} from "./turn-end-case.ts"

const EXIT_ONLY = 'error: "ops" exited with code 3\n'

describe("an on-call turn end", () => {
  const interactive = (over: Partial<TurnEndInputs> = {}): TurnEndInputs =>
    inputs({
      mode: "interactive",
      onCall: true,
      outbound: leftRead(),
      inbound: answered("no-binding"),
      ...over,
    })

  test("reads both pending commands, the rules turning on what they say", () => {
    expect(decide(inputs({ mode: "interactive" }))).toEqual({
      kind: "needs-read",
      verb: "pending",
    })
    expect(decide(inputs({ mode: "interactive", outbound: leftRead() }))).toEqual({
      kind: "needs-read",
      verb: "owed",
    })
  })

  test("carries the turn start it found into the reading, rather than settling ahead of it", () => {
    expect(decide(interactive({ payload: { ...PARSED, runningTasks: 1 } }))).toEqual({
      kind: "needs-judge",
      transcript: TRANSCRIPT,
      pending: true,
    })
  })

  test("carries no turn start where only a reminder stands, a reminder arranging none", () => {
    expect(decide(interactive({ reminders: 2 }))).toEqual({
      kind: "needs-judge",
      transcript: TRANSCRIPT,
      pending: false,
    })
  })

  test("asks for the judge where nothing stands that would start it again", () => {
    expect(decide(interactive())).toEqual({
      kind: "needs-judge",
      transcript: TRANSCRIPT,
      pending: false,
    })
  })

  test("allows a stop it has no transcript to judge", () => {
    const payload = { ...PARSED, transcript: { kind: "missing" } as const }
    expect(settled(decide(interactive({ payload }))).reason).toBe("no-transcript")
  })

  test("allows a stop where the judge cannot be called at all", () => {
    expect(settled(decide(interactive({ judge: { kind: "unavailable" } }))).reason).toBe(
      "verb-unavailable"
    )
  })

  test("allows every answer that is not a refusal", () => {
    expect(settled(decide(interactive({ judge: judged(124) }))).reason).toBe("judge-timeout")
    expect(settled(decide(interactive({ judge: judged(0) }))).reason).toBe("judged-legal")
    expect(settled(decide(interactive({ judge: judged(1) }))).reason).toBe("verb-unavailable")
    expect(settled(decide(interactive({ judge: judged(127) }))).reason).toBe("verb-unavailable")
  })

  test("refuses under `judged` and relays the judge's prose", () => {
    const plan = decide(interactive({ judge: judged(3, "You said you would run it.\n") }))
    expect(settled(plan)).toEqual({
      reason: "judged",
      decision: "block",
      mode: "interactive",
      stops: 0,
    })
    expect(messageOf(plan)).toBe("You said you would run it.\n")
  })

  test("drops the wrapper's own exit line from what the seat is shown", () => {
    const said = 'error: "ops" exited with code 3\nYou said you would run it.'
    expect(messageOf(decide(interactive({ judge: judged(3, said) })))).toBe(
      "You said you would run it.\n"
    )
  })

  test("says something a seat can act on where the judge refused and explained nothing", () => {
    expect(messageOf(decide(interactive({ judge: judged(3, EXIT_ONLY) })))).toBe(NOTHING_SAID([]))
  })

  test("names the assignments still standing, in the message the seat is shown", () => {
    const message = messageOf(
      decide(interactive({ judge: judged(3, EXIT_ONLY), dispatched: standing(2) }))
    )
    expect(message).toContain(`Still standing: ${standing(2).join(", ")}.`)
  })

  test("holding no assignment, names none and leaves no gap where that line would have stood", () => {
    const message = messageOf(decide(interactive({ judge: judged(3, EXIT_ONLY) })))
    expect(message).not.toContain("Still standing")
    expect(message).not.toMatch(/\n{3}/)
  })

  test("never ends an on-call seat that has handed back, the shape every seat Alan talks to stands in", () => {
    for (const judge of [judged(0), judged(3, "no"), judged(124), { kind: "unavailable" } as const]) {
      for (const verdict of ["owed", "work-complete"]) {
        for (const handedBack of [true, false]) {
          const at = interactive({
            judge,
            handedBack,
            dispatched: handedBack ? [] : standing(1),
            inbound: answered(verdict),
          })
          const plan = settled(decide(at))
          expect(plan.stops).toBe(0)
          expect(["handed-back", "work-complete"]).not.toContain(plan.reason)
        }
      }
    }
  })
})
