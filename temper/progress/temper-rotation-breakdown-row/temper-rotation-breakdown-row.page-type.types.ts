import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { FullName } from "akasha/temper/progress/temper-rotation-breakdown-row/properties/full-name.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progress/thing/temper-progress-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperRotationBreakdownRow = TemperProgressThing & {
  key: Key
  description: Description
  fullName: FullName
}
