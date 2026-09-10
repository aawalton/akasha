import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EsoCurseIds } from "../properties/eso-curse-ids.number-property.ts"

export type TemperCurse = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoCurseIds?: EsoCurseIds
}
