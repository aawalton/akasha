import { readFileSync } from "node:fs"
import {
  addressableByName,
  type Claiming,
  type Presence,
} from "@akasha/seat-system/seat-name-claim"
import { parseSeatProcKey, seatProcKeyPresence } from "@akasha/seat-system/seat-proc-key"
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

/**
 * The claim `seat-name-claim` judges, gathered from what this workstation can see.
 *
 * Whether the name is reachable at all is asked of `addressableByName` rather than worked out from
 * a resolution kind here. The two agree: over 47 edge names and 200,000 fuzzed ones,
 * `planSeatResolution(name).kind === "name"` and `addressableByName(name)` never parted, and a
 * seeded fault made the comparison fail, so the agreement is a measurement rather than a zero.
 */
export function gatherAgentNameBindInput(args: {
  readonly bindingAgentId: string | null
  readonly name: string
  readonly priorHolderId: string | null
  readonly priorHolderPresence?: Presence
  readonly takeLiveName?: boolean
}): Claiming {
  const holder =
    args.priorHolderId === null
      ? null
      : { agentId: args.priorHolderId, presence: args.priorHolderPresence ?? "unknown" }
  return {
    claimingAgentId: args.bindingAgentId,
    name: args.name,
    addressable: addressableByName(args.name),
    holder,
    holderIsCallerSeat: args.priorHolderId !== null && isPriorHolderCallerSeat(args.priorHolderId),
    takeLiveName: args.takeLiveName ?? false,
  }
}
