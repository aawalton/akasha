import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { ArmorItem } from "@akasha/temper-characters-equipment/item-composites"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"

export interface TranslationContext {
  bar?: "primary-weapon-bar" | "backup-weapon-bar"

  armorItems?: readonly ArmorItem[]

  targetHealth?: number
}

export type PipelineStage = (
  build: CharacterState,
  context: TranslationContext
) => readonly EffectSource[]
