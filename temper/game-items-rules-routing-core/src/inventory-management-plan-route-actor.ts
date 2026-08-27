import type { RouteStep, VenueType } from "./inventory-management-plan-types"

export function stepsForActor(
  steps: readonly RouteStep[],
  characterId: string,
  venue: VenueType
): readonly RouteStep[] {
  return steps.filter((s) => s.characterId === characterId && s.venue === venue)
}
