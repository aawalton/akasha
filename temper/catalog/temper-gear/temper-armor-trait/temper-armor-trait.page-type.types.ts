import type { EsoTraitConstantName } from "akasha/temper/catalog/thing/properties/eso-trait-constant-name.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperArmorTrait = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoTraitConstantName: EsoTraitConstantName
}
