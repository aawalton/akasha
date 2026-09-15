import type { IsOffHandOnly } from "akasha/temper/catalog/temper-companions/temper-companion-thing/properties/is-off-hand-only.boolean-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-thing/temper-companion-thing.page-type.types.ts"
import type { IsTwoHanded } from "akasha/temper/catalog/thing/properties/is-two-handed.boolean-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionWeaponType = TemperCompanionThing & {
  key: Key
  displayOrder: DisplayOrder
  isOffHandOnly: IsOffHandOnly
  isTwoHanded: IsTwoHanded
}
