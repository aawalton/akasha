
import { getOpenQuestions, selectQuestionsAskedBy } from "./attention-question.ts"
import { codeModule } from "./code-import.ts"
import { readAgentMessageRecency } from "./message-recency.ts"
import type { OutboundRecency } from "./pending-decide.ts"
import { listPersonaTargets } from "./persona-wake-slugs.ts"
import { seatChildrenOf } from "./seat-children.ts"
import { seatTurnStateOf, turnStillToCome } from "./seat-turn-state.ts"
import { seatRecord } from "./seat-facts.ts"
import { resolveSeatTarget } from "./seat-handle.ts"

const PERSONAS_CORE = "@alanwalton/personas-core/last-messaged"

export interface PendingSignals {
  readonly selfStopped: boolean
  readonly liveChildren: number
  readonly openQuestions: number
  readonly outbound: OutboundRecency
}

interface PersonasCore {
  readonly matchPersonaForAgent: (
    agentName: string | null,
    agentPersona: string | null,
    personas: readonly unknown[]
  ) => string | null
}

export async function countOpenQuestions(
  agentId: string,
  agentName: string | null,
  persona: string | null
): Promise<number> {
  const { matchPersonaForAgent } = await codeModule<PersonasCore>(PERSONAS_CORE)
  const targets = await listPersonaTargets()
  const personaId = matchPersonaForAgent(agentName, persona, targets)
  if (personaId === null) return 0
  return selectQuestionsAskedBy(await getOpenQuestions(personaId), agentId).length
}

function countChildrenHandingBack(agentId: string): number {
  return seatChildrenOf(agentId).filter((one) => turnStillToCome(seatTurnStateOf(one.id).state))
    .length
}

export async function readPending(handle: string): Promise<PendingSignals> {
  const found = resolveSeatTarget(handle)
  if ("error" in found) throw new Error(found.error)
  const agentId = found.id
  const [liveChildren, outbound] = await Promise.all([
    Promise.resolve().then(() => countChildrenHandingBack(agentId)),
    readAgentMessageRecency(agentId),
  ])
  const seat = seatRecord(agentId)
  const selfStopped = seat === null || seat.presence === "absent"
  const openQuestions = await countOpenQuestions(agentId, seat?.name ?? null, seat?.persona ?? null)
  return { selfStopped, liveChildren, openQuestions, outbound }
}
