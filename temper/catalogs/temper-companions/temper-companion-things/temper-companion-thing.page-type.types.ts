import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { EquipType } from "./properties/equip-type.number-property.ts"

export type TemperCompanionThing = TemperCatalogThing & {
  equipType?: EquipType
}
