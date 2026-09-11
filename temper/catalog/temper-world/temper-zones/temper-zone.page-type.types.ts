import type { DropsScripts } from "akasha/temper/catalog/temper-world/properties/drops-scripts.boolean-property.types.ts"
import type { IsDlc } from "akasha/temper/catalog/temper-world/properties/is-dlc.boolean-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperZone = TemperCatalogThing & {
  dropsScripts: DropsScripts
  isDlc: IsDlc
}
