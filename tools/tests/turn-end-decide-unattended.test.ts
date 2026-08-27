
import { describe, expect, test } from "bun:test"
import type { TurnEndInputs } from "../lib/turn-end-plan.ts"
import {
  PARSED,
  UNANSWERED_SEND,
  answered,
  decide,
  inputs,
  leftRead,
  settled,
  standing,
} from "./turn-end-case.ts"

const read = { outbound: leftRead(), inbound: answered("no-binding") }

describe("the turn start sources settled before any read", () => {
  test("settles a running task without asking for a read", () => {
    const at = inputs({ dispatched: standing(1), payload: { ...PARSED, runningTasks: 1 } })
    expect(settled(decide(at))).toEqual({
      reason: "pending",
      decision: "allow",
      mode: "headless",
      stops: 0,
    })
  })

  test("a reminder the seat set itself arranges no turn, so its dispatched work still stands unfinished", () => {
    const at = inputs({ dispatched: standing(1), reminders: 2, ...read })
    expect(settled(decide(at))).toEqual({
      reason: "dispatch-unfinished",
      decision: "block",
      mode: "headless",
      stops: 0,
    })
  })

  test("records the loop guard rather than the running task a seat carries as well", () => {
    const looping = { ...PARSED, stopHookActive: true, runningTasks: 1 }
    expect(settled(decide(inputs({ payload: looping }))).reason).toBe("continuation")
  })

  test("allows an unreadable payload that the rules would have refused", () => {
    const at = inputs({ dispatched: standing(1), payload: { kind: "unparseable" }, ...read })
    expect(settled(decide(at)).reason).toBe("unparseable-payload")
  })
})

describe("what the rules make of what the seat left", () => {
  const seat = (over: Partial<TurnEndInputs> = {}): TurnEndInputs =>
    inputs({ inbound: answered("no-binding"), ...over })

  test("allows on the seat's own row having ended, ahead of the rule set", () => {
    const plan = decide(seat({ dispatched: standing(2), outbound: leftRead({ selfStopped: true }) }))
    expect(settled(plan)).toEqual({
      reason: "stopped",
      decision: "allow",
      mode: "headless",
      stops: 0,
    })
  })

  test("takes a live child, an open question and a send still standing as things that will start a turn", () => {
    for (const over of [{ liveChildren: 1 }, { openQuestions: 1 }, UNANSWERED_SEND]) {
      expect(settled(decide(seat({ dispatched: standing(1), outbound: leftRead(over) }))).reason).toBe(
        "pending"
      )
    }
  })
})

describe("what the initiative says is owed to the seat", () => {
  const seat = (verdict: string, over: Partial<TurnEndInputs> = {}): TurnEndInputs =>
    inputs({ outbound: leftRead(), inbound: answered(verdict), ...over })

  test("a held promise is the one inbound verdict that starts the seat again", () => {
    expect(settled(decide(seat("owed", { dispatched: standing(1) }))).reason).toBe(
      "pending"
    )
  })

  test("every verdict that is neither a held promise nor a finished ladder leaves a seat holding work refused", () => {
    for (const verdict of ["own-act-next", "custodian-dead", "no-binding", "gruyere"]) {
      const plan = decide(seat(verdict, { dispatched: standing(1) }))
      expect(settled(plan)).toEqual({
        reason: "dispatch-unfinished",
        decision: "block",
        mode: "headless",
        stops: 0,
      })
    }
  })

  test("the same verdicts end a seat that holds nothing", () => {
    for (const verdict of ["own-act-next", "custodian-dead", "no-binding"]) {
      expect(settled(decide(seat(verdict, { dispatched: standing(0) })))).toEqual({
        reason: "nothing-dispatched",
        decision: "allow",
        mode: "headless",
        stops: 1,
      })
    }
  })

  test("leaves a seat whose mode nothing recorded standing, rather than ending what it could not read", () => {
    expect(settled(decide(seat("no-binding", { mode: null, dispatched: standing(0) })))).toEqual({
      reason: "nothing-dispatched",
      decision: "allow",
      mode: "unknown",
      stops: 0,
    })
  })

  test("leaves a seat standing where the question could not be answered, rather than reading silence as nothing owed", () => {
    for (const held of [standing(1), standing(0)]) {
      const at = inputs({ outbound: leftRead(), inbound: { kind: "unavailable" }, dispatched: held })
      expect(settled(decide(at))).toEqual({
        reason: "owed-unavailable",
        decision: "allow",
        mode: "headless",
        stops: 0,
      })
    }
  })

  test("ends a seat whose every claimed row has left its ladder, rather than sending it back to finished work", () => {
    for (const held of [standing(1), standing(0)]) {
      expect(settled(decide(seat("work-complete", { dispatched: held })))).toEqual({
        reason: "work-complete",
        decision: "allow",
        mode: "headless",
        stops: 1,
      })
    }
  })
})

describe("the handback, where the dispatch has ended", () => {
  const back = (over: Partial<TurnEndInputs> = {}): TurnEndInputs =>
    inputs({ handedBack: true, dispatched: [], outbound: leftRead(), inbound: answered("owed"), ...over })

  test("ends a seat whose initiative has reached the status its own task hands back at", () => {
    expect(settled(decide(back()))).toEqual({
      reason: "handed-back",
      decision: "allow",
      mode: "headless",
      stops: 1,
    })
  })

  test("leaves a seat parked on a handoff its own task does not hand back at, its work unfinished", () => {
    const at = inputs({
      handedBack: false,
      dispatched: standing(1),
      outbound: leftRead(),
      inbound: answered("owed"),
    })
    expect(settled(decide(at))).toEqual({
      reason: "pending",
      decision: "allow",
      mode: "headless",
      stops: 0,
    })
  })

  test("ends a handed-back seat with a question out or a send unanswered, neither of which leaves it unfinished", () => {
    for (const over of [{ openQuestions: 1 }, UNANSWERED_SEND]) {
      expect(settled(decide(back({ outbound: leftRead(over) })))).toEqual({
        reason: "handed-back",
        decision: "allow",
        mode: "headless",
        stops: 1,
      })
    }
  })

  test("ends a handed-back seat still carrying a running task or a reminder it set itself", () => {
    for (const over of [{ payload: { ...PARSED, runningTasks: 1 } }, { reminders: 2 }]) {
      expect(settled(decide(back(over)))).toEqual({
        reason: "handed-back",
        decision: "allow",
        mode: "headless",
        stops: 1,
      })
    }
  })

  test("asks for the outbound read before ending a handed-back seat whose turn start was already settled", () => {
    for (const over of [{ payload: { ...PARSED, runningTasks: 1 } }, { reminders: 2 }]) {
      expect(decide(back({ ...over, outbound: { kind: "unread" } }))).toEqual({
        kind: "needs-read",
        verb: "pending",
      })
    }
  })

  test("leaves a handed-back seat standing while a child of its own is live, which a stop would strand", () => {
    expect(settled(decide(back({ outbound: leftRead({ liveChildren: 1 }) })))).toEqual({
      reason: "pending",
      decision: "allow",
      mode: "headless",
      stops: 0,
    })
  })

  test("leaves a handed-back seat whose mode nothing recorded standing, having no session to end", () => {
    expect(settled(decide(back({ mode: null })))).toEqual({
      reason: "handed-back",
      decision: "allow",
      mode: "unknown",
      stops: 0,
    })
  })
})

describe("the on-call fork, which the mode no longer stands in for", () => {
  test("an unrecorded mode holding nothing is decided from state, not read", () => {
    const at = inputs({ mode: null, dispatched: standing(0), outbound: leftRead(), inbound: answered("no-binding") })
    expect(settled(decide(at)).reason).toBe("nothing-dispatched")
  })

  test("a seat holding nothing with a turn start pending is allowed and left standing", () => {
    const at = inputs({ dispatched: standing(0), outbound: leftRead(UNANSWERED_SEND), inbound: answered("no-binding") })
    expect(settled(decide(at))).toEqual({
      reason: "pending",
      decision: "allow",
      mode: "headless",
      stops: 0,
    })
  })
})
