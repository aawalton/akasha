import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { Effects } from "../../../temper-catalog/things/properties/effects.page-property-entry.ts"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"

export type TemperBuffMinor = TemperCatalogThing & {
  key: Key
  description: Description
  effects: Effects
}
