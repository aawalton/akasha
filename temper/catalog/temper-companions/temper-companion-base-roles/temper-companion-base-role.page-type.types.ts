import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { Abbreviation } from "../temper-companion-things/properties/abbreviation.text-property.ts"
import type { ValidArmorWeights } from "../temper-companion-things/properties/valid-armor-weights.text-property.ts"
import type { ValidTraitIds } from "../temper-companion-things/properties/valid-trait-ids.text-property.ts"
import type { ValidWeaponRoleIds } from "../temper-companion-things/properties/valid-weapon-role-ids.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionBaseRole = TemperCompanionThing & {
  key: Key
  abbreviation: Abbreviation
  description: Description
  displayOrder: DisplayOrder
  validArmorWeights: ValidArmorWeights
  validTraitIds: ValidTraitIds
  validWeaponRoleIds: ValidWeaponRoleIds
}
