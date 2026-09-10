import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { Effects } from "../../../catalog/things/properties/effects.page-property-entry.ts"
import type { TemperCatalogThing } from "../../../catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"

export type TemperDebuffMajor = TemperCatalogThing & {
  key: Key
  description: Description
  effects: Effects
}
