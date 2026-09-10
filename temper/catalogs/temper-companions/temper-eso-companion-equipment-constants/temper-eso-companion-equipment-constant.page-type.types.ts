import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ConstantKind } from "../temper-companion-things/properties/constant-kind.text-property.ts"
import type { KeyText } from "../temper-companion-things/properties/key-text.text-property.ts"
import type { ValueNum } from "../temper-companion-things/properties/value-num.number-property.ts"
import type { ValueText } from "../temper-companion-things/properties/value-text.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperEsoCompanionEquipmentConstant = TemperCompanionThing & {
  key: Key
  kind: ConstantKind
  keyText: KeyText
  valueNum?: ValueNum
  valueText?: ValueText
  displayOrder: DisplayOrder
}
