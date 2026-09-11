import type { IsOffHandOnly } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/is-off-hand-only.boolean-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { IsTwoHanded } from "akasha/temper/catalog/things/properties/is-two-handed.boolean-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperCompanionWeaponType = TemperCompanionThing & {
  key: Key
  displayOrder: DisplayOrder
  isOffHandOnly: IsOffHandOnly
  isTwoHanded: IsTwoHanded
}
