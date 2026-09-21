import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"

export type TemperItemAction = TemperProgressThing & {
  description: Description
}
