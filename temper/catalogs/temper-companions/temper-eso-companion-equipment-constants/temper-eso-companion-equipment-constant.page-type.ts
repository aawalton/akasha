import type { PageType } from "@akasha/pages/page-type"
import type { ConstantKind } from "../temper-companion-things/properties/constant-kind.text-property.ts"
import type { KeyText } from "../temper-companion-things/properties/key-text.text-property.ts"
import type { ValueNum } from "../temper-companion-things/properties/value-num.number-property.ts"
import type { ValueText } from "../temper-companion-things/properties/value-text.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperEsoCompanionEquipmentConstant = TemperCompanionThing & {
  kind: ConstantKind
  keyText: KeyText
  valueNum?: ValueNum
  valueText?: ValueText
}

export const temperEsoCompanionEquipmentConstant = {
  id: "01a05fcf-2469-71b2-b9b1-9c8803c95d71",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-eso-companion-equipment-constant",
  definition: "a value The Elder Scrolls Online names for companion equipment",
  pluralSlug: "temper-eso-companion-equipment-constants",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "number-property/value-num",
    "text-property/constant-kind",
    "text-property/key-text",
    "text-property/value-text",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/constant-kind", required: true, many: false },
    { pageProperty: "text-property/key-text", required: true, many: false },
    { pageProperty: "number-property/value-num", required: false, many: false },
    { pageProperty: "text-property/value-text", required: false, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
} as const satisfies PageType
