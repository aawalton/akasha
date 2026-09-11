import type { EsoTraitConstantName } from "akasha/temper/catalog/things/properties/eso-trait-constant-name.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperWeaponTrait = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoTraitConstantName: EsoTraitConstantName
}
