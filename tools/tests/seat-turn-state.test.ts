
import { describe, expect, test } from "bun:test"
import {
  type SeatTurnRecords,
  readSeatTurn,
  seatTurnStateLine,
  turnStillToCome,
} from "../lib/seat-turn-state.ts"

function kept(over: Partial<SeatTurnRecords> = {}): SeatTurnRecords {
  return {
    stamped: null,
    source: null,
    pending: {},
    working: {},
    reading: null,
    roleOnCall: false,
    ...over,
  }
}

function at(value: string, ms: number): { value: string; at: number } {
  return { value, at: ms }
}

describe("a state a hook stamped", () => {
  test("stopped stands as stamped, an arranged start not reviving a session that ended", () => {
    const reading = readSeatTurn(kept({ stamped: at("stopped", 100), source: at("message", 90) }))
    expect(reading.state).toBe("stopped")
  })

  test("a value no stamp uses reads as idle, a bucket saying something unknown saying nothing", () => {
    expect(readSeatTurn(kept({ stamped: at("waiting", 100) })).state).toBe("idle")
  })

  test("a seat left stamped working by an older harness reads as idle, no component standing", () => {
    expect(readSeatTurn(kept({ stamped: at("working", 100) })).state).toBe("idle")
  })
})

describe("an idle seat read against what is arranged", () => {
  test("a source naming something is pending, and the reading says what on", () => {
    const reading = readSeatTurn(kept({ stamped: at("idle", 100), source: at("live-child", 100) }))
    expect(reading.state).toBe("idle-pending")
    expect(reading.waitingOn).toBe("live-child")
  })

  test("a source arranged after the stamp counts, pending being read rather than stamped", () => {
    const reading = readSeatTurn(kept({ stamped: at("idle", 100), source: at("message", 900) }))
    expect(reading.state).toBe("idle-pending")
  })

  test("a source naming none is idle, nothing standing to start the seat again", () => {
    const reading = readSeatTurn(kept({ stamped: at("idle", 100), source: at("none", 100) }))
    expect(reading.state).toBe("idle")
    expect(reading.waitingOn).toBeNull()
  })

  test("no source at all is idle rather than pending", () => {
    expect(readSeatTurn(kept({ stamped: at("idle", 100) })).state).toBe("idle")
  })
})

describe("a seat that has kept no turn record at all", () => {
  test("keeping none of the four is stopped, a seat that never ran being no seat between turns", () => {
    expect(readSeatTurn(kept()).state).toBe("stopped")
  })

  test("a seat that never ran waits on nothing, having arranged nothing", () => {
    expect(readSeatTurn(kept()).waitingOn).toBeNull()
  })
})

describe("a seat keeping records from before the stamps", () => {
  test("a turn end read but no stamp is idle, which is what an older seat holds", () => {
    expect(readSeatTurn(kept({ reading: at("allow:none", 100) })).state).toBe("idle")
  })

  test("an unstamped seat is read against what is arranged like any other idle one", () => {
    expect(readSeatTurn(kept({ source: at("open-question", 100) })).state).toBe("idle-pending")
  })
})

function on(ms: number): { value: boolean; at: number } {
  return { value: true, at: ms }
}

function off(ms: number): { value: boolean; at: number } {
  return { value: false, at: ms }
}

describe("an idle seat read against the five things that could start it", () => {
  test("one component on is pending, any single arranged start being enough", () => {
    const reading = readSeatTurn(kept({ stamped: at("idle", 100), pending: { "live-child": on(100) } }))
    expect(reading.state).toBe("idle-pending")
    expect(reading.waitingOn).toBe("live-child")
  })

  test("a component clearing while another stands leaves the seat pending", () => {
    const reading = readSeatTurn(
      kept({
        stamped: at("idle", 100),
        pending: { "open-question": off(300), "live-child": on(100) },
      })
    )
    expect(reading.state).toBe("idle-pending")
  })

  test("every component off is idle, pending going out only when nothing is left", () => {
    const reading = readSeatTurn(
      kept({
        stamped: at("idle", 100),
        pending: {
          "running-task": off(100),
          "live-child": off(100),
          "open-question": off(100),
          "send-in-flight": off(100),
          owed: off(100),
        },
      })
    )
    expect(reading.state).toBe("idle")
    expect(reading.waitingOn).toBeNull()
  })

  test("a reading names every component that is on, not the first of them", () => {
    const reading = readSeatTurn(
      kept({
        stamped: at("idle", 100),
        pending: { "open-question": on(100), "live-child": on(100) },
      })
    )
    expect(reading.waitingOn).toBe("live-child, open-question")
  })

  test("a working component holds whatever pending says, a turn under way being the answer", () => {
    const reading = readSeatTurn(
      kept({ working: { "active-turn": on(100) }, pending: { "live-child": on(100) } })
    )
    expect(reading.state).toBe("working")
  })

  test("components that were read settle it, an older single source not overriding them", () => {
    const reading = readSeatTurn(
      kept({ stamped: at("idle", 100), source: at("live-child", 90), pending: { "live-child": off(300) } })
    )
    expect(reading.state).toBe("idle")
  })

  test("a seat holding only components has taken a turn, so it is not read as stopped", () => {
    expect(readSeatTurn(kept({ pending: { owed: on(100) } })).state).toBe("idle-pending")
  })
})

describe("an idle seat read against whether its role stands by", () => {
  test("a role declaring on-call is on-call rather than waiting on Alan", () => {
    const reading = readSeatTurn(kept({ stamped: at("idle", 100), roleOnCall: true }))
    expect(reading.state).toBe("idle-on-call")
  })

  test("a role declaring none is idle, whatever assignment the seat itself holds", () => {
    expect(readSeatTurn(kept({ stamped: at("idle", 100) })).state).toBe("idle")
  })

  test("a standing seat with something arranged is pending, which outranks standing by", () => {
    const reading = readSeatTurn(
      kept({ stamped: at("idle", 100), roleOnCall: true, pending: { "live-child": on(100) } })
    )
    expect(reading.state).toBe("idle-pending")
  })

  test("a standing seat whose components are all off is on-call, nothing arranged leaving it at its post", () => {
    const reading = readSeatTurn(
      kept({ stamped: at("idle", 100), roleOnCall: true, pending: { "live-child": off(100) } })
    )
    expect(reading.state).toBe("idle-on-call")
  })

  test("a standing seat taking a turn is working, the role saying nothing while one runs", () => {
    const reading = readSeatTurn(kept({ roleOnCall: true, working: { "active-turn": on(100) } }))
    expect(reading.state).toBe("working")
  })

  test("a standing seat that has kept no record is stopped, a role alone being no turn taken", () => {
    expect(readSeatTurn(kept({ roleOnCall: true })).state).toBe("stopped")
  })
})

describe("which children hold a parent pending", () => {
  test("a working child holds it, a turn under way being one that hands back", () => {
    expect(turnStillToCome("working")).toBe(true)
  })

  test("a pending child holds it, an arranged start being a hand-back to come", () => {
    expect(turnStillToCome("idle-pending")).toBe(true)
  })

  test("an on-call child holds nothing, standing by ending only when its principal ends it", () => {
    expect(turnStillToCome("idle-on-call")).toBe(false)
  })

  test("an idle child holds nothing, having arranged no turn to hand back from", () => {
    expect(turnStillToCome("idle")).toBe(false)
  })

  test("a stopped child holds nothing, having already handed back", () => {
    expect(turnStillToCome("stopped")).toBe(false)
  })
})

describe("the two things that make a seat working", () => {
  test("a turn under way is working", () => {
    expect(readSeatTurn(kept({ working: { "active-turn": on(100) } })).state).toBe("working")
  })

  test("a compaction is working, whoever is between turns", () => {
    expect(readSeatTurn(kept({ working: { compacting: on(100) } })).state).toBe("working")
  })

  test("a compaction ending leaves a live turn working, which is what one stamp could not do", () => {
    const reading = readSeatTurn(
      kept({ working: { "active-turn": on(100), compacting: off(300) } })
    )
    expect(reading.state).toBe("working")
  })

  test("a compaction ending on an idle seat is idle, which is the other way one stamp went wrong", () => {
    const reading = readSeatTurn(
      kept({ stamped: at("idle", 100), working: { "active-turn": off(100), compacting: off(300) } })
    )
    expect(reading.state).toBe("idle")
  })

  test("a working component never outranks a stopped session", () => {
    const reading = readSeatTurn(
      kept({ stamped: at("stopped", 100), working: { "active-turn": on(90) } })
    )
    expect(reading.state).toBe("stopped")
  })

  test("a seat holding only a working component has taken a turn, so it is not read as stopped", () => {
    expect(readSeatTurn(kept({ working: { compacting: off(100) } })).state).toBe("idle")
  })
})

describe("what the line says", () => {
  test("a pending seat names what it waits on, that being the whole of what pending adds", () => {
    expect(seatTurnStateLine({ state: "idle-pending", waitingOn: "open-question" })).toContain(
      "idle-pending on open-question"
    )
  })

  test("a state with nothing to wait on stands alone", () => {
    expect(seatTurnStateLine({ state: "working", waitingOn: null }).trim()).toBe("state    working")
  })
})
