import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperComparisonOp = TemperProgressThing & {
  key: Key
}
