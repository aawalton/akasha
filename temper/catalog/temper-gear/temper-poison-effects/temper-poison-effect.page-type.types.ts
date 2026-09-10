import type { Key } from "../../../things/properties/key.text-property.ts"
import type { Cooldown } from "../properties/cooldown.number-property.types.ts"
import type { IsPositive } from "../properties/is-positive.boolean-property.types.ts"
import type { OppositeId } from "../properties/opposite-id.text-property.ts"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.types.ts"

export type TemperPoisonEffect = TemperGearThing & {
  key: Key
  oppositeId: OppositeId
  isPositive?: IsPositive
  cooldown?: Cooldown
}
