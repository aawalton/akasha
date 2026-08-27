import { TEMPER_CHARACTER_SKILL_ACTIVATIONS } from "./generated/temper-character-skill-activation.generated"
import type { DamageType } from "./skill-activation-effect-types"
import type { SkillValueFormula } from "./skill-value-formulas"
import type { SkillId } from "./skills-data"

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

export const characterSkillActivationData: Partial<Record<SkillId, CharacterSkillActivationData>> =
  TEMPER_CHARACTER_SKILL_ACTIVATIONS
