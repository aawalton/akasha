import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { EsoVampireStageId } from "akasha/temper/catalog/temper-effects/properties/eso-vampire-stage-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperVampireStage = TemperCatalogThing & {
  key: Key
  description: Description
  displayOrder: DisplayOrder
  esoVampireStageId: EsoVampireStageId
}
