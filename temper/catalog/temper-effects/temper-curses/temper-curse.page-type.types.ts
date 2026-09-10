import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { EsoCurseIds } from "../properties/eso-curse-ids.number-property.types.ts"

export type TemperCurse = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoCurseIds?: EsoCurseIds
}
