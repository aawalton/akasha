import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import type { ArmorItem } from "akasha/temper/characters-equipment/item-composites/item-composites.module.code.ts"
import type { EffectSource } from "../../formula-framework/effect-source/effect-source.module.code.ts"

export interface TranslationContext {
  bar?: "primary-weapon-bar" | "backup-weapon-bar"

  armorItems?: readonly ArmorItem[]

  targetHealth?: number
}

export type PipelineStage = (
  build: CharacterState,
  context: TranslationContext
) => readonly EffectSource[]
