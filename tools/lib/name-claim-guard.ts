import type { SeatHandle } from "./seat-handle.ts"

export type AgentNameBindRefusal = "unaddressable" | "live-holder"

export type SeatPresence = "present" | "absent" | "unknown"

export const TAKE_LIVE_NAME_FLAG = "--take-live-name"

export interface AgentNameBindPriorHolder {
  readonly id: string
  readonly presence: SeatPresence
}

export interface AgentNameBindInput {
  readonly bindingAgentId: string | null
  readonly name: string
  readonly resolution: SeatHandle["kind"]
  readonly priorHolder: AgentNameBindPriorHolder | null
  readonly priorHolderIsCallerSeat: boolean
  readonly takeLiveName: boolean
}

export type AgentNameBindDecision =
  | { readonly allow: true }
  | { readonly allow: false; readonly cause: AgentNameBindRefusal; readonly reason: string }

function refuse(cause: AgentNameBindRefusal, reason: string): AgentNameBindDecision {
  return { allow: false, cause, reason }
}

export function decideAgentNameBind(input: AgentNameBindInput): AgentNameBindDecision {
  const { bindingAgentId, name, resolution, priorHolder } = input

  if (resolution !== "name") {
    return refuse(
      "unaddressable",
      `'${name}' is not addressable by name: the resolver reads it as a ${resolution} and would ` +
        "route it to a UUID range, so binding it leaves this row unreachable by `ops agent send`, " +
        "`alive`, `stop` and every name-keyed sweep. It passes the shape check only because short " +
        "hex-ish strings are legal names. Pick a handle containing a letter outside a-f."
    )
  }

  if (priorHolder !== null && priorHolder.id === bindingAgentId) return { allow: true }

  if (
    priorHolder !== null &&
    priorHolder.presence === "present" &&
    !input.priorHolderIsCallerSeat &&
    !input.takeLiveName
  ) {
    return refuse(
      "live-holder",
      `'${name}' is held by seat ${priorHolder.id}, which has a process in it right now. Name ` +
        "distinctness is this system's mutual exclusion, so binding it would leave two seats " +
        "spelling one name: the pending mail addressed to it moves here, and the next page write " +
        `lands on the file that seat is named by. Stop it with \`akasha seat supervisor stop ${name}\`, or ` +
        `pass \`${TAKE_LIVE_NAME_FLAG}\` to take the name from it deliberately.`
    )
  }

  return { allow: true }
}
