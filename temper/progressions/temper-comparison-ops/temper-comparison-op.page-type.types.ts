import type { Key } from "../../things/properties/key.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"

export type TemperComparisonOp = TemperProgressThing & {
  key: Key
}
