import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DropsScripts } from "../properties/drops-scripts.boolean-property.ts"
import type { IsDlc } from "../properties/is-dlc.boolean-property.ts"

export type TemperZone = TemperCatalogThing & {
  dropsScripts: DropsScripts
  isDlc: IsDlc
}
