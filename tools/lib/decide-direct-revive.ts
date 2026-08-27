export interface DirectReviveInput {
  readonly addressWasStated: boolean
  readonly targetAgentId: string | null
  readonly targetIsLive: boolean
}

export function decideDirectRevive(input: DirectReviveInput): string | null {
  if (input.addressWasStated) return null
  if (input.targetAgentId === null) return null
  if (input.targetIsLive) return null
  return input.targetAgentId
}
