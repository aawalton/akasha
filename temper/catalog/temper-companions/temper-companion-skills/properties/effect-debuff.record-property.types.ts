import type { DebuffName } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/debuff-name.text-property.types.ts"
import type { Duration } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/duration.number-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/things/properties/effect-value.number-property.types.ts"
import type { ValueType } from "akasha/temper/catalog/things/properties/value-type.text-property.types.ts"

export type EffectDebuff = {
  debuff?: DebuffName
  duration?: Duration
  value?: EffectValue
  valueType?: ValueType
}
