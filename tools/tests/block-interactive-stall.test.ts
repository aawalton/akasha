
import { afterAll, describe, expect, test } from "bun:test"
import {
  SEAT,
  SESSION,
  decisionsIn,
  fakeHome,
  releaseScratchTrees,
  runHook,
  soleDecision,
  soleRecord,
  stubDecider,
} from "./interactive-stall.ts"

afterAll(releaseScratchTrees)

const SAID = "the decider said so, in its own words"

const PAYLOAD = { session_id: SESSION, stop_hook_active: false, background_tasks: [] }

describe("the gates the guard keeps for itself", () => {
  for (const mode of ["headless", null] as const) {
    test(`exempts a seat whose recorded mode reads ${JSON.stringify(mode)}`, () => {
      const ran = runHook(PAYLOAD, {
        home: fakeHome(mode),
        stubDir: stubDecider("block\tstall-refused\t1\tno\tnone\t-", SAID),
      })
      expect(ran.exitCode).toBe(0)
      if (mode === null) {
        expect(decisionsIn(ran.home)).toHaveLength(0)
        return
      }
      expect(soleDecision(ran).reason).toBe("not-interactive")
    })
  }
})

describe("what the decider answered", () => {
  test("carries the refusal to the seat it was made in, under its own name and reason", () => {
    const ran = runHook(PAYLOAD, {
      home: fakeHome("interactive"),
      stubDir: stubDecider("block\tstall-refused\t1\tno\tnone\t-", SAID),
    })
    expect(ran.exitCode).toBe(2)
    expect(ran.stderr).toContain(SAID)
    expect(soleRecord(ran)).toMatchObject({
      seat: SEAT,
      values: {
        hook: "block-interactive-stall",
        verdict: "refuse",
        reason: "stall-refused",
        "claude-code-session-uuid": SESSION,
        mode: "interactive",
      },
    })
  })

  test("keeps an allow under the verdict the decider gave", () => {
    const ran = runHook(PAYLOAD, {
      home: fakeHome("interactive"),
      stubDir: stubDecider("allow\tinteractive-pending\t2\tyes\trunning-task\t-", ""),
    })
    expect(ran.exitCode).toBe(0)
    expect(soleDecision(ran)).toMatchObject({ verdict: "allow", reason: "interactive-pending" })
  })

  test("keeps one record for one stop, and writes nothing to stdout", () => {
    const ran = runHook(PAYLOAD, {
      home: fakeHome("interactive"),
      stubDir: stubDecider("block\tstall-refused\t1\tno\tnone\t-", SAID),
    })
    expect(decisionsIn(ran.home)).toHaveLength(1)
    expect(ran.stdout).toBe("")
  })
})
