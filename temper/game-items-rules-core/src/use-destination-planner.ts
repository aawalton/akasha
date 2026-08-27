import { claimItemForCharacter, resolveUseDestination } from "./use-destination-resolver"
import type { CharacterId, ItemKey, UseDestinationContext } from "./use-destination-types"

export interface UseDestinationCandidate {
  readonly slotKey: string
  readonly itemKey: ItemKey
}

export function planUseDestinations(
  candidates: ReadonlyArray<UseDestinationCandidate>,
  ctx: UseDestinationContext
): Map<string, CharacterId | undefined> {
  const claims = new Map<CharacterId, Set<string>>()
  const result = new Map<string, CharacterId | undefined>()
  for (const candidate of candidates) {
    const resolved = resolveUseDestination(candidate.itemKey, ctx, claims)
    result.set(candidate.slotKey, resolved)
    if (resolved !== undefined) {
      claimItemForCharacter(claims, resolved, candidate.itemKey)
    }
  }
  return result
}
