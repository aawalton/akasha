import type { PageType } from "@akasha/pages-system/page-type"
import type { ConstantKind } from "../temper-companion-things/properties/constant-kind.text-property.ts"
import type { KeyText } from "../temper-companion-things/properties/key-text.text-property.ts"
import type { ValueNum } from "../temper-companion-things/properties/value-num.number-property.ts"
import type { ValueText } from "../temper-companion-things/properties/value-text.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperEsoCompanionEquipmentConstant = TemperCompanionThing & {
  kind: ConstantKind
  keyText: KeyText
  valueNum?: ValueNum
  valueText?: ValueText
}

export const temperEsoCompanionEquipmentConstant = {
  id: "01a05fcf-2469-71b2-b9b1-9c8803c95d71",
  pageTypeSlug: "page-type",
  slug: "temper-eso-companion-equipment-constant",
  definition: "a value The Elder Scrolls Online names for companion equipment",
  pluralSlug: "temper-eso-companion-equipment-constants",
  extendsSlug: ["page-type/temper-companion-thing"],
  partSlugs: [
    "number-property/value-num",
    "text-property/constant-kind",
    "text-property/key-text",
    "text-property/value-text",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "constant-kind", required: true, many: false },
    { pagePropertySlug: "key-text", required: true, many: false },
    { pagePropertySlug: "value-num", required: false, many: false },
    { pagePropertySlug: "value-text", required: false, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
