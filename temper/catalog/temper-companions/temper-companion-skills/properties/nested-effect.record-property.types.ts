import type { Duration } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/duration.number-property.types.ts"
import type { EffectConditions } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/effect-conditions.record-property.types.ts"
import type { EffectFormula } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/effect-formula.record-property.types.ts"
import type { EffectStatus } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/effect-status.record-property.types.ts"
import type { EffectTarget } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/effect-target.record-property.types.ts"
import type { SkillEffectType } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/skill-effect-type.text-property.types.ts"
import type { DamageType } from "akasha/temper/characters/skill-activations/properties/damage-type.text-property.types.ts"

export type NestedEffect = {
  type?: SkillEffectType
  target?: EffectTarget
  formula?: EffectFormula
  status?: EffectStatus
  conditions?: EffectConditions
  damageType?: DamageType
  duration?: Duration
  effect?: NestedEffect
}
