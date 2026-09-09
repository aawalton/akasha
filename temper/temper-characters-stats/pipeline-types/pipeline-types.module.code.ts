import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"
import type { CharacterState } from "akasha/temper/temper-character-build/build-types/build-types.module.code.ts"
import type { ArmorItem } from "akasha/temper/temper-characters-equipment/item-composites/item-composites.module.code.ts"

export interface TranslationContext {
  bar?: "primary-weapon-bar" | "backup-weapon-bar"

  armorItems?: readonly ArmorItem[]

  targetHealth?: number
}

export type PipelineStage = (
  build: CharacterState,
  context: TranslationContext
) => readonly EffectSource[]
