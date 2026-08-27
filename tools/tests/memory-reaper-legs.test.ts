
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { assessRecoveryWindow } from "../lib/memory-reaper-global.ts"
import { assessMemoryKill, assessTreeKills } from "../lib/memory-reaper-legs.ts"
import type { PidSnapshot } from "../lib/memory-reaper-proc-scan.ts"

const GB = 1024 * 1024

const snaps = (rows: readonly (readonly [number, number, number, string])[]): readonly PidSnapshot[] =>
  rows.map(([pid, ppid, gb, name]) => ({ pid, ppid, vmRssKb: Math.round(gb * GB), name }))

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
      "treeRssKb": 25165824,
      "descendantPids": [
        101,
        111,
        110
      ],
      "decision": {
        "kill": false,
        "reason": "supervisor tree root=100 (descendants=3): tree VmRSS 24.0 GB"
      }
    }
  ],
  "per-tree: residue spares a tree whose runaway is already reclaimed": [
    {
      "rootPid": 100,
      "treeRssKb": 4194304,
      "descendantPids": [
        101,
        111,
        110
      ],
      "decision": {
        "kill": false,
        "reason": "supervisor tree root=100 (descendants=3): tree VmRSS 4.0 GB"
      }
    }
  ],
  "per-tree: two disjoint trees are both kept": [
    {
      "rootPid": 200,
      "treeRssKb": 10485760,
      "descendantPids": [
        201
      ],
      "decision": {
        "kill": true,
        "reason": "killing supervisor tree root=200 (descendants=1): tree VmRSS 10.0 GB exceeds 8.0 GB ceiling"
      }
    },
    {
      "rootPid": 300,
      "treeRssKb": 3145728,
      "descendantPids": [
        301
      ],
      "decision": {
        "kill": false,
        "reason": "supervisor tree root=300 (descendants=1): tree VmRSS 3.0 GB"
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
