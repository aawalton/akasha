
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { assessGlobalKill } from "../lib/memory-reaper-global.ts"
import { planReaperKills } from "../lib/memory-reaper-plan.ts"
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
  { name: "global: swap healthy, leg disarmed", run: () => assessGlobalKill({ snapshots: TREE_A, supervisorPids: [100], availableKb: 1 * GB, swapTotalKb: 32 * GB, swapFreeKb: 20 * GB, minAvailKb: 4 * GB, minFreeSwapKb: 4 * GB }) },
  { name: "global: swap drained and headroom gone, largest tree picked", run: () => assessGlobalKill({ snapshots: TWO_TREES, supervisorPids: [200, 300], availableKb: 2 * GB, swapTotalKb: 32 * GB, swapFreeKb: 1 * GB, minAvailKb: 4 * GB, minFreeSwapKb: 4 * GB }) },
  { name: "global: swapless host with no supervisor, largest pid picked", run: () => assessGlobalKill({ snapshots: TWO_TREES, supervisorPids: [], availableKb: 4 * GB, swapTotalKb: 0, swapFreeKb: 0, minAvailKb: 4 * GB, minFreeSwapKb: 4 * GB }) },
  { name: "global: tripped with nothing to kill", run: () => assessGlobalKill({ snapshots: [], supervisorPids: [], availableKb: 0, swapTotalKb: 0, swapFreeKb: 0, minAvailKb: 4 * GB, minFreeSwapKb: 4 * GB }) },
  { name: "plan: a per-process breach inside a tree under its ceiling", run: () => planReaperKills({ snapshots: TREE_A, supervisorPids: [100, 101], selfPid: 999, perProcessThresholdKb: 8 * GB, perTreeThresholdKb: 24 * GB, globalTarget: null }) },
  { name: "plan: the tree leg swallows the pid it contains", run: () => planReaperKills({ snapshots: TREE_A, supervisorPids: [100, 101], selfPid: 999, perProcessThresholdKb: 8 * GB, perTreeThresholdKb: 3 * GB, globalTarget: null }) },
  { name: "plan: a global tree target already taken by a hard breach", run: () => planReaperKills({ snapshots: TREE_A, supervisorPids: [100, 101], selfPid: 999, perProcessThresholdKb: 24 * GB, perTreeThresholdKb: 12 * GB, globalTarget: { kind: "tree", rootPid: 100, descendantPids: [101, 110, 111], treeRssKb: 24 * GB } }) },
  { name: "plan: a global pid target joins the batch", run: () => planReaperKills({ snapshots: TWO_TREES, supervisorPids: [200, 300], selfPid: 999, perProcessThresholdKb: 24 * GB, perTreeThresholdKb: 24 * GB, globalTarget: { kind: "pid", pid: 201, vmRssKb: 9 * GB, name: "claude" } }) },
  { name: "plan: a tree containing self is refused", run: () => planReaperKills({ snapshots: TREE_A, supervisorPids: [100, 101], selfPid: 111, perProcessThresholdKb: 24 * GB, perTreeThresholdKb: 12 * GB, globalTarget: null }) },
  { name: "plan: self and pid 1 are never per-process candidates", run: () => planReaperKills({ snapshots: snaps([[1, 0, 30, "systemd"], [777, 1, 30, "bun"]]), supervisorPids: [], selfPid: 777, perProcessThresholdKb: 8 * GB, perTreeThresholdKb: 24 * GB, globalTarget: null }) },
]

const STANDING: Readonly<Record<string, unknown>> = {
  "global: swap healthy, leg disarmed": {
    "kill": false,
    "reason": "MemAvailable 1.0 GB",
    "target": null
  },
  "global: swap drained and headroom gone, largest tree picked": {
    "kill": true,
    "reason": "MemAvailable 2.0 GB at/under 4.0 GB pre-OOM margin with swap drained \u2014 killing largest supervisor tree root=200 (tree VmRSS 10.0 GB)",
    "target": {
      "kind": "tree",
      "rootPid": 200,
      "descendantPids": [
        201
      ],
      "treeRssKb": 10485760
    }
  },
  "global: swapless host with no supervisor, largest pid picked": {
    "kill": true,
    "reason": "MemAvailable 4.0 GB at/under 4.0 GB pre-OOM margin with swap drained \u2014 killing largest pid=201 (claude, VmRSS 9.0 GB)",
    "target": {
      "kind": "pid",
      "pid": 201,
      "vmRssKb": 9437184,
      "name": "claude"
    }
  },
  "global: tripped with nothing to kill": {
    "kill": false,
    "reason": "MemAvailable 0.0 GB at/under 4.0 GB pre-OOM margin with swap drained but no kill target found",
    "target": null
  },
  "plan: a per-process breach inside a tree under its ceiling": {
    "treeKills": [],
    "procKills": [
      {
        "pid": 110,
        "leg": "per-process",
        "reason": "killing process (claude) pid=110: VmRSS 20.0 GB exceeds 8.0 GB ceiling",
        "disposition": "signalled"
      }
    ],
    "sparedTrees": [
      {
        "rootPid": 100,
        "treeRssKb": 4194304,
        "reclaimedPids": [
          110
        ],
        "reason": "sparing supervisor tree root=100: residue 4.0 GB is under the ceiling once pid(s) 110 are reclaimed"
      }
    ]
  },
  "plan: the tree leg swallows the pid it contains": {
    "treeKills": [
      {
        "rootPid": 100,
        "descendantPids": [
          101,
          111,
          110
        ],
        "leg": "per-tree",
        "reason": "killing supervisor tree root=100 (descendants=3): tree VmRSS 4.0 GB exceeds 3.0 GB ceiling",
        "disposition": "signalled"
      }
    ],
    "procKills": [
      {
        "pid": 110,
        "leg": "per-process",
        "reason": "killing process (claude) pid=110: VmRSS 20.0 GB exceeds 8.0 GB ceiling",
        "disposition": "covered-by-tree-kill"
      }
    ],
    "sparedTrees": []
  },
  "plan: a global tree target already taken by a hard breach": {
    "treeKills": [
      {
        "rootPid": 100,
        "descendantPids": [
          101,
          111,
          110
        ],
        "leg": "per-tree",
        "reason": "killing supervisor tree root=100 (descendants=3): tree VmRSS 24.0 GB exceeds 12.0 GB ceiling",
        "disposition": "signalled"
      },
      {
        "rootPid": 100,
        "descendantPids": [
          101,
          110,
          111
        ],
        "leg": "host-global",
        "reason": "host-global leg selected supervisor tree root=100",
        "disposition": "already-planned"
      }
    ],
    "procKills": [],
    "sparedTrees": []
  },
  "plan: a global pid target joins the batch": {
    "treeKills": [],
    "procKills": [
      {
        "pid": 201,
        "leg": "host-global",
        "reason": "host-global leg selected pid=201 (claude)",
        "disposition": "signalled"
      }
    ],
    "sparedTrees": []
  },
  "plan: a tree containing self is refused": {
    "treeKills": [
      {
        "rootPid": 100,
        "descendantPids": [
          101,
          111,
          110
        ],
        "leg": "per-tree",
        "reason": "killing supervisor tree root=100 (descendants=3): tree VmRSS 24.0 GB exceeds 12.0 GB ceiling",
        "disposition": "refused-contains-self"
      }
    ],
    "procKills": [],
    "sparedTrees": []
  },
  "plan: self and pid 1 are never per-process candidates": {
    "treeKills": [],
    "procKills": [],
    "sparedTrees": []
  }
}

describe("the reaper's kill decisions, held against what they answered in the code repository", () => {
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

  it("the population reaches every leg and both kinds of global target", () => {
    const named = (part: string): number => CASES.filter((one) => one.name.startsWith(part)).length
    expect(named("global:")).toBeGreaterThan(0)
    expect(named("plan:")).toBeGreaterThan(0)
    const answers = JSON.stringify(STANDING)
    expect(answers).toContain('"kind":"tree"')
    expect(answers).toContain('"kind":"pid"')
    expect(answers).toContain("refused-contains-self")
    expect(answers).toContain("covered-by-tree-kill")
    expect(answers).toContain("already-planned")
    expect(answers).toContain("sparing supervisor tree")
  })
})
