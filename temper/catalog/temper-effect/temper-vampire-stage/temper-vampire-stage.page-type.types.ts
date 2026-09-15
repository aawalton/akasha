import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { EsoVampireStageId } from "akasha/temper/catalog/temper-effect/temper-vampire-stage/properties/eso-vampire-stage-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperVampireStage = TemperCatalogThing & {
  key: Key
  description: Description
  displayOrder: DisplayOrder
  esoVampireStageId: EsoVampireStageId
}
