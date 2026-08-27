import { describe, expect, test } from "bun:test"
import {
  DEFAULT_REEXEC_MAX_DEFER_MS,
  DEFAULT_STALE_WEDGE_MS,
  type DeferredRestartObservation,
  decideDeferredRestart,
  IDLE_STREAK_TO_RESTART,
  INITIAL_DEFERRED_RESTART_STATE,
  resolveMaxDeferMs,
  resolveStaleWedgeMs,
} from "../lib/supervisor-deferred-restart-decide.ts"

const idle: DeferredRestartObservation = { idle: true }
const busy: DeferredRestartObservation = { idle: false }

const stuck = (reason = "inFlight=1", mtimeMs = 1_000): DeferredRestartObservation => ({
  idle: false,
  busyReason: reason,
  transcriptMtimeMs: mtimeMs,
})

describe("decideDeferredRestart — debounce", () => {
  test("fires only after IDLE_STREAK_TO_RESTART sustained idle ticks", () => {
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 1; i < IDLE_STREAK_TO_RESTART; i++) {
      const r = decideDeferredRestart(state, idle)
      expect(r.fire).toBe(false)
      expect(r.state.idleStreak).toBe(i)
      state = r.state
    }
    const final = decideDeferredRestart(state, idle)
    expect(final.fire).toBe(true)
    expect(final.state.idleStreak).toBe(IDLE_STREAK_TO_RESTART)
  })

  test("a busy tick resets the streak (transient inflight==0 blip mid-turn)", () => {
    let state = INITIAL_DEFERRED_RESTART_STATE
    state = decideDeferredRestart(state, idle).state
    expect(state.idleStreak).toBe(1)
    const reset = decideDeferredRestart(state, busy)
    expect(reset.fire).toBe(false)
    expect(reset.state.idleStreak).toBe(0)
  })

  test("a busy tick mid-streak forces the full streak to be re-accumulated before firing", () => {
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 0; i < IDLE_STREAK_TO_RESTART; i++) {
      state = decideDeferredRestart(state, idle).state
    }
    state = decideDeferredRestart(state, busy).state
    expect(state.idleStreak).toBe(0)
    const next = decideDeferredRestart(state, idle)
    expect(next.state.idleStreak).toBe(1)
    expect(next.fire).toBe(false)
  })
})

describe("decideDeferredRestart — max-defer ceiling (self-heal path)", () => {
  test("without a ceiling, a perpetually-busy session never fires (unbounded — CLI path)", () => {
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 0; i < 500; i++) {
      const r = decideDeferredRestart(state, busy)
      expect(r.fire).toBe(false)
      state = r.state
    }
  })

  test("with a ceiling, a perpetually-busy session fires exactly on the ceiling tick", () => {
    const ceilingTicks = 4
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 1; i < ceilingTicks; i++) {
      const r = decideDeferredRestart(state, busy, { ceilingTicks })
      expect(r.fire).toBe(false)
      expect(r.state.elapsedTicks).toBe(i)
      state = r.state
    }
    const breach = decideDeferredRestart(state, busy, { ceilingTicks })
    expect(breach.fire).toBe(true)
    expect(breach.state.elapsedTicks).toBe(ceilingTicks)
  })

  test("idle-streak fires BEFORE the ceiling when the session goes idle first", () => {
    const ceilingTicks = 100
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 0; i < 5; i++) {
      state = decideDeferredRestart(state, busy, { ceilingTicks }).state
    }
    let fired = false
    for (let i = 0; i < IDLE_STREAK_TO_RESTART; i++) {
      const r = decideDeferredRestart(state, idle, { ceilingTicks })
      state = r.state
      fired = r.fire
    }
    expect(fired).toBe(true)
    expect(state.elapsedTicks).toBeLessThan(ceilingTicks)
  })

  test("busy ticks keep advancing elapsedTicks toward the ceiling even as idleStreak resets", () => {
    const ceilingTicks = 3
    let state = INITIAL_DEFERRED_RESTART_STATE
    const t1 = decideDeferredRestart(state, idle, { ceilingTicks })
    expect(t1.state.idleStreak).toBe(1)
    expect(t1.state.elapsedTicks).toBe(1)
    state = t1.state
    const t2 = decideDeferredRestart(state, busy, { ceilingTicks })
    expect(t2.state.idleStreak).toBe(0)
    expect(t2.state.elapsedTicks).toBe(2)
    expect(t2.fire).toBe(false)
    state = t2.state
    const t3 = decideDeferredRestart(state, busy, { ceilingTicks })
    expect(t3.state.elapsedTicks).toBe(3)
    expect(t3.fire).toBe(true)
  })
})

describe("decideDeferredRestart — proven-stale busy discount (#15282)", () => {
  test("fires while busy once staleTicks of unchanged reason + frozen mtime accrue", () => {
    const staleTicks = 3
    let state = INITIAL_DEFERRED_RESTART_STATE
    const t1 = decideDeferredRestart(state, stuck(), { staleTicks })
    expect(t1.fire).toBe(false)
    expect(t1.state.staleStreak).toBe(0)
    state = t1.state
    for (let i = 1; i < staleTicks; i++) {
      const r = decideDeferredRestart(state, stuck(), { staleTicks })
      expect(r.fire).toBe(false)
      expect(r.state.staleStreak).toBe(i)
      state = r.state
    }
    const breach = decideDeferredRestart(state, stuck(), { staleTicks })
    expect(breach.fire).toBe(true)
    expect(breach.fireReason).toBe("stale-wedge")
    expect(breach.state.staleStreak).toBe(staleTicks)
  })

  test("a CHANGED busy reason resets the stale streak (genuine work churns the signal)", () => {
    const staleTicks = 2
    let state = INITIAL_DEFERRED_RESTART_STATE
    state = decideDeferredRestart(state, stuck("inFlight=1", 1_000), { staleTicks }).state
    state = decideDeferredRestart(state, stuck("inFlight=1", 1_000), { staleTicks }).state
    expect(state.staleStreak).toBe(1)
    const changed = decideDeferredRestart(state, stuck("busyChildren=1", 1_000), { staleTicks })
    expect(changed.fire).toBe(false)
    expect(changed.state.staleStreak).toBe(0)
  })

  test("an ADVANCING transcript mtime resets the stale streak (the turn wrote a line)", () => {
    const staleTicks = 2
    let state = INITIAL_DEFERRED_RESTART_STATE
    state = decideDeferredRestart(state, stuck("inFlight=1", 1_000), { staleTicks }).state
    state = decideDeferredRestart(state, stuck("inFlight=1", 1_000), { staleTicks }).state
    expect(state.staleStreak).toBe(1)
    const advanced = decideDeferredRestart(state, stuck("inFlight=1", 2_000), { staleTicks })
    expect(advanced.fire).toBe(false)
    expect(advanced.state.staleStreak).toBe(0)
  })

  test("a null transcript mtime never contributes to the wedge (fail-safe missing signal)", () => {
    const staleTicks = 2
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 0; i < 10; i++) {
      const r = decideDeferredRestart(
        state,
        { idle: false, busyReason: "inFlight=1", transcriptMtimeMs: null },
        { staleTicks }
      )
      expect(r.fire).toBe(false)
      expect(r.state.staleStreak).toBe(0)
      state = r.state
    }
  })

  test("an absent busyReason never contributes (discount opt-out on the bare obs)", () => {
    const staleTicks = 2
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 0; i < 10; i++) {
      const r = decideDeferredRestart(state, busy, { staleTicks })
      expect(r.fire).toBe(false)
      expect(r.state.staleStreak).toBe(0)
      state = r.state
    }
  })

  test("an idle tick between stuck ticks breaks the wedge window", () => {
    const staleTicks = 2
    let state = INITIAL_DEFERRED_RESTART_STATE
    state = decideDeferredRestart(state, stuck(), { staleTicks }).state
    state = decideDeferredRestart(state, stuck(), { staleTicks }).state
    expect(state.staleStreak).toBe(1)
    const gap = decideDeferredRestart(state, idle, { staleTicks })
    expect(gap.state.staleStreak).toBe(0)
    expect(gap.state.prevBusyReason).toBe(null)
    state = gap.state
    const resume = decideDeferredRestart(state, stuck(), { staleTicks })
    expect(resume.fire).toBe(false)
    expect(resume.state.staleStreak).toBe(0)
  })

  test("no staleTicks config → discount disabled; a frozen stuck session never fires", () => {
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 0; i < 500; i++) {
      const r = decideDeferredRestart(state, stuck())
      expect(r.fire).toBe(false)
      state = r.state
    }
  })

  test("the stale-wedge fires BEFORE the far-off ceiling when both are configured", () => {
    const staleTicks = 3
    const ceilingTicks = 100
    let state = INITIAL_DEFERRED_RESTART_STATE
    let fireTick = -1
    for (let i = 0; i < 10; i++) {
      const r = decideDeferredRestart(state, stuck(), { ceilingTicks, staleTicks })
      state = r.state
      if (r.fire) {
        fireTick = i
        expect(r.fireReason).toBe("stale-wedge")
        break
      }
    }
    expect(fireTick).toBeGreaterThan(0)
    expect(state.elapsedTicks).toBeLessThan(ceilingTicks)
  })

  test("idle-streak fire reports fireReason 'idle'; ceiling breach reports 'ceiling'", () => {
    let s = INITIAL_DEFERRED_RESTART_STATE
    let last = decideDeferredRestart(s, idle)
    for (let i = 1; i < IDLE_STREAK_TO_RESTART; i++) last = decideDeferredRestart(last.state, idle)
    expect(last.fire).toBe(true)
    expect(last.fireReason).toBe("idle")
    const ceilingTicks = 2
    s = INITIAL_DEFERRED_RESTART_STATE
    s = decideDeferredRestart(s, busy, { ceilingTicks }).state
    const breach = decideDeferredRestart(s, busy, { ceilingTicks })
    expect(breach.fire).toBe(true)
    expect(breach.fireReason).toBe("ceiling")
  })
})

describe("resolveStaleWedgeMs", () => {
  test("defaults on unset / blank / malformed / negative", () => {
    expect(resolveStaleWedgeMs(undefined)).toBe(DEFAULT_STALE_WEDGE_MS)
    expect(resolveStaleWedgeMs("")).toBe(DEFAULT_STALE_WEDGE_MS)
    expect(resolveStaleWedgeMs("  ")).toBe(DEFAULT_STALE_WEDGE_MS)
    expect(resolveStaleWedgeMs("nonsense")).toBe(DEFAULT_STALE_WEDGE_MS)
    expect(resolveStaleWedgeMs("-1")).toBe(DEFAULT_STALE_WEDGE_MS)
  })

  test("honors a valid non-negative integer and floors fractions", () => {
    expect(resolveStaleWedgeMs("120000")).toBe(120000)
    expect(resolveStaleWedgeMs("600000.9")).toBe(600000)
    expect(resolveStaleWedgeMs("0")).toBe(0)
  })
})

describe("resolveMaxDeferMs", () => {
  test("defaults on unset / blank / malformed / negative", () => {
    expect(resolveMaxDeferMs(undefined)).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
    expect(resolveMaxDeferMs("")).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
    expect(resolveMaxDeferMs("  ")).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
    expect(resolveMaxDeferMs("nonsense")).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
    expect(resolveMaxDeferMs("-1")).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
  })

  test("honors a valid non-negative integer and floors fractions", () => {
    expect(resolveMaxDeferMs("120000")).toBe(120000)
    expect(resolveMaxDeferMs("900000.9")).toBe(900000)
    expect(resolveMaxDeferMs("0")).toBe(0)
  })
})

describe("decideDeferredRestart — fire-once contract (caller-owned)", () => {
  test("continues to report fire on each idle tick past the threshold", () => {
    let state = INITIAL_DEFERRED_RESTART_STATE
    for (let i = 0; i < IDLE_STREAK_TO_RESTART; i++) {
      state = decideDeferredRestart(state, idle).state
    }
    const past = decideDeferredRestart(state, idle)
    expect(past.fire).toBe(true)
    expect(past.state.idleStreak).toBe(IDLE_STREAK_TO_RESTART + 1)
  })
})
