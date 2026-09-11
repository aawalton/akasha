import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { Effects } from "../../things/properties/effects.page-property-entry.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperBuffMinor = TemperCatalogThing & {
  key: Key
  description: Description
  effects: Effects
}
