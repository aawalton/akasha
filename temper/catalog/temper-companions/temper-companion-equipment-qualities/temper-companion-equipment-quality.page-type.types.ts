import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { Available } from "akasha/temper/catalog/things/properties/available.boolean-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperCompanionEquipmentQuality = TemperCompanionThing & {
  key: Key
  available: Available
  displayOrder: DisplayOrder
}
