import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { EquipType } from "./properties/equip-type.number-property.ts"

export type TemperCompanionThing = TemperCatalogThing & {
  equipType?: EquipType
}
