import type { Description } from "../../../pages/properties/description.text-property.ts"
import type { Key } from "../../things/properties/key.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"

export type TemperConditionField = TemperProgressThing & {
  key: Key
  description: Description
}
