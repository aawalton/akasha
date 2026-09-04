import type { DamageType } from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import type { SkillValueFormula } from "@akasha/temper-skill-kinds/skill-value-formulas"

export type CharacterEffectType = "damage" | "heal" | "shield"

export interface CharacterActivationEffect {
  effectType: CharacterEffectType
  damageType?: DamageType
  formula: SkillValueFormula
}

export interface CharacterSkillActivationData {
  descriptionTemplate: string
  effects: readonly CharacterActivationEffect[]
}
