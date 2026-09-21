import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { ArmorItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"

export interface TranslationContext {
  bar?: "primary-weapon-bar" | "backup-weapon-bar"

  armorItems?: readonly ArmorItem[]

  targetHealth?: number
}

export type PipelineStage = (
  build: CharacterState,
  context: TranslationContext
) => readonly EffectSource[]
