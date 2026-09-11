import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { EsoVampireStageId } from "../properties/eso-vampire-stage-id.number-property.types.ts"

export type TemperVampireStage = TemperCatalogThing & {
  key: Key
  description: Description
  displayOrder: DisplayOrder
  esoVampireStageId: EsoVampireStageId
}
