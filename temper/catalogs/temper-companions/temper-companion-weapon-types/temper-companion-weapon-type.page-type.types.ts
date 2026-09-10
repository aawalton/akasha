import type { IsTwoHanded } from "../../../temper-catalog/things/properties/is-two-handed.boolean-property.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { IsOffHandOnly } from "../temper-companion-things/properties/is-off-hand-only.boolean-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionWeaponType = TemperCompanionThing & {
  key: Key
  displayOrder: DisplayOrder
  isOffHandOnly: IsOffHandOnly
  isTwoHanded: IsTwoHanded
}
