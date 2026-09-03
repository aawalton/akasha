import { ending } from "@akasha/utils-process/process-ending"
import { liveAgentPidsFromProc } from "./decide-proc-liveness.ts"
import { selectSupersededTreePids } from "./decide-proc-tree.ts"
import { scanProcEntries } from "./proc-scan.ts"

async function terminate(pids: readonly number[]): Promise<void> {
  await ending(pids)
}

export function selectPriorTreePids(
  byId: ReadonlyMap<string, readonly number[]>,
  agentId: string,
  selfPid: number
): readonly number[] {
  return (byId.get(agentId) ?? []).filter((pid) => pid !== selfPid)
}

export async function terminatePriorAgentTree(agentId: string): Promise<readonly number[]> {
  const byId = liveAgentPidsFromProc(scanProcEntries().entries)
  const pids = selectPriorTreePids(byId, agentId, process.pid)
  await terminate(pids)
  return pids
}

export async function sweepSupersededAgentTrees(
  agentId: string,
  keeperPid?: number
): Promise<readonly number[]> {
  const pids = selectSupersededTreePids(scanProcEntries().entries, agentId, process.pid, keeperPid)
  if (pids.length === 0) return []
  const keeperNote = keeperPid !== undefined ? ` (keeper pid ${keeperPid})` : ""
  process.stderr.write(
    `[restart] seat ${agentId}: reaping ${pids.length} superseded supervisor ` +
      `tree pid(s) [${pids.join(", ")}]${keeperNote}\n`
  )
  await terminate(pids)
  return pids
}
