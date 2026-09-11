import type { EquipType } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/equip-type.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperCompanionThing = TemperCatalogThing & {
  equipType?: EquipType
}
