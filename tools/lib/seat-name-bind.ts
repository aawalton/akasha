import { gatherAgentNameBindInput } from "./agent-name-bind.ts"
import { inputError } from "./exit.ts"
import { decideAgentNameBind, type SeatPresence } from "./name-claim-guard.ts"
import { seatByName } from "./seat-by-name.ts"
import { isValidSeatName } from "./seat-handle.ts"

export interface SetAgentNameBind {
  readonly priorHolderPresence?: SeatPresence
  readonly takeLiveName?: boolean
}

export async function refuseSeatName(
  agentId: string,
  name: string,
  bind: SetAgentNameBind = {}
): Promise<void> {
  if (!isValidSeatName(name)) {
    throw inputError(`invalid agent name: ${name}`)
  }
  const prior = seatByName(name)
  const priorHolderId = prior !== null && prior.id !== agentId ? prior.id : null
  const input = gatherAgentNameBindInput({
    bindingAgentId: agentId,
    name,
    priorHolderId,
    ...(bind.priorHolderPresence === undefined
      ? {}
      : { priorHolderPresence: bind.priorHolderPresence }),
    ...(bind.takeLiveName === undefined ? {} : { takeLiveName: bind.takeLiveName }),
  })
  const decision = decideAgentNameBind(input)
  if (!decision.allow) {
    throw inputError(`refuseSeatName refused (${decision.cause}): ${decision.reason}`)
  }
}

export async function mintNamedAgent(name: string): Promise<string> {
  const agentId = Bun.randomUUIDv7()
  await refuseSeatName(agentId, name)
  return agentId
}
