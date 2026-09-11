import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EsoTraitConstantName } from "../../things/properties/eso-trait-constant-name.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperJewelryTrait = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoTraitConstantName: EsoTraitConstantName
}
