import type { Available } from "../../../temper-catalog/things/properties/available.boolean-property.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionEquipmentQuality = TemperCompanionThing & {
  key: Key
  available: Available
  displayOrder: DisplayOrder
}
