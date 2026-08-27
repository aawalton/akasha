import { describe, expect, test } from "bun:test"
import { assessSpawnAdmission, MIN_FREE_MEMORY_GB } from "@shared/utils-system/memory-guard"
import {
  assessGlobalKill,
  GLOBAL_MIN_AVAIL_GB,
  GLOBAL_MIN_FREE_SWAP_GB,
} from "../lib/memory-reaper-global.ts"
import { type PidSnapshot } from "../lib/memory-reaper-proc-scan.ts"

const KB_PER_GB = 1024 * 1024
const minAvailKb = GLOBAL_MIN_AVAIL_GB * KB_PER_GB
const minFreeSwapKb = GLOBAL_MIN_FREE_SWAP_GB * KB_PER_GB
const spawnFloorKb = MIN_FREE_MEMORY_GB * KB_PER_GB

function snap(pid: number, ppid: number, rssGb: number, name = `proc-${pid}`): PidSnapshot {
  return { pid, ppid, vmRssKb: Math.round(rssGb * KB_PER_GB), pssKb: Math.round(rssGb * KB_PER_GB), name }
}

describe("kill decider vs spawn-admission decider — no pressure-direction disagreement", () => {
  test("structural guarantee: the kill floor sits at or below the spawn floor", () => {
    expect(GLOBAL_MIN_AVAIL_GB).toBeLessThanOrEqual(MIN_FREE_MEMORY_GB)
  })

  test("sweep: across every MemAvailable level, the kill leg never fires while the spawn gate admits", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 5), snap(110, 100, 4), snap(200, 1, 3)]
    for (let gb = 0; gb <= 16; gb += 0.25) {
      const availableKb = gb * KB_PER_GB
      const kill = assessGlobalKill({
        snapshots,
        supervisorPids: [100, 200],
        availableKb,
        swapTotalKb: 80 * KB_PER_GB,
        swapFreeKb: 0,
        minAvailKb,
        minFreeSwapKb,
      })
      const spawn = assessSpawnAdmission({
        availableKb,
        minFreeMemoryKb: spawnFloorKb,
        kindLabel: "worker",
      })
      const disagreement = kill.kill && spawn.allow
      expect(disagreement).toBe(false)
    }
  })

  test("kill fires ⟹ spawn already refuses (contrapositive, at the arming boundary)", () => {
    for (const gb of [4, 3, 2, 1, 0.5]) {
      const availableKb = gb * KB_PER_GB
      const kill = assessGlobalKill({
        snapshots: [snap(100, 1, 8), snap(110, 100, 6)],
        supervisorPids: [100],
        availableKb,
        swapTotalKb: 0,
        swapFreeKb: 0,
        minAvailKb,
        minFreeSwapKb,
      })
      const spawn = assessSpawnAdmission({
        availableKb,
        minFreeMemoryKb: spawnFloorKb,
        kindLabel: "worker",
      })
      expect(kill.kill).toBe(true)
      expect(spawn.allow).toBe(false)
    }
  })

  test("2026-07-03 storm snapshot: 63 GiB VmRSS-sum with 22.8 GiB MemAvailable → both agree NO pressure", () => {
    const snapshots: PidSnapshot[] = []
    for (let i = 0; i < 15; i++) {
      const root = 1000 + i * 2
      snapshots.push(snap(root, 1, 2.2, `supervisor-${i}`))
      snapshots.push(snap(root + 1, root, 2.0, `claude-${i}`))
    }
    const vmRssSumGb = snapshots.reduce((a, s) => a + s.vmRssKb, 0) / KB_PER_GB
    expect(vmRssSumGb).toBeGreaterThan(62)

    const availableKb = 22.8 * KB_PER_GB
    const kill = assessGlobalKill({
      snapshots,
      supervisorPids: snapshots.filter((s) => s.name.startsWith("supervisor")).map((s) => s.pid),
      availableKb,
      swapTotalKb: 80 * KB_PER_GB,
      swapFreeKb: 0,
      minAvailKb,
      minFreeSwapKb,
    })
    const spawn = assessSpawnAdmission({
      availableKb,
      minFreeMemoryKb: spawnFloorKb,
      kindLabel: "worker",
    })
    expect(kill.kill).toBe(false)
    expect(spawn.allow).toBe(true)
  })
})
