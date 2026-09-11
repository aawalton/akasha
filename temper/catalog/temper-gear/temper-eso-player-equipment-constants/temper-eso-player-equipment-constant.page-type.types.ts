import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { ConstantFamily } from "../properties/constant-family.text-property.types.ts"
import type { ConstantId } from "../properties/constant-id.text-property.types.ts"
import type { EsoNum } from "../properties/eso-num.number-property.types.ts"

export type TemperEsoPlayerEquipmentConstant = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  constantFamily: ConstantFamily
  constantId: ConstantId
  esoNum: EsoNum
}
