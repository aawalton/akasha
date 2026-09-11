import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"

export type TemperItemAction = TemperProgressThing & {
  description: Description
}
