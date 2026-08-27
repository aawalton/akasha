
import { afterAll, describe, expect, test } from "bun:test"
import {
  SEAT,
  SESSION,
  decisionsIn,
  fakeHome,
  pathWithDecider,
  releaseScratchTrees,
  runHeadless,
  runHook,
  runInteractive,
  soleDecision,
  soleRecord,
} from "./headless-halt.ts"

afterAll(releaseScratchTrees)

const SAID = "the decider said so, in its own words"

const PAYLOAD = { session_id: SESSION, stop_hook_active: false, background_tasks: [] }

describe("the gates the guard keeps for itself", () => {
  test("allows a stop no seat can be named for, asking the decider nothing and keeping nothing", () => {
    const ran = runHook(PAYLOAD, { AGENT_ID: "", PATH: pathWithDecider("block\theadless-unfinished\t0\tno\tnone\t-", SAID) })
    expect(ran.exitCode).toBe(0)
    expect(decisionsIn(ran.home)).toHaveLength(0)
  })

  test("exempts a seat recorded interactive, this being the other guard's to judge", () => {
    const ran = runInteractive(PAYLOAD, { PATH: pathWithDecider("block\theadless-unfinished\t0\tno\tnone\t-", SAID) })
    expect(ran.exitCode).toBe(0)
    expect(soleDecision(ran).reason).toBe("interactive-recorded")
  })
})

describe("a decider that cannot answer", () => {
  test("allows the stop where the checkout it would run in is not there", () => {
    const ran = runHeadless(PAYLOAD, { HOME: fakeHome(false) })
    expect(ran.exitCode).toBe(0)
    expect(soleDecision(ran).reason).toBe("verb-unavailable")
  })

  test("allows the stop where what answered is not a decision", () => {
    const ran = runHeadless(PAYLOAD, { PATH: pathWithDecider("gruyere", "") })
    expect(ran.exitCode).toBe(0)
    expect(soleDecision(ran).reason).toBe("verb-unavailable")
  })

  test("refuses nothing on its own account, an unanswerable guard holding no seat", () => {
    for (const answered of ["", "\t\t\t\t\t", "allow"]) {
      const ran = runHeadless(PAYLOAD, { PATH: pathWithDecider(answered, "") })
      expect(ran.exitCode).toBe(0)
    }
  })
})

describe("what the decider answered", () => {
  test("carries the refusal to the seat it was made in, under the decider's own reason", () => {
    const ran = runHeadless(PAYLOAD, {
      PATH: pathWithDecider("block\theadless-unfinished\t2\tno\tnone\t-", SAID),
    })
    expect(ran.exitCode).toBe(2)
    expect(ran.stderr).toContain(SAID)
    expect(soleRecord(ran)).toMatchObject({
      seat: SEAT,
      values: {
        verdict: "refuse",
        reason: "headless-unfinished",
        "claude-code-session-uuid": SESSION,
        mode: "headless",
      },
    })
  })

  test("keeps an allow under the verdict the decider gave", () => {
    const ran = runHeadless(PAYLOAD, {
      PATH: pathWithDecider("allow\theadless-pending\t3\tyes\tlive-child\t-", ""),
    })
    expect(ran.exitCode).toBe(0)
    expect(soleDecision(ran)).toMatchObject({ verdict: "allow", reason: "headless-pending" })
  })

  test("takes a reason no vocabulary here declares, the rule's own slug being the reason", () => {
    const ran = runHeadless(PAYLOAD, {
      PATH: pathWithDecider("allow\ta-rule-written-tomorrow\t1\tno\tnone\tstopped", ""),
    })
    expect(ran.exitCode).toBe(0)
    expect(soleDecision(ran).reason).toBe("a-rule-written-tomorrow")
  })

  test("keeps one record for one stop, whichever way it went", () => {
    for (const answered of [
      "allow\theadless-pending\t1\tyes\tlive-child\t-",
      "block\theadless-unfinished\t1\tno\tnone\t-",
    ]) {
      const ran = runHeadless(PAYLOAD, { PATH: pathWithDecider(answered, SAID) })
      expect(decisionsIn(ran.home)).toHaveLength(1)
    }
  })

  test("does not leak the wrapper's own exit line into what the seat is shown", () => {
    const ran = runHeadless(PAYLOAD, {
      PATH: pathWithDecider(
        "block\theadless-unfinished\t2\tno\tnone\t-",
        `${SAID}\nerror: "ops" exited with code 2`
      ),
    })
    expect(ran.stderr).toContain(SAID)
    expect(ran.stderr).not.toContain("exited with code")
  })
})

test("writes nothing to stdout, so it never competes with a sibling hook's control JSON", () => {
  const ran = runHeadless(PAYLOAD, {
    PATH: pathWithDecider("block\theadless-unfinished\t2\tno\tnone\t-", SAID),
  })
  expect(ran.stdout).toBe("")
})
