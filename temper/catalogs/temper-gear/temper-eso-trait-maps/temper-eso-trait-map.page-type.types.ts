import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EsoTraitNum } from "../properties/eso-trait-num.number-property.ts"
import type { TraitFamily } from "../properties/trait-family.text-property.ts"
import type { TraitId } from "../properties/trait-id.text-property.ts"

export type TemperEsoTraitMap = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  traitFamily: TraitFamily
  traitId: TraitId
  esoTraitNum: EsoTraitNum
}
