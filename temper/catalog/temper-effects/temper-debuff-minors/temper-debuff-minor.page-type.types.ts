import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperDebuffMinor = TemperCatalogThing & {
  key: Key
  description: Description
}
