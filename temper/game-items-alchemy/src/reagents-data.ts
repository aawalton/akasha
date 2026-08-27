import type { PoisonEffectId } from "./poison-effect-registry"

export interface Reagent {
  id: string
  name: string
  itemId: number
  icon: string
  effects: readonly [PoisonEffectId, PoisonEffectId, PoisonEffectId, PoisonEffectId]
}
