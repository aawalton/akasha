import type { ConstantKind } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/constant-kind.text-property.types.ts"
import type { KeyText } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/key-text.text-property.types.ts"
import type { ValueNum } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/value-num.number-property.types.ts"
import type { ValueText } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/value-text.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperEsoCompanionEquipmentConstant = TemperCompanionThing & {
  key: Key
  kind: ConstantKind
  keyText: KeyText
  valueNum?: ValueNum
  valueText?: ValueText
  displayOrder: DisplayOrder
}
