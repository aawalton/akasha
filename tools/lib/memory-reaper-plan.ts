
import type { PidSnapshot } from "./memory-reaper-proc-scan.ts"
import { assessMemoryKill, assessTreeKills, KB_PER_GB } from "./memory-reaper-legs.ts"
import type { GlobalKillTarget } from "./memory-reaper-global.ts"
import { seatBindingInArgv } from "./memory-reaper-owner.ts"

export type PlannedTreeKill = {
  rootPid: number
  descendantPids: readonly number[]
  leg: "per-tree" | "host-global"
  reason: string
  disposition: "signalled" | "refused-contains-self" | "refused-spans-seats" | "already-planned"
  seats?: readonly string[]
}

export type PlannedProcKill = {
  pid: number
  leg: "per-process" | "host-global"
  reason: string
  disposition: "signalled" | "covered-by-tree-kill"
}

export type SparedTree = {
  rootPid: number
  treePssKb: number
  reclaimedPids: readonly number[]
  reason: string
}

export type ReaperKillPlan = {
  treeKills: readonly PlannedTreeKill[]
  procKills: readonly PlannedProcKill[]
  sparedTrees: readonly SparedTree[]
}

export type ReaperKillPlanInput = {
  snapshots: readonly PidSnapshot[]
  supervisorPids: readonly number[]
  selfPid: number
  perProcessThresholdKb: number
  perTreeThresholdKb: number
  globalTarget: GlobalKillTarget | null
  readArgv: (pid: number) => readonly string[] | undefined
}

export function seatsInTree(
  pids: readonly number[],
  readArgv: (pid: number) => readonly string[] | undefined
): readonly string[] {
  const seats = new Set<string>()
  for (const pid of pids) {
    const binding = seatBindingInArgv(readArgv(pid) ?? [], pid, 0)
    if (binding !== null) seats.add(binding.agentId)
  }
  return [...seats].toSorted()
}

export function planReaperKills(input: ReaperKillPlanInput): ReaperKillPlan {
  const procKills: PlannedProcKill[] = []
  for (const s of input.snapshots) {
    if (s.pid === 1 || s.pid === input.selfPid) continue
    const decision = assessMemoryKill({
      rssKb: s.vmRssKb,
      thresholdKb: input.perProcessThresholdKb,
      kindLabel: `process (${s.name})`,
      pid: s.pid,
    })
    if (!decision.kill) continue
    procKills.push({
      pid: s.pid,
      leg: "per-process",
      reason: decision.reason,
      disposition: "signalled",
    })
  }

  const treeResults = assessTreeKills({
    snapshots: input.snapshots,
    supervisorPids: input.supervisorPids,
    perTreeThresholdKb: input.perTreeThresholdKb,
    perProcessKillPids: procKills.map((p) => p.pid),
  })
  const reclaimedSet = new Set(procKills.map((p) => p.pid))
  const treeKills: PlannedTreeKill[] = []
  const sparedTrees: SparedTree[] = []
  for (const t of treeResults) {
    if (!t.decision.kill) {
      const reclaimedPids = [t.rootPid, ...t.descendantPids].filter((p) => reclaimedSet.has(p))
      if (reclaimedPids.length > 0) {
        const residueGb = (t.treePssKb / KB_PER_GB).toFixed(1)
        sparedTrees.push({
          rootPid: t.rootPid,
          treePssKb: t.treePssKb,
          reclaimedPids,
          reason: `sparing supervisor tree root=${t.rootPid}: residue ${residueGb} GB is under the ceiling once pid(s) ${reclaimedPids.join(",")} are reclaimed`,
        })
      }
      continue
    }
    treeKills.push({
      rootPid: t.rootPid,
      descendantPids: t.descendantPids,
      leg: "per-tree",
      reason: t.decision.reason,
      disposition: "signalled",
    })
  }

  if (input.globalTarget !== null) {
    if (input.globalTarget.kind === "tree") {
      treeKills.push({
        rootPid: input.globalTarget.rootPid,
        descendantPids: input.globalTarget.descendantPids,
        leg: "host-global",
        reason: `host-global leg selected supervisor tree root=${input.globalTarget.rootPid}`,
        disposition: "signalled",
      })
    } else {
      procKills.push({
        pid: input.globalTarget.pid,
        leg: "host-global",
        reason: `host-global leg selected pid=${input.globalTarget.pid} (${input.globalTarget.name})`,
        disposition: "signalled",
      })
    }
  }

  const plannedRoots = new Set<number>()
  const plannedTreePids = new Set<number>()
  const disposedTrees = treeKills.map((t): PlannedTreeKill => {
    for (const pid of [t.rootPid, ...t.descendantPids]) plannedTreePids.add(pid)
    if (plannedRoots.has(t.rootPid)) return { ...t, disposition: "already-planned" }
    plannedRoots.add(t.rootPid)
    if (t.rootPid === input.selfPid || t.descendantPids.includes(input.selfPid)) {
      return { ...t, disposition: "refused-contains-self" }
    }
    const seats = seatsInTree([t.rootPid, ...t.descendantPids], input.readArgv)
    if (seats.length > 1) return { ...t, disposition: "refused-spans-seats", seats }
    return t
  })

  return {
    treeKills: disposedTrees,
    procKills: procKills.map(
      (p): PlannedProcKill =>
        plannedTreePids.has(p.pid) ? { ...p, disposition: "covered-by-tree-kill" } : p
    ),
    sparedTrees,
  }
}
