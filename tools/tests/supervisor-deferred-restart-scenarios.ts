
import {
  type Arm,
  type ArmOptions,
  type Obs,
  deferredRestartRuleDouble,
  idleRuleDouble,
} from "./supervisor-deferred-restart-doubles.ts"

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

function waitFor(predicate: () => boolean, timeoutMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const iv = setInterval(() => {
      if (predicate()) {
        clearInterval(iv)
        resolve()
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(iv)
        reject(new Error(`waitFor timed out after ${timeoutMs}ms`))
      }
    }, 2)
  })
}
export const IDLE_OBS: Obs = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}
export const BUSY_OBS: Obs = {
  inFlight: 1,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}
const OWN_STATE_IDLE_WITH_CHILDREN: Obs = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 2,
  claudePresent: true,
}
const CHILD_BUSY_OBS: Obs = {
  inFlight: 0,
  busyChildren: 3,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}
const MIDTURN_BUSY_OBS: Obs = {
  inFlight: 1,
  busyChildren: 3,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}
const NEVER = (): Promise<Obs> => new Promise<Obs>(() => {})
const THROWS = (): Promise<Obs> => Promise.reject(new Error("observe boom"))
const CLIFF = 10_000
const IGNORED_KIDS = [
  { pid: "9001", cmdline: "kubectl port-forward svc/pg 5432:5432", ageMs: 6_000_000 },
  { pid: "9002", cmdline: "tail -f /tmp/echo-scaffold.log", ageMs: 6_000_000 },
]

export type Projection = Record<string, number | boolean>

function recorder(): { fired: number; lines: string[] } {
  return { fired: 0, lines: [] }
}

const noProbe = (
  r: { fired: number; lines: string[] }
): Pick<
  ArmOptions,
  "getClaudePid" | "getProxyPort" | "getAgentId" | "idleRule" | "deferredRestartRule" | "onIdle" | "log"
> => ({
  getClaudePid: () => null,
  getProxyPort: () => null,
  getAgentId: () => null,
  idleRule: idleRuleDouble(),
  deferredRestartRule: deferredRestartRuleDouble(),
  onIdle: () => {
    r.fired += 1
  },
  log: (line: string) => r.lines.push(line),
})

const has = (lines: string[], needle: string): boolean => lines.some((l) => l.includes(needle))
const find = (lines: string[], needle: string): string | undefined =>
  lines.find((l) => l.includes(needle))

export async function runScenarios(arm: Arm): Promise<Record<string, Projection>> {
  const out: Record<string, Projection> = {}

  {
    const r = recorder()
    const gate = arm({ ...noProbe(r), tickMs: 5, maxDeferMs: 30, observe: NEVER })
    await waitFor(() => r.fired > 0, 2_000)
    out["ceiling-never-settles"] = { fired: r.fired }
    gate.cancel()
  }

  {
    const r = recorder()
    const gate = arm({ ...noProbe(r), tickMs: 5, maxDeferMs: 30, observe: THROWS })
    await waitFor(() => r.fired > 0, 2_000)
    out["ceiling-throws"] = { fired: r.fired }
    gate.cancel()
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      maxDeferMs: 5,
      observe: () => Promise.resolve(BUSY_OBS),
    })
    await waitFor(() => r.fired > 0, 2_000)
    await sleep(60)
    out["ceiling-races-once"] = { fired: r.fired }
    gate.cancel()
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      maxDeferMs: 100_000,
      observe: () => Promise.resolve(IDLE_OBS),
    })
    await waitFor(() => r.fired > 0, 2_000)
    out["idle-streak-beats-ceiling"] = { fired: r.fired, idleLogged: has(r.lines, "agent idle") }
    gate.cancel()
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      maxDeferMs: 100_000,
      observe: () => Promise.resolve(OWN_STATE_IDLE_WITH_CHILDREN),
    })
    await waitFor(() => r.fired > 0, 2_000)
    out["fires-with-live-children"] = { fired: r.fired }
    gate.cancel()
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      observe: () =>
        Promise.resolve({
          inFlight: 1,
          busyChildren: 0,
          inFlightDispatchChildren: 3,
          claudePresent: true,
        }),
    })
    await waitFor(() => has(r.lines, "session busy"), 2_000)
    gate.cancel()
    const busyLine = find(r.lines, "session busy") ?? ""
    out["busy-line-omits-child"] = {
      namesInFlight: busyLine.includes("inFlight=1"),
      namesDispatchChildren: busyLine.includes("inFlightDispatchChildren"),
    }
  }

  {
    const r = recorder()
    const gate = arm({ ...noProbe(r), tickMs: 5, observe: () => Promise.resolve(BUSY_OBS) })
    await sleep(120)
    out["unbounded-never-fires"] = { fired: r.fired }
    gate.cancel()
  }

  {
    const r = recorder()
    const gate = arm({ ...noProbe(r), tickMs: 5, maxDeferMs: 20, observe: NEVER })
    gate.cancel()
    await sleep(120)
    out["cancel-clears-both"] = { fired: r.fired }
  }

  {
    const r = recorder()
    const gate = arm({ ...noProbe(r), tickMs: 5, observe: () => Promise.resolve(BUSY_OBS) })
    await waitFor(() => has(r.lines, "session busy"), 2_000)
    gate.cancel()
    const busyLine = find(r.lines, "session busy") ?? ""
    out["busy-line-names-signal"] = {
      namesInFlight: busyLine.includes("inFlight=1"),
      saysDeferring: busyLine.includes("deferring"),
    }
  }

  {
    const r = recorder()
    const gate = arm({ ...noProbe(r), tickMs: 5, observe: () => Promise.resolve(IDLE_OBS) })
    await waitFor(() => r.fired > 0, 2_000)
    gate.cancel()
    out["idle-fast-path-quiet"] = {
      anyBusyLine: has(r.lines, "session busy"),
      anyIdleLine: has(r.lines, "agent idle"),
    }
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      staleWedgeMs: 15,
      observe: () => Promise.resolve(BUSY_OBS),
      readTranscriptMtime: () => 1_000,
    })
    await waitFor(() => r.fired > 0, 2_000)
    gate.cancel()
    const fireLine = find(r.lines, "FIRING restart_preserve WHILE BUSY")
    out["stale-wedge-fires"] = {
      fired: r.fired,
      fireLineDefined: fireLine !== undefined,
      saysStaleWedge: (fireLine ?? "").includes("cause=stale-wedge"),
      saysHistory: (fireLine ?? "").includes("busy-signal history"),
      namesInFlight: (fireLine ?? "").includes("inFlight=1"),
      saysTranscriptFrozen: (fireLine ?? "").includes("transcript frozen"),
    }
  }

  {
    const r = recorder()
    let mtime = 1_000
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      staleWedgeMs: 15,
      observe: () => Promise.resolve(BUSY_OBS),
      readTranscriptMtime: () => (mtime += 1_000),
    })
    await sleep(150)
    gate.cancel()
    out["advancing-transcript-vetoes"] = { fired: r.fired }
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      staleWedgeMs: 15,
      observe: () => Promise.resolve(BUSY_OBS),
      readTranscriptMtime: () => null,
    })
    await sleep(150)
    gate.cancel()
    out["null-transcript-never-wedges"] = { fired: r.fired }
  }

  {
    const r = recorder()
    let mtime = 1_000
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      maxDeferMs: 40,
      observe: () => Promise.resolve(BUSY_OBS),
      readTranscriptMtime: () => (mtime += 1_000),
    })
    await waitFor(() => r.fired > 0, 2_000)
    gate.cancel()
    const fireLine = find(r.lines, "FIRING restart_preserve WHILE BUSY")
    out["ceiling-fire-loud"] = {
      fireLineDefined: fireLine !== undefined,
      saysCeiling: (fireLine ?? "").includes("cause=ceiling"),
      saysHistory: (fireLine ?? "").includes("busy-signal history"),
      namesInFlight: (fireLine ?? "").includes("inFlight=1"),
    }
  }

  {
    const r = recorder()
    const started = Date.now()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      maxDeferMs: 100_000,
      armedAtMs: Date.now() - 100_000,
      observe: () => Promise.resolve(BUSY_OBS),
      readTranscriptMtime: () => (Date.now() % 7) + 1,
    })
    await waitFor(() => r.fired > 0, 2_000)
    gate.cancel()
    out["armed-at-anchors-ceiling"] = {
      fired: r.fired,
      firedPromptly: Date.now() - started < 1_000,
    }
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      observe: () => Promise.resolve(CHILD_BUSY_OBS),
      pastCliffOverride: { cliffAgeMs: CLIFF, getChildAgeMs: () => CLIFF - 1 },
    })
    await sleep(60)
    gate.cancel()
    out["under-cliff-defers"] = { fired: r.fired }
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      observe: () => Promise.resolve(CHILD_BUSY_OBS),
      pastCliffOverride: { cliffAgeMs: CLIFF, getChildAgeMs: () => CLIFF + 5_000 },
      readBusyChildDetails: () => Promise.resolve(IGNORED_KIDS),
    })
    await waitFor(() => r.fired > 0, 2_000)
    await sleep(20)
    gate.cancel()
    const fireLine = find(r.lines, "PAST-CLIFF OVERRIDE")
    out["past-cliff-fires-loud"] = {
      fired: r.fired,
      overrideLineDefined: fireLine !== undefined,
      countsOverridden: (fireLine ?? "").includes("OVERRIDING 2 busy non-MCP child(ren)"),
      namesFirstKid: (fireLine ?? "").includes("kubectl port-forward"),
      namesSecondKid: (fireLine ?? "").includes("tail -f /tmp/echo-scaffold.log"),
    }
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      observe: () => Promise.resolve(IDLE_OBS),
      pastCliffOverride: { cliffAgeMs: CLIFF, getChildAgeMs: () => CLIFF + 5_000 },
      readBusyChildDetails: () => Promise.resolve(IGNORED_KIDS),
    })
    await waitFor(() => r.fired > 0, 2_000)
    await sleep(20)
    gate.cancel()
    out["idle-past-cliff-is-routine"] = {
      fired: r.fired,
      saysIdleFire: has(r.lines, "agent idle — firing restart_preserve"),
      saysOverride: has(r.lines, "PAST-CLIFF OVERRIDE"),
    }
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      observe: () => Promise.resolve(MIDTURN_BUSY_OBS),
      pastCliffOverride: { cliffAgeMs: CLIFF, getChildAgeMs: () => CLIFF + 5_000 },
      readBusyChildDetails: () => Promise.resolve(IGNORED_KIDS),
    })
    await sleep(60)
    gate.cancel()
    out["midturn-past-cliff-defers"] = { fired: r.fired }
  }

  {
    const r = recorder()
    const gate = arm({
      ...noProbe(r),
      tickMs: 5,
      observe: () => Promise.resolve(CHILD_BUSY_OBS),
      pastCliffOverride: { cliffAgeMs: CLIFF, getChildAgeMs: () => null },
    })
    await sleep(60)
    gate.cancel()
    out["null-child-age-never-overrides"] = { fired: r.fired }
  }

  return out
}
