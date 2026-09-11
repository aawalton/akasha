import type { Cooldown } from "akasha/temper/catalog/temper-gear/properties/cooldown.number-property.types.ts"
import type { IsPositive } from "akasha/temper/catalog/temper-gear/properties/is-positive.boolean-property.types.ts"
import type { OppositeId } from "akasha/temper/catalog/temper-gear/properties/opposite-id.text-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/temper-gear/things/temper-gear-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperPoisonEffect = TemperGearThing & {
  key: Key
  oppositeId: OppositeId
  isPositive?: IsPositive
  cooldown?: Cooldown
}
