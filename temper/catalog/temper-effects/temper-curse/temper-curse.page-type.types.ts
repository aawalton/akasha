import type { EsoCurseIds } from "akasha/temper/catalog/temper-effects/properties/eso-curse-ids.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCurse = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoCurseIds?: EsoCurseIds
}
