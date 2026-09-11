import type { Description } from "akasha/pages/properties/description.text-property.ts"
import type { Abbreviation } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/abbreviation.text-property.types.ts"
import type { ValidArmorWeights } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/valid-armor-weights.text-property.types.ts"
import type { ValidTraitIds } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/valid-trait-ids.text-property.types.ts"
import type { ValidWeaponRoleIds } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/valid-weapon-role-ids.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperCompanionBaseRole = TemperCompanionThing & {
  key: Key
  abbreviation: Abbreviation
  description: Description
  displayOrder: DisplayOrder
  validArmorWeights: ValidArmorWeights
  validTraitIds: ValidTraitIds
  validWeaponRoleIds: ValidWeaponRoleIds
}
