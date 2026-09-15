import type { TemperProgressThing } from "akasha/temper/progress/thing/temper-progress-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperComparisonOp = TemperProgressThing & {
  key: Key
}
