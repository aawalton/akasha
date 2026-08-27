
import type { PidSnapshot } from "./memory-reaper-proc-scan.ts"
import { assessTreeKills, KB_PER_GB, type TreeKillResult } from "./memory-reaper-legs.ts"

export const GLOBAL_MIN_AVAIL_GB = 4

export const GLOBAL_MIN_FREE_SWAP_GB = 4

export type GlobalKillInput = {
  snapshots: readonly PidSnapshot[]
  supervisorPids: readonly number[]
  availableKb: number
  swapTotalKb: number
  swapFreeKb: number
  minAvailKb: number
  minFreeSwapKb: number
}

export type GlobalKillTarget =
  | { kind: "tree"; rootPid: number; descendantPids: readonly number[]; treePssKb: number }
  | { kind: "pid"; pid: number; vmRssKb: number; name: string }

export type GlobalKillDecision = {
  kill: boolean
  reason: string
  target: GlobalKillTarget | null
}

export function assessGlobalKill(input: GlobalKillInput): GlobalKillDecision {
  const availGb = (input.availableKb / KB_PER_GB).toFixed(1)
  const minAvailGb = (input.minAvailKb / KB_PER_GB).toFixed(1)

  const swapDrained = input.swapTotalKb === 0 || input.swapFreeKb <= input.minFreeSwapKb
  const headroomTrigger = swapDrained && input.availableKb <= input.minAvailKb
  if (!headroomTrigger) {
    return {
      kill: false,
      reason: `MemAvailable ${availGb} GB`,
      target: null,
    }
  }
  const triggerReason = `MemAvailable ${availGb} GB at/under ${minAvailGb} GB pre-OOM margin with swap drained`

  const treeResults = assessTreeKills({
    snapshots: input.snapshots,
    supervisorPids: input.supervisorPids,
    perTreeThresholdKb: Number.POSITIVE_INFINITY,
    perProcessKillPids: [],
  })
  let largestTree: TreeKillResult | undefined
  for (const t of treeResults) {
    if (largestTree === undefined || t.treePssKb > largestTree.treePssKb) largestTree = t
  }
  if (largestTree !== undefined && largestTree.treePssKb > 0) {
    const treeGb = (largestTree.treePssKb / KB_PER_GB).toFixed(1)
    return {
      kill: true,
      reason: `${triggerReason} — killing largest supervisor tree root=${largestTree.rootPid} (tree PSS ${treeGb} GB)`,
      target: {
        kind: "tree",
        rootPid: largestTree.rootPid,
        descendantPids: largestTree.descendantPids,
        treePssKb: largestTree.treePssKb,
      },
    }
  }

  let largestPid: PidSnapshot | undefined
  for (const s of input.snapshots) {
    if (largestPid === undefined || s.vmRssKb > largestPid.vmRssKb) largestPid = s
  }
  if (largestPid === undefined) {
    return {
      kill: false,
      reason: `${triggerReason} but no kill target found`,
      target: null,
    }
  }
  const pidGb = (largestPid.vmRssKb / KB_PER_GB).toFixed(1)
  return {
    kill: true,
    reason: `${triggerReason} — killing largest pid=${largestPid.pid} (${largestPid.name}, VmRSS ${pidGb} GB)`,
    target: {
      kind: "pid",
      pid: largestPid.pid,
      vmRssKb: largestPid.vmRssKb,
      name: largestPid.name,
    },
  }
}

export const GLOBAL_RECOVERY_WINDOW_SEC = 60

export type RecoveryWindowInput = {
  globalTripped: boolean
  nowMs: number
  lastGlobalKillAtMs: number | null
  recoveryWindowMs: number
}

export type RecoveryWindowDecision = {
  execute: boolean
  recovered: boolean
  reason: string
}

export function assessRecoveryWindow(input: RecoveryWindowInput): RecoveryWindowDecision {
  if (!input.globalTripped) {
    return { execute: false, recovered: true, reason: "global leg clear — recovery window reset" }
  }
  if (input.lastGlobalKillAtMs === null) {
    return {
      execute: true,
      recovered: false,
      reason: "global leg tripped, no kill in flight — executing",
    }
  }
  const elapsedMs = input.nowMs - input.lastGlobalKillAtMs
  if (elapsedMs < input.recoveryWindowMs) {
    const remainingSec = ((input.recoveryWindowMs - elapsedMs) / 1000).toFixed(0)
    return {
      execute: false,
      recovered: false,
      reason: `global leg still tripped but within recovery window (${remainingSec}s remaining) — suppressing escalation, waiting for MemAvailable to recover`,
    }
  }
  return {
    execute: true,
    recovered: false,
    reason: `global leg still tripped ${(elapsedMs / 1000).toFixed(0)}s after last kill (recovery window elapsed) — escalating one more kill`,
  }
}
