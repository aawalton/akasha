import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { ActivationEffectType } from "akasha/temper/player/character/skill-activation/properties/activation-effect-type.text-property.types.ts"
import type { Coefficient } from "akasha/temper/player/character/skill-activation/properties/coefficient.number-property.types.ts"
import type { DamageType } from "akasha/temper/player/character/skill-activation/properties/damage-type.text-property.types.ts"
import type { ScalingKind } from "akasha/temper/player/character/skill-activation/properties/scaling-kind.text-property.types.ts"
import type { ScalingStat } from "akasha/temper/player/character/skill-activation/properties/scaling-stat.text-property.types.ts"

export type ActivationEffects = "jsonl"

export type ActivationEffectsRow = {
  id: Id
  effectType: ActivationEffectType
  damageType?: DamageType
  scalingStat: ScalingStat
  scalingKind: ScalingKind
  coefficient: Coefficient
}
