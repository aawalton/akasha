import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperBuffOther = TemperCatalogThing & {
  key: Key
  description: Description
}
