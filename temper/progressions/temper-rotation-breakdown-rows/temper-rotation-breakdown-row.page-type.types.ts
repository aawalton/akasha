import type { Description } from "akasha/pages/properties/description.text-property.ts"
import type { FullName } from "akasha/temper/progressions/temper-rotation-breakdown-rows/properties/full-name.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperRotationBreakdownRow = TemperProgressThing & {
  key: Key
  description: Description
  fullName: FullName
}
