import type { DamageType } from "../../skill-kinds/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"
import type { SkillValueFormula } from "../../skill-kinds/skill-value-formulas/skill-value-formulas.module.code.ts"

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
