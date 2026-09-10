import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperDebuffOther = TemperCatalogThing & {
  key: Key
  description: Description
}
