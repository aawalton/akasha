import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { WornGear } from "akasha/temper/catalog/world/temper-source-category/properties/worn-gear.boolean-property.types.ts"
import type { MetricSubject } from "akasha/temper/player/character/stat/temper-metric/properties/metric-subject.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperSourceCategory = TemperCatalogThing & {
  displayOrder: DisplayOrder
  key: Key
  subject?: MetricSubject
  wornGear?: WornGear
}
