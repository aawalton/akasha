import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { EsoTraitNum } from "../properties/eso-trait-num.number-property.types.ts"
import type { TraitFamily } from "../properties/trait-family.text-property.types.ts"
import type { TraitId } from "../properties/trait-id.text-property.types.ts"

export type TemperEsoTraitMap = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  traitFamily: TraitFamily
  traitId: TraitId
  esoTraitNum: EsoTraitNum
}
