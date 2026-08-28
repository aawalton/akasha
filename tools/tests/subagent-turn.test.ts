import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { readSubagentTurn, subagentTurnOf } from "../lib/subagent-turn.ts"
import { seatAbove, subagentUnder } from "../lib/subagent.ts"
import { type Fixture, fixture } from "./fixture.ts"

describe("which half of an id names the subagent", () => {
  test("the mark splits the seat that ran it from the id its page is named for", () => {
    expect(seatAbove("seat--own")).toBe("seat")
    expect(subagentUnder("seat--own")).toBe("own")
  })

  test("a seat id carries no mark, so nothing reads a subagent out of one", () => {
    expect(seatAbove("seat")).toBeNull()
    expect(subagentUnder("seat")).toBeNull()
  })

  test("a mark with nothing after it names no subagent, rather than an empty one", () => {
    expect(subagentUnder("seat--")).toBeNull()
  })
})

describe("whether a subagent is working", () => {
  test("one whose page stands under a working seat is working", () => {
    expect(readSubagentTurn(true, "working")).toEqual({
      state: "working",
      waitingOn: null,
    })
  })

  test("one whose page is gone is stopped, the page going when it returns", () => {
    expect(readSubagentTurn(false, "working").state).toBe("stopped")
  })

  test("one whose page stands under an idle seat is working, a seat waiting on it being idle", () => {
    expect(readSubagentTurn(true, "idle-pending").state).toBe("working")
  })

  test("one whose page stands under a stopped seat is stopped, its seat's session being gone", () => {
    expect(readSubagentTurn(true, "stopped").state).toBe("stopped")
  })
})

describe("whether a subagent's page stands", () => {
  let at: Fixture

  beforeAll(() => {
    at = fixture()
    at.put("agent/seat/busy.seat.md", '---\npage-type-slug: seat\nid: busy\ntitle: "busy"\n---\n')
    at.put(
      "agent/seat/busy.seat.uncommitted.yaml",
      ["turn-working:", "  active-turn:", "    value: true", "    at: 100", ""].join("\n")
    )
    at.put(
      "agent/subagent/busy--running.subagent.md",
      '---\npage-type-slug: subagent\nid: busy--running\ntitle: "busy--running"\n---\n'
    )
  })

  afterAll(() => {
    at.dispose()
  })

  test("a subagent is read from whether the page named for its own id stands", () => {
    expect(subagentTurnOf("busy--running").state).toBe("working")
  })

  test("a returned subagent is stopped, its page taken away though the seat works on", () => {
    expect(subagentTurnOf("busy--returned").state).toBe("stopped")
  })

  test("a subagent under a seat with no page is stopped, nothing naming where its page stands", () => {
    expect(subagentTurnOf("gone--running").state).toBe("stopped")
  })
})
