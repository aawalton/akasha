export type MasterConsumableOutcome =
  | "nothing-needed"
  | "no-solvent"
  | "no-reagent-combo"
  | "unknown-recipe"
  | "unresolved-glyph"
  | "enqueued"
  | "not-in-interaction"
  | "missing-ingredients"
  | "ingredient-bounded"
  | "crafted"

export type MasterConsumablePhase = "resolve" | "execute"

export interface MasterConsumableTrace {
  timestamp: number
  craftType: number
  itemId: number
  materialItemId: number
  targetQuality: number
  encodedAlchemyTraits: number
  needed: number
  phase: MasterConsumablePhase
  solventFound?: boolean
  reagent1Id?: number
  reagent2Id?: number
  reagent3Id?: number
  recipeListIndex?: number
  recipeIndex?: number
  potencyRuneId?: number
  essenceRuneId?: number
  aspectRuneId?: number
  interactionType?: number
  maxIter?: number
  yieldPerIter?: number
  iterations?: number
  diag?: string
  outcome: MasterConsumableOutcome
}
