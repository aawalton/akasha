import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { DropsScripts } from "../properties/drops-scripts.boolean-property.types.ts"
import type { IsDlc } from "../properties/is-dlc.boolean-property.types.ts"

export type TemperZone = TemperCatalogThing & {
  dropsScripts: DropsScripts
  isDlc: IsDlc
}
