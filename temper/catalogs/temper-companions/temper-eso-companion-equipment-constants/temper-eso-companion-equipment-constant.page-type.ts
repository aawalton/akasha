import type { PageType } from "@akasha/pages/page-type"

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
  types: "ts",
} as const satisfies PageType
