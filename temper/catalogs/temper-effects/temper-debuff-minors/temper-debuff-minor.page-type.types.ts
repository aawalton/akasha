import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"

export type TemperDebuffMinor = TemperCatalogThing & {
  key: Key
  description: Description
}
