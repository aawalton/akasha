import type { EquipType } from "akasha/temper/catalog/temper-companion/thing/properties/equip-type.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperCompanionThing = TemperCatalogThing & {
  equipType?: EquipType
}
