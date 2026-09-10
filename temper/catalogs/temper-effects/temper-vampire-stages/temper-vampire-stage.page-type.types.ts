import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EsoVampireStageId } from "../properties/eso-vampire-stage-id.number-property.ts"

export type TemperVampireStage = TemperCatalogThing & {
  key: Key
  description: Description
  displayOrder: DisplayOrder
  esoVampireStageId: EsoVampireStageId
}
