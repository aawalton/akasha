
import { describe, expect, test } from "bun:test"
import { decideKillTarget, type KillTargetInput } from "../lib/kill-target-plan.ts"

const SELF = 4242

function input(over: Partial<KillTargetInput> = {}): KillTargetInput {
  return {
    supervisorPid: null,
    supervisorStands: false,
    procPidsForId: [],
    seatName: null,
    selfPid: SELF,
    ...over,
  }
}

describe("what a stop is allowed to signal", () => {
  test("a pid no live process carries for this seat is never signalled", () => {
    expect(decideKillTarget(input({ seatName: "worker-1" })).kind).toBe("session")
  })

  test("a supervisor the page names but whose process no longer stands is not signalled", () => {
    const target = decideKillTarget(
      input({ supervisorPid: 17769, supervisorStands: false, seatName: "worker-1" })
    )
    expect(target.kind).toBe("session")
  })

  test("with nothing live and no name, nothing is signalled at all", () => {
    expect(decideKillTarget(input()).kind).toBe("reconcile")
  })

  test("the seat's own process is never signalled, so a stop cannot kill its caller", () => {
    const target = decideKillTarget(input({ procPidsForId: [SELF], seatName: "worker-1" }))
    expect(target.kind).toBe("session")
  })
})

describe("which live process a stop reaches", () => {
  test("a supervisor the page names and the scan confirms is reached as the page's", () => {
    const target = decideKillTarget(
      input({ supervisorPid: 900, supervisorStands: true, procPidsForId: [900], seatName: "a" })
    )
    expect(target).toEqual({ kind: "signal", pids: [900], source: "seat-page" })
  })

  test("a live process the scan found under this seat is reached though no page names it", () => {
    const target = decideKillTarget(input({ procPidsForId: [901], seatName: "a" }))
    expect(target).toEqual({ kind: "signal", pids: [901], source: "proc" })
  })

  test("every process the scan found is reached, not just the supervisor", () => {
    const target = decideKillTarget(
      input({ supervisorPid: 900, supervisorStands: true, procPidsForId: [900, 901] })
    )
    expect(target).toEqual({ kind: "signal", pids: [900, 901], source: "seat-page" })
  })
})
