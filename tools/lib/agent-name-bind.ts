import { readFileSync } from "node:fs"
import { parseSeatProcKey, seatProcKeyPresence } from "@akasha/seat-system/seat-proc-key"
import type { AgentNameBindInput, SeatPresence } from "./name-claim-guard.ts"
import { planSeatResolution } from "./seat-handle.ts"
import { agentHolderProcess } from "./seat-presence-read.ts"

const ANCESTRY_DEPTH_LIMIT = 32

function readParentPid(pid: number): number | null {
  let line: string
  try {
    line = readFileSync(`/proc/${pid}/stat`, "utf8")
  } catch {
    return null
  }
  const close = line.lastIndexOf(")")
  if (close === -1) return null
  const fields = line.slice(close + 2).split(" ")
  const ppid = Number(fields[1])
  return Number.isInteger(ppid) && ppid > 0 ? ppid : null
}

export function isAncestorOfSelf(pid: number): boolean {
  let cursor: number | null = process.pid
  for (let depth = 0; depth < ANCESTRY_DEPTH_LIMIT && cursor !== null; depth++) {
    if (cursor === pid) return true
    if (cursor === 1) return false
    cursor = readParentPid(cursor)
  }
  return false
}

export function isPriorHolderCallerSeat(priorHolderId: string): boolean {
  const stated = agentHolderProcess(priorHolderId)
  const key = stated === null ? null : parseSeatProcKey(stated)
  if (key === null || seatProcKeyPresence(key) !== "present") return false
  return isAncestorOfSelf(key.pid)
}

export function gatherAgentNameBindInput(args: {
  readonly bindingAgentId: string | null
  readonly name: string
  readonly priorHolderId: string | null
  readonly priorHolderPresence?: SeatPresence
  readonly takeLiveName?: boolean
}): AgentNameBindInput {
  const priorHolder =
    args.priorHolderId === null
      ? null
      : { id: args.priorHolderId, presence: args.priorHolderPresence ?? "unknown" }
  return {
    bindingAgentId: args.bindingAgentId,
    name: args.name,
    resolution: planSeatResolution(args.name).kind,
    priorHolder,
    priorHolderIsCallerSeat:
      args.priorHolderId !== null && isPriorHolderCallerSeat(args.priorHolderId),
    takeLiveName: args.takeLiveName ?? false,
  }
}
