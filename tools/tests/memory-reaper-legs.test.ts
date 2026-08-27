
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { assessRecoveryWindow } from "../lib/memory-reaper-global.ts"
import {
  assessMemoryKill,
  assessTreeKills,
  MAX_RSS_GB,
  MAX_TREE_PSS_GB,
  selectTopmostSupervisors,
} from "../lib/memory-reaper-legs.ts"
import type { PidSnapshot } from "../lib/memory-reaper-proc-scan.ts"

const GB = 1024 * 1024

const snaps = (rows: readonly (readonly [number, number, number, string])[]): readonly PidSnapshot[] =>
  rows.map(([pid, ppid, gb, name]) => ({ pid, ppid, vmRssKb: Math.round(gb * GB), pssKb: Math.round(gb * GB), name }))

const TREE_A = snaps([
  [100, 1, 0.5, "bun"],
  [101, 100, 0.5, "bun"],
  [110, 101, 20, "claude"],
  [111, 101, 3, "node"],
])

const TWO_TREES = snaps([
  [200, 1, 1, "bun"],
  [201, 200, 9, "claude"],
  [300, 1, 1, "bun"],
  [301, 300, 2, "claude"],
])

interface Case {
  readonly name: string
  readonly run: () => unknown
}

const CASES: readonly Case[] = [
  { name: "per-process: under the ceiling", run: () => assessMemoryKill({ rssKb: 3 * GB, thresholdKb: 8 * GB, kindLabel: "process (bun)", pid: 42 }) },
  { name: "per-process: exactly at the ceiling", run: () => assessMemoryKill({ rssKb: 8 * GB, thresholdKb: 8 * GB, kindLabel: "process (bun)", pid: 42 }) },
  { name: "per-process: over the ceiling", run: () => assessMemoryKill({ rssKb: 9.5 * GB, thresholdKb: 8 * GB, kindLabel: "process (claude)", pid: 43 }) },
  { name: "per-tree: nested wrapper and supervisor count once", run: () => assessTreeKills({ snapshots: TREE_A, supervisorPids: [100, 101], perTreeThresholdKb: 24 * GB, perProcessKillPids: [] }) },
  { name: "per-tree: residue spares a tree whose runaway is already reclaimed", run: () => assessTreeKills({ snapshots: TREE_A, supervisorPids: [100, 101], perTreeThresholdKb: 12 * GB, perProcessKillPids: [110] }) },
  { name: "per-tree: two disjoint trees are both kept", run: () => assessTreeKills({ snapshots: TWO_TREES, supervisorPids: [200, 300], perTreeThresholdKb: 8 * GB, perProcessKillPids: [] }) },
  { name: "recovery: signal clear resets the window", run: () => assessRecoveryWindow({ globalTripped: false, nowMs: 1_000_000, lastGlobalKillAtMs: 900_000, recoveryWindowMs: 60_000 }) },
  { name: "recovery: tripped with no kill in flight", run: () => assessRecoveryWindow({ globalTripped: true, nowMs: 1_000_000, lastGlobalKillAtMs: null, recoveryWindowMs: 60_000 }) },
  { name: "recovery: tripped inside the window is suppressed", run: () => assessRecoveryWindow({ globalTripped: true, nowMs: 1_000_000, lastGlobalKillAtMs: 970_000, recoveryWindowMs: 60_000 }) },
  { name: "recovery: tripped after the window escalates once", run: () => assessRecoveryWindow({ globalTripped: true, nowMs: 1_000_000, lastGlobalKillAtMs: 900_000, recoveryWindowMs: 60_000 }) },
]

const STANDING: Readonly<Record<string, unknown>> = {
  "per-process: under the ceiling": {
    "kill": false,
    "reason": "process (bun) pid=42: VmRSS 3.0 GB"
  },
  "per-process: exactly at the ceiling": {
    "kill": false,
    "reason": "process (bun) pid=42: VmRSS 8.0 GB"
  },
  "per-process: over the ceiling": {
    "kill": true,
    "reason": "killing process (claude) pid=43: VmRSS 9.5 GB exceeds 8.0 GB ceiling"
  },
  "per-tree: nested wrapper and supervisor count once": [
    {
      "rootPid": 100,
      "treePssKb": 25165824,
      "descendantPids": [
        101,
        111,
        110
      ],
      "decision": {
        "kill": false,
        "reason": "supervisor tree root=100 (descendants=3): tree PSS 24.0 GB"
      }
    }
  ],
  "per-tree: residue spares a tree whose runaway is already reclaimed": [
    {
      "rootPid": 100,
      "treePssKb": 4194304,
      "descendantPids": [
        101,
        111,
        110
      ],
      "decision": {
        "kill": false,
        "reason": "supervisor tree root=100 (descendants=3): tree PSS 4.0 GB"
      }
    }
  ],
  "per-tree: two disjoint trees are both kept": [
    {
      "rootPid": 200,
      "treePssKb": 10485760,
      "descendantPids": [
        201
      ],
      "decision": {
        "kill": true,
        "reason": "killing supervisor tree root=200 (descendants=1): tree PSS 10.0 GB exceeds 8.0 GB ceiling"
      }
    },
    {
      "rootPid": 300,
      "treePssKb": 3145728,
      "descendantPids": [
        301
      ],
      "decision": {
        "kill": false,
        "reason": "supervisor tree root=300 (descendants=1): tree PSS 3.0 GB"
      }
    }
  ],
  "recovery: signal clear resets the window": {
    "execute": false,
    "recovered": true,
    "reason": "global leg clear \u2014 recovery window reset"
  },
  "recovery: tripped with no kill in flight": {
    "execute": true,
    "recovered": false,
    "reason": "global leg tripped, no kill in flight \u2014 executing"
  },
  "recovery: tripped inside the window is suppressed": {
    "execute": false,
    "recovered": false,
    "reason": "global leg still tripped but within recovery window (30s remaining) \u2014 suppressing escalation, waiting for MemAvailable to recover"
  },
  "recovery: tripped after the window escalates once": {
    "execute": true,
    "recovered": false,
    "reason": "global leg still tripped 100s after last kill (recovery window elapsed) \u2014 escalating one more kill"
  }
}

describe("the reaper's two hard-breach legs and its backoff, held against the code repository", () => {
  for (const one of CASES) {
    it(one.name, () => {
      const answered = decided("ported", { value: one.run(), notice: null })
      const verdict = hold(one.name, STANDING[one.name], answered)
      expect(verdict.matches).toBe(true)
    })
  }

  it("every vector has a captured answer, and every captured answer a vector", () => {
    expect(CASES.map((one) => one.name).sort()).toEqual(Object.keys(STANDING).sort())
  })

  it("the population reaches both verdicts of each leg and every backoff branch", () => {
    const answers = JSON.stringify(STANDING)
    expect(answers).toContain("exceeds 8.0 GB ceiling")
    expect(answers).toContain("killing supervisor tree")
    expect(answers).toContain("recovery window reset")
    expect(answers).toContain("suppressing escalation")
    expect(answers).toContain("escalating one more kill")
    expect(answers).toContain("no kill in flight")
  })
})

describe("selectTopmostSupervisors — what becomes a tree root, and so what one kill can reach", () => {
  const NESTED = snaps([
    [100, 1, 0.5, "bun"],
    [101, 100, 0.5, "bun"],
    [110, 101, 2, "claude"],
  ])

  const SHARED_PARENT = snaps([
    [50, 1, 0.1, "tmux"],
    [200, 50, 1, "bun"],
    [201, 200, 9, "claude"],
    [300, 50, 1, "bun"],
    [301, 300, 2, "claude"],
  ])

  it("a wrapper and the supervisor it execs collapse to one root, so one seat is weighed once", () => {
    expect(selectTopmostSupervisors([100, 101], NESTED)).toEqual([100])
  })

  it("two seats sharing no supervisor stay two roots", () => {
    expect(selectTopmostSupervisors([200, 300], TWO_TREES).toSorted()).toEqual([200, 300])
  })

  it("a shared parent that is no supervisor does not merge two seats into one killable tree", () => {
    expect(selectTopmostSupervisors([200, 300], SHARED_PARENT).toSorted()).toEqual([200, 300])
  })

  it("a shared parent taken FOR a supervisor swallows both seats — what the tmux server did", () => {
    expect(selectTopmostSupervisors([50, 200, 300], SHARED_PARENT)).toEqual([50])
  })
})

const LARGEST_LEGITIMATE_PROCESS_GB = 3.3

describe("how the two ceilings compose", () => {
  it("the per-process ceiling is strictly below the per-tree ceiling, so the narrow leg is reachable", () => {
    expect(MAX_RSS_GB).toBeLessThan(MAX_TREE_PSS_GB)
  })

  it("the per-process ceiling clears the largest legitimate process with at least 2x headroom", () => {
    expect(MAX_RSS_GB).toBeGreaterThanOrEqual(LARGEST_LEGITIMATE_PROCESS_GB * 2)
  })
})

const SHARED_PAGES = snaps([
  [400, 1, 1, "bun"],
  [401, 400, 12, "claude"],
  [402, 400, 12, "claude"],
]).map((s) => (s.pid === 400 ? s : { ...s, pssKb: 5 * GB }))

describe("the per-tree leg weighs what killing a tree would return, not what RSS counts twice", () => {
  it("a tree whose members share pages is spared where the summed RSS alone would have killed it", () => {
    const summedRssGb = SHARED_PAGES.reduce((a, s) => a + s.vmRssKb, 0) / GB
    expect(summedRssGb).toBe(25)

    const [tree] = assessTreeKills({
      snapshots: SHARED_PAGES,
      supervisorPids: [400],
      perTreeThresholdKb: 16 * GB,
      perProcessKillPids: [],
    })
    expect(tree?.treePssKb).toBe(11 * GB)
    expect(tree?.decision.kill).toBe(false)
  })
})
