import { describe, expect, test } from "bun:test"
import { type SeatHolding, foldSeatWork, louder } from "../lib/seat-work.ts"
import { SEAT_TURN_STATES } from "../lib/seat-turn-state.ts"

function held(over: Partial<SeatHolding> = {}): SeatHolding {
  return { initiative: null, state: "idle", ...over }
}

describe("which seat a row takes its state from", () => {
  test("one seat on an initiative puts its own state on that initiative", () => {
    const work = foldSeatWork([held({ initiative: "work-without-projects", state: "working" })])
    expect(work.byInitiative.get("work-without-projects")).toBe("working")
  })

  test("an initiative several seats hold takes the liveliest of them, a row saying whether anything is moving", () => {
    const work = foldSeatWork([
      held({ initiative: "work-without-projects", state: "idle" }),
      held({ initiative: "work-without-projects", state: "working" }),
      held({ initiative: "work-without-projects", state: "idle-pending" }),
    ])
    expect(work.byInitiative.get("work-without-projects")).toBe("working")
  })

  test("the order the seats are read in does not change the answer", () => {
    const forward = foldSeatWork([
      held({ initiative: "one", state: "working" }),
      held({ initiative: "one", state: "idle" }),
    ])
    const back = foldSeatWork([
      held({ initiative: "one", state: "idle" }),
      held({ initiative: "one", state: "working" }),
    ])
    expect(forward.byInitiative.get("one")).toBe(back.byInitiative.get("one"))
  })

  test("an initiative no seat holds is absent rather than carrying a state of its own", () => {
    expect(foldSeatWork([]).byInitiative.has("work-without-projects")).toBe(false)
  })

  test("a seat holding no initiative puts nothing anywhere", () => {
    expect(foldSeatWork([held({ state: "working" })]).byInitiative.size).toBe(0)
  })
})

describe("which of two states is the liveliest", () => {
  test("working beats every other, a row with something moving on it saying so", () => {
    for (const other of SEAT_TURN_STATES) expect(louder("working", other)).toBe("working")
  })

  test("stopped loses to every other, a seat whose session ended never speaking over one still in it", () => {
    for (const other of SEAT_TURN_STATES) expect(louder("stopped", other)).toBe(other)
  })

  test("pending beats idle, something arranged beating nothing arranged", () => {
    expect(louder("idle-pending", "idle")).toBe("idle-pending")
    expect(louder("idle", "idle-pending")).toBe("idle-pending")
  })
})
