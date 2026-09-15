import type { BuffName } from "akasha/temper/catalog/temper-companions/temper-companion-skill/properties/buff-name.text-property.types.ts"
import type { Duration } from "akasha/temper/catalog/temper-companions/temper-companion-skill/properties/duration.number-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/thing/properties/effect-value.number-property.types.ts"
import type { ValueType } from "akasha/temper/catalog/thing/properties/value-type.text-property.types.ts"

export type EffectBuff = {
  buff?: BuffName
  duration?: Duration
  value?: EffectValue
  valueType?: ValueType
}
