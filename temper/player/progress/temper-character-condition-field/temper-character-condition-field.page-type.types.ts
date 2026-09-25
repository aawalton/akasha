import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCharacterConditionField = TemperProgressThing & {
  key: Key
  description: Description
}
