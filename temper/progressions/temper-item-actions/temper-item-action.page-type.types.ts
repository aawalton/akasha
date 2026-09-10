import type { Description } from "../../../pages/properties/description.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"

export type TemperItemAction = TemperProgressThing & {
  description: Description
}
