import type { TemperCatalogThing } from "../../../catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"

export type TemperTargetScope = TemperCatalogThing & {
  key: Key
}
