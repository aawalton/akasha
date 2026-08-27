
import { describe, expect, it } from "bun:test"
import {
  planRestartNotice,
  type RestartPreserveEvent,
  type ResumeNotices,
} from "../lib/decide-restart-notice.ts"

const NOTICES: ResumeNotices = {
  "restart-immediate": "RESTART-IMMEDIATE",
  "restart-deferred": "RESTART-DEFERRED",
  "restart-recovery-clause": "RECOVERY-CLAUSE",
}

describe("planRestartNotice — which carrier the notice takes", () => {
  const base: RestartPreserveEvent = {
    action: "restart_preserve",
    interruptMessage: null,
  }
  const spawning = { maintenance: false, reExecPending: false }
  const reExecing = { maintenance: false, reExecPending: true }
  const maintaining = { maintenance: true, reExecPending: false }

  it("a maintenance restart holds its notice on the rail (rides the next real inbound)", () => {
    const plan = planRestartNotice(base, maintaining, NOTICES)
    expect(plan.route).toBe("rail")
    expect(plan.notice).toBe("RESTART-DEFERRED\n\nRECOVERY-CLAUSE")
  })

  it("a plain restart_preserve hands the immediate notice to the spawn it is about to make", () => {
    const plan = planRestartNotice(base, spawning, NOTICES)
    expect(plan.route).toBe("spawn-argv")
    expect(plan.notice).toBe("RESTART-IMMEDIATE\n\nRECOVERY-CLAUSE")
  })

  it("an interrupt-message restart rides the spawn carrying the operator's text alongside the clause", () => {
    const plan = planRestartNotice(
      { ...base, interruptMessage: "reorient: config changed" },
      spawning,
      NOTICES
    )
    expect(plan.route).toBe("spawn-argv")
    expect(plan.notice).toBe("reorient: config changed\n\nRECOVERY-CLAUSE")
  })

  it("an interrupt message is ignored under the maintenance tag (maintenance is only set with null message)", () => {
    const plan = planRestartNotice(
      { ...base, interruptMessage: "should-not-win" },
      maintaining,
      NOTICES
    )
    expect(plan.route).toBe("rail")
    expect(plan.notice).not.toContain("should-not-win")
  })

  it("a pending self-heal re-exec takes the rail, because this process spawns nothing to hand it to", () => {
    const plan = planRestartNotice(base, reExecing, NOTICES)
    expect(plan.route).toBe("rail")
    expect(plan.notice).toBe("RESTART-IMMEDIATE\n\nRECOVERY-CLAUSE")
  })

  it("a re-exec carries the same composed operator notice, only by the other carrier", () => {
    const plan = planRestartNotice(
      { ...base, interruptMessage: "reorient: config changed" },
      reExecing,
      NOTICES
    )
    expect(plan.route).toBe("rail")
    expect(plan.notice).toBe("reorient: config changed\n\nRECOVERY-CLAUSE")
  })
})

describe("planRestartNotice — the recovery clause is appended past the branch", () => {
  const base: RestartPreserveEvent = {
    action: "restart_preserve",
    interruptMessage: null,
  }

  const everyBranch = [false, true].flatMap((maintenance) =>
    [null, "reorient: config changed"].flatMap((interruptMessage) =>
      [false, true].map((reExecPending) => ({
        event: { ...base, interruptMessage },
        ctx: { maintenance, reExecPending },
      }))
    )
  )

  it("every branch carries the clause", () => {
    for (const { event, ctx } of everyBranch) {
      expect(planRestartNotice(event, ctx, NOTICES).notice.endsWith("\n\nRECOVERY-CLAUSE")).toBe(
        true
      )
    }
  })

  it("an EMPTY clause is appended to nothing, which is how the workaround is retired", () => {
    const retired = { ...NOTICES, "restart-recovery-clause": "" }
    for (const { event, ctx } of everyBranch) {
      const notice = planRestartNotice(event, ctx, retired).notice
      expect(notice).not.toContain("\n\n")
      expect(notice.length).toBeGreaterThan(0)
    }
  })

  it("the clause reaches the seat WHOLE, never a truncation of it", () => {
    const long = { ...NOTICES, "restart-recovery-clause": "A".repeat(600) }
    for (const { event, ctx } of everyBranch) {
      expect(planRestartNotice(event, ctx, long).notice).toContain("A".repeat(600))
    }
  })
})
