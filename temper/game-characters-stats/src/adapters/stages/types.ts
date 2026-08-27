import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { ArmorItem } from "@temper/game-characters-equipment/item-composites"
import type { EffectSource } from "@temper/shared-formula-framework/effect-source"

export interface TranslationContext {
  bar?: "primary-weapon-bar" | "backup-weapon-bar"

  armorItems?: readonly ArmorItem[]

  targetHealth?: number
}

export type PipelineStage = (
  build: CharacterState,
  context: TranslationContext
) => readonly EffectSource[]
