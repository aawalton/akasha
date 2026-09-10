import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ConstantFamily } from "../properties/constant-family.text-property.ts"
import type { ConstantId } from "../properties/constant-id.text-property.ts"
import type { EsoNum } from "../properties/eso-num.number-property.ts"

export type TemperEsoPlayerEquipmentConstant = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  constantFamily: ConstantFamily
  constantId: ConstantId
  esoNum: EsoNum
}
